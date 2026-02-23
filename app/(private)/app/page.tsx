'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ProjectCarousel from '@/components/ProjectCarousel';
import { Grid3X3, Layers, Hammer, Phone, Mail, MapPin, ChevronRight, Star, Shield, Clock } from 'lucide-react';

export default function HomePage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSent(true);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ overflowX: 'hidden' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1a2d5a',
          backgroundImage: "url('/img/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(26,45,90,0.78)' }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem 5rem' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,165,116,0.2)', border: '1px solid rgba(212,165,116,0.4)', borderRadius: '999px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#d4a574', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Estándares de Excelencia</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '700px' }}>
            Elevamos la <span style={{ color: '#d4a574' }}>Calidad</span> de tus Espacios
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '500px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Especialistas en cielos americanos, revestimientos técnicos y terminaciones de alta gama para proyectos residenciales y comerciales.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <a href="/quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#d4a574', color: 'white', fontWeight: 700, padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontSize: '1rem' }}>
              Contactar Asesor
            </a>
            <a href="#proyectos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 700, padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontSize: '1rem' }}>
              Ver Portafolio →
            </a>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[{ value: '+500', label: 'PROYECTOS' }, { value: '15', label: 'AÑOS EXP.' }, { value: '100%', label: 'GARANTÍA' }].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.15em', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4a574]">Nuestra Especialidad</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1a2d5a] mt-4 mb-5">Servicios de Construcción Técnica</h2>
            <div className="w-16 h-1 bg-[#d4a574] mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ServiceCard icon={Grid3X3} title="Cielos Americanos" description="Instalación técnica de cielos falsos acústicos y modulares para optimizar espacios corporativos y residenciales." href="/quote" />
            <ServiceCard icon={Layers} title="Revestimientos y Pisos" description="Soluciones estéticas y duraderas en pisos flotantes, vinílicos y revestimientos de muros de alta gama." href="/quote" />
            <ServiceCard icon={Hammer} title="Proyectos Integrales" description="Ejecución completa de remodelaciones y habilitación de oficinas con estándares de calidad superior." href="/quote" />
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4a574]">¿Por qué Eleva?</span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1a2d5a] mt-4 mb-6 leading-tight">
                Calidad que habla por sí sola
              </h2>
              <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                Más de una década de experiencia nos respalda. Trabajamos con los mejores materiales y un equipo comprometido con cada proyecto.
              </p>
              <div className="space-y-8">
                {[
                  { icon: Shield, title: 'Garantía en todos los trabajos', desc: 'Respaldamos cada instalación con garantía por escrito.' },
                  { icon: Clock, title: 'Cumplimiento de plazos', desc: 'Entregamos en el tiempo acordado, siempre.' },
                  { icon: Star, title: 'Materiales certificados', desc: 'Solo trabajamos con proveedores y materiales de calidad comprobada.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="w-14 h-14 bg-[#1a2d5a]/8 rounded-2xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-[#1a2d5a]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-base">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-10 lg:mt-0">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-[#1a2d5a]">
                <img src="/img/hero-bg.jpg" alt="Trabajo de calidad" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                <div className="text-3xl font-black text-[#d4a574]">+500</div>
                <div className="text-slate-500 text-sm mt-1">Proyectos completados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="proyectos" className="py-32 bg-[#1a2d5a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4a574]">Nuestro trabajo</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3">Proyectos Destacados</h2>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">Conoce algunos de los proyectos que hemos realizado para nuestros clientes.</p>
          </div>
          <ProjectCarousel />
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4a574]">Hablemos</span>
              <h2 className="text-4xl sm:text-5xl font-black text-[#1a2d5a] mt-4 mb-6">Contáctanos</h2>
              <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                ¿Tienes un proyecto en mente? Cuéntanos y te asesoramos sin compromiso.
              </p>
              <div className="space-y-6">
                {[
                  { icon: MapPin, text: 'Talca, Región del Maule, Chile' },
                  { icon: Phone, text: '+56 9 1234 5678', href: 'tel:+56912345678' },
                  { icon: Mail, text: 'contacto@eleva.cl', href: 'mailto:contacto@eleva.cl' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#1a2d5a]/8 rounded-2xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#1a2d5a]" strokeWidth={1.5} />
                    </div>
                    {item.href
                      ? <a href={item.href} className="text-slate-700 hover:text-[#d4a574] transition-colors font-medium text-base">{item.text}</a>
                      : <span className="text-slate-700 font-medium text-base">{item.text}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">¡Mensaje enviado!</h3>
                  <p className="text-slate-500">Te contactaremos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: 'Nombre', key: 'nombre', placeholder: 'Tu nombre completo', required: true },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'correo@ejemplo.com', required: true },
                    { label: 'Teléfono', key: 'telefono', placeholder: '+56 9 ...' },
                  ].map(({ label, key, type = 'text', placeholder, required }) => (
                    <div key={key}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{label}</label>
                      <input type={type} required={required} placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a2d5a]/50 transition-all text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Mensaje</label>
                    <textarea rows={5} placeholder="Cuéntanos sobre tu proyecto..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1a2d5a]/50 transition-all text-sm resize-none"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#1a2d5a] hover:bg-[#1e3a8a] disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all text-base">
                    {loading ? 'Enviando...' : 'Enviar Mensaje →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#d4a574]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">¿Listo para tu proyecto?</h2>
          <p className="text-amber-100 text-xl mb-10">Cotiza sin compromiso y recibe una propuesta personalizada.</p>
          <a href="/quote" className="inline-flex items-center gap-2 bg-white text-[#1a2d5a] font-black px-12 py-5 rounded-2xl hover:bg-slate-100 transition-all hover:shadow-xl text-base">
            Solicitar Cotización <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
