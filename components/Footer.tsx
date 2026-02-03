'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Columna 1 - Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/img/publiclogo.png"
                alt="Eleva"
                width={140}
                height={50}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Expertos en instalación y venta de cielos falsos, revestimientos y pisos para todo tipo de proyectos.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4a574] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#proyectos" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Servicios */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nuestros Servicios</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                Cielos Americanos
              </li>
              <li className="text-gray-400 text-sm">
                Revestimientos
              </li>
              <li className="text-gray-400 text-sm">
                Pisos
              </li>
              <li className="text-gray-400 text-sm">
                Construcción
              </li>
              <li className="text-gray-400 text-sm">
                Remodelación
              </li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Talca, Región del Maule, Chile
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4a574] flex-shrink-0" />
                <a href="tel:+56912345678" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  +56 9 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4a574] flex-shrink-0" />
                <a href="mailto:contacto@eleva.cl" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
                  contacto@eleva.cl
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-white/10"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Eleva. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-400 hover:text-[#d4a574] transition-colors text-sm">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
