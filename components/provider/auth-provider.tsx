"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabaseClient } from "@/libs/db";

const AuthContext = createContext<{ user: any | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const supabase = supabaseClient();

        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && !pathname.startsWith("/auth")) {
                router.replace("/auth/login");
            } else {
                setUser(session?.user ?? null);
            }
        };
        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
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
