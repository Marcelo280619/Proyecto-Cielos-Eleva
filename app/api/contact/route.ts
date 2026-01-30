import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";

const Schema = z.object({
  name: z.string().min(2),
  phone: z.string().optional().default(""),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = Schema.parse(json);

    await sendMail({
      subject: `Contacto Web - ${process.env.NEXT_PUBLIC_COMPANY_NAME || "ELEVA"}`,
      replyTo: data.email,
      html: `
        <h2>Nuevo mensaje desde el sitio</h2>
        <p><b>Nombre:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Teléfono:</b> ${data.phone || "-"}</p>
        <p><b>Mensaje:</b><br/>${data.message.replaceAll("\n","<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 400 });
  }
}
