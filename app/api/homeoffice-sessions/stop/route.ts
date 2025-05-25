import { supabaseServer } from "@/app/libs/db/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  const supabase = await supabaseServer();
  const auth = await supabase.auth.getUser();

  const { error } = await supabase
    .from("homeoffice_sessions")
    .update({ end_time: new Date().toISOString() })
    .eq("user_id", auth.data.user?.id)
    .eq("id", sessionId);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
