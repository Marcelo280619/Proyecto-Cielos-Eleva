import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";
import { getAuthFromCookie } from "@/lib/auth";

const Schema = z.object({
  note: z.string().optional().default(""),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    qty: z.number().int().min(1),
  })).min(1),
});

export async function POST(req: Request) {
  try {
    const me = getAuthFromCookie();
    if (!me) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const data = Schema.parse(await req.json());

    const itemsHtml = data.items
      .map(i => `<li><b>${i.name}</b> (ID: ${i.productId}) — Cantidad: ${i.qty}</li>`)
      .join("");

    await sendMail({
      subject: `Solicitud de Cotización - ${process.env.NEXT_PUBLIC_COMPANY_NAME || "ELEVA"}`,
      replyTo: me.email,
      html: `
        <h2>Nueva solicitud desde el carrito</h2>
        <p><b>Cliente:</b> ${me.name}</p>
        <p><b>Email:</b> ${me.email}</p>
        <p><b>Comentario:</b> ${data.note ? data.note.replaceAll("\n","<br/>") : "-"}</p>
        <h3>Ítems</h3>
        <ul>${itemsHtml}</ul>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Error" }, { status: 400 });
  }
}
