import { supabaseServer } from "@/app/libs/db/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
