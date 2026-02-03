'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105">
      <div className="flex flex-col items-center text-center">
        {/* Icono */}
        <div className="mb-6 p-5 bg-[#1e40af]/10 rounded-full group-hover:bg-[#1e40af]/20 transition-colors">
          <Icon className="w-14 h-14 text-[#1e40af]" strokeWidth={1.5} />
        </div>
        
        {/* Título */}
        <h3 className="text-xl font-bold mb-4 text-gray-900">
          {title}
        </h3>
        
        {/* Descripción */}
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        
        {/* Botón Ver más (opcional) */}
        <button className="mt-6 text-[#1e40af] font-semibold hover:text-[#1e3a8a] transition-colors flex items-center gap-2 group-hover:gap-3">
          Ver más
          <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
