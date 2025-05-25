"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseClient } from "@/app/libs/db/client";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const supabase = supabaseClient();
        let mounted = true;

        const checkSession = async () => {
            try {
                setIsLoading(true);
                const { data: { session } } = await supabase.auth.getSession();

                if (!session && !pathname.startsWith("/sign-in")) {
                    router.replace("/sign-in");
                } else {
                    setUser(session?.user ?? null);
                }
            } catch (e) {
                console.error("Fehler bei der Authentifizierung:", e);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            checkSession();
        });

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, [pathname]);


    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ?
                <VStack pos="absolute" inset="0" justifyContent="center" alignItems="center" bg="bg/80">
                    <Spinner color="colorPalette.600" />
                    <Text color="#fff">Authentifizierung...</Text>
                </VStack>
                :
                children
            }
        </AuthContext.Provider>
    );
};
