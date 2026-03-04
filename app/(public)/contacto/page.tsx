"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const INPUT = [
  "w-full bg-transparent border-0 border-b-2 border-slate-600",
  "px-0 py-3 text-white text-base placeholder-slate-500",
  "focus:outline-none focus:border-[#d4a574] transition-colors duration-200",
].join(" ");

const LABEL = "block text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4a574] mb-2";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setOk(null); setErr(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => null);
      setErr(j?.error || "No se pudo enviar.");
      return;
    }
    setOk("Mensaje enviado. Te contactaremos pronto.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <main className="min-h-screen bg-[#0f1e3d]">

      {/* HERO */}
      <section style={{ paddingTop: '120px', paddingBottom: '40px', background: 'linear-gradient(180deg, #060d1a 0%, #0f1e3d 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }} className="text-center">
          <p className="text-[#d4a574] text-[11px] font-bold uppercase tracking-[0.3em] mb-5">Contáctanos</p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Hablemos de tu<br /><span className="text-[#d4a574]">Proyecto</span>
          </h1>
          <div style={{ width: '48px', height: '3px', background: '#d4a574', margin: '0 auto' }} />
        </div>
      </section>

      {/* CONTENIDO */}
      <section style={{ padding: '48px 0 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
          <div className="grid lg:grid-cols-5 gap-20">

            {/* COLUMNA IZQUIERDA */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-white font-black text-2xl mb-3">Información de contacto</h2>
                <p className="text-slate-400 leading-relaxed text-sm">Cuéntanos qué necesitas y te respondemos a la brevedad.</p>
              </div>

              <div style={{ width: '40px', height: '2px', background: '#d4a574' }} />

              <div className="space-y-8">
                {[
                  { icon: MapPin, label: "Ubicación", text: "Talca, Región del Maule, Chile" },
                  { icon: Phone, label: "Teléfono", text: "+56 9 1234 5678", href: "tel:+56912345678" },
                  { icon: Mail, label: "Correo", text: "contacto@eleva.cl", href: "mailto:contacto@eleva.cl" },
                ].map((item) => (
                  <div key={item.text} className="flex gap-5">
                    <div style={{ width: '44px', height: '44px', border: '1px solid rgba(212,165,116,0.25)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon className="w-5 h-5 text-[#d4a574]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4a574] mb-1">{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-slate-200 hover:text-white transition-colors text-sm">{item.text}</a>
                        : <span className="text-slate-200 text-sm">{item.text}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderLeft: '2px solid #d4a574', paddingLeft: '20px' }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4a574] mb-4">Horario de atención</p>
                <div className="space-y-3">
                  {[
                    { day: "Lunes – Viernes", hours: "08:00 – 18:00" },
                    { day: "Sábado", hours: "09:00 – 13:00" },
                  ].map(h => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <span className="text-slate-400 text-sm">{h.day}</span>
                      <span className="text-white text-sm font-bold">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="lg:col-span-3">
              {ok ? (
                <div className="flex flex-col items-center justify-center text-center" style={{ padding: '80px 0' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #d4a574', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                    <svg className="w-9 h-9 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">¡Mensaje enviado!</h3>
                  <p className="text-slate-400">{ok}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-10">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className={LABEL}>Nombre completo *</label>
                      <input name="name" required placeholder="Tu nombre" className={INPUT} />
                    </div>
                    <div>
                      <label className={LABEL}>Teléfono</label>
                      <input name="phone" placeholder="+56 9 1234 5678" className={INPUT} />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL}>Correo electrónico *</label>
                    <input name="email" type="email" required placeholder="correo@ejemplo.com" className={INPUT} />
                  </div>

                  <div>
                    <label className={LABEL}>Mensaje *</label>
                    <textarea name="message" required rows={5} placeholder="Cuéntanos sobre tu proyecto..." className={`${INPUT} resize-none`} />
                  </div>

                  {err && <p className="text-red-400 text-sm border-l-2 border-red-400 pl-4">{err}</p>}

                  <button
                    disabled={loading}
                    className="text-white font-black uppercase tracking-[0.15em] disabled:opacity-50 transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #d4a574, #c89563)', padding: '16px 48px', borderRadius: '4px', fontSize: '13px', boxShadow: '0 8px 30px rgba(212,165,116,0.25)' }}
                  >
                    {loading ? "Enviando..." : "Enviar Mensaje →"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}