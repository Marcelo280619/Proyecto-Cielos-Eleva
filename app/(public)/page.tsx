'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Home, Wrench, ChevronRight, Star } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import ProjectCarousel from '@/components/ProjectCarousel';

export default function HomePage() {
  const [imageError, setImageError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const services = [
    { icon: Layers, title: 'Instalación de Cielos Americanos', description: 'Soluciones profesionales en instalación y mantenimiento de cielos falsos para oficinas y comercios.', href: '/servicios#cielos' },
    { icon: Home, title: 'Revestimientos y Pisos', description: 'Venta e instalación de revestimientos y pisos de alta calidad para proyectos de construcción.', href: '/servicios#revestimientos' },
    { icon: Wrench, title: 'Proyectos de Construcción', description: 'Ejecutamos proyectos completos de remodelación, renovación y construcción de espacios.', href: '/servicios#construccion' },
  ];

  const filters = ['Todos', 'Cielos Americanos', 'Revestimientos', 'Pisos'];

  const productos = [
    { id: '1', name: 'Panel de Cielo Acústico Blanco', price: 15500, unit: 'paquete 12', image: '/img/productos/panel-blanco.jpg', stock: 45, category: 'Cielos Americanos' },
    { id: '2', name: 'Panel de Cielo Acústico Beige', price: 16500, unit: 'paquete 12', image: '/img/productos/panel-beige.jpg', stock: 32, category: 'Cielos Americanos' },
    { id: '3', name: 'Panel de Cielo Acanalado', price: 15200, unit: 'm²', image: '/img/productos/panel-acanalado.jpg', stock: 28, category: 'Cielos Americanos' },
    { id: '4', name: 'Panel PVC Revestimiento Techo', price: 12900, unit: 'm²', image: '/img/productos/panel-pvc.jpg', stock: 0, category: 'Revestimientos' },
  ];

  const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8"%3EProducto%3C/text%3E%3C/svg%3E';
  const filteredProductos = activeFilter === 'Todos' ? productos : productos.filter(p => p.category === activeFilter);

  const containerStyle = { maxWidth: '1280px', margin: '0 auto', padding: '0 64px' };

  return (
    <main className="pt-16" style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {!imageError ? (
          <>
            <Image src="/img/hero-bg.jpg" alt="Cielos americanos" fill priority quality={90}
              className="object-cover" sizes="100vw" onError={() => setImageError(true)} />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-slate-900/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent z-10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2151] via-[#1e3a8a] to-slate-800" />
        )}

        <div className="relative z-20 w-full" style={{ ...containerStyle, paddingTop: '144px', paddingBottom: '144px' }}>
          <div className="flex items-center justify-between gap-16">
            <div style={{ maxWidth: '672px' }}>
              <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-4 py-2 mb-10">
                <Star className="w-3 h-3 text-[#d4a574]" fill="currentColor" />
                <span className="text-[#d4a574] text-sm font-bold uppercase tracking-widest">Expertos en cielos y revestimientos</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight">
                SOLUCIONES EN<br />CONSTRUCCIÓN<br />
                <span className="text-[#d4a574]">Y CIELOS</span>
              </h1>

              <p className="text-lg text-slate-300 mb-12 leading-relaxed" style={{ maxWidth: '512px' }}>
                Expertos en instalación y venta de cielos falsos, revestimientos y pisos para todo tipo de proyectos.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contacto" className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest transition-all hover:shadow-[0_8px_30px_-4px_rgba(212,165,116,0.5)] hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #c89563 100%)', borderRadius: '9999px', padding: '14px 32px', fontSize: '13px', letterSpacing: '0.1em' }}>
                  Contáctanos
                </Link>
                <Link href="/proyectos" className="inline-flex items-center gap-2 bg-transparent hover:bg-white text-white hover:text-slate-900 font-black uppercase tracking-widest transition-all hover:-translate-y-0.5" style={{ border: '2px solid rgba(255,255,255,0.6)', borderRadius: '9999px', padding: '14px 32px', fontSize: '13px', letterSpacing: '0.1em' }}>
                  Ver Proyectos <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex gap-12 mt-16 pt-12 border-t border-white/10">
                {[{ num: '+500', label: 'Proyectos realizados' }, { num: '+10', label: 'Años de experiencia' }, { num: '100%', label: 'Clientes satisfechos' }].map((s) => (
                  <div key={s.label}>
                    <div className="text-4xl font-black text-[#d4a574]">{s.num}</div>
                    <div className="text-slate-400 text-sm mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center shrink-0">
              <div className="relative w-72 h-72 xl:w-80 xl:h-80 drop-shadow-2xl">
                <Image src="/img/publiclogo.png" alt="ELEVA" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-8">
          <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" />
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="bg-slate-50" style={{ padding: '120px 0 140px' }}>
        <div style={containerStyle}>

          <div className="text-center mb-24">
            <p className="text-[#d4a574] font-bold uppercase tracking-widest text-base mb-5">Lo que hacemos</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">Nuestros Servicios</h2>
            <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" style={{ margin: '0 auto' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((s, i) => <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} href={s.href} />)}
          </div>

          <div className="text-center mt-16">
            <Link href="/servicios" className="inline-flex items-center gap-3 bg-transparent hover:bg-slate-900 text-slate-900 hover:text-white font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5" style={{ border: '2px solid #1e3a8a', borderRadius: '9999px', padding: '14px 36px' }}>
              Ver todos los servicios <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" />
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="proyectos" className="bg-[#1e3a5f]" style={{ padding: '120px 0 140px' }}>
        <div style={containerStyle}>

          <div className="text-center mb-24">
            <p className="text-[#d4a574] font-bold uppercase tracking-widest text-base mb-5">Nuestro portafolio</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Trabajos Realizados</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8" style={{ maxWidth: '448px', margin: '0 auto 32px' }}>Proyectos destacados en cielos, revestimientos y pisos.</p>
            <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" style={{ margin: '0 auto' }} />
          </div>

          <ProjectCarousel />

          <div className="text-center mt-16">
            <Link href="/proyectos" className="inline-flex items-center gap-3 bg-transparent hover:bg-white text-white hover:text-[#1e3a5f] font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5" style={{ border: '2px solid rgba(255,255,255,0.6)', borderRadius: '9999px', padding: '14px 36px' }}>
              Ver todos los proyectos <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" />
        </div>
      </section>

      {/* ── PRODUCTOS ── */}
      <section id="productos" className="bg-white" style={{ padding: '120px 0 140px' }}>
        <div style={containerStyle}>

          <div className="text-center mb-16">
            <p className="text-[#d4a574] font-bold uppercase tracking-widest text-base mb-5">Catálogo</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Nuestros Productos</h2>
            <p className="text-slate-500 text-base mb-8">Cielos americanos, revestimientos y pisos de alta calidad.</p>
            <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" style={{ margin: '0 auto' }} />
          </div>

          <div className="flex gap-3 mb-14 flex-wrap justify-center">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className="font-black uppercase tracking-widest transition-all hover:-translate-y-0.5"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: activeFilter === f ? '2px solid #d4a574' : '2px solid #cbd5e1',
                  background: activeFilter === f ? 'linear-gradient(135deg, #d4a574 0%, #c89563 100%)' : 'transparent',
                  color: activeFilter === f ? '#fff' : '#64748b',
                  boxShadow: activeFilter === f ? '0 4px 14px rgba(212,165,116,0.3)' : 'none',
                }}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProductos.map((producto) => (
              <div key={producto.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <Image src={producto.image} alt={producto.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
                  {producto.stock === 0 && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <span className="bg-[#d4a574] text-white text-xs font-bold px-3 py-1.5 rounded-full">Próximamente</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-4 line-clamp-2 min-h-[40px]">{producto.name}</h3>
                  <div className="mt-auto space-y-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#d4a574]">${producto.price.toLocaleString('es-CL')}</span>
                      <span className="text-slate-400 text-xs">/{producto.unit}</span>
                    </div>
                    {producto.stock > 0 ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-emerald-600 text-xs font-semibold">En Stock · {producto.stock} un</span>
                        </div>
                        <button className="w-full text-white font-black uppercase tracking-widest py-3 rounded-full transition-all text-xs hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', letterSpacing: '0.1em' }}>
                          Agregar al carrito
                        </button>
                      </>
                    ) : (
                      <button disabled className="w-full bg-slate-100 text-slate-400 font-semibold py-3 rounded-xl text-sm cursor-not-allowed mt-6">Próximamente</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/productos" className="inline-flex items-center gap-3 bg-transparent hover:bg-slate-900 text-slate-900 hover:text-white font-bold uppercase tracking-widest text-sm transition-all duration-200 hover:-translate-y-0.5" style={{ border: '2px solid #1e3a8a', borderRadius: '9999px', padding: '14px 36px' }}>
              Ver catálogo completo <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <div className="w-32 h-1.5 bg-[#d4a574] rounded-full" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-950 relative overflow-hidden" style={{ padding: '120px 0' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,165,116,0.12),transparent)]" />
        <div className="relative z-10 text-center" style={{ maxWidth: '768px', margin: '0 auto', padding: '0 32px' }}>
          <p className="text-[#d4a574] font-bold uppercase tracking-widest text-base mb-6">¿Listo para comenzar?</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Transforma tu espacio<br /><span className="text-[#d4a574]">con ELEVA</span>
          </h2>
          <div className="w-32 h-1.5 bg-[#d4a574] rounded-full mb-10" style={{ margin: '0 auto 40px' }} />
          <p className="text-slate-400 text-base mb-14 leading-relaxed" style={{ maxWidth: '448px', margin: '0 auto 56px' }}>
            Contáctanos y recibe una cotización personalizada para tu proyecto.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest transition-all hover:shadow-[0_8px_30px_-4px_rgba(212,165,116,0.4)] hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #c89563 100%)', borderRadius: '9999px', padding: '14px 36px', fontSize: '13px', letterSpacing: '0.1em' }}>
              Solicitar Cotización
            </Link>
            <Link href="/contacto" className="inline-flex items-center gap-2 bg-transparent hover:bg-white text-white hover:text-slate-950 font-black uppercase tracking-widest transition-all hover:-translate-y-0.5" style={{ border: '2px solid rgba(255,255,255,0.5)', borderRadius: '9999px', padding: '14px 36px', fontSize: '13px', letterSpacing: '0.1em' }}>
              Contactar directamente
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}