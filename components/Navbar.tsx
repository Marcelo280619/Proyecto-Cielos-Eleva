'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '/productos', label: 'Productos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 shadow-sm shadow-slate-200/80 backdrop-blur-md py-2.5'
          : 'bg-white/95 backdrop-blur-sm py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative w-28 h-11 sm:w-32 sm:h-12">
              <Image
                src="/img/publiclogo.png"
                alt="Eleva"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors rounded-lg hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/quote"
              className="px-5 py-2.5 bg-[#d4a574] hover:bg-[#c89563] text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-amber-200 hover:-translate-y-0.5"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-slate-100 pt-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium rounded-xl transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-6 py-3 bg-[#d4a574] text-white rounded-xl font-semibold hover:bg-[#c89563] transition-colors text-sm"
                >
                  Cotizar
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
