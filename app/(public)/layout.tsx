import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ELEVA | Cielo Americano y Construcción",
  description: "Especialistas en cielo americano y trabajos de construcción.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="text-slate-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
