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
      className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#1e3a8a]/25 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Icono */}
      <div className="w-14 h-14 bg-[#1e3a8a]/8 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1e3a8a]/15 transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#1e3a8a]" strokeWidth={1.5} />
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-slate-500 leading-relaxed text-sm flex-1">
        {description}
      </p>

      {/* Ver más */}
      <div className="flex items-center gap-1.5 text-[#d4a574] font-semibold text-sm mt-6 group-hover:gap-3 transition-all duration-200">
        Ver más
        <ChevronRight className="w-4 h-4" />
      </div>
    </a>
  );
}
