"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Me = { name: string; email: string } | null;

export default function Navbar() {
  const [me, setMe] = useState<Me>(null);

  useEffect(() => {
    fetch("/api/auth/me").then(async (r) => {
      if (!r.ok) return setMe(null);
      setMe(await r.json());
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="ELEVA" width={44} height={44} className="rounded" />
          <div className="leading-tight">
            <div className="font-extrabold tracking-wide text-[var(--eleva-blue)]">ELEVA</div>
            <div className="text-xs text-slate-600">Cielos • Revestimientos • Construcción</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:text-[var(--eleva-blue)]" href="/proyectos">Proyectos</Link>
          <Link className="hover:text-[var(--eleva-blue)]" href="/productos">Productos</Link>
          <Link className="hover:text-[var(--eleva-blue)]" href="/contacto">Contacto</Link>

          <span className="mx-1 h-5 w-px bg-slate-200" />

          {me ? (
            <>
              <Link className="rounded-md bg-[var(--eleva-blue)] px-3 py-2 text-white hover:opacity-95" href="/app">
                Mi panel
              </Link>
              <button
                className="rounded-md border px-3 py-2 hover:bg-slate-50"
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  location.href = "/";
                }}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link className="rounded-md border px-3 py-2 hover:bg-slate-50" href="/auth/login">
                Entrar
              </Link>
              <Link className="rounded-md bg-[var(--eleva-blue)] px-3 py-2 text-white hover:opacity-95" href="/auth/registro">
                Registrarme
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
