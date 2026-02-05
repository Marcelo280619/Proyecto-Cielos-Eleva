'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Home, Wrench } from 'lucide-react';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ServiceCard';
import ProjectCarousel from '@/components/ProjectCarousel';

export default function HomePage() {
  const [imageError, setImageError] = useState(false);

  const services = [
    {
      icon: Layers,
      title: 'Instalación de Cielos Americanos',
      description: 'Soluciones profesionales en instalación y mantenimiento de cielos falsos para oficinas y comercios.'
    },
    {
      icon: Home,
      title: 'Revestimientos y Pisos',
      description: 'Venta e instalación de revestimientos y pisos de alta calidad para proyectos de construcción.'
    },
    {
      icon: Wrench,
      title: 'Proyectos de Construcción',
      description: 'Ejecutamos proyectos completos de remodelación, renovación y construcción de espacios.'
    }
  ];

  const productos = [
    {
      id: '1',
      name: 'Panel de Cielo Acústico Blanco',
      price: 15500,
      unit: 'paquete 12',
      image: '/img/productos/panel-blanco.jpg',
      stock: 45,
      category: 'Cielos Americanos'
    },
    {
      id: '2',
      name: 'Panel de Cielo Acústico Beige',
      price: 16500,
      unit: 'paquete 12',
      image: '/img/productos/panel-beige.jpg',
      stock: 32,
      category: 'Cielos Americanos'
    },
    {
      id: '3',
      name: 'Panel de Cielo Acanalado',
      price: 15200,
      unit: 'm²',
      image: '/img/productos/panel-acanalado.jpg',
      stock: 28,
      category: 'Cielos Americanos'
    },
    {
      id: '4',
      name: 'Panel PVC Revestimiento Techo',
      price: 12900,
      unit: 'm²',
      image: '/img/productos/panel-pvc.jpg',
      stock: 0,
      category: 'Revestimientos'
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Fondo: Imagen o Gradiente de respaldo */}
        {!imageError ? (
          <>
            <Image
              src="/img/hero-bg.jpg"
              alt="Oficina moderna con cielos americanos"
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="100vw"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/60 z-10" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#334155] to-slate-800" />
        )}
        
        {/* Contenido del Hero */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                SOLUCIONES EN CONSTRUCCIÓN
                <br />
                <span className="text-[#d4a574]">Y CIELOS AMERICANOS</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
                Expertos en instalación y venta de cielos falsos, revestimientos y pisos para todo tipo de proyectos.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Button variant="secondary" size="lg" className="text-xl px-10 py-5">
                  Contáctanos
                </Button>
                <Button variant="outline" size="lg" className="text-xl px-10 py-5">
                  Ver Proyectos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Nuestros Servicios
            </h2>
            <div className="w-32 h-1.5 bg-[#d4a574] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-20 md:py-28 bg-[#334155] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Trabajos Realizados
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Algunos de nuestros proyectos destacados en cielos, revestimientos y pisos
            </p>
            <div className="w-32 h-1.5 bg-[#d4a574] mx-auto mt-6"></div>
          </div>
          <ProjectCarousel />
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Nuestros Productos
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Explora nuestro catálogo de cielos, revestimientos y pisos
            </p>
            <div className="w-32 h-1.5 bg-[#d4a574] mx-auto mt-6"></div>
          </div>
          
          {/* Filtros */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <button className="px-7 py-3.5 rounded-full bg-[#d4a574] text-white font-semibold shadow-md hover:bg-[#c89563] transition-all text-lg">
              Todos
            </button>
            <button className="px-7 py-3.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium text-lg">
              Cielos Americanos
            </button>
            <button className="px-7 py-3.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium text-lg">
              Revestimientos
            </button>
            <button className="px-7 py-3.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium text-lg">
              Pisos
            </button>
            <button className="px-7 py-3.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium text-lg">
              Sprina de proyectoa
            </button>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <Image
                    src={producto.image}
                    alt={producto.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23475569"%3EProducto%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-4 text-slate-900 min-h-[64px] line-clamp-2">
                    {producto.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-[#d4a574]">
                      ${producto.price.toLocaleString('es-CL')}
                    </span>
                    <span className="text-gray-500 text-base">/{producto.unit}</span>
                  </div>
                  {producto.stock > 0 ? (
                    <>
                      <p className="text-base text-green-600 font-semibold mb-2">En Stock</p>
                      <p className="text-sm text-gray-500 mb-5">{producto.stock} unidades</p>
                      <button className="w-full px-5 py-3.5 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors shadow-md text-lg">
                        Agregar al carrito
                      </button>
                    </>
                  ) : (
                    <button 
                      disabled 
                      className="w-full px-5 py-3.5 bg-[#d4a574] text-white rounded-lg font-semibold mt-11 text-lg"
                    >
                      Próximamente
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Ver catálogo completo */}
          <div className="text-center">
            <Link href="/productos">
              <Button variant="primary" size="lg" className="text-xl px-12 py-5">
                Ver catálogo completo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}