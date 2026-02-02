// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo">
              <i className="fas fa-building"></i>
              <span>CONSTRUCCIÓN<strong>PRO</strong></span>
            </div>
            <p>Expertos en soluciones integrales de construcción, cielos americanos y revestimientos.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Cielos Americanos</a></li>
              <li><a href="#servicios">Revestimientos</a></li>
              <li><a href="#servicios">Pisos</a></li>
              <li><a href="#servicios">Proyectos Completos</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#proyectos">Proyectos</a></li>
              <li><a href="#testimonios">Testimonios</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><i className="fas fa-phone"></i> +56 9 1234 5678</li>
              <li><i className="fas fa-envelope"></i> contacto@construccionpro.cl</li>
              <li><i className="fas fa-map-marker-alt"></i> Av. Providencia 1234, Santiago</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 ConstrucciónPro. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#">Política de Privacidad</a>
            <span>|</span>
            <a href="#">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
