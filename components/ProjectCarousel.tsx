'use client';

import React, { useState, useEffect } from 'react';
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
    { id: '1', title: 'Edificio de Oficinas', subtitle: 'Cielos Acústicos', image: '/img/proyectos/proyecto-1.jpg' },
    { id: '2', title: 'Oficinas Corporativas', subtitle: 'Cielos Americanos', image: '/img/proyectos/proyecto-2.jpg' },
    { id: '3', title: 'Centro Comercial', subtitle: 'Revestimientos', image: '/img/proyectos/proyecto-3.jpg' },
    { id: '4', title: 'Espacios Modernos', subtitle: 'Pisos y Cielos', image: '/img/proyectos/proyecto-4.jpg' },
  ];

  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  const go = (dir: 'prev' | 'next') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      dir === 'prev' ? Math.max(0, prev - 1) : Math.min(maxIndex, prev + 1)
    );
    setTimeout(() => setIsTransitioning(false), 350);
  };

  const PLACEHOLDER =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%232d4a6e"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2393a8c4"%3EProyecto%3C/text%3E%3C/svg%3E';

  return (
    <div className="relative">
      {/* Cards container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex gap-5 transition-transform duration-350 ease-out"
          style={{
            transform: `translateX(calc(-${(currentIndex * 100) / itemsPerView}% - ${currentIndex * (20 / itemsPerView)}px))`,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - ${(5 * (itemsPerView - 1)) / itemsPerView}px)` }}
            >
              <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER;
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#d4a574] text-xs font-bold uppercase tracking-widest mb-1.5">
                    {project.subtitle}
                  </p>
                  <h3 className="text-white font-bold text-xl leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsTransitioning(false), 350);
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-[#d4a574]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => go('prev')}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go('next')}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
