'use client';

import React, { useState, useRef, useEffect } from 'react';
import './ProjectCarousel.css';

const projects = [
  {
    id: 1,
    image: '/img/proy-1.jpg',
    title: 'Oficinas Corporativas',
    category: 'Cielos Americanos'
  },
  {
    id: 2,
    image: '/img/proy-2.jpg',
    title: 'Centro Comercial',
    category: 'Revestimientos'
  },
  {
    id: 3,
    image: '/img/proy-3.jpg',
    title: 'Espacio de Trabajo',
    category: 'Pisos y Cielos'
  },
  {
    id: 4,
    image: '/img/proy-4.jpg',
    title: 'Edificio de Oficinas',
    category: 'Cielos Acústicos'
  }
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Calculate visible projects (show 3 on desktop, 1 on mobile)
  const getVisibleProjects = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const visibleCount = isMobile ? 1 : 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % projects.length;
      result.push(projects[index]);
    }
    
    return result;
  };

  return (
    <div className="project-carousel">
      <div className="carousel-container" ref={carouselRef}>
        {/* Previous Button */}
        <button 
          className="carousel-arrow carousel-arrow-prev"
          onClick={handlePrev}
          aria-label="Previous project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Carousel Track */}
        <div className="carousel-track">
          {getVisibleProjects().map((project, idx) => (
            <div key={`${project.id}-${idx}`} className="carousel-slide">
              <div className="project-card">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23e2e8f0" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%2364748b" font-size="24" font-family="Arial"%3EProyecto%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="project-overlay">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button 
          className="carousel-arrow carousel-arrow-next"
          onClick={handleNext}
          aria-label="Next project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="carousel-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
