"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/data";
import Link from "next/link";

type CartMap = Record<string, number>;

export default function CarritoPage() {
  const [cart, setCart] = useState<CartMap>({});
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("eleva_cart");
    setCart(raw ? JSON.parse(raw) : {});
  }, []);

  function save(next: CartMap) {
    setCart(next);
    localStorage.setItem("eleva_cart", JSON.stringify(next));
  }

  const rows = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const p = products.find((x) => x.id === id);
        if (!p) return null;
        return { id, qty, p };
      })
      .filter(Boolean) as { id: string; qty: number; p: (typeof products)[number] }[];
  }, [cart]);

  const totalItems = rows.reduce((a, r) => a + r.qty, 0);

  async function sendQuote() {
    setLoading(true); setOk(null); setErr(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note,
          items: rows.map(r => ({ productId: r.id, name: r.p.name, qty: r.qty }))
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "No se pudo enviar la solicitud");
      }
      setOk("Solicitud enviada ✅ Te contactaremos pronto.");
      save({});
      setNote("");
    } catch (e: any) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--eleva-blue)]">Carrito</h1>
          <p className="mt-2 text-slate-600">Arma tu pedido y envíalo como solicitud (sin pago online).</p>
        </div>
        <Link className="rounded-lg border px-4 py-2 hover:bg-slate-50" href="/productos">
          + Agregar más
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {rows.length === 0 ? (
          <p className="text-slate-600">Tu carrito está vacío. Ve a productos para agregar.</p>
        ) : (
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.id} className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold">{r.p.name}</div>
                  <div className="text-sm text-slate-600">Disponible: {r.p.stock}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-md border px-3 py-2 hover:bg-slate-50"
                    onClick={() => {
                      const next = { ...cart };
                      next[r.id] = Math.max(1, (next[r.id] || 1) - 1);
                      save(next);
                    }}
                  >
                    -
                  </button>
                  <div className="min-w-10 text-center font-semibold">{r.qty}</div>
                  <button
                    className="rounded-md border px-3 py-2 hover:bg-slate-50"
                    onClick={() => {
                      const next = { ...cart };
                      next[r.id] = (next[r.id] || 0) + 1;
                      save(next);
                    }}
                  >
                    +
                  </button>

                  <button
                    className="ml-2 rounded-md bg-rose-50 px-3 py-2 text-rose-700 hover:opacity-90"
                    onClick={() => {
                      const next = { ...cart };
                      delete next[r.id];
                      save(next);
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">Items totales: <b>{totalItems}</b></div>
              <button
                className="rounded-lg bg-[var(--eleva-blue)] px-4 py-2 font-semibold text-white hover:opacity-95 disabled:opacity-60"
                disabled={loading || rows.length === 0}
                onClick={sendQuote}
              >
                {loading ? "Enviando..." : "Enviar solicitud"}
              </button>
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Comentario (medidas, dirección, fotos, etc.)"
              className="h-24 w-full rounded-lg border px-3 py-2"
            />

            {ok && <p className="text-sm font-semibold text-emerald-700">{ok}</p>}
            {err && <p className="text-sm font-semibold text-rose-700">{err}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
