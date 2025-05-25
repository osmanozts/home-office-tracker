import { supabaseServer } from "@/app/libs/db/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await supabaseServer();
  const auth = await supabase.auth.getUser();

  const { error } = await supabase.from("homeoffice_sessions").insert({
    start_time: new Date().toISOString(),
    end_time: null,
    user_id: auth.data.user?.id,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
