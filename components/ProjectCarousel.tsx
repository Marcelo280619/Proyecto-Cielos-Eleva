'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  { id: '1', title: 'Edificio de Oficinas',   subtitle: 'Cielos Acústicos',   image: '/img/proyectos/proyecto-1.jpg' },
  { id: '2', title: 'Oficinas Corporativas',  subtitle: 'Cielos Americanos',  image: '/img/proyectos/proyecto-2.jpg' },
  { id: '3', title: 'Centro Comercial',       subtitle: 'Revestimientos',     image: '/img/proyectos/proyecto-3.jpg' },
  { id: '4', title: 'Espacios Modernos',      subtitle: 'Pisos y Cielos',     image: '/img/proyectos/proyecto-4.jpg' },
];

const TOTAL = projects.length;
const AUTOPLAY_DELAY = 3000;
const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%232d4a6e"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2393a8c4"%3EProyecto%3C/text%3E%3C/svg%3E';

// Duplicamos el array 3 veces para tener loop visual infinito
const looped = [...projects, ...projects, ...projects];
// Empezamos en el medio para poder ir hacia ambos lados
const START = TOTAL;

export default function ProjectCarousel() {
  const [index, setIndex] = useState(START);
  const [animated, setAnimated] = useState(true);
  const pausedRef = useRef(false);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) step(1);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  const step = (dir: 1 | -1) => {
    setAnimated(true);
    setIndex(prev => prev + dir);
  };

  // Al llegar a los extremos del array triplicado, reposicionar sin animación
  useEffect(() => {
    if (index < TOTAL) {
      setTimeout(() => {
        setAnimated(false);
        setIndex(index + TOTAL);
      }, 500);
    } else if (index >= TOTAL * 2) {
      setTimeout(() => {
        setAnimated(false);
        setIndex(index - TOTAL);
      }, 500);
    }
  }, [index]);

  const realIndex = index % TOTAL;

  // Calculamos el offset para que la foto activa esté centrada entre 3
  // Mostramos: index-1, index, index+1
  // El contenedor tiene width = 300% y desplazamos para centrar
  const GAP = 20; // px gap entre cards

  return (
    <div
      className="relative"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Viewport — overflow hidden */}
      <div className="overflow-hidden rounded-2xl" style={{ padding: '8px 0' }}>
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
            // Cada card ocupa ~33.33% del contenedor visual
            // Desplazamos para que index esté en el centro
            transform: `translateX(calc(-${index * (100 / 3)}% - ${index * GAP / 3}px + ${100 / 3}%))`,
            transition: animated ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {looped.map((project, idx) => {
            const isActive = idx === index;
            const isAdjacent = idx === index - 1 || idx === index + 1;

            return (
              <div
                key={`${project.id}-${idx}`}
                className="shrink-0"
                style={{
                  width: 'calc(33.333% - 14px)',
                  transform: isActive ? 'scale(1.05)' : isAdjacent ? 'scale(0.97)' : 'scale(0.93)',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformOrigin: 'center center',
                  zIndex: isActive ? 3 : isAdjacent ? 2 : 1,
                  position: 'relative',
                  opacity: isActive ? 1 : isAdjacent ? 0.8 : 0.5,
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    height: '340px',
                    boxShadow: isActive
                      ? '0 24px 60px -10px rgba(0,0,0,0.55)'
                      : '0 4px 16px -4px rgba(0,0,0,0.3)',
                    transition: 'box-shadow 0.5s ease',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    style={{
                      transform: isActive ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.1) 55%, transparent 100%)'
                        : 'rgba(10,22,40,0.5)',
                      transition: 'background 0.5s ease',
                    }}
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    style={{
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                  >
                    <p className="text-[#d4a574] text-xs font-bold uppercase tracking-widest mb-1.5">
                      {project.subtitle}
                    </p>
                    <h3 className="text-white font-black text-lg leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimated(true); setIndex(START + i - realIndex + (realIndex <= i ? 0 : 0)); setIndex(START + (i)); }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === realIndex ? '32px' : '8px',
                background: i === realIndex ? '#d4a574' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => step(-1)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => step(1)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}