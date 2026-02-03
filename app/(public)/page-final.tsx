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
    <main className="mt-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/hero-bg.jpg"
            alt="Oficina moderna con cielos americanos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60" />
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            SOLUCIONES EN CONSTRUCCIÓN
            <br />
            <span className="text-accent">Y CIELOS AMERICANOS</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-gray-200">
            Expertos en instalación y venta de cielos falsos, revestimientos y pisos para todo tipo de proyectos.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" size="lg">
              Contáctanos
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-slate-900">
              Ver Proyectos
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section id="proyectos" className="py-20 bg-[#334155] text-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4">
            Trabajos realizados
          </h2>
          <p className="text-center text-gray-300 mb-12 text-lg">
            Algunos de nuestros proyectos destacados en cielos, revestimientos y pisos
          </p>
          <ProjectCarousel />
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-4 text-slate-900">
            Nuestros Productos
          </h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Explora nuestro catálogo de cielos, revestimientos y pisos
          </p>
          
          {/* Filtros */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            <button className="px-6 py-2.5 rounded-full bg-[#d4a574] text-white font-semibold shadow-md hover:bg-[#c89563] transition-all">
              Todos
            </button>
            <button className="px-6 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Cielos Americanos
            </button>
            <button className="px-6 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Revestimientos
            </button>
            <button className="px-6 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Pisos
            </button>
            <button className="px-6 py-2.5 rounded-full bg-gray-200 text-slate-700 hover:bg-gray-300 transition-all font-medium">
              Sprina de proyectoa
            </button>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <Image
                    src={producto.image}
                    alt={producto.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23475569"%3EProducto%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-slate-900 min-h-[56px]">
                    {producto.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-[#d4a574]">
                      ${producto.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">/{producto.unit}</span>
                  </div>
                  {producto.stock > 0 ? (
                    <>
                      <p className="text-sm text-green-600 font-semibold mb-1">En Stock</p>
                      <p className="text-xs text-gray-500 mb-3">{producto.unit}</p>
                      <button className="w-full px-4 py-2.5 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e40af] transition-colors shadow-md">
                        Agregar al carrito
                      </button>
                    </>
                  ) : (
                    <button 
                      disabled 
                      className="w-full px-4 py-2.5 bg-[#d4a574] text-white rounded-lg font-semibold mt-7"
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
