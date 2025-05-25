import { supabaseServer } from "@/app/libs/db/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await supabaseServer();
  const auth = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("homeoffice_sessions")
    .select("*")
    .eq("user_id", auth.data.user?.id)
    .is("end_time", null)
    .maybeSingle();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
