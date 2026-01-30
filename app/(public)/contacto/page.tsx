"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setErr(j?.error || "No se pudo enviar. Revisa configuración de correo.");
      return;
    }
    setOk("Mensaje enviado. Te contactaremos pronto.");
    e.currentTarget.reset();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[var(--eleva-blue)]">Contacto</h1>
      <p className="mt-2 text-slate-600">
        Cuéntanos qué necesitas (medidas, ubicación, fotos si aplica) y te respondemos por correo o teléfono.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input name="name" required placeholder="Nombre" className="rounded-lg border px-3 py-2" />
          <input name="phone" placeholder="Teléfono" className="rounded-lg border px-3 py-2" />
        </div>
        <input name="email" type="email" required placeholder="Correo" className="w-full rounded-lg border px-3 py-2" />
        <textarea name="message" required placeholder="Mensaje" className="h-32 w-full rounded-lg border px-3 py-2" />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-[var(--eleva-blue)] px-4 py-2 font-semibold text-white hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {ok && <p className="text-sm font-semibold text-emerald-700">{ok}</p>}
        {err && <p className="text-sm font-semibold text-rose-700">{err}</p>}
      </form>
    </main>
  );
}
