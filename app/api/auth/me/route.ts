import { NextResponse } from "next/server";
import { getAuthFromCookie } from "@/lib/auth";

export async function GET() {
  const me = getAuthFromCookie();
  if (!me) return NextResponse.json({ error: "No auth" }, { status: 401 });
  return NextResponse.json({ name: me.name, email: me.email });
}
