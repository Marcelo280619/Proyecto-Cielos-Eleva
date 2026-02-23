"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

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
    (e.target as HTMLFormElement).reset();
  }

  const inputClass = "w-full bg-[#1a2d5a]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a574]/60 focus:bg-[#1a2d5a] transition-all text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-[#d4a574] mb-2";

  return (
    <main className="min-h-screen bg-[#0f1e3d]" style={{ paddingBottom: '80px' }}>

      {/* Hero header */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#0f1e3d] pt-16 pb-20 px-6 text-center border-b border-white/5">
        <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-5 py-2 mb-6">
          <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Estamos aquí para ayudarte</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
          Hablemos de tu <span className="text-[#d4a574]">Proyecto</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Cuéntanos qué necesitas (medidas, ubicación, fotos si aplica) y te respondemos por correo o teléfono.
        </p>
        <div className="w-20 h-1 bg-[#d4a574] mx-auto rounded-full mt-8" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Info lateral */}
          <div className="space-y-6">
            <div>
              <h2 className="text-white font-black text-xl mb-2">Información de contacto</h2>
              <p className="text-slate-500 text-sm leading-relaxed">Contáctanos directamente o completa el formulario.</p>
            </div>

            <div className="w-16 h-1 bg-[#d4a574] rounded-full" />

            <div className="space-y-5">
              {[
                { icon: MapPin, text: 'Talca, Región del Maule, Chile' },
                { icon: Phone, text: '+56 9 1234 5678', href: 'tel:+56912345678' },
                { icon: Mail, text: 'contacto@eleva.cl', href: 'mailto:contacto@eleva.cl' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#d4a574]/10 border border-[#d4a574]/20 rounded-2xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#d4a574]" strokeWidth={1.5} />
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-slate-300 hover:text-[#d4a574] transition-colors font-medium text-sm">{item.text}</a>
                  ) : (
                    <span className="text-slate-300 font-medium text-sm">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Horario */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#d4a574] mb-3">Horario de atención</p>
              <p className="text-slate-400 text-sm">Lunes a Viernes</p>
              <p className="text-white font-bold text-sm mb-2">08:00 – 18:00 hrs</p>
              <p className="text-slate-400 text-sm">Sábado</p>
              <p className="text-white font-bold text-sm">09:00 – 13:00 hrs</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">Envíanos un mensaje</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Te respondemos en menos de 24 horas</p>
                </div>
              </div>

              {ok ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-24 h-24 bg-[#d4a574]/10 border-2 border-[#d4a574]/40 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="w-16 h-1 bg-[#d4a574] mx-auto rounded-full mb-6" />
                  <h3 className="text-2xl font-black text-white mb-3">¡Mensaje enviado!</h3>
                  <p className="text-slate-400 text-base">{ok}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Nombre <span className="normal-case">*</span></label>
                      <input name="name" required placeholder="Tu nombre completo" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Teléfono</label>
                      <input name="phone" placeholder="+56 9 1234 5678" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Correo electrónico <span className="normal-case">*</span></label>
                    <input name="email" type="email" required placeholder="correo@ejemplo.com" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Mensaje <span className="normal-case">*</span></label>
                    <textarea name="message" required
                      placeholder="Cuéntanos sobre tu proyecto, medidas, ubicación, fotos si aplica..."
                      className={`${inputClass} resize-none`} rows={6} />
                  </div>

                  {err && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-red-400 text-sm text-center">
                      {err}
                    </div>
                  )}

                  <div className="flex justify-center pt-2">
                    <div className="w-32 h-1 bg-[#d4a574] rounded-full" />
                  </div>

                  <button disabled={loading}
                    className="w-full bg-[#d4a574] hover:bg-[#c89563] disabled:opacity-50 text-white font-black py-5 rounded-2xl transition-all text-xl tracking-wide hover:shadow-[0_20px_40px_-10px_rgba(212,165,116,0.4)] hover:-translate-y-0.5">
                    {loading ? "Enviando..." : "Enviar Mensaje →"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
