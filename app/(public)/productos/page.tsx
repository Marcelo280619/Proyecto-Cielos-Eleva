import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--eleva-blue)]">Productos</h1>
          <p className="mt-2 text-slate-600">
            Vitrina con stock. Puedes armar un carrito para solicitar tu pedido (sin pago online).
          </p>
        </div>
        <Link className="rounded-lg border px-4 py-2 hover:bg-slate-50" href="/app/carrito">
          Ver carrito
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
