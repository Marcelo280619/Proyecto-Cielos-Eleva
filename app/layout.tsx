import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eleva - Cielos Americanos",
  description: "Expertos en instalación y venta de cielos falsos, revestimientos y pisos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}