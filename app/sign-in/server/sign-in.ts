"use server";

import { supabaseServer } from "@/app/libs/db/server";
import { redirect } from "next/navigation";

export async function signInClient(email: string, password: string) {
  const supabase = await supabaseServer();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  redirect("/");
}
