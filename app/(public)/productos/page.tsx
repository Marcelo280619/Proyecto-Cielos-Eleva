import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero header */}
      <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 border-b border-white/5" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 32px' }} className="flex flex-col items-center text-center">

          <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 border border-[#d4a574]/30 rounded-full px-5 py-2 mb-6">
            <span className="text-[#d4a574] text-xs font-bold uppercase tracking-widest">Catálogo</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Nuestros <span className="text-[#d4a574]">Productos</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8" style={{ maxWidth: '576px' }}>
            Vitrina con stock disponible. Arma tu carrito y solicita tu pedido fácilmente.
          </p>

          <div className="w-20 h-1 bg-[#d4a574] rounded-full" />
        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '60px 32px 80px' }}>

        {/* Barra superior */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10" style={{ width: '100%' }}>
          <div>
            <p className="text-slate-500 text-sm">
              Mostrando <span className="font-bold text-slate-800">{products.length}</span> productos disponibles
            </p>
          </div>
          <Link
            href="/app/carrito"
            className="inline-flex items-center gap-2 text-white font-bold rounded-xl transition-all text-sm hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #d4a574 0%, #c89563 100%)',
              boxShadow: '0 4px 14px rgba(212,165,116,0.4)',
              padding: '10px 24px',
              borderRadius: '12px',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              letterSpacing: '0.02em',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Ver carrito
          </Link>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}