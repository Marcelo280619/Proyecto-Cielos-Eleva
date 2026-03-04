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

const INPUT = "w-full bg-transparent border-0 border-b-2 border-slate-600 px-0 py-3 text-white text-base placeholder-slate-500 focus:outline-none focus:border-[#d4a574] transition-colors duration-200";
const LABEL = "block text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4a574] mb-2";

const SectionHeader = ({ num, title, subtitle }: { num: number; title: string; subtitle: string }) => (
  <div className="flex items-start gap-5 pb-6" style={{ borderBottom: '1px solid rgba(212,165,116,0.2)' }}>
    <div style={{ width: '36px', height: '36px', background: '#d4a574', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span className="text-white font-black text-sm">{num}</span>
    </div>
    <div>
      <h3 className="text-white font-black text-lg leading-tight">{title}</h3>
      <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
    </div>
  </div>
);

const Radio = ({ name, value, current, onChange, label }: { name: string; value: string; current: string; onChange: (v: string) => void; label: string }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div onClick={() => onChange(value)} style={{
      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
      border: current === value ? '2px solid #d4a574' : '2px solid #3d5a8a',
      background: current === value ? '#d4a574' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
    }}>
      {current === value && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
    </div>
    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{label}</span>
  </label>
);

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

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const addRecinto = () => setRecintos(r => [...r, { id: crypto.randomUUID(), recinto: "", largo: "", ancho: "", observaciones: "" }]);
  const removeRecinto = (id: string) => setRecintos(r => r.filter(x => x.id !== id));
  const updateRecinto = (id: string, field: keyof Recinto, value: string) =>
    setRecintos(r => r.map(x => x.id === id ? { ...x, [field]: value } : x));

  const calcM2 = (r: Recinto) => {
    const l = parseFloat(r.largo), a = parseFloat(r.ancho);
    return !isNaN(l) && !isNaN(a) ? (l * a).toFixed(2) : "—";
  };
  const totalM2 = recintos.reduce((sum, r) => {
    const l = parseFloat(r.largo), a = parseFloat(r.ancho);
    return sum + (isNaN(l) || isNaN(a) ? 0 : l * a);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
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

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0f1e3d] flex items-center justify-center px-8">
        <div className="text-center" style={{ maxWidth: '480px' }}>
          <div style={{ width: '72px', height: '72px', border: '2px solid #d4a574', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <svg className="w-9 h-9 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-3">¡Solicitud enviada!</h2>
          <p className="text-slate-400 mb-10">Nuestro equipo técnico coordinará la visita contigo a la brevedad.</p>
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
          <p className="text-[#d4a574] text-[11px] font-bold uppercase tracking-[0.3em] mb-4">Visita a Terreno</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            Solicitar <span className="text-[#d4a574]">Visita Técnica</span>
          </h1>
          <div style={{ width: '48px', height: '3px', background: '#d4a574', margin: '0 auto' }} />
        </div>
      </section>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 40px 0' }}>

        {/* Steps */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <button type="button" onClick={() => s.num < step && setStep(s.num)}
                className="flex items-center gap-2.5 transition-all"
                style={{ cursor: s.num < step ? 'pointer' : 'default' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step === s.num ? '#d4a574' : s.num < step ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.05)',
                  border: step === s.num ? 'none' : s.num < step ? '1px solid rgba(212,165,116,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s',
                }}>
                  {s.num < step ? (
                    <svg className="w-3.5 h-3.5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: 900, color: step === s.num ? 'white' : '#475569' }}>{s.num}</span>
                  )}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: step === s.num ? 'white' : s.num < step ? '#d4a574' : '#475569' }} className="hidden sm:block">
                  {s.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div style={{ flex: 1, height: '1px', background: s.num < step ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.08)', margin: '0 12px' }} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-10 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <SectionHeader num={1} title="Información de Contacto" subtitle="Datos del cliente y la obra" />
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                <div className="sm:col-span-2"><label className={LABEL}>Nombre empresa o cliente *</label><input required placeholder="Ej: Constructora XYZ" value={form.nombreEmpresa} onChange={e => set("nombreEmpresa", e.target.value)} className={INPUT} /></div>
                <div className="sm:col-span-2"><label className={LABEL}>Dirección de la obra *</label><input required placeholder="Calle, número, comuna, ciudad" value={form.direccionObra} onChange={e => set("direccionObra", e.target.value)} className={INPUT} /></div>
                <div><label className={LABEL}>Nombre del contacto *</label><input required placeholder="Nombre del encargado" value={form.contactoNombre} onChange={e => set("contactoNombre", e.target.value)} className={INPUT} /></div>
                <div><label className={LABEL}>Teléfono de contacto *</label><input required placeholder="+56 9 1234 5678" value={form.contactoFono} onChange={e => set("contactoFono", e.target.value)} className={INPUT} /></div>
              </div>
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <label className={LABEL + " mb-5"}>¿Existe cotización previa?</label>
                <div className="flex gap-8">
                  <Radio name="tieneCotizacion" value="Sí" current={form.tieneCotizacion} onChange={v => set("tieneCotizacion", v)} label="Sí" />
                  <Radio name="tieneCotizacion" value="No" current={form.tieneCotizacion} onChange={v => set("tieneCotizacion", v)} label="No" />
                </div>
                {form.tieneCotizacion === "Sí" && (
                  <div className="mt-6"><label className={LABEL}>N° de cotización</label><input placeholder="Número de cotización existente" value={form.numeroCotizacion} onChange={e => set("numeroCotizacion", e.target.value)} className={INPUT} /></div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-10 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <SectionHeader num={2} title="Servicios Requeridos" subtitle="Tipo de trabajo y características del proyecto" />
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                <div className="sm:col-span-2"><label className={LABEL}>Tipo de cielo a instalar *</label><input required placeholder="Ej: Cielo americano Armstrong, cielo de yeso..." value={form.tipoCielo} onChange={e => set("tipoCielo", e.target.value)} className={INPUT} /></div>

                <div className="sm:col-span-2">
                  <label className={LABEL + " mb-5"}>Modulación de cielo</label>
                  <div className="flex gap-8 flex-wrap">
                    {["60x60", "60x120", "Otro"].map(opt => (
                      <Radio key={opt} name="modulacion" value={opt} current={form.modulacion} onChange={v => set("modulacion", v)} label={opt} />
                    ))}
                  </div>
                </div>

                <div><label className={LABEL}>Otros servicios / productos</label><input placeholder="Revestimientos, pisos, etc." value={form.otrosServicios} onChange={e => set("otrosServicios", e.target.value)} className={INPUT} /></div>
                <div><label className={LABEL}>Cantidad aproximada</label><input placeholder="m², unidades, ml..." value={form.cantidad} onChange={e => set("cantidad", e.target.value)} className={INPUT} /></div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }} className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {[{ label: "¿Desarme de cielo existente?", key: "desarme" }, { label: "¿Retiro de escombros?", key: "retiroEscombros" }].map(({ label, key }) => (
                  <div key={key}>
                    <label className={LABEL + " mb-5"}>{label}</label>
                    <div className="flex gap-8">
                      <Radio name={key} value="Sí" current={form[key as keyof typeof form]} onChange={v => set(key, v)} label="Sí" />
                      <Radio name={key} value="No" current={form[key as keyof typeof form]} onChange={v => set(key, v)} label="No" />
                    </div>
                  </div>
                ))}
                <div><label className={LABEL}>Fecha de instalación</label><input type="date" value={form.fechaInstalacion} onChange={e => set("fechaInstalacion", e.target.value)} className={INPUT} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={LABEL}>Desde</label><input type="time" value={form.horarioDesde} onChange={e => set("horarioDesde", e.target.value)} className={INPUT} /></div>
                  <div><label className={LABEL}>Hasta</label><input type="time" value={form.horarioHasta} onChange={e => set("horarioHasta", e.target.value)} className={INPUT} /></div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-10 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <SectionHeader num={3} title="Detalle de Recintos" subtitle="Indica cada sector con sus medidas" />

              <div className="space-y-0">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-3" style={{ borderBottom: '1px solid rgba(212,165,116,0.2)' }}>
                  {["Recinto / Sector", "Largo (m)", "Ancho (m)", "M²", "Observaciones", ""].map((h, i) => (
                    <div key={i} className={`text-[10px] font-bold uppercase tracking-[0.15em] text-[#d4a574] ${i === 0 ? "col-span-4" : i === 1 ? "col-span-2" : i === 2 ? "col-span-2" : i === 3 ? "col-span-1" : i === 4 ? "col-span-2" : "col-span-1"}`}>{h}</div>
                  ))}
                </div>

                {recintos.map((r) => (
                  <div key={r.id} className="grid md:grid-cols-12 gap-4 items-center py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="md:col-span-4"><input placeholder="Ej: Sala de reuniones" value={r.recinto} onChange={e => updateRecinto(r.id, "recinto", e.target.value)} className={INPUT} /></div>
                    <div className="md:col-span-2"><input type="number" min="0" step="0.01" placeholder="0.00" value={r.largo} onChange={e => updateRecinto(r.id, "largo", e.target.value)} className={INPUT + " text-center"} /></div>
                    <div className="md:col-span-2"><input type="number" min="0" step="0.01" placeholder="0.00" value={r.ancho} onChange={e => updateRecinto(r.id, "ancho", e.target.value)} className={INPUT + " text-center"} /></div>
                    <div className="md:col-span-1 text-center"><span className="text-[#d4a574] font-black text-sm">{calcM2(r)}</span></div>
                    <div className="md:col-span-2"><input placeholder="Obs..." value={r.observaciones} onChange={e => updateRecinto(r.id, "observaciones", e.target.value)} className={INPUT} /></div>
                    <div className="md:col-span-1 flex justify-end">
                      {recintos.length > 1 && (
                        <button type="button" onClick={() => removeRecinto(r.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button type="button" onClick={addRecinto} className="flex items-center gap-2 text-[#d4a574] hover:text-amber-300 transition-colors text-sm font-bold uppercase tracking-[0.1em]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                  Agregar recinto
                </button>
                <div style={{ borderLeft: '2px solid #d4a574', paddingLeft: '16px' }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#d4a574] mb-0.5">Total</p>
                  <p className="text-white font-black text-xl">{totalM2.toFixed(2)} m²</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }} className="grid sm:grid-cols-3 gap-x-10 gap-y-8">
                <div><label className={LABEL}>Tipo de muros</label><input placeholder="Ej: Tabique yeso..." value={form.tipoMuros} onChange={e => set("tipoMuros", e.target.value)} className={INPUT} /></div>
                <div><label className={LABEL}>Tipo de loza / cubierta</label><input placeholder="Ej: Hormigón..." value={form.tipoCubierta} onChange={e => set("tipoCubierta", e.target.value)} className={INPUT} /></div>
                <div><label className={LABEL}>Altura piso a loza</label><input placeholder="Ej: 2.80 m" value={form.alturaLoza} onChange={e => set("alturaLoza", e.target.value)} className={INPUT} /></div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-10 rounded-xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <SectionHeader num={4} title="Información Adicional" subtitle="Planos, restricciones y notas del proyecto" />

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                {[{ label: "¿Planos de cielo disponibles?", key: "planosCielo" }, { label: "¿Plano de luminaria disponible?", key: "planosLuminaria" }].map(({ label, key }) => (
                  <div key={key}>
                    <label className={LABEL + " mb-5"}>{label}</label>
                    <div className="flex gap-8">
                      <Radio name={key} value="Sí" current={form[key as keyof typeof form]} onChange={v => set(key, v)} label="Sí" />
                      <Radio name={key} value="No" current={form[key as keyof typeof form]} onChange={v => set(key, v)} label="No" />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }} className="space-y-10">
                {[
                  { label: "¿Restricción de horario?", key: "restriccionHorario", obsKey: "obsHorario", ph: "Describe la restricción de horario..." },
                  { label: "¿Restricción de ruido?", key: "restriccionRuido", obsKey: "obsRuido", ph: "Describe la restricción de ruido..." },
                ].map(({ label, key, obsKey, ph }) => (
                  <div key={key}>
                    <label className={LABEL + " mb-5"}>{label}</label>
                    <div className="flex gap-8 mb-4">
                      <Radio name={key} value="Sí" current={form[key as keyof typeof form]} onChange={v => set(key, v)} label="Sí" />
                      <Radio name={key} value="No" current={form[key as keyof typeof form]} onChange={v => set(key, v)} label="No" />
                    </div>
                    {form[key as keyof typeof form] === "Sí" && (
                      <input placeholder={ph} value={form[obsKey as keyof typeof form]} onChange={e => set(obsKey, e.target.value)} className={INPUT} />
                    )}
                  </div>
                ))}

                <div>
                  <label className={LABEL}>Notas adicionales</label>
                  <textarea rows={4} placeholder="Cualquier información relevante para la visita técnica..." value={form.notasAdicionales} onChange={e => set("notasAdicionales", e.target.value)} className={`${INPUT} resize-none`} />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm border-l-2 border-red-400 pl-4">{error}</p>}
            </div>
          )}

          {/* Navegación */}
          <div className="flex justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-[0.1em]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Anterior
              </button>
            ) : <div />}

            {step < 4 ? (
              <button type="button" onClick={() => setStep(s => s + 1)}
                className="text-white font-black uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #d4a574, #c89563)', padding: '14px 40px', borderRadius: '4px', fontSize: '12px' }}>
                Siguiente →
              </button>
            ) : (
              <button type="submit" disabled={loading}
                className="text-white font-black uppercase tracking-[0.15em] disabled:opacity-50 transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #d4a574, #c89563)', padding: '14px 48px', borderRadius: '4px', fontSize: '12px', boxShadow: '0 8px 30px rgba(212,165,116,0.25)' }}>
                {loading ? "Enviando..." : "Enviar Solicitud →"}
              </button>
            )}
          </div>

        </form>
      </div>
    </main>
  );
}