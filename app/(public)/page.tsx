import React from 'react';
import Hero from '@/components/Hero';
import ProjectCarousel from '@/components/ProjectCarousel';
import ProductCard from '@/components/ProductCard';
import './home.css';

// Service data
const services = [
  {
    id: 1,
    icon: 'layers',
    title: 'Instalación de Cielos Americanos',
    description: 'Soluciones profesionales en instalación y mantenimiento de cielos falsos para oficinas y comercios.',
    link: '/servicios/cielos-americanos'
  },
  {
    id: 2,
    icon: 'construction',
    title: 'Revestimientos y Pisos',
    description: 'Venta e instalación de revestimientos y pisos de alta calidad para proyectos de construcción.',
    link: '/servicios/revestimientos-pisos'
  },
  {
    id: 3,
    icon: 'tools',
    title: 'Proyectos de Construcción',
    description: 'Ejecutamos proyectos completos de remodelación, renovación y construcción de espacios.',
    link: '/servicios/proyectos-construccion'
  }
];

// Product data
const products = [
  {
    id: 1,
    name: 'Panel de Cielo Acústico Blanco',
    price: 15500,
    unit: 'paquete',
    category: 'cielos',
    image: '/img/prod-cielo.jpg',
    inStock: true,
    stock: 73
  },
  {
    id: 2,
    name: 'Panel de Cielo Acústico Beige',
    price: 16500,
    unit: 'paquete',
    category: 'cielos',
    image: '/img/prod-perfil.jpg',
    inStock: true,
    stock: 28
  },
  {
    id: 3,
    name: 'Panel de Cielo Acanalado',
    price: 15200,
    unit: 'm²',
    category: 'cielos',
    image: '/img/prod-pvc.jpg',
    inStock: true,
    stock: 15
  },
  {
    id: 4,
    name: 'Panel PVC Revestimiento Techo',
    price: 12900,
    unit: 'm²',
    category: 'revestimientos',
    image: '/img/prod-perfil.jpg',
    inStock: false,
    stock: 0
  }
];

// Category filter type
type Category = 'todos' | 'cielos' | 'revestimientos' | 'pisos';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = React.useState<Category>('todos');

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {service.icon === 'layers' && (
                    <svg viewBox="0 0 64 64" width="64" height="64">
                      <rect x="8" y="28" width="48" height="4" fill="#C79B6E" opacity="0.3"/>
                      <rect x="8" y="20" width="48" height="4" fill="#C79B6E" opacity="0.6"/>
                      <rect x="8" y="12" width="48" height="4" fill="#C79B6E"/>
                    </svg>
                  )}
                  {service.icon === 'construction' && (
                    <svg viewBox="0 0 64 64" width="64" height="64">
                      <rect x="12" y="12" width="16" height="16" fill="#C79B6E" opacity="0.6"/>
                      <rect x="32" y="12" width="16" height="16" fill="#C79B6E" opacity="0.3"/>
                      <rect x="12" y="32" width="16" height="16" fill="#C79B6E" opacity="0.3"/>
                      <rect x="32" y="32" width="16" height="16" fill="#C79B6E" opacity="0.6"/>
                    </svg>
                  )}
                  {service.icon === 'tools' && (
                    <svg viewBox="0 0 64 64" width="64" height="64">
                      <rect x="20" y="12" width="6" height="40" fill="#C79B6E" opacity="0.6"/>
                      <rect x="38" y="12" width="6" height="40" fill="#C79B6E" opacity="0.6"/>
                      <rect x="14" y="26" width="36" height="6" fill="#C79B6E"/>
                    </svg>
                  )}
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <a href={service.link} className="service-link">
                  Ver más
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Completed Works Section */}
      <section className="works-section">
        <div className="container">
          <h2 className="section-title white">Trabajos realizados</h2>
          <p className="section-subtitle">
            Algunos de nuestros proyectos destacados en cielos, revestimientos y pisos
          </p>
          
          <ProjectCarousel />
        </div>
      </section>

      {/* 4. Products Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Nuestros Productos</h2>
          <p className="section-subtitle">
            Explora nuestro catálogo de cielos, revestimientos y pisos
          </p>

          {/* Category Filters */}
          <div className="category-filters">
            <button 
              className={`filter-btn ${activeCategory === 'todos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('todos')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'cielos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('cielos')}
            >
              Cielos Americanos
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'revestimientos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('revestimientos')}
            >
              Revestimientos
            </button>
            <button 
              className={`filter-btn ${activeCategory === 'pisos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('pisos')}
            >
              Pisos
            </button>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                unit={product.unit}
                image={product.image}
                inStock={product.inStock}
                stock={product.stock}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
