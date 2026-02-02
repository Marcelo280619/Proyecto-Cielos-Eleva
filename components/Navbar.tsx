// src/components/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" id="navbar">
      <div className="container nav-container">
        <div className="logo">
          <i className="fas fa-building"></i>
          <span>CONSTRUCCIÓN<strong>PRO</strong></span>
        </div>

        <ul className="nav-menu" id="navMenu">
          <li><a href="#inicio" className="nav-link active">Inicio</a></li>
          <li><a href="#servicios" className="nav-link">Servicios</a></li>
          <li><a href="#proyectos" className="nav-link">Proyectos</a></li>
          <li><a href="#productos" className="nav-link">Productos</a></li>
          <li><a href="#testimonios" className="nav-link">Testimonios</a></li>
          <li><a href="#faq" className="nav-link">FAQ</a></li>
          <li><a href="#contacto" className="nav-link">Contacto</a></li>
        </ul>

        <button className="nav-toggle" id="navToggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
