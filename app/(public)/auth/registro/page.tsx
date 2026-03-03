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

  const inputClass = "w-full bg-[#1a2d5a]/80 border border-white/15 rounded-lg px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a574]/70 focus:bg-[#1a2d5a] transition-all text-base";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-[#d4a574] mb-3";

  return (
    <main className="min-h-screen bg-[#0f1e3d] flex items-center justify-center px-4" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '448px', width: '100%' }}>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-5 py-2 mb-6">
            <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Bienvenido</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Crear cuenta</h1>
          <p className="text-slate-400 text-sm">Regístrate para acceder a tu panel</p>
          <div className="w-16 h-1 bg-[#d4a574] rounded-full mt-6" style={{ margin: '24px auto 0' }} />
        </div>

        {/* Form */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>Nombre</label>
              <input name="name" required placeholder="Tu nombre completo" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Correo electrónico</label>
              <input name="email" type="email" required placeholder="correo@ejemplo.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contraseña</label>
              <input name="password" type="password" required placeholder="Mínimo 6 caracteres" className={inputClass} />
            </div>

            {err && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-red-400 text-sm text-center">
                {err}
              </div>
            )}

            <div className="flex justify-center py-1">
              <div className="w-24 h-1 bg-[#d4a574] rounded-full" />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#d4a574] hover:bg-[#c89563] disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all text-base tracking-wide hover:shadow-[0_20px_40px_-10px_rgba(212,165,116,0.4)] hover:-translate-y-0.5"
            >
              {loading ? "Creando cuenta..." : "Registrarme →"}
            </button>

            <p className="text-sm text-slate-500 text-center">
              ¿Ya tienes cuenta?{" "}
              <Link className="font-bold text-[#d4a574] hover:text-amber-300 transition-colors" href="/auth/login">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}