"use client";

import { useState } from "react";
import QuoteProducts from "@/components/QuoteProducts";
import QuoteVisita from "@/components/QuoteVisita";

export default function QuotePage() {
  const [selected, setSelected] = useState<"products" | "visita" | null>(null);

  if (selected === "products") return <QuoteProducts onBack={() => setSelected(null)} />;
  if (selected === "visita") return <QuoteVisita onBack={() => setSelected(null)} />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ paddingTop: '100px', paddingBottom: '80px' }}>

        {/* Header */}
        <div className="text-center mb-20" style={{ maxWidth: '768px', width: '100%' }}>
          <p className="text-amber-400 uppercase tracking-[0.35em] text-xs font-bold mb-6">
            ELEVA Construcciones
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.05]">
            ¿Qué tipo de
            <br />
            <span className="text-amber-400">cotización</span> necesitas?
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed" style={{ maxWidth: '520px', margin: '0 auto' }}>
            Selecciona la opción que mejor se adapta a tu proyecto y te ayudamos a obtener el mejor presupuesto.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6" style={{ maxWidth: '1024px', width: '100%' }}>

          {/* Opción 1: Productos */}
          <button
            onClick={() => setSelected("products")}
            className="group relative bg-white/[0.04] border border-white/10 rounded-3xl text-left hover:bg-white/[0.08] hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-10px_rgba(251,191,36,0.15)] flex flex-col"
            style={{ padding: '40px' }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
                Opción 1
              </span>
              <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center group-hover:bg-amber-400/20 group-hover:border-amber-400/40 transition-all duration-300">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Cotización de<br />Productos
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Cotiza directamente desde nuestro catálogo. Ideal si ya sabes qué productos necesitas para tu proyecto.
            </p>

            <ul className="space-y-4 mb-12 flex-1">
              {[
                "Cielos americanos y falsos",
                "Revestimientos y pisos",
                "Materiales de construcción",
                "Presupuesto rápido y directo",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <span className="text-amber-400 font-semibold text-sm">Comenzar cotización</span>
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 group-hover:bg-amber-400 flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 text-amber-400 group-hover:text-slate-900 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Opción 2: Visita a Terreno */}
          <button
            onClick={() => setSelected("visita")}
            className="group relative bg-white/[0.04] border border-white/10 rounded-3xl text-left hover:bg-white/[0.08] hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-10px_rgba(96,165,250,0.15)] flex flex-col"
            style={{ padding: '40px' }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400/80 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-full">
                Opción 2
              </span>
              <div className="w-12 h-12 bg-blue-400/10 border border-blue-400/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Visita a<br />Terreno
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Agenda una visita técnica a tu obra para una cotización precisa y personalizada según tus necesidades reales.
            </p>

            <ul className="space-y-4 mb-12 flex-1">
              {[
                "Evaluación técnica en sitio",
                "Medición de recintos y sectores",
                "Análisis de condiciones del lugar",
                "Cotización detallada post-visita",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-400/15 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <span className="text-blue-400 font-semibold text-sm">Solicitar visita</span>
              <div className="w-9 h-9 rounded-xl bg-blue-400/10 group-hover:bg-blue-400 flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-slate-600 text-sm mt-14">
          ¿Tienes dudas?{" "}
          <a href="/contacto" className="text-slate-400 hover:text-amber-400 transition-colors underline underline-offset-4">
            Contáctanos directamente
          </a>
        </p>

      </div>
    </main>
  );
}