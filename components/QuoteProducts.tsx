"use client";

import { useState } from "react";
import { products } from "@/lib/data";

interface Item {
  id: string;
  productId: string;
  cantidad: string;
  unidad: string;
  observaciones: string;
}

const INPUT = "w-full bg-transparent border-0 border-b-2 border-slate-600 px-0 py-3 text-white text-base placeholder-slate-500 focus:outline-none focus:border-[#d4a574] transition-colors duration-200";
const LABEL = "block text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4a574] mb-2";

const SectionHeader = ({ num, title, subtitle }: { num: number; title: string; subtitle: string }) => (
  <div className="flex items-start gap-5 pb-6 mb-2" style={{ borderBottom: '1px solid rgba(212,165,116,0.2)' }}>
    <div style={{ width: '36px', height: '36px', background: '#d4a574', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span className="text-white font-black text-sm">{num}</span>
    </div>
    <div>
      <h3 className="text-white font-black text-lg leading-tight">{title}</h3>
      <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
    </div>
  </div>
);

export default function QuoteProducts({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [contact, setContact] = useState({ name: "", empresa: "", email: "", phone: "", direccion: "", fecha: "" });
  const [items, setItems] = useState<Item[]>([
    { id: crypto.randomUUID(), productId: "", cantidad: "", unidad: "m²", observaciones: "" }
  ]);
  const [notas, setNotas] = useState("");

  const setC = (k: string, v: string) => setContact(p => ({ ...p, [k]: v }));

  const addItem = () => setItems(p => [...p, { id: crypto.randomUUID(), productId: "", cantidad: "", unidad: "m²", observaciones: "" }]);
  const removeItem = (id: string) => setItems(p => p.filter(i => i.id !== id));
  const updateItem = (id: string, k: keyof Item, v: string) => setItems(p => p.map(i => i.id === id ? { ...i, [k]: v } : i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "products", contact, items, notas }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Hubo un error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0f1e3d] flex items-center justify-center px-8">
        <div className="text-center" style={{ maxWidth: '480px' }}>
          <div style={{ width: '72px', height: '72px', border: '2px solid #d4a574', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <svg className="w-9 h-9 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-3">¡Cotización enviada!</h2>
          <p className="text-slate-400 mb-10">Revisaremos tu solicitud y te contactaremos pronto con el presupuesto.</p>
          <button onClick={onBack} className="text-white font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #d4a574, #c89563)', padding: '14px 40px', borderRadius: '4px', fontSize: '12px' }}>
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1e3d]" style={{ paddingBottom: '100px' }}>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'linear-gradient(180deg, #060d1a 0%, #0f1e3d 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px' }} className="text-center">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-[#d4a574] transition-colors text-sm mb-10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
          <p className="text-[#d4a574] text-[11px] font-bold uppercase tracking-[0.3em] mb-4">Cotización de Productos</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            Solicitar <span className="text-[#d4a574]">Presupuesto</span>
          </h1>
          <div style={{ width: '48px', height: '3px', background: '#d4a574', margin: '0 auto' }} />
        </div>
      </section>

      {/* Form */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 40px 0' }}>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Sección 1 */}
          <div className="space-y-8 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <SectionHeader num={1} title="Datos de Contacto" subtitle="Información para coordinar tu cotización" />
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 pt-2">
              <div><label className={LABEL}>Nombre completo *</label><input required value={contact.name} onChange={e => setC("name", e.target.value)} placeholder="Tu nombre" className={INPUT} /></div>
              <div><label className={LABEL}>Empresa</label><input value={contact.empresa} onChange={e => setC("empresa", e.target.value)} placeholder="Nombre de la empresa (opcional)" className={INPUT} /></div>
              <div><label className={LABEL}>Email *</label><input required type="email" value={contact.email} onChange={e => setC("email", e.target.value)} placeholder="correo@ejemplo.com" className={INPUT} /></div>
              <div><label className={LABEL}>Teléfono *</label><input required value={contact.phone} onChange={e => setC("phone", e.target.value)} placeholder="+56 9 1234 5678" className={INPUT} /></div>
              <div><label className={LABEL}>Dirección del proyecto</label><input value={contact.direccion} onChange={e => setC("direccion", e.target.value)} placeholder="Dirección de la obra" className={INPUT} /></div>
              <div><label className={LABEL}>Fecha requerida</label><input type="date" value={contact.fecha} onChange={e => setC("fecha", e.target.value)} className={INPUT} /></div>
            </div>
          </div>

          {/* Sección 2 */}
          <div className="space-y-8 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <SectionHeader num={2} title="Productos Requeridos" subtitle="Selecciona los productos y cantidades que necesitas" />

            <div className="space-y-6 pt-2">
              {/* Header columnas */}
              <div className="grid grid-cols-12 gap-4 hidden md:grid">
                {["Producto", "Cantidad", "Unidad", "Observaciones", ""].map((h, i) => (
                  <div key={i} className={`text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ${i === 0 ? "col-span-4" : i === 1 ? "col-span-2" : i === 2 ? "col-span-2" : i === 3 ? "col-span-3" : "col-span-1"}`}>{h}</div>
                ))}
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid md:grid-cols-12 gap-4 items-end pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="md:col-span-4">
                    <select value={item.productId} onChange={e => updateItem(item.id, "productId", e.target.value)}
                      className="w-full bg-transparent border-b-2 border-slate-600 py-3 text-white text-sm focus:outline-none focus:border-[#d4a574] transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '16px', paddingRight: '24px' }}>
                      <option value="" style={{ background: '#0f1e3d' }}>Seleccionar producto...</option>
                      {products.map(p => <option key={p.id} value={p.id} style={{ background: '#0f1e3d' }}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <input type="number" min="0" step="1" value={item.cantidad} onChange={e => updateItem(item.id, "cantidad", e.target.value)}
                      placeholder="0" className="w-full bg-transparent border-b-2 border-slate-600 py-3 text-white text-sm text-center placeholder-slate-500 focus:outline-none focus:border-[#d4a574] transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <select value={item.unidad} onChange={e => updateItem(item.id, "unidad", e.target.value)}
                      className="w-full bg-transparent border-b-2 border-slate-600 py-3 text-white text-sm focus:outline-none focus:border-[#d4a574] transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '16px', paddingRight: '24px' }}>
                      {["m²", "ml", "unidad", "paquete"].map(u => <option key={u} value={u} style={{ background: '#0f1e3d' }}>{u}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <input value={item.observaciones} onChange={e => updateItem(item.id, "observaciones", e.target.value)}
                      placeholder="Detalles..." className="w-full bg-transparent border-b-2 border-slate-600 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#d4a574] transition-colors" />
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-red-400 transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button type="button" onClick={addItem} className="flex items-center gap-2 text-[#d4a574] hover:text-amber-300 transition-colors text-sm font-bold uppercase tracking-[0.1em]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Agregar otro producto
              </button>
            </div>
          </div>

          {/* Sección 3 */}
          <div className="space-y-8 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <SectionHeader num={3} title="Información Adicional" subtitle="Detalles que nos ayuden a preparar mejor tu cotización" />
            <div className="pt-2">
              <label className={LABEL}>Notas o comentarios</label>
              <textarea value={notas} onChange={e => setNotas(e.target.value)} rows={4}
                placeholder="Cuéntanos más sobre tu proyecto, requisitos especiales, fechas clave, etc."
                className={`${INPUT} resize-none`} />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm border-l-2 border-red-400 pl-4">{error}</p>}

          <div style={{ paddingTop: '8px' }}>
            <button type="submit" disabled={loading} className="text-white font-black uppercase tracking-[0.15em] disabled:opacity-50 transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #d4a574, #c89563)', padding: '16px 56px', borderRadius: '4px', fontSize: '13px', boxShadow: '0 8px 30px rgba(212,165,116,0.25)' }}>
              {loading ? "Enviando..." : "Enviar Cotización →"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}