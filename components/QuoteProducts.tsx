"use client";

import { useState } from "react";

interface ProductItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  notes: string;
}

const PRODUCTS = [
  { id: "cielo-60x60", name: "Cielo Americano 60x60", unit: "m²" },
  { id: "cielo-60x120", name: "Cielo Americano 60x120", unit: "m²" },
  { id: "revestimiento", name: "Revestimiento de Muro", unit: "m²" },
  { id: "piso", name: "Piso Vinílico / Cerámico", unit: "m²" },
  { id: "estructura", name: "Estructura Metálica", unit: "m²" },
  { id: "otro", name: "Otro (especificar en notas)", unit: "und" },
];

export default function QuoteProducts({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({
    nombre: "", empresa: "", email: "", telefono: "",
    direccion: "", fechaRequerida: "", notas: "",
  });

  const [items, setItems] = useState<ProductItem[]>([
    { id: crypto.randomUUID(), name: "", quantity: "", unit: "m²", notes: "" },
  ]);

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = () =>
    setItems([...items, { id: crypto.randomUUID(), name: "", quantity: "", unit: "m²", notes: "" }]);

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  const updateItem = (id: string, field: keyof ProductItem, value: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "products", form, items }),
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
      <main className="min-h-screen bg-[#0f1e3d] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-28 h-28 bg-[#d4a574]/10 border-2 border-[#d4a574]/40 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-14 h-14 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="w-20 h-1 bg-[#d4a574] mx-auto rounded-full mb-8" />
          <h2 className="text-4xl font-black text-white mb-4">¡Cotización enviada!</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Hemos recibido tu solicitud. Nuestro equipo te contactará a la brevedad con el presupuesto detallado.
          </p>
          <button onClick={onBack}
            className="bg-[#d4a574] hover:bg-[#c89563] text-white font-black px-12 py-4 rounded-2xl transition-all text-base hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5">
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  const inputClass = "w-full bg-[#1a2d5a]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a574]/60 focus:bg-[#1a2d5a] transition-all text-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-[#d4a574] mb-2";

  return (
    <main className="min-h-screen bg-[#0f1e3d]" style={{ paddingBottom: '80px' }}>

      {/* Hero header */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#0f1e3d] pt-12 pb-16 px-6 text-center border-b border-white/5">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#d4a574] mb-10 transition-colors text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-5 py-2 mb-6">
          <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Cotización de Productos</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
          Solicita tu <span className="text-[#d4a574]">Presupuesto</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Completa el formulario y te respondemos a la brevedad con precios y disponibilidad.
        </p>
        <div className="w-20 h-1 bg-[#d4a574] mx-auto rounded-full mt-8" />
      </div>

      {/* Formulario */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Sección 1: Contacto */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                <span className="text-white font-black text-base">1</span>
              </div>
              <div>
                <h3 className="text-white font-black text-xl">Datos de Contacto</h3>
                <p className="text-slate-500 text-sm mt-0.5">Información para coordinar tu cotización</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Nombre completo", key: "nombre", placeholder: "Tu nombre", required: true },
                { label: "Empresa", key: "empresa", placeholder: "Nombre de la empresa (opcional)" },
                { label: "Email", key: "email", placeholder: "correo@ejemplo.com", type: "email", required: true },
                { label: "Teléfono", key: "telefono", placeholder: "+56 9 1234 5678", required: true },
                { label: "Dirección del proyecto", key: "direccion", placeholder: "Dirección de la obra" },
                { label: "Fecha requerida", key: "fechaRequerida", type: "date" },
              ].map(({ label, key, placeholder, type = "text", required }) => (
                <div key={key}>
                  <label className={labelClass}>
                    {label} {required && <span className="text-[#d4a574] normal-case">*</span>}
                  </label>
                  <input
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sección 2: Productos */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                <span className="text-white font-black text-base">2</span>
              </div>
              <div>
                <h3 className="text-white font-black text-xl">Productos Requeridos</h3>
                <p className="text-slate-500 text-sm mt-0.5">Selecciona los productos y cantidades que necesitas</p>
              </div>
            </div>

            {/* Header tabla desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-1 mb-3">
              <div className="col-span-5 text-xs font-bold uppercase tracking-widest text-[#d4a574]">Producto</div>
              <div className="col-span-3 text-xs font-bold uppercase tracking-widest text-[#d4a574]">Cantidad</div>
              <div className="col-span-4 text-xs font-bold uppercase tracking-widest text-[#d4a574]">Observaciones</div>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="bg-[#1a2d5a]/40 border border-white/[0.07] rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-3 md:hidden">
                    <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Producto {idx + 1}</span>
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-12 gap-3 items-center">
                    <div className="md:col-span-5">
                      <select required value={item.name}
                        onChange={(e) => {
                          const p = PRODUCTS.find((p) => p.name === e.target.value);
                          updateItem(item.id, "name", e.target.value);
                          if (p) updateItem(item.id, "unit", p.unit);
                        }}
                        className="w-full bg-[#0f1e3d] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#d4a574]/50 appearance-none cursor-pointer">
                        <option value="">Seleccionar producto...</option>
                        {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-3 flex gap-2">
                      <input type="number" required min="0" placeholder="0"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                        className="flex-1 bg-[#0f1e3d] border border-white/10 rounded-xl px-3 py-3.5 text-white text-sm focus:outline-none focus:border-[#d4a574]/50" />
                      <select value={item.unit}
                        onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                        className="w-20 bg-[#0f1e3d] border border-white/10 rounded-xl px-2 py-3.5 text-white text-sm focus:outline-none focus:border-[#d4a574]/50">
                        <option>m²</option>
                        <option>ml</option>
                        <option>und</option>
                      </select>
                    </div>
                    <div className="md:col-span-4 flex gap-2">
                      <input placeholder="Detalles..." value={item.notes}
                        onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                        className="flex-1 bg-[#0f1e3d] border border-white/10 rounded-xl px-3 py-3.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4a574]/50" />
                      {items.length > 1 && (
                        <button type="button" onClick={() => removeItem(item.id)}
                          className="hidden md:flex w-11 h-11 rounded-xl bg-red-500/10 hover:bg-red-500/20 items-center justify-center text-red-400/60 hover:text-red-400 transition-all shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" onClick={addItem}
              className="mt-5 flex items-center gap-2 text-[#d4a574] hover:text-amber-300 text-sm font-bold transition-colors py-2">
              <div className="w-7 h-7 rounded-lg bg-[#d4a574]/15 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              Agregar otro producto
            </button>
          </div>

          {/* Sección 3: Notas */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                <span className="text-white font-black text-base">3</span>
              </div>
              <div>
                <h3 className="text-white font-black text-xl">Información Adicional</h3>
                <p className="text-slate-500 text-sm mt-0.5">Detalles que nos ayuden a preparar mejor tu cotización</p>
              </div>
            </div>
            <label className={labelClass}>Notas o comentarios</label>
            <textarea
              placeholder="Cuéntanos más sobre tu proyecto, requisitos especiales, fechas clave, etc."
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Divisor dorado */}
          <div className="flex justify-center py-2">
            <div className="w-32 h-1 bg-[#d4a574] rounded-full" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#d4a574] hover:bg-[#c89563] disabled:opacity-50 text-white font-black py-5 rounded-2xl transition-all text-xl tracking-wide hover:shadow-[0_20px_40px_-10px_rgba(212,165,116,0.4)] hover:-translate-y-0.5">
            {loading ? "Enviando..." : "Enviar Cotización →"}
          </button>
        </form>
      </div>
    </main>
  );
}
