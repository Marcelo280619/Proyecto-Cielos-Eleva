"use client";

import Image from "next/image";
import { projects } from "@/lib/data";

export default function ProjectCarousel() {
  const items = [...projects, ...projects];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
        {items.map((p, idx) => (
          <div key={`${p.id}-${idx}`} className="min-w-[260px] overflow-hidden rounded-xl border bg-slate-50">
            <div className="relative h-36 w-full">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <div className="font-semibold">{p.title}</div>
              {p.location && <div className="text-sm text-slate-600">{p.location}</div>}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
