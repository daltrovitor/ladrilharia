"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";

const SLIDES = [
  {
    title: "Proposta Comercial",
    subtitle: "Desenvolvimento Web & Experiência Digital",
    client: "Ladrilharia",
    author: "Viraweb",
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-6 border border-gold/30">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 22H22L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
          Apresentação
        </span>
        <h1 className="font-serif text-5xl md:text-6xl text-cream mt-4 leading-tight font-light">
          Ladrilharia +{" "}
          <span className="font-serif italic font-normal text-gold">
            Viraweb
          </span>
        </h1>
        <p className="text-cream/55 text-xs md:text-sm mt-6 max-w-md tracking-wider uppercase font-semibold">
          Desenvolvimento de Plataforma Web sob Medida
        </p>
      </div>
    ),
  },
  {
    title: "O Desafio & Objetivos",
    subtitle: "Migração e Elevação de Marca",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
        <div className="md:col-span-6 space-y-6">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block">
            Diagnóstico
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream font-light leading-tight">
            Superando as Limitações do Wix
          </h2>
          <p className="text-cream/60 text-sm leading-relaxed">
            A antiga plataforma da Ladrilharia no Wix sofria com lentidão no
            carregamento, falta de SEO responsivo estruturado e limites graves
            de personalização visual.
          </p>
          <p className="text-cream/60 text-sm leading-relaxed">
            O objetivo foi reconstruir o site do zero, trazendo a sofisticação
            editorial do design da **BHL Ceramic** com carregamento instantâneo.
          </p>
        </div>
        <div className="md:col-span-6 bg-white/5 border border-cream/10 rounded-[2rem] p-8 space-y-4">
          <div className="border-l-2 border-gold pl-4">
            <h4 className="text-xs uppercase tracking-wider text-gold font-bold">
              Desempenho 100%
            </h4>
            <p className="text-cream/50 text-xs mt-1">
              Carregamento e navegação instantâneos via Next.js.
            </p>
          </div>
          <div className="border-l-2 border-gold pl-4">
            <h4 className="text-xs uppercase tracking-wider text-gold font-bold">
              Identidade Premium
            </h4>
            <p className="text-cream/50 text-xs mt-1">
              Cursor customizado inercial, tipografia editorial e grain effect.
            </p>
          </div>
          <div className="border-l-2 border-gold pl-4">
            <h4 className="text-xs uppercase tracking-wider text-gold font-bold">
              Conversão Comercial
            </h4>
            <p className="text-cream/50 text-xs mt-1">
              Downloads técnicos simplificados e simulador funcional.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Soluções Entregues",
    subtitle: "Arquitetura e Recursos Avançados",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <div className="bg-white/5 border border-cream/10 rounded-[2rem] p-6 flex flex-col justify-between">
          <div className="text-gold text-2xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-lg text-cream mb-2 font-medium">
              WhatsApp & UX/UI
            </h3>
            <p className="text-cream/50 text-xs leading-relaxed">
              Integração comercial direta com links formatados de orçamento no
              WhatsApp a partir do catálogo e do simulador. Animações fluidas
              com GSAP e Lenis.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-cream/10 rounded-[2rem] p-6 flex flex-col justify-between">
          <div className="text-gold text-2xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 21H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 17V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-lg text-cream mb-2 font-medium">
              SEO de Alta Performance
            </h3>
            <p className="text-cream/50 text-xs leading-relaxed">
              Estruturação completa de títulos, metatags, metadescrições
              otimizadas para busca e OpenGraph para compartilhamento social de
              alto engajamento.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-cream/10 rounded-[2rem] p-6 flex flex-col justify-between">
          <div className="text-gold text-2xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12L12 22Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-lg text-cream mb-2 font-medium">
              Hospedagem Gratuita
            </h3>
            <p className="text-cream/50 text-xs leading-relaxed">
              Configuração e deploy em nuvem (Vercel) com **custo zero
              permanente** de infraestrutura, vinculando-se diretamente ao
              domínio existente da Ladrilharia.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Orçamento e Investimento",
    subtitle: "Valor do Projeto & Condições",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
        <div className="md:col-span-6 space-y-6">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block">
            Financeiro
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream font-light leading-none">
            Investimento & Condições
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white/5 border border-cream/10 rounded-2xl p-4 hover:border-gold/30 transition-all duration-300">
              <span className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">
                À Vista
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-cream/50 font-serif">R$</span>
                <span className="font-serif text-3xl text-cream font-bold leading-none">
                  1.497
                </span>
              </div>
              <span className="text-[10px] text-cream/45 block mt-2">
                No Pix ou transferência bancária única
              </span>
            </div>

            <div className="bg-white/5 border border-cream/10 rounded-2xl p-4 hover:border-gold/30 transition-all duration-300">
              <span className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">
                Parcelado
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-cream/50 font-serif">10x</span>
                <span className="font-serif text-3xl text-cream font-bold leading-none">
                  185
                </span>
              </div>
              <span className="text-[10px] text-cream/45 block mt-2">
                Sem juros no cartão de crédito (Total: R$ 1.850)
              </span>
            </div>
          </div>

          <p className="text-cream/60 text-xs md:text-sm leading-relaxed">
            Incluso: Redesenho visual completo, Simulador dinâmico de
            paginações, Integração com WhatsApp, SEO otimizado, Hospedagem
            gratuita no domínio atual e 30 dias de suporte pós-lançamento.
          </p>
        </div>

        <div className="md:col-span-6 bg-white/5 border border-cream/10 rounded-[2rem] p-8 space-y-6">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold block">
            Pós-Lançamento
          </span>
          <h3 className="font-serif text-2xl text-cream font-light -mt-2">
            Manutenção & Evolução
          </h3>

          <div className="space-y-4">
            <div className="border-l-2 border-gold pl-4">
              <h4 className="text-xs uppercase tracking-wider text-gold font-bold">
                Plano de Manutenção
              </h4>
              <p className="text-cream/80 text-sm font-semibold mt-0.5">
                R$ 180 / mês
              </p>
              <p className="text-cream/50 text-xs mt-1">
                Para suporte técnico contínuo, atualizações de segurança e
                pequenos ajustes.
              </p>
            </div>

            <div className="border-t border-cream/10 pt-4 border-l-2 border-gold pl-4">
              <h4 className="text-xs uppercase tracking-wider text-gold font-bold">
                Combo de Mudanças
              </h4>
              <p className="text-cream/80 text-sm font-semibold mt-0.5">
                Opcional Sob Demanda
              </p>
              <p className="text-cream/50 text-xs mt-1">
                Se preferir não assinar mensalidade, você pode adquirir um combo
                fechado de alterações no site após um mês da entrega (projeto
                fechado).
              </p>
            </div>

            <div className="border-t border-cream/10 pt-4 border-l-2 border-cream/20 pl-4">
              <h4 className="text-xs uppercase tracking-wider text-cream/60 font-bold">
                Hospedagem & Infraestrutura
              </h4>
              <p className="text-cream/80 text-sm font-semibold mt-0.5">
                Custo Zero Permanente
              </p>
              <p className="text-cream/50 text-xs mt-1">
                Deploy gratuito e CDN global via Vercel vinculados ao domínio da
                Ladrilharia.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Sobre a Viraweb",
    subtitle: "Parceria Estruturada",
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4">
          Contato
        </span>
        <h2 className="font-serif text-4xl text-cream font-light mb-6">
          Prontos para{" "}
          <span className="font-serif italic font-normal text-gold">
            Publicação
          </span>
        </h2>
        <p className="text-cream/60 text-sm leading-relaxed mb-8">
          A equipe da Viraweb (viraweb.online) estruturou essa solução com
          dedicação total para entregar um produto de luxo que reflete os
          ladrilhos da Ladrilharia.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="magnetic px-6 py-3.5 rounded-full bg-gold text-coal text-xs uppercase tracking-widest font-bold hover:bg-cream hover:text-coal transition-all"
            data-cursor-text="Ver Site"
          >
            Acessar Site Ladrilharia
          </Link>
          <a
            href="https://wa.me/5562992466109"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic px-6 py-3.5 rounded-full border border-cream/20 text-cream text-xs uppercase tracking-widest font-bold hover:border-gold hover:text-gold transition-all"
            data-cursor-text="Estou Interessado(a)"
          >
            Estou Interessado(a)
          </a>
        </div>
      </div>
    ),
  },
];

export default function Proposal() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full bg-coal text-cream flex flex-col justify-between overflow-hidden relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Film Grain */}
      <div className="film-grain" />

      {/* Header Info */}
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center border-b border-cream/10 z-20">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
          Proposta Ladrilharia
        </span>
        <div className="text-[10px] uppercase tracking-[0.35em] text-cream/45 font-bold">
          Viraweb.online
        </div>
      </header>

      {/* Slide Content Frame */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col justify-center relative z-10">
        {/* Slide Counter */}
        <div className="absolute top-2 left-6 text-[10px] uppercase tracking-widest text-gold font-bold">
          Slide {currentSlide + 1} / {SLIDES.length}
        </div>

        {/* Dynamic slide render area */}
        <div className="w-full min-h-[400px] flex flex-col justify-center transition-all duration-500 ease-in-out opacity-100">
          <div className="mb-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              {SLIDES[currentSlide].subtitle}
            </span>
            <h3 className="font-serif text-xl text-cream/80 mt-1 font-light">
              {SLIDES[currentSlide].title}
            </h3>
          </div>
          <div className="mt-8 flex-1">{SLIDES[currentSlide].content}</div>
        </div>
      </main>

      {/* Slide Navigation Footer */}
      <footer className="w-full py-6 px-6 md:px-12 border-t border-cream/10 flex justify-between items-center z-20">
        <div className="text-[9px] uppercase tracking-widest text-cream/30">
          Use as setas do teclado para navegar
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="magnetic w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors bg-white/5"
            data-cursor-text="Voltar"
          >
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 9L1 5L5 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="magnetic w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors bg-white/5"
            data-cursor-text="Avançar"
          >
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9L5 5L1 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
