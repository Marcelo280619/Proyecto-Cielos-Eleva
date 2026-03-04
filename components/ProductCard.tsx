'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, priceRef, image, stock } = product;
  const inStock = stock > 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1">

      {/* Imagen */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f1f5f9" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%2394a3b8" font-size="16" font-family="sans-serif"%3EProducto%3C/text%3E%3C/svg%3E';
          }}
        />
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-[#d4a574] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
              Próximamente
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 line-clamp-2 min-h-[40px]">
          {name}
        </h3>

        <div className="mt-auto space-y-3">
          {/* Precio */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#d4a574]">
              {priceRef ? formatPrice(priceRef) : 'Consultar'}
            </span>
            <span className="text-slate-400 text-xs">/unidad</span>
          </div>

          {inStock ? (
            <>
              {/* Stock */}
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-emerald-600 text-xs font-semibold">
                  En Stock · {stock} un
                </span>
              </div>

              {/* Botón */}
              <button
                className="w-full flex items-center justify-center gap-2 text-white font-black uppercase tracking-widest py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Agregar al carrito
              </button>
            </>
          ) : (
            <button
              disabled
              className="w-full bg-slate-100 text-slate-400 font-bold uppercase tracking-widest py-3 rounded-full text-xs cursor-not-allowed mt-6"
              style={{ letterSpacing: '0.1em' }}
            >
              Próximamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}