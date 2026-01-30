import nodemailer from "nodemailer";

export async function sendMail(opts: { subject: string; html: string; replyTo?: string }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = (process.env.SMTP_SECURE || "false") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO;

  if (!host || !user || !pass || !to) {
    throw new Error("SMTP env vars missing (SMTP_HOST/USER/PASS/CONTACT_TO)");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `\"${process.env.NEXT_PUBLIC_COMPANY_NAME || "ELEVA"}\" <${user}>`,
    to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
}
