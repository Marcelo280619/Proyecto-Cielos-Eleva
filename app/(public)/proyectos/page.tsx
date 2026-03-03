import Image from "next/image";
import { projects } from "@/lib/data";

export default function ProyectosPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero header */}
      <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 border-b border-white/5" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 32px' }} className="flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-5 py-2 mb-6">
            <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Portafolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Nuestros <span className="text-[#d4a574]">Proyectos</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed" style={{ maxWidth: '576px' }}>
            Trabajos realizados por ELEVA en cielos americanos, revestimientos y construcción.
          </p>
          <div className="w-20 h-1 bg-[#d4a574] rounded-full mt-8" />
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '60px 32px 80px' }}>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {p.subtitle && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#d4a574] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                      {p.subtitle}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="font-black text-slate-900 text-base mb-1">{p.title}</div>
                {p.location && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <svg className="w-3.5 h-3.5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {p.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}