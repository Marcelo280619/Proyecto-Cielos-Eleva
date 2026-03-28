'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Home, Wrench, ChevronRight, MapPin, FileText, MessageCircle, Star } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import ProjectCarousel from '@/components/ProjectCarousel';

/* ── DATA ── */
const services = [
  { icon: Layers, title: 'Instalación de Cielos Americanos', description: 'Soluciones profesionales en instalación y mantenimiento de cielos falsos para oficinas y comercios.', href: '/servicios#cielos' },
  { icon: Home,   title: 'Revestimientos y Pisos',           description: 'Venta e instalación de revestimientos y pisos de alta calidad para proyectos de construcción.',    href: '/servicios#revestimientos' },
  { icon: Wrench, title: 'Proyectos de Construcción',        description: 'Ejecutamos proyectos completos de remodelación, renovación y construcción de espacios.',            href: '/servicios#construccion' },
];

const FILTERS = ['Todos', 'Cielos Americanos', 'Revestimientos', 'OCB', 'Pisos'];

const productos = [
  { id: '1', name: 'Panel de Cielo Acústico Blanco', price: 15500, unit: 'paquete 12', image: '/img/productos/panel-blanco.jpg',    stock: 45, category: 'Cielos Americanos' },
  { id: '2', name: 'Panel de Cielo Acústico Beige',  price: 16500, unit: 'paquete 12', image: '/img/productos/panel-beige.jpg',     stock: 32, category: 'Cielos Americanos' },
  { id: '3', name: 'Panel de Cielo Acanalado',       price: 15200, unit: 'm²',         image: '/img/productos/panel-acanalado.jpg', stock: 28, category: 'Cielos Americanos' },
  { id: '4', name: 'Panel PVC Revestimiento Techo',  price: 12900, unit: 'm²',         image: '/img/productos/panel-pvc.jpg',       stock: 0,  category: 'Revestimientos'    },
  { id: '5', name: 'OCB Tablero Estructural',        price: 18900, unit: 'm²',         image: '/img/productos/ocb.jpg',             stock: 15, category: 'OCB'               },
  { id: '6', name: 'Piso Vinílico Click',            price:  9900, unit: 'm²',         image: '/img/productos/piso-vinilico.jpg',   stock: 60, category: 'Pisos'             },
];

const aliados = [
  { logo: '/img/aliados/aliado1.png', nombre: 'Aliado 1' },
  { logo: '/img/aliados/aliado2.png', nombre: 'Aliado 2' },
  { logo: '/img/aliados/aliado3.png', nombre: 'Aliado 3' },
];

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2394a3b8"%3EImagen%3C/text%3E%3C/svg%3E';

/* ── SECTION HEADER ── */
function SectionHeader({ label, title, subtitle, light = false }: {
  label?: string; title: string; subtitle?: string; light?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      {label && (
        <span className="block text-[#d4a574] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
          {label}
        </span>
      )}
      <h2 className="font-black leading-[1.1] tracking-tight"
        style={{ fontSize: 'clamp(1.9rem,3.5vw,2.8rem)', color: light ? '#ffffff' : '#0f172a' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: light ? 'rgba(255,255,255,0.5)' : '#64748b' }}>
          {subtitle}
        </p>
      )}
      <div className="w-12 h-[3px] bg-[#d4a574] rounded-full mx-auto mt-5" />
    </div>
  );
}

/* ── CONTACT CARD INNER BUTTON — matches screenshot style ── */
function ContactBtn({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-black uppercase text-[11px] tracking-[0.12em] px-7 py-3 rounded-full transition-all"
      style={{
        background: 'rgba(255,255,255,0.22)',
        border: '2px solid rgba(255,255,255,0.55)',
        color: '#ffffff',
        backdropFilter: 'blur(4px)',
      }}>
      {label} <ChevronRight className="w-3.5 h-3.5" />
    </span>
  );
}

/* ── PAGE ── */
export default function HomePage() {
  const [imageError, setImageError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredProductos =
    activeFilter === 'Todos'
      ? productos
      : productos.filter((p) => p.category === activeFilter);

  const wrap = 'max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-20';

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative flex items-center overflow-hidden"
        style={{ minHeight: 'min(580px, 75vh)', paddingTop: '64px' }}>

        {!imageError ? (
          <>
            <Image src="/img/hero-bg.jpg" alt="" fill priority quality={90}
              className="object-cover object-center"
              onError={() => setImageError(true)} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(100deg,rgba(10,20,55,0.96) 0%,rgba(12,24,62,0.80) 45%,rgba(15,28,70,0.30) 100%)' }} />
          </>
        ) : (
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg,#0f2151 0%,#1e3a8a 60%,#1e40af 100%)' }} />
        )}

        <div className={`relative z-10 w-full ${wrap} py-16`}>
          <div className="flex items-center justify-between gap-10">

            <div className="w-full max-w-[600px]">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                style={{ background: 'rgba(212,165,116,0.13)', border: '1px solid rgba(212,165,116,0.3)' }}>
                <Star className="w-3 h-3 text-[#d4a574]" fill="#d4a574" />
                <span className="text-[#d4a574] text-[10px] font-bold uppercase tracking-[0.2em]">
                  Expertos en cielos y revestimientos
                </span>
              </div>

              <h1 className="text-white font-black uppercase leading-[1.03] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)' }}>
                SOLUCIONES EN<br />CONSTRUCCIÓN<br />
                <span style={{ color: '#d4a574' }}>Y CIELOS</span>
              </h1>

              <p className="text-sm leading-relaxed mb-8 max-w-[440px]"
                style={{ color: 'rgba(255,255,255,0.7)' }}>
                Expertos en instalación y venta de cielos falsos, revestimientos y pisos para todo tipo de proyectos.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/contacto"
                  className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[11px] tracking-[0.12em] px-7 py-3.5 text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#d4a574,#c89563)', boxShadow: '0 4px 18px rgba(212,165,116,0.35)' }}>
                  Contáctanos
                </Link>
                <Link href="/proyectos"
                  className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[11px] tracking-[0.12em] px-7 py-3.5 text-white transition-all hover:bg-white hover:text-[#0f1b3d] hover:-translate-y-0.5"
                  style={{ border: '2px solid rgba(255,255,255,0.45)' }}>
                  Ver Proyectos <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex gap-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  { num: '+500', label: 'Proyectos realizados' },
                  { num: '+10',  label: 'Años de experiencia'  },
                  { num: '100%', label: 'Clientes satisfechos' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[2rem] font-black leading-none" style={{ color: '#d4a574' }}>{s.num}</div>
                    <div className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.48)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block shrink-0 w-44 h-44 xl:w-52 xl:h-52 relative opacity-90 drop-shadow-2xl">
              <Image src="/img/publiclogo.png" alt="ELEVA" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. TRABAJOS REALIZADOS  ← ahora segundo
      ══════════════════════════════════════ */}
      <section id="proyectos" className="py-24" style={{ background: '#1e3a5f' }}>
        <div className={wrap}>
          <SectionHeader
            label="Nuestro portafolio"
            title="Trabajos Realizados"
            subtitle="Cada proyecto refleja nuestro compromiso con la calidad y el detalle. Instalaciones en oficinas, comercios y hogares de toda la región."
            light
          />

          <ProjectCarousel />

          <div className="flex justify-center mt-10">
            <Link href="/proyectos"
              className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[11px] tracking-[0.12em] px-8 py-3.5 text-white transition-all hover:bg-white hover:text-[#1e3a5f] hover:-translate-y-0.5"
              style={{ border: '2px solid rgba(255,255,255,0.45)' }}>
              Ver todos los proyectos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. NUESTROS SERVICIOS
      ══════════════════════════════════════ */}
      <section id="servicios" className="bg-slate-50 py-24">
        <div className={wrap}>
          <SectionHeader label="Lo que hacemos" title="Nuestros Servicios" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {services.map((s, i) => (
              <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} href={s.href} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/servicios"
              className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[11px] tracking-[0.12em] px-8 py-3.5 transition-all hover:bg-[#1e3a8a] hover:text-white hover:-translate-y-0.5"
              style={{ border: '2px solid #1e3a8a', color: '#1e3a8a' }}>
              Ver todos los servicios <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. PRODUCTOS
      ══════════════════════════════════════ */}
      <section id="productos" className="bg-white py-24">
        <div className={wrap}>
          <SectionHeader
            label="Catálogo"
            title="Productos"
            subtitle="Cielos americanos, revestimientos y pisos de alta calidad."
          />

          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="font-black uppercase text-[10px] tracking-[0.14em] px-5 py-2.5 rounded-full border-2 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: active ? '#d4a574' : '#cbd5e1',
                    background:  active ? 'linear-gradient(135deg,#d4a574,#c89563)' : 'transparent',
                    color:       active ? '#fff' : '#64748b',
                    boxShadow:   active ? '0 4px 14px rgba(212,165,116,0.3)' : 'none',
                  }}>
                  {f}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProductos.map((producto) => (
              <div key={producto.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)')}>

                <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: '4/3' }}>
                  <Image src={producto.image} alt={producto.name} fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
                  {producto.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.72)' }}>
                      <span className="text-white text-xs font-bold px-4 py-1.5 rounded-full"
                        style={{ background: '#d4a574' }}>Próximamente</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5 gap-3">
                  <p className="font-bold text-[15px] leading-snug" style={{ color: '#0f172a' }}>
                    {producto.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] font-black" style={{ color: '#d4a574' }}>
                      ${producto.price.toLocaleString('es-CL')}
                    </span>
                    <span className="text-[12px]" style={{ color: '#94a3b8' }}>/{producto.unit}</span>
                  </div>

                  {producto.stock > 0 ? (
                    <>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: '#10b981' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        En Stock · {producto.stock} un
                      </div>
                      <button className="mt-auto w-full text-white font-black uppercase text-[10px] tracking-[0.14em] py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg,#1e3a8a,#1e40af)' }}>
                        Agregar al carrito
                      </button>
                    </>
                  ) : (
                    <button disabled className="mt-auto w-full text-[13px] font-semibold py-3 rounded-full cursor-not-allowed"
                      style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                      Próximamente
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/productos"
              className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[11px] tracking-[0.12em] px-10 py-4 text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#d4a574,#c89563)', boxShadow: '0 4px 18px rgba(212,165,116,0.3)' }}>
              Ver más productos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. CONTÁCTENOS — botones estilo screenshot
      ══════════════════════════════════════ */}
      <section id="contacto" className="py-24" style={{ background: '#f8fafc' }}>
        <div className={wrap}>
          <SectionHeader
            label="Estamos para ayudarte"
            title="Contáctenos"
            subtitle="Elige cómo quieres iniciar tu proyecto con nosotros."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px] mx-auto">

            {/* Visita a Terreno */}
            <Link href="/contacto?tipo=visita"
              className="group flex flex-col items-center text-center gap-6 rounded-2xl p-10 text-white no-underline transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'linear-gradient(145deg,#1e3a8a,#1e40af)', boxShadow: '0 10px 36px rgba(30,58,138,0.22)' }}>
              {/* Icon circle */}
              <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.18)' }}>
                <MapPin className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-black uppercase tracking-[0.1em] mb-3">
                  Visita a Terreno
                </p>
                <p className="text-[13px] leading-relaxed" style={{ opacity: 0.88 }}>
                  Agendamos una visita presencial para evaluar tu proyecto en sitio y entregarte la mejor solución.
                </p>
              </div>
              {/* Button — matches screenshot: pill with white semi-transparent bg */}
              <div className="inline-flex items-center gap-2 font-black uppercase text-[11px] tracking-[0.12em] px-6 py-3 rounded-full transition-all group-hover:bg-white/30"
                style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.6)' }}>
                Agendar visita <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Cotizar */}
            <Link href="/quote"
              className="group flex flex-col items-center text-center gap-6 rounded-2xl p-10 text-white no-underline transition-all duration-300 hover:-translate-y-2"
              style={{ background: 'linear-gradient(145deg,#d4a574,#c89563)', boxShadow: '0 10px 36px rgba(212,165,116,0.30)' }}>
              <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.18)' }}>
                <FileText className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-black uppercase tracking-[0.1em] mb-3">Cotizar</p>
                <p className="text-[13px] leading-relaxed" style={{ opacity: 0.88 }}>
                  Solicita una cotización personalizada para tu proyecto sin compromiso. Respondemos en menos de 24 h.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-black uppercase text-[11px] tracking-[0.12em] px-6 py-3 rounded-full transition-all group-hover:bg-white/30"
                style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.6)' }}>
                Solicitar cotización <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* WhatsApp */}
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-6 rounded-2xl p-10 text-white no-underline transition-all duration-300 hover:-translate-y-2"
              style={{ background: '#25D366', boxShadow: '0 10px 36px rgba(37,211,102,0.24)' }}>
              <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.18)' }}>
                <MessageCircle className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-black uppercase tracking-[0.1em] mb-3">WhatsApp</p>
                <p className="text-[13px] leading-relaxed" style={{ opacity: 0.88 }}>
                  Escríbenos directamente por WhatsApp y te respondemos al instante, todos los días.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-black uppercase text-[11px] tracking-[0.12em] px-6 py-3 rounded-full transition-all group-hover:bg-white/30"
                style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.6)' }}>
                Abrir WhatsApp <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. ALIADOS
      ══════════════════════════════════════ */}
      <section id="aliados" className="bg-white py-24">
        <div className={wrap}>
          <SectionHeader label="Quienes confían en nosotros" title="Aliados" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[820px] mx-auto">
            {aliados.map((aliado, i) => (
              <div key={i}
                className="flex flex-col items-center gap-4 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid #e2e8f0', background: '#fff' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#d4a574'; el.style.boxShadow = '0 10px 28px rgba(212,165,116,0.13)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#e2e8f0'; el.style.boxShadow = 'none'; }}>
                <div className="relative w-full h-16">
                  <Image src={aliado.logo} alt={aliado.nombre} fill className="object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <span className="text-[13px] font-semibold" style={{ color: '#64748b' }}>{aliado.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}