"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setErr(j?.error || "Error");
      return;
    }
    location.href = "/app";
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-extrabold text-[var(--eleva-blue)]">Crear cuenta</h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <input name="name" required placeholder="Nombre" className="w-full rounded-lg border px-3 py-2" />
        <input name="email" type="email" required placeholder="Correo" className="w-full rounded-lg border px-3 py-2" />
        <input name="password" type="password" required placeholder="Contraseña (mín 6)" className="w-full rounded-lg border px-3 py-2" />
        <button
          disabled={loading}
          className="w-full rounded-lg bg-[var(--eleva-blue)] px-4 py-2 font-semibold text-white hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Creando..." : "Registrarme"}
        </button>
        {err && <p className="text-sm font-semibold text-rose-700">{err}</p>}
        <p className="text-sm text-slate-600">
          ¿Ya tienes cuenta?{" "}
          <Link className="font-semibold text-[var(--eleva-blue)] hover:underline" href="/auth/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
