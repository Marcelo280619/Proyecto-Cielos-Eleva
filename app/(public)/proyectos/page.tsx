import Image from "next/image";
import { projects } from "@/lib/data";

export default function ProyectosPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-[var(--eleva-blue)]">Proyectos</h1>
      <p className="mt-2 text-slate-600">
        Algunos trabajos realizados por ELEVA (cielo americano y construcción).
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative h-44 w-full">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="font-bold">{p.title}</div>
              {p.location && <div className="text-sm text-slate-600">{p.location}</div>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
