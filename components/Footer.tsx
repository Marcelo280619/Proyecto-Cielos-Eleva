export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-semibold text-[var(--eleva-blue)]">ELEVA</span> — Cielo americano y construcción.
          </p>
          <p className="text-slate-500">© {new Date().getFullYear()} ELEVA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
