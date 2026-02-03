'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function ProjectCarousel() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Edificio de Oficinas',
      subtitle: 'Cielos Acústicos',
      image: '/img/proyectos/proyecto-1.jpg'
    },
    {
      id: '2',
      title: 'Oficinas Corporativas',
      subtitle: 'Cielos Americanos',
      image: '/img/proyectos/proyecto-2.jpg'
    },
    {
      id: '3',
      title: 'Centro Comercial',
      subtitle: 'Revestimientos',
      image: '/img/proyectos/proyecto-3.jpg'
    },
    {
      id: '4',
      title: 'Espacios Modernos',
      subtitle: 'Pisos y Cielos',
      image: '/img/proyectos/proyecto-4.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="relative">
      {/* Contenedor del carrusel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3"
            >
              <div className="relative h-80 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23cbd5e1"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23475569"%3EProyecto%3C/text%3E%3C/svg%3E';
                  }}
                />
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                
                {/* Texto sobre la imagen */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                  <p className="text-gray-300">{project.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
        aria-label="Proyecto anterior"
      >
        <ChevronLeft className="w-6 h-6 text-slate-900" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
        aria-label="Siguiente proyecto"
      >
        <ChevronRight className="w-6 h-6 text-slate-900" />
      </button>

      {/* Indicadores (dots) */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 300);
              }
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir al grupo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
