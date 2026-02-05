'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credenciales simples (después puedes cambiarlas por base de datos)
  const ADMIN_EMAIL = 'admin@eleva.cl';
  const ADMIN_PASSWORD = 'eleva2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación simple
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Guardar sesión en localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      // Redirigir al panel de administración
      setTimeout(() => {
        router.push('/productos');
      }, 500);
    } else {
      setError('Credenciales incorrectas');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#334155] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-16">
            <Image
              src="/img/publiclogo.png"
              alt="Eleva"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          Acceso Trabajadores
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ingresa tus credenciales para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none transition text-slate-900"
              placeholder="tu@email.com"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none transition text-slate-900"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e40af] text-white py-3 rounded-lg font-semibold hover:bg-[#1e3a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Info de credenciales (eliminar en producción) */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-semibold mb-2">
            Credenciales de prueba:
          </p>
          <p className="text-xs text-blue-700">
            Email: admin@eleva.cl<br />
            Password: eleva2024
          </p>
        </div>

        {/* Volver */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-[#1e40af] transition-colors text-sm"
          >
            ← Volver al sitio
          </button>
        </div>
      </div>
    </div>
  );
}