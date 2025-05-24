"use client";

import { supabaseClient } from "@/app/libs/db/client";
import { useRouter } from "next/navigation";

export async function signInClient(email: string, password: string) {
  const supabase = supabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
}
