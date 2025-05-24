"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseClient } from "@/app/libs/db/client";

const AuthContext = createContext<{ user: any | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const supabase = supabaseClient();

        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && !pathname.startsWith("/sign-in")) {
                router.replace("/sign-in");
            } else {
                setUser(session?.user ?? null);
            }
        };
        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            checkSession();
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [pathname]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
