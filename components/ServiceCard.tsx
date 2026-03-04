'use client';

import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ icon: Icon, title, description, href = '#' }: ServiceCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col bg-white border border-slate-200 rounded-2xl hover:border-[#1e3a8a]/25 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1"
      style={{ padding: '40px 36px' }}
    >
      {/* Icono */}
      <div className="w-16 h-16 bg-[#1e3a8a]/8 rounded-2xl flex items-center justify-center group-hover:bg-[#1e3a8a]/15 transition-colors duration-300" style={{ marginBottom: '28px' }}>
        <Icon className="w-8 h-8 text-[#1e3a8a]" strokeWidth={1.5} />
      </div>

      {/* Título */}
      <h3 className="text-xl font-black text-slate-900 leading-snug" style={{ marginBottom: '16px' }}>
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-slate-500 leading-relaxed text-sm flex-1" style={{ marginBottom: '28px' }}>
        {description}
      </p>

      {/* Separador */}
      <div className="w-10 h-0.5 bg-[#d4a574]/40 rounded-full" style={{ marginBottom: '20px' }} />

      {/* Ver más */}
      <div className="flex items-center gap-1.5 text-[#d4a574] font-bold text-sm group-hover:gap-3 transition-all duration-200 uppercase tracking-widest" style={{ fontSize: '11px' }}>
        Ver más
        <ChevronRight className="w-4 h-4" />
      </div>
    </a>
  );
}