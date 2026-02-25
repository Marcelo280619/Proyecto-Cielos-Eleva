"use client";

import { useState } from "react";

interface Recinto {
  id: string;
  recinto: string;
  largo: string;
  ancho: string;
  observaciones: string;
}

const STEPS = [
  { num: 1, label: "Contacto" },
  { num: 2, label: "Servicios" },
  { num: 3, label: "Recintos" },
  { num: 4, label: "Adicional" },
];

export default function QuoteVisita({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    nombreEmpresa: "", direccionObra: "", contactoNombre: "", contactoFono: "",
    tieneCotizacion: "", numeroCotizacion: "",
    tipoCielo: "", modulacion: "", otrosServicios: "", cantidad: "",
    desarme: "", retiroEscombros: "", fechaInstalacion: "", horarioDesde: "", horarioHasta: "",
    tipoMuros: "", tipoCubierta: "", alturaLoza: "",
    planosCielo: "", planosLuminaria: "",
    restriccionHorario: "", obsHorario: "", restriccionRuido: "", obsRuido: "",
    notasAdicionales: "",
  });

  const [recintos, setRecintos] = useState<Recinto[]>([
    { id: crypto.randomUUID(), recinto: "", largo: "", ancho: "", observaciones: "" },
  ]);

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const addRecinto = () =>
    setRecintos([...recintos, { id: crypto.randomUUID(), recinto: "", largo: "", ancho: "", observaciones: "" }]);

  const removeRecinto = (id: string) => setRecintos(recintos.filter((r) => r.id !== id));

  const updateRecinto = (id: string, field: keyof Recinto, value: string) =>
    setRecintos(recintos.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const calcM2 = (r: Recinto) => {
    const l = parseFloat(r.largo), a = parseFloat(r.ancho);
    return !isNaN(l) && !isNaN(a) ? (l * a).toFixed(2) : "-";
  };

  const totalM2 = recintos.reduce((sum, r) => {
    const l = parseFloat(r.largo), a = parseFloat(r.ancho);
    return sum + (isNaN(l) || isNaN(a) ? 0 : l * a);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visita", form, recintos }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Hubo un error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[#1a2d5a]/80 border border-white/15 rounded-lg px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a574]/70 focus:bg-[#1a2d5a] transition-all text-base";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-[#d4a574] mb-3";

  const radioClass = (active: boolean) =>
    `flex items-center gap-3 cursor-pointer px-5 py-3 rounded-xl border transition-all ${
      active
        ? "border-[#d4a574]/50 bg-[#d4a574]/10 text-white"
        : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
    }`;

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0f1e3d] flex items-center justify-center px-6" style={{ paddingTop: '80px' }}>
        <div style={{ maxWidth: '512px', textAlign: 'center' }}>
          <div className="w-28 h-28 bg-[#d4a574]/10 border-2 border-[#d4a574]/40 rounded-full flex items-center justify-center mb-8" style={{ margin: '0 auto 32px' }}>
            <svg className="w-14 h-14 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="w-20 h-1 bg-[#d4a574] rounded-full mb-8" style={{ margin: '0 auto 32px' }} />
          <h2 className="text-4xl font-black text-white mb-4">¡Solicitud enviada!</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Recibimos tu formulario. Nuestro equipo técnico coordinará la visita contigo a la brevedad.
          </p>
          <button onClick={onBack}
            className="bg-[#d4a574] hover:bg-[#c89563] text-white font-black px-12 py-4 rounded-2xl transition-all text-base hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5">
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1e3d] w-full" style={{ paddingBottom: '80px' }}>

      {/* Hero header */}
      <div className="w-full bg-gradient-to-b from-[#0a1628] to-[#0f1e3d] border-b border-white/5" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 32px' }} className="flex flex-col items-center text-center">
          <button onClick={onBack}
            className="self-start inline-flex items-center gap-2 text-slate-500 hover:text-[#d4a574] mb-10 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>

          <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-5 py-2 mb-6">
            <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Visita a Terreno</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Solicitar <span className="text-[#d4a574]">Visita Técnica</span>
          </h1>
          <p className="text-slate-400 text-lg" style={{ maxWidth: '576px' }}>
            Completa el formulario y coordinaremos una visita a tu obra a la brevedad.
          </p>
          <div className="w-20 h-1 bg-[#d4a574] rounded-full mt-8" />
        </div>
      </div>

      {/* Formulario */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '60px 32px' }}>

        {/* Progress Steps */}
        <div className="flex items-center gap-0 mb-12 bg-white/[0.03] border border-white/10 rounded-2xl p-2">
          {STEPS.map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-2.5 flex-1 px-4 py-3 rounded-xl transition-all duration-200 ${
                  step === s.num
                    ? "bg-[#d4a574] text-white"
                    : s.num < step
                    ? "text-[#d4a574] hover:bg-white/5 cursor-pointer"
                    : "text-slate-600 cursor-default"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  step === s.num ? "bg-white/20 text-white" :
                  s.num < step ? "bg-[#d4a574]/20 text-[#d4a574]" : "bg-white/5 text-slate-600"
                }`}>
                  {s.num < step ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.num}
                </div>
                <span className="text-sm font-bold hidden sm:block">{s.label}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className={`w-px h-5 shrink-0 ${s.num < step ? "bg-[#d4a574]/30" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-base">1</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">Información de Contacto</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Datos del cliente y la obra</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className={labelClass}>Nombre Empresa o Cliente <span className="text-[#d4a574] normal-case">*</span></label>
                  <input required className={inputClass} placeholder="Ej: Constructora XYZ"
                    value={form.nombreEmpresa} onChange={e => set("nombreEmpresa", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Dirección de la Obra <span className="text-[#d4a574] normal-case">*</span></label>
                  <input required className={inputClass} placeholder="Calle, número, comuna, ciudad"
                    value={form.direccionObra} onChange={e => set("direccionObra", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Nombre del Contacto <span className="text-[#d4a574] normal-case">*</span></label>
                  <input required className={inputClass} placeholder="Nombre del encargado"
                    value={form.contactoNombre} onChange={e => set("contactoNombre", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Teléfono de Contacto <span className="text-[#d4a574] normal-case">*</span></label>
                  <input required className={inputClass} placeholder="+56 9 1234 5678"
                    value={form.contactoFono} onChange={e => set("contactoFono", e.target.value)} />
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <label className={labelClass}>¿Existe cotización previa?</label>
                <div className="flex gap-4 mt-2 mb-4">
                  {["Sí", "No"].map(opt => (
                    <label key={opt} className={radioClass(form.tieneCotizacion === opt)}>
                      <input type="radio" name="tieneCotizacion" value={opt}
                        checked={form.tieneCotizacion === opt}
                        onChange={() => set("tieneCotizacion", opt)}
                        className="accent-[#d4a574] w-4 h-4" />
                      <span className="font-semibold text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
                {form.tieneCotizacion === "Sí" && (
                  <div>
                    <label className={labelClass}>N° de Cotización</label>
                    <input className={inputClass} placeholder="Número de cotización existente"
                      value={form.numeroCotizacion} onChange={e => set("numeroCotizacion", e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-base">2</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">Servicios Requeridos</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Tipo de trabajo y características del proyecto</p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Tipo de Cielo a Instalar <span className="text-[#d4a574] normal-case">*</span></label>
                <input required className={inputClass} placeholder="Ej: Cielo americano Armstrong, cielo de yeso, etc."
                  value={form.tipoCielo} onChange={e => set("tipoCielo", e.target.value)} />
              </div>

              <div>
                <label className={labelClass}>Modulación de Cielo</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {["60x60", "60x120", "Otro"].map(opt => (
                    <label key={opt} className={radioClass(form.modulacion === opt)}>
                      <input type="radio" name="modulacion" value={opt}
                        checked={form.modulacion === opt}
                        onChange={() => set("modulacion", opt)}
                        className="accent-[#d4a574] w-4 h-4" />
                      <span className="font-semibold text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Otros Servicios / Productos</label>
                  <input className={inputClass} placeholder="Revestimientos, pisos, etc."
                    value={form.otrosServicios} onChange={e => set("otrosServicios", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Cantidad aproximada</label>
                  <input className={inputClass} placeholder="m², unidades, ml..."
                    value={form.cantidad} onChange={e => set("cantidad", e.target.value)} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-6">
                {[
                  { label: "¿Desarme de Cielo Existente?", key: "desarme" },
                  { label: "¿Retiro de Escombros?", key: "retiroEscombros" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <div className="flex gap-3 mt-2">
                      {["Sí", "No"].map(opt => (
                        <label key={opt} className={`${radioClass(form[key as keyof typeof form] === opt)} flex-1 justify-center`}>
                          <input type="radio" name={key} value={opt}
                            checked={form[key as keyof typeof form] === opt}
                            onChange={() => set(key, opt)}
                            className="accent-[#d4a574] w-4 h-4" />
                          <span className="font-semibold text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <label className={labelClass}>Fecha de Instalación</label>
                  <input type="date" className={inputClass}
                    value={form.fechaInstalacion} onChange={e => set("fechaInstalacion", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Horario Desde</label>
                  <input type="time" className={inputClass}
                    value={form.horarioDesde} onChange={e => set("horarioDesde", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Horario Hasta</label>
                  <input type="time" className={inputClass}
                    value={form.horarioHasta} onChange={e => set("horarioHasta", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-base">3</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">Detalle de Recintos</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Indica cada sector con sus medidas</p>
                </div>
              </div>

              <div className="hidden md:grid grid-cols-12 gap-3 px-1">
                {[
                  { label: "Recinto / Sector", span: "col-span-4" },
                  { label: "Largo (m)", span: "col-span-1 text-center" },
                  { label: "Ancho (m)", span: "col-span-1 text-center" },
                  { label: "M²", span: "col-span-1 text-center" },
                  { label: "Observaciones", span: "col-span-4" },
                  { label: "", span: "col-span-1" },
                ].map((h, i) => (
                  <div key={i} className={`text-xs font-bold uppercase tracking-widest text-[#d4a574] ${h.span}`}>{h.label}</div>
                ))}
              </div>

              <div className="space-y-4">
                {recintos.map((r) => (
                  <div key={r.id} className="bg-[#1a2d5a]/40 border border-white/[0.07] rounded-2xl p-5">
                    <div className="grid md:grid-cols-12 grid-cols-2 gap-3 items-center">
                      <div className="col-span-2 md:col-span-4">
                        <input placeholder="Ej: Sala de reuniones" value={r.recinto}
                          onChange={e => updateRecinto(r.id, "recinto", e.target.value)}
                          className="w-full bg-[#0f1e3d] border border-white/15 rounded-lg px-4 py-4 text-white text-base placeholder-slate-600 focus:outline-none focus:border-[#d4a574]/50" />
                      </div>
                      <div className="md:col-span-1 text-center">
                        <input type="number" min="0" step="0.01" placeholder="0.00" value={r.largo}
                          onChange={e => updateRecinto(r.id, "largo", e.target.value)}
                          className="w-full bg-[#0f1e3d] border border-white/15 rounded-lg px-3 py-4 text-white text-base text-center placeholder-slate-600 focus:outline-none focus:border-[#d4a574]/50" />
                      </div>
                      <div className="md:col-span-1 text-center">
                        <input type="number" min="0" step="0.01" placeholder="0.00" value={r.ancho}
                          onChange={e => updateRecinto(r.id, "ancho", e.target.value)}
                          className="w-full bg-[#0f1e3d] border border-white/15 rounded-lg px-3 py-4 text-white text-base text-center placeholder-slate-600 focus:outline-none focus:border-[#d4a574]/50" />
                      </div>
                      <div className="md:col-span-1 text-center">
                        <span className="text-[#d4a574] font-black text-sm">{calcM2(r)}</span>
                      </div>
                      <div className="col-span-2 md:col-span-4 flex gap-2">
                        <input placeholder="Observaciones..." value={r.observaciones}
                          onChange={e => updateRecinto(r.id, "observaciones", e.target.value)}
                          className="flex-1 bg-[#0f1e3d] border border-white/15 rounded-lg px-4 py-4 text-white text-base placeholder-slate-600 focus:outline-none focus:border-[#d4a574]/50" />
                        {recintos.length > 1 && (
                          <button type="button" onClick={() => removeRecinto(r.id)}
                            className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all shrink-0">
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

              <div className="flex items-center justify-between">
                <button type="button" onClick={addRecinto}
                  className="flex items-center gap-2 text-[#d4a574] hover:text-amber-300 text-sm font-bold transition-colors py-2">
                  <div className="w-7 h-7 rounded-lg bg-[#d4a574]/15 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  Agregar recinto
                </button>

                <div className="bg-[#d4a574]/10 border border-[#d4a574]/20 rounded-2xl px-6 py-3">
                  <span className="text-slate-400 text-sm">Total: </span>
                  <span className="text-[#d4a574] font-black text-xl ml-1">{totalM2.toFixed(2)} m²</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 grid md:grid-cols-3 gap-8">
                <div>
                  <label className={labelClass}>Tipo de Muros</label>
                  <input className={inputClass} placeholder="Ej: Tabique yeso..."
                    value={form.tipoMuros} onChange={e => set("tipoMuros", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Tipo de Loza / Cubierta</label>
                  <input className={inputClass} placeholder="Ej: Hormigón..."
                    value={form.tipoCubierta} onChange={e => set("tipoCubierta", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Altura Piso a Loza</label>
                  <input className={inputClass} placeholder="Ej: 2.80 m"
                    value={form.alturaLoza} onChange={e => set("alturaLoza", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#d4a574] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-base">4</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-xl">Información Adicional</h3>
                  <p className="text-slate-500 text-sm mt-0.5">Planos, restricciones y notas del proyecto</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { label: "¿Planos de Cielo disponibles?", key: "planosCielo" },
                  { label: "¿Plano de Luminaria disponible?", key: "planosLuminaria" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <div className="flex gap-3 mt-2">
                      {["Sí", "No"].map(opt => (
                        <label key={opt} className={`${radioClass(form[key as keyof typeof form] === opt)} flex-1 justify-center`}>
                          <input type="radio" name={key} value={opt}
                            checked={form[key as keyof typeof form] === opt}
                            onChange={() => set(key, opt)}
                            className="accent-[#d4a574] w-4 h-4" />
                          <span className="font-semibold text-sm">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  { label: "¿Restricción de Horario?", key: "restriccionHorario", obsKey: "obsHorario", obsPlaceholder: "Describe la restricción de horario..." },
                  { label: "¿Restricción de Ruido?", key: "restriccionRuido", obsKey: "obsRuido", obsPlaceholder: "Describe la restricción de ruido..." },
                ].map(({ label, key, obsKey, obsPlaceholder }) => (
                  <div key={key} className="bg-[#1a2d5a]/30 rounded-2xl p-5 space-y-4">
                    <div>
                      <label className={labelClass}>{label}</label>
                      <div className="flex gap-3 mt-2">
                        {["Sí", "No"].map(opt => (
                          <label key={opt} className={`${radioClass(form[key as keyof typeof form] === opt)} flex-1 justify-center`}>
                            <input type="radio" name={key} value={opt}
                              checked={form[key as keyof typeof form] === opt}
                              onChange={() => set(key, opt)}
                              className="accent-[#d4a574] w-4 h-4" />
                            <span className="font-semibold text-sm">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {form[key as keyof typeof form] === "Sí" && (
                      <input className={inputClass} placeholder={obsPlaceholder}
                        value={form[obsKey as keyof typeof form]}
                        onChange={e => set(obsKey, e.target.value)} />
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className={labelClass}>Notas Adicionales</label>
                <textarea className={`${inputClass} resize-none`} rows={5}
                  placeholder="Cualquier información relevante para la visita técnica..."
                  value={form.notasAdicionales}
                  onChange={e => set("notasAdicionales", e.target.value)} />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navegación */}
          <div className="flex justify-between mt-10 gap-4">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white border border-white/10 hover:border-[#d4a574]/30 bg-white/[0.03] hover:bg-white/[0.07] px-7 py-4 rounded-2xl transition-all text-sm font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
            ) : <div />}

            {step < 4 ? (
              <button type="button" onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 bg-[#d4a574] hover:bg-[#c89563] text-white font-black px-10 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5 text-base">
                Siguiente
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 bg-[#d4a574] hover:bg-[#c89563] disabled:opacity-50 text-white font-black px-12 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5 text-base">
                {loading ? "Enviando..." : "Enviar Solicitud →"}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}