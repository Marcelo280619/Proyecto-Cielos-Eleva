"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data";

function addToCart(productId: string) {
  const raw = localStorage.getItem("eleva_cart");
  const cart: Record<string, number> = raw ? JSON.parse(raw) : {};
  cart[productId] = (cart[productId] || 0) + 1;
  localStorage.setItem("eleva_cart", JSON.stringify(cart));
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const inStock = product.stock > 0;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative h-44 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold">{product.name}</h3>
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              inStock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
          >
            {inStock ? `Stock: ${product.stock}` : "Sin stock"}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-600">{product.description}</p>

        <button
          disabled={!inStock}
          onClick={() => {
            addToCart(product.id);
            setAdded(true);
            setTimeout(() => setAdded(false), 900);
          }}
          className={`mt-4 w-full rounded-lg px-4 py-2 font-semibold ${
            inStock ? "bg-[var(--eleva-blue)] text-white hover:opacity-95" : "bg-slate-200 text-slate-500"
          }`}
        >
          {added ? "Agregado ✅" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
