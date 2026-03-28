import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Hero.css';

const stats = [
  { num: '+500', label: 'Proyectos realizados' },
  { num: '+10',  label: 'Años de experiencia'  },
  { num: '100%', label: 'Clientes satisfechos' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-inner">

        {/* ── Left: text content ── */}
        <div className="hero-left">

          {/* Badge */}
          <div className="hero-badge">
            {/* Star icon inline SVG — no external dep */}
            <svg className="hero-badge-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="hero-badge-text">Expertos en cielos y revestimientos</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            SOLUCIONES EN<br />
            CONSTRUCCIÓN<br />
            <span className="hero-title-accent">Y CIELOS</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Expertos en instalación y venta de cielos falsos,
            revestimientos y pisos para todo tipo de proyectos.
          </p>

          {/* CTA buttons */}
          <div className="hero-buttons">
            <Link href="/contacto" className="hero-btn hero-btn--gold">
              Contáctanos
            </Link>
            <Link href="/proyectos" className="hero-btn hero-btn--outline">
              Ver Proyectos
              {/* Chevron */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="hero-stat__num">{s.num}</div>
                <div className="hero-stat__label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Right: logo (smaller, per client) ── */}
        <div className="hero-right" aria-hidden="true">
          <Image
            src="/img/publiclogo.png"
            alt="ELEVA"
            fill
            className="hero-logo-img"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

      </div>

      {/* Bottom accent */}
      <div className="hero-accent" />
    </section>
  );
}