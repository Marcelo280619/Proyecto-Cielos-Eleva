'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, FileText, User, LogIn } from 'lucide-react';

const navLinks = [
  { label: 'Inicio',     href: '/'          },
  { label: 'Servicios',  href: '/servicios' },
  { label: 'Proyectos',  href: '/proyectos' },
  { label: 'Productos',  href: '/productos' },
  { label: 'Contacto',   href: '/contacto'  },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled
    ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20'
    : 'bg-transparent';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}
        style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
      >
        <div className="max-w-[1280px] mx-auto px-8 max-sm:px-4 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-9 h-9">
              <Image src="/img/publiclogo.png" alt="ELEVA" fill className="object-contain" />
            </div>
            <span
              className="text-white font-black text-base tracking-wide uppercase hidden sm:block"
              style={{ letterSpacing: '0.08em' }}
            >
              Cielos Eleva SpA
            </span>
          </Link>

          {/* Nav links — desktop center */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-slate-300 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-white/8"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 ml-auto shrink-0">

            {/* Registrarse */}
            <Link
              href="/register"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-white/8"
            >
              <User className="w-4 h-4" />
              Registrarse
            </Link>

            {/* Divider */}
            <span className="text-slate-600 text-lg select-none">|</span>

            {/* Inicio sesión */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-white/8"
            >
              <LogIn className="w-4 h-4" />
              Inicio sesión
            </Link>

            {/* Cotizar CTA */}
            <Link
              href="/quote"
              className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 ml-2"
              style={{ background: 'linear-gradient(135deg, #d4a574 0%, #c89563 100%)', letterSpacing: '0.1em' }}
            >
              <FileText className="w-3.5 h-3.5" />
              Cotizar ahora
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden ml-auto text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-md flex flex-col pt-16">
          <nav className="flex flex-col gap-1 p-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-200 hover:text-white text-lg font-semibold px-4 py-3 rounded-xl hover:bg-white/8 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-4" />
            <Link href="/register" onClick={() => setOpen(false)} className="flex items-center gap-2 text-slate-300 hover:text-white text-base font-semibold px-4 py-3 rounded-xl hover:bg-white/8 transition-colors">
              <User className="w-4 h-4" /> Registrarse
            </Link>
            <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 text-slate-300 hover:text-white text-base font-semibold px-4 py-3 rounded-xl hover:bg-white/8 transition-colors">
              <LogIn className="w-4 h-4" /> Inicio sesión
            </Link>
            <Link href="/quote" onClick={() => setOpen(false)} className="btn btn-gold justify-center mt-4">
              <FileText className="w-4 h-4" /> Cotizar ahora
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}