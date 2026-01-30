import Link from "next/link";

export default function PanelPage() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-extrabold text-[var(--eleva-blue)]">Mi panel</h1>
      <p className="mt-2 text-slate-600">
        Desde aquí podrás armar tu carrito y enviar tu solicitud a la empresa.
      </p>

      <div className="mt-5 flex gap-3">
        <Link className="rounded-lg bg-[var(--eleva-blue)] px-4 py-2 text-white hover:opacity-95" href="/app/carrito">
          Ir al carrito
        </Link>
        <Link className="rounded-lg border px-4 py-2 hover:bg-slate-50" href="/productos">
          Seguir vitrineando
        </Link>
      </div>
    </div>
  );
}
