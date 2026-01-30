import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signToken, setAuthCookie } from "@/lib/auth";

declare global {
  // eslint-disable-next-line no-var
  var __ELEVA_USERS__: Map<string, { id: string; name: string; email: string; passHash: string }> | undefined;
}
const users = globalThis.__ELEVA_USERS__ ?? new Map();
globalThis.__ELEVA_USERS__ = users;

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const data = Schema.parse(await req.json());
    const u = users.get(data.email);
    if (!u) return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });

    const ok = await bcrypt.compare(data.password, u.passHash);
    if (!ok) return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });

    const token = signToken({ userId: u.id, email: u.email, name: u.name });
    setAuthCookie(token);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 400 });
  }
}
