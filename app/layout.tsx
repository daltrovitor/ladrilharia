import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Ladrilho Hidráulico | Ladrilharia | Brasília, Brasil",
  description:
    "Ateliê artesanal de ladrilhos hidráulicos e azulejos autorais. Curadoria artística contemporânea inspirada na arquitetura de Brasília, com personalização sob medida e mínimo impacto ambiental.",
  keywords: [
    "ladrilho hidráulico",
    "ladrilharia",
    "azulejo",
    "ladrilhos artesanais",
    "arquitetura brasília",
    "revestimento cimentício",
  ],
  authors: [{ name: "Ladrilharia" }],
  icons: {
    icon: "https://static.wixstatic.com/media/58320f_f522652d03cd44f3b5be5e112d1bc64c%7Emv2.jpg",
  },
  openGraph: {
    title: "Ladrilho Hidráulico | Ladrilharia",
    description:
      "Ateliê de ladrilhos hidráulicos artesanais com curadoria contemporânea inspirada na arquitetura de Brasília.",
    url: "https://www.ladrilharia.com",
    siteName: "Ladrilharia",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-cream text-coal overflow-x-hidden selection:bg-gold selection:text-white">
        {/* Global Smooth Scroll */}
        <SmoothScroll />

        {/* Preloader Screen */}
        <Preloader />

        {/* Dynamic Custom Cursor */}
        <CustomCursor />

        {/* Shifting Film Grain Noise */}
        <div className="film-grain" />

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
