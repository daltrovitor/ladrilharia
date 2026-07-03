"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add lock class to body
    document.body.classList.add("preloading");

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            document.body.classList.remove("preloading");
          }, 800); // Wait for the 100% to settle
          return 100;
        }
        // Increment progress with slight randomness for realistic feel
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => {
      clearInterval(timer);
      document.body.classList.remove("preloading");
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 bg-coal z-[99999] flex flex-col justify-between p-12 md:p-24 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        progress === 100 ? "translate-y-[-100%]" : ""
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-cream/40 text-xs font-semibold tracking-[0.2em] uppercase">
        <div>Ateliê de Ladrilhos Hidráulicos</div>
        <div>Brasília, DF</div>
      </div>

      {/* Middle Logo Accent */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h2
          className="text-cream text-4xl md:text-6xl font-serif tracking-[0.3em] uppercase select-none transition-all duration-1000 ease-out"
          style={{
            opacity: progress / 100,
            transform: `scale(${0.95 + (progress / 100) * 0.05})`,
          }}
        >
          Ladrilharia
        </h2>
        <p
          className="text-gold text-xs font-sans tracking-[0.4em] uppercase mt-4 select-none transition-all duration-1000 ease-out"
          style={{
            opacity: Math.max(0, (progress - 40) / 60),
            transform: `translateY(${(100 - progress) * 0.2}px)`,
          }}
        >
          Curadoria Contemporânea
        </p>
      </div>

      {/* Bottom Counter */}
      <div className="flex justify-between items-end border-t border-cream/10 pt-8">
        <div className="text-cream/30 text-[10px] uppercase tracking-[0.2em]">
          Carregando Universo Artesanal...
        </div>
        <div className="text-cream font-serif text-6xl md:text-8xl font-light select-none tabular-nums tracking-tighter">
          {progress}
          <span className="text-gold text-2xl md:text-3xl ml-1 font-sans font-light">%</span>
        </div>
      </div>
    </div>
  );
}
