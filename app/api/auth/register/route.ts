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
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const data = Schema.parse(await req.json());
    if (users.has(data.email)) {
      return NextResponse.json({ error: "Correo ya registrado" }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const passHash = await bcrypt.hash(data.password, 10);
    users.set(data.email, { id, name: data.name, email: data.email, passHash });

    const token = signToken({ userId: id, email: data.email, name: data.name });
    setAuthCookie(token);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 400 });
  }
}
