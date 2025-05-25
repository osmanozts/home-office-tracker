import { supabaseServer } from "@/app/libs/db/server";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  const dateFilter = dateParam
    ? dayjs(dateParam).startOf("day").toISOString()
    : dayjs().startOf("day").toISOString();

  const supabase = await supabaseServer();
  const auth = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("homeoffice_sessions")
    .select("*")
    .eq("user_id", auth.data.user?.id)
    .gte("start_time", dateFilter)
    .lt("start_time", dayjs(dateFilter).endOf("day").toISOString())
    .order("start_time", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
