'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Home, Wrench } from 'lucide-react';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ServiceCard';
import ProjectCarousel from '@/components/ProjectCarousel';

export default function HomePage() {
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
      <section className="relative h-[500px] md:h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/hero-bg.jpg"
            alt="Oficina moderna con cielos americanos"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #334155 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/60" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              SOLUCIONES EN CONSTRUCCIÓN
              <br />
              <span className="text-[#d4a574]">Y CIELOS AMERICANOS</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Expertos en instalación y venta de cielos falsos, revestimientos y pisos para todo tipo de proyectos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg">
                Contáctanos
              </Button>
              <Button variant="outline" size="lg">
                Ver Proyectos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nuestros Servicios
            </h2>
            <div className="w-24 h-1 bg-[#d4a574] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      <section id="proyectos" className="py-16 md:py-24 bg-[#334155] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trabajos realizados
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Algunos de nuestros proyectos destacados en cielos, revestimientos y pisos
            </p>
            <div className="w-24 h-1 bg-[#d4a574] mx-auto mt-4"></div>
          </div>
          <ProjectCarousel />
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora nuestro catálogo de cielos, revestimientos y pisos
            </p>
            <div className="w-24 h-1 bg-[#d4a574] mx-auto mt-4"></div>
          </div>
          
          {/* Filtros */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            <button className="px-5 py-2.5 rounded-full bg-[#d4a574] text-white font-semibold shadow-md hover:bg-[#c89563] transition-all">
              Todos
            </button>
            <button className="px-5 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Cielos Americanos
            </button>
            <button className="px-5 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Revestimientos
            </button>
            <button className="px-5 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Pisos
            </button>
            <button className="px-5 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Sprina de proyectoa
            </button>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={producto.image}
                    alt={producto.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23475569"%3EProducto%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 text-slate-900 min-h-[56px] line-clamp-2">
                    {producto.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold text-[#d4a574]">
                      ${producto.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">/{producto.unit}</span>
                  </div>
                  {producto.stock > 0 ? (
                    <>
                      <p className="text-sm text-green-600 font-semibold mb-1">En Stock</p>
                      <p className="text-xs text-gray-500 mb-4">{producto.unit}</p>
                      <button className="w-full px-4 py-2.5 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors shadow-md">
                        Agregar al carrito
                      </button>
                    </>
                  ) : (
                    <button 
                      disabled 
                      className="w-full px-4 py-2.5 bg-[#d4a574] text-white rounded-lg font-semibold mt-9"
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
              <Button variant="primary" size="lg">
                Ver catálogo completo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}