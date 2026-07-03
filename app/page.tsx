"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CatalogSlider, { TILE_DATA, TileItem } from "@/components/CatalogSlider";
import GSAPWrapper from "@/components/GSAPWrapper";

// Artist collections
const ARTIST_DATA = [
  {
    name: "Superquadra",
    author: "Gabriella Dowling",
    img: "58320f_e252336c3b834bb48dcf16649246ebc8~mv2.jpeg",
  },
  {
    name: "Tangram",
    author: "Giulianno Camatta",
    img: "58320f_0e26644b7dd948019baad782e7785b7c~mv2.jpg",
  },
  {
    name: "Onírica",
    author: "Michell Lott",
    img: "58320f_25159d3aab564141bba2ca1518b82be2~mv2.jpg",
  },
  {
    name: "Onda",
    author: "Vanessa Cavalcante",
    img: "58320f_70691f93d11f4048ba82837ba1216ef8~mv2.jpg",
  },
  {
    name: "Jasmin Manga",
    author: "Cazul Arq. & Sarah Amorim",
    img: "58320f_8b0f0d23888e4631976a16501c10f9ec~mv2.jpg",
  },
  {
    name: "Folha",
    author: "Marina Horta",
    img: "58320f_dc678d590394431a9dccfe9c5a57f13f~mv2.jpg",
  },
  {
    name: "Andorinha",
    author: "Flávia Del Negro",
    img: "58320f_fa645ea048824180a74795d88612fc11~mv2.jpg",
  },
  {
    name: "Eremita",
    author: "Luciano Costa",
    img: "58320f_8bdd69cc364d4a8db96776e776386a6d~mv2.jpg",
  },
];

// Color simulation palette for the modal
const SIMULATOR_COLORS = [
  { name: "Original", filter: "none", hex: "#E3D5C1" },
  {
    name: "Carvão",
    filter: "invert(0.9) brightness(0.25) contrast(1.5)",
    hex: "#191D1C",
  },
  {
    name: "Ouro",
    filter: "sepia(0.8) saturate(1.8) hue-rotate(10deg) brightness(0.9)",
    hex: "#AF966D",
  },
  {
    name: "Terracota",
    filter: "sepia(0.8) saturate(2) hue-rotate(-25deg) brightness(0.7)",
    hex: "#8C4C3E",
  },
  {
    name: "Verde Sálvia",
    filter: "sepia(0.6) saturate(1.2) hue-rotate(60deg) brightness(0.85)",
    hex: "#7A8C8E",
  },
  {
    name: "Azul Profundo",
    filter: "sepia(0.6) saturate(1.2) hue-rotate(165deg) brightness(0.75)",
    hex: "#3E4B4F",
  },
  {
    name: "Areia",
    filter: "sepia(0.4) saturate(0.5) brightness(1.0)",
    hex: "#BDB8B4",
  },
];

export default function Home() {
  const [selectedTile, setSelectedTile] = useState<TileItem | null>(null);
  const [simColor, setSimColor] = useState(SIMULATOR_COLORS[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle tile click to open modal
  const openTileModal = (tile: TileItem) => {
    setSelectedTile(tile);
    setSimColor(SIMULATOR_COLORS[0]); // Reset to original color
  };

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      {/* GSAP Scroll Anim Coordinator */}
      <GSAPWrapper />

      {/* 1. Header Navigation Bar (Floating Glass Pill) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl bg-coal/80 backdrop-blur-md rounded-full px-6 py-4 border border-cream/10 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
        <a
          href="#"
          className="font-serif text-xl tracking-[0.25em] text-cream uppercase hover:text-gold transition-colors duration-300 select-none magnetic"
          data-cursor-text="Início"
        >
          Ladrilharia
        </a>

        <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-semibold text-cream/70">
          <a
            href="#linhas"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Catalog"
          >
            Linhas
          </a>
          <a
            href="#artistas"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Artistas"
          >
            Artistas
          </a>
          <a
            href="#azulejos"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Azulejos"
          >
            Azulejos
          </a>
          <a
            href="#fotos"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Galeria"
          >
            Fotos
          </a>
          <a
            href="#personalizacao"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Processo"
          >
            Personalização
          </a>
          <a
            href="#downloads"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Arquivos"
          >
            Técnico
          </a>
          <a
            href="#contato"
            className="hover:text-cream transition-colors duration-300"
            data-cursor-text="Contato"
          >
            Contato
          </a>
        </div>

        <Link
          href="/simulador"
          className="hidden md:block magnetic px-5 py-2.5 rounded-full bg-gold text-coal text-xs uppercase tracking-[0.15em] font-bold hover:bg-cream hover:text-coal transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          data-cursor-text="Simular"
        >
          Simulador
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden text-cream hover:text-gold transition-colors focus:outline-none z-50 p-2"
          aria-label="Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span
              className={`w-6 h-[2px] bg-current rounded transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-current rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-current rounded transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-coal/98 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="absolute inset-0 bg-radial-at-t from-gold/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col items-center gap-6 z-10 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-2">
            Navegação
          </span>
          <a
            href="#linhas"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Linhas
          </a>
          <a
            href="#artistas"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Artistas
          </a>
          <a
            href="#azulejos"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Azulejos
          </a>
          <a
            href="#fotos"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Projetos
          </a>
          <a
            href="#personalizacao"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Personalização
          </a>
          <a
            href="#downloads"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Técnico
          </a>
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-cream hover:text-gold transition-colors duration-300"
          >
            Contato
          </a>

          <div className="w-16 h-[1px] bg-cream/10 my-2" />

          <Link
            href="/simulador"
            onClick={() => setMenuOpen(false)}
            className="px-8 py-3 rounded-full bg-gold text-coal text-xs uppercase tracking-[0.2em] font-bold hover:bg-cream hover:text-coal transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          >
            Simulador
          </Link>
        </div>
      </div>

      {/* 2. Hero Section */}
      <header className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-32 pb-16 px-6 md:px-24">
        <div className="absolute inset-0 bg-radial-at-t from-gold/5 via-cream to-cream pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <h1 className="hero-anim-item translate-y-8 opacity-0 font-serif text-5xl md:text-7xl lg:text-[4.75rem] text-coal font-light leading-[1.08] tracking-tighter max-w-3xl">
              Luxo{" "}
              <span className="font-serif italic text-gold font-normal">
                Artesanal
              </span>{" "}
              que molda o concreto em arte.
            </h1>

            <p className="hero-anim-item translate-y-8 opacity-0 text-coal/60 text-sm md:text-base max-w-lg mt-8 leading-relaxed font-medium">
              Curadoria contemporânea e produção manual inspiradas na
              arquitetura monumental de Brasília. Desenvolvemos peças exclusivas
              que agregam plasticidade, textura e alma aos seus ambientes.
            </p>

            <div className="hero-anim-item translate-y-8 opacity-0 flex flex-wrap gap-4 mt-10">
              <a
                href="#linhas"
                className="magnetic px-7 py-4 rounded-full bg-coal text-cream text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-coal transition-all duration-300"
                data-cursor-text="Explorar"
              >
                Conhecer Linhas
              </a>
              <Link
                href="/simulador"
                className="magnetic px-7 py-4 rounded-full border border-coal/10 text-coal text-xs uppercase tracking-[0.2em] font-bold hover:border-gold hover:text-gold transition-all duration-300"
                data-cursor-text="Customizar"
              >
                Criar Paginação
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center hero-anim-item translate-y-8 opacity-0">
            <div className="parallax-img-wrapper relative w-[85%] aspect-[3/4] bg-white border border-coal/5 rounded-[2.5rem] p-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.06)] hover:scale-[1.005] transition-transform duration-700">
              <div className="relative w-full h-full bg-cream rounded-[calc(2.5rem-0.875rem)] overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/58320f_bf561a9c61ce458286d85c05afefa981~mv2.jpg"
                  alt="Ladrilho Hidráulico Artesanal"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-coal/30 select-none">
          <span>Deslize</span>
          <div className="w-[1px] h-8 bg-coal/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-bounce" />
          </div>
        </div>
      </header>

      {/* 3. Quem Somos Section */}
      <section
        id="sobre"
        className="py-24 md:py-40 bg-white border-t border-coal/5 relative w-full px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col items-start scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-4">
              Nossa Origem
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-coal font-light leading-tight">
              Idealizado por Arquitetos,{" "}
              <span className="font-serif italic font-normal text-gold">
                Moldado por Mãos
              </span>
              .
            </h2>
            <div className="text-coal/70 text-sm md:text-base mt-8 space-y-6 leading-relaxed font-medium">
              <p>
                A <strong>Ladrilharia</strong> funciona em um ateliê no SOF Sul,
                Brasília, próximo ao Casa Park. Nascemos da paixão de três
                arquitetos pela plasticidade histórica do ladrilho hidráulico e
                pela arquitetura modernista da capital federal.
              </p>
              <p>
                Nossos ladrilhos são confeccionados de forma 100% manual,
                utilizando cimento e pigmentos especiais prensados
                individualmente. Esse material de revestimento clássico, lançado
                na Exposição Universal de Paris em 1867, possui altíssima
                resistência à abrasão e grande durabilidade.
              </p>
              <p>
                Combinamos a técnica artesanal tradicional de fabricação com
                métodos de modelagem modernos e linguagem estética
                contemporânea. Tudo isso com{" "}
                <strong>baixo impacto ambiental</strong>: por não sofrerem
                queima, geram emissões mínimas de CO₂. Além disso, mantemos em
                nossa fábrica um sistema de filtragem rigoroso dos resíduos de
                cimento e lavagem de pigmentos.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full min-h-[450px] flex items-center justify-center">
            <div className="bento-card relative w-[70%] aspect-square rounded-[2rem] overflow-hidden border border-coal/5 shadow-lg left-[-10%] z-10">
              <Image
                src="https://static.wixstatic.com/media/58320f_3109141b89d4481abe52e889b3808204~mv2.jpg"
                alt="Produção Manual Ladrilhos"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

            <div
              className="bento-card absolute w-[50%] aspect-square rounded-[2rem] overflow-hidden border border-coal/5 shadow-md right-[5%] bottom-[-5%] z-0"
              data-parallax-speed="0.8"
            >
              <Image
                src="https://static.wixstatic.com/media/58320f_30c750d99e0b461694a08c8fe702cef5~mv2_d_9732_1617_s_2.jpg"
                alt="Modelos de Ladrilhos"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Swiper Catalog Slider (Linhas) */}
      <section
        id="linhas"
        className="py-24 bg-cream border-t border-coal/5 overflow-hidden w-full"
      >
        <CatalogSlider onSelectTile={openTileModal} />
      </section>

      {/* 5. Artistas Section (New) */}
      <section
        id="artistas"
        className="py-24 md:py-40 bg-white border-t border-coal/5 w-full px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start mb-16 scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Colaborações
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-coal font-light mt-2 leading-tight">
              Linhas de{" "}
              <span className="font-serif italic font-normal text-gold">
                Artistas
              </span>
            </h2>
            <p className="text-coal/50 text-sm md:text-base mt-4 max-w-2xl leading-relaxed font-medium">
              Peças autorais contemporâneas criadas em parceria com renomados
              arquitetos, designers e artistas visuais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ARTIST_DATA.map((art, idx) => (
              <div
                key={idx}
                className="bento-card bg-cream border border-coal/5 rounded-[2.5rem] p-4 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-500 shadow-sm"
                data-cursor-text="Design Autoral"
              >
                <div className="relative w-full aspect-square bg-white rounded-[2rem] overflow-hidden border border-coal/5">
                  <Image
                    src={`https://static.wixstatic.com/media/${art.img}`}
                    alt={art.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 px-2">
                  <h4 className="font-serif text-xl text-coal font-medium">
                    {art.name}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-gold font-bold mt-1">
                    por {art.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Azulejos Section (New) */}
      <section
        id="azulejos"
        className="py-24 md:py-40 bg-cream border-t border-coal/5 w-full px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative w-full flex justify-center scroll-fade-up">
            <div className="relative w-[85%] aspect-square bg-white border border-coal/5 rounded-[2.5rem] p-3.5 shadow-lg">
              <div className="relative w-full h-full bg-cream rounded-[calc(2.5rem-0.875rem)] overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/58320f_ece65ace29924656ab9276e68e77e1fa~mv2.jpg"
                  alt="Azulejos Cerâmicos"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-4">
              Novidade
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-coal font-light leading-tight">
              Muitas linhas também como{" "}
              <span className="font-serif italic font-normal text-gold">
                Azulejos
              </span>
              .
            </h2>
            <div className="text-coal/70 text-sm md:text-base mt-8 space-y-6 leading-relaxed font-medium">
              <p>
                O processo de produção dos azulejos é diferente dos ladrilhos,
                pois são peças cerâmicas que sofrem queima, tornando-as menos
                porosas. Ambos materiais possuem qualidades distintas e são
                indicadas para finalidades diferentes.
              </p>
              <p>
                Oferecemos a possibilidade de estampar suas cores favoritas em
                cerâmica. Fale conosco para conhecer as opções disponíveis de
                estampagem de azulejos sob consulta.
              </p>
            </div>
            <Link
              href="/simulador"
              className="magnetic px-7 py-4 mt-8 rounded-full bg-coal text-cream text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-coal transition-all duration-300"
              data-cursor-text="Ir Simulador"
            >
              Simular Estampas
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Fotos Section (Horizontal Scroll Gallery - Direction Change) */}
      <section
        id="fotos"
        className="relative w-full overflow-hidden bg-coal py-24 border-t border-cream/5"
      >
        <div className="horizontal-gallery-wrapper flex flex-col justify-center min-h-screen">
          <div className="px-6 md:px-24 mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Galeria
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-cream mt-2 leading-tight">
              Projetos{" "}
              <span className="font-serif italic font-normal text-gold">
                Executados
              </span>
            </h2>
          </div>

          <div className="horizontal-gallery-container overflow-x-auto md:overflow-hidden no-scrollbar w-full relative">
            <div className="horizontal-gallery-track flex gap-8 w-max px-6 md:px-24">
              <div
                className="w-[300px] md:w-[500px] aspect-[4/3] bg-white/5 border border-cream/10 rounded-[2.5rem] overflow-hidden relative flex-shrink-0"
                data-cursor-text="Olhar Projeto"
              >
                <Image
                  src="https://static.wixstatic.com/media/58320f_bf561a9c61ce458286d85c05afefa981~mv2.jpg"
                  alt="Projeto Ladrilharia 1"
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div
                className="w-[300px] md:w-[500px] aspect-[4/3] bg-white/5 border border-cream/10 rounded-[2.5rem] overflow-hidden relative flex-shrink-0"
                data-cursor-text="Olhar Projeto"
              >
                <Image
                  src="https://static.wixstatic.com/media/58320f_30c750d99e0b461694a08c8fe702cef5~mv2_d_9732_1617_s_2.jpg"
                  alt="Projeto Ladrilharia 2"
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div
                className="w-[300px] md:w-[500px] aspect-[4/3] bg-white/5 border border-cream/10 rounded-[2.5rem] overflow-hidden relative flex-shrink-0"
                data-cursor-text="Olhar Projeto"
              >
                <Image
                  src="https://static.wixstatic.com/media/58320f_3109141b89d4481abe52e889b3808204~mv2.jpg"
                  alt="Projeto Ladrilharia 3"
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>

              <div
                className="w-[300px] md:w-[500px] aspect-[4/3] bg-white/5 border border-cream/10 rounded-[2.5rem] overflow-hidden relative flex-shrink-0"
                data-cursor-text="Olhar Projeto"
              >
                <Image
                  src="https://static.wixstatic.com/media/58320f_0660234b66764ec89e12baece166d2da~mv2.jpg"
                  alt="Projeto Ladrilharia 4"
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Vídeos Section (New) */}
      <section
        id="videos"
        className="py-24 md:py-32 bg-white border-t border-coal/5 w-full px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Produção
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-coal font-light mt-2 leading-tight">
              A Arte do{" "}
              <span className="font-serif italic font-normal text-gold">
                Ofício
              </span>
            </h2>
            <p className="text-coal/60 text-sm mt-6 leading-relaxed font-medium">
              Confira os bastidores do nosso ateliê, onde cada peça é moldada à
              mão seguindo a técnica centenária de fabricação de ladrilhos
              cimentícios.
            </p>
          </div>
          <div className="lg:col-span-7 scroll-fade-up">
            <div
              className="relative w-full aspect-video bg-cream rounded-[2.5rem] overflow-hidden border border-coal/10 flex items-center justify-center cursor-none group shadow-lg"
              data-cursor-text="Assistir"
            >
              <Image
                src="https://static.wixstatic.com/media/58320f_bf561a9c61ce458286d85c05afefa981~mv2.jpg"
                alt="Vídeo Showroom"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              {/* Play Button Overlay */}
              <div className="w-16 h-16 rounded-full bg-gold/90 text-coal flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path d="M0 0 L18 10 L0 20 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Bento Grid Section (Personalização) */}
      <section
        id="personalizacao"
        className="py-24 md:py-40 bg-white border-t border-coal/5 w-full px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start mb-16 scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Flexibilidade
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-coal font-light mt-2 leading-tight">
              Sob Medida:{" "}
              <span className="font-serif italic font-normal text-gold">
                Três Escalas
              </span>{" "}
              de Personalização
            </h2>
            <p className="text-coal/50 text-sm md:text-base mt-4 max-w-2xl leading-relaxed font-medium">
              Oferecemos total versatilidade para que o seu revestimento
              responda perfeitamente ao projeto arquitetônico proposto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 grid-flow-row-dense">
            <div className="bento-card md:col-span-8 bg-cream border border-coal/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between min-h-[350px] shadow-sm hover:scale-[1.005] transition-all duration-500">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
                  Escala 01
                </span>
                <h3 className="font-serif text-3xl text-coal mt-6 font-light">
                  Paleta de Cores
                </h3>
                <p className="text-coal/60 text-sm mt-4 max-w-xl leading-relaxed font-medium">
                  Todas as linhas do nosso catálogo podem ser livremente
                  adaptadas para as cores de nossa paleta. Isso permite criar
                  milhares de composições de cores únicas a partir de um único
                  molde.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  "#AF966D",
                  "#191D1C",
                  "#BDB8B4",
                  "#3E4B4F",
                  "#7A8C8E",
                  "#D7C4A5",
                  "#8C4C3E",
                  "#E3D5C1",
                ].map((color, idx) => (
                  <div key={idx} className="group relative">
                    <div
                      className="w-10 h-10 rounded-full border border-coal/10 shadow-sm cursor-none transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bento-card md:col-span-4 bg-coal border border-cream/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between min-h-[350px] text-cream shadow-lg hover:scale-[1.005] transition-all duration-500">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/20 px-3 py-1 rounded-full">
                  Escala 02
                </span>
                <h3 className="font-serif text-3xl text-cream mt-6 font-light">
                  Paginação
                </h3>
                <p className="text-cream/60 text-sm mt-4 leading-relaxed font-medium">
                  Os nossos moldes geométricos podem ser rotacionados e
                  intercalados para criar painéis artísticos dinâmicos.
                  Oferecemos o desenvolvimento do projeto de paginação opcional
                  para o seu pedido.
                </p>
              </div>
              <Link
                href="/simulador"
                className="text-gold text-xs uppercase tracking-widest font-bold flex items-center gap-2 select-none"
              >
                Testar no Simulador
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11L11 1M11 1H3M11 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="bento-card md:col-span-4 bg-coal border border-cream/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between min-h-[350px] text-cream shadow-lg hover:scale-[1.005] transition-all duration-500">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/20 px-3 py-1 rounded-full">
                  Escala 03
                </span>
                <h3 className="font-serif text-3xl text-cream mt-6 font-light">
                  Desenhos Autorais
                </h3>
                <p className="text-cream/60 text-sm mt-4 leading-relaxed font-medium">
                  Produzimos moldes personalizados sob encomenda através de
                  soldagem manual tradicional ou modelagem moderna 3D.
                  Reproduzimos logomarcas, painéis específicos e linhas
                  exclusivas de designers.
                </p>
              </div>
              <div className="text-gold text-xs uppercase tracking-widest font-bold select-none">
                Molde Personalizado
              </div>
            </div>

            <div className="bento-card md:col-span-8 bg-cream border border-coal/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 min-h-[350px] shadow-sm hover:scale-[1.005] transition-all duration-500">
              <div className="max-w-md">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
                  Diferencial
                </span>
                <h3 className="font-serif text-3xl text-coal mt-6 font-light">
                  Azulejos Ladrilharia
                </h3>
                <p className="text-coal/60 text-sm mt-4 leading-relaxed font-medium">
                  Muitas das nossas linhas de estampas podem ser produzidas
                  também no formato de azulejo cerâmico (que passa pelo processo
                  de queima). Por serem menos porosos, são indicados para
                  aplicações específicas. Consulte-nos sobre cores e
                  disponibilidades.
                </p>
              </div>
              <div className="relative w-40 h-40 bg-white border border-coal/10 rounded-[1.5rem] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="https://static.wixstatic.com/media/58320f_ece65ace29924656ab9276e68e77e1fa~mv2.jpg"
                  alt="Azulejos Ladrilharia"
                  fill
                  sizes="160px"
                  className="object-contain p-4 filter drop-shadow-md"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Technical Specifications & Downloads (Action) */}
      <section
        id="downloads"
        className="py-24 md:py-40 bg-cream border-t border-coal/5 w-full px-6 md:px-24"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col items-start scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Gabarito Técnico
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-coal font-light mt-2 leading-tight">
              Formatos e{" "}
              <span className="font-serif italic font-normal text-gold">
                Dimensões
              </span>
            </h2>
            <p className="text-coal/60 text-sm mt-6 leading-relaxed font-medium">
              Por serem peças artesanais, os ladrilhos apresentam pequenas
              variações naturais de espessura (de 18 a 20mm). A camada com o
              desenho possui cerca de 3mm de espessura, o que permite o
              lixamento sem danificar a peça.
            </p>

            <div className="w-full mt-10 space-y-4">
              <div className="flex justify-between items-center border-b border-coal/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-coal/50 font-bold">
                  Quadrados
                </span>
                <span className="text-sm font-semibold text-coal">
                  20x20 cm (25 peças/m²) / 15x15 cm
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-coal/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-coal/50 font-bold">
                  Retangulares
                </span>
                <span className="text-sm font-semibold text-coal">
                  10x20 cm
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-coal/10 pb-3">
                <span className="text-xs uppercase tracking-wider text-coal/50 font-bold">
                  Hexagonais
                </span>
                <span className="text-sm font-semibold text-coal">
                  15x17 cm / 11x13 cm
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center scroll-fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-6">
              Documentação para download
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://www.ladrilharia.com/_files/ugd/58320f_00f6525caee0435eabed0cd14f4d43d0.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group bg-white border border-coal/5 hover:border-gold p-6 rounded-[2rem] flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                data-cursor-text="Baixar PDF"
              >
                <div className="text-gold text-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15V3M12 15L8 11M12 15L16 11M2 17V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-coal group-hover:text-gold transition-colors duration-300">
                    Catálogo Completo
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-coal/40 font-bold">
                    Visualizar Catálogo
                  </span>
                </div>
              </a>

              <a
                href="https://www.ladrilharia.com/_files/ugd/58320f_89e3672903f7484d92a86e83380f2e80.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group bg-white border border-coal/5 hover:border-gold p-6 rounded-[2rem] flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                data-cursor-text="Baixar PDF"
              >
                <div className="text-gold text-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15V3M12 15L8 11M12 15L16 11M2 17V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-coal group-hover:text-gold transition-colors duration-300">
                    Tabela de Preços
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-coal/40 font-bold">
                    Lista Atualizada
                  </span>
                </div>
              </a>

              <a
                href="https://www.ladrilharia.com/_files/ugd/58320f_48eafa9ef98741638ff2f3a547834a31.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group bg-white border border-coal/5 hover:border-gold p-6 rounded-[2rem] flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                data-cursor-text="Baixar PDF"
              >
                <div className="text-gold text-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15V3M12 15L8 11M12 15L16 11M2 17V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-coal group-hover:text-gold transition-colors duration-300">
                    Manual de Instalação
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-coal/40 font-bold">
                    Guia de Assentamento
                  </span>
                </div>
              </a>

              <a
                href="https://www.ladrilharia.com/_files/ugd/58320f_4326b1f21cac43abb43829b55df00320.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic group bg-white border border-coal/5 hover:border-gold p-6 rounded-[2rem] flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                data-cursor-text="Baixar PDF"
              >
                <div className="text-gold text-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15V3M12 15L8 11M12 15L16 11M2 17V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-coal group-hover:text-gold transition-colors duration-300">
                    Guia de Especificação
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-coal/40 font-bold">
                    Ficha Técnica Geral
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Simulador Call To Action Banner */}
      <section className="py-20 md:py-32 bg-white relative w-full px-6 md:px-24">
        <div className="max-w-6xl mx-auto relative overflow-hidden bg-coal rounded-[3rem] p-12 md:p-24 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-12 border border-cream/5 scroll-fade-up">
          <div className="absolute inset-0 bg-radial-at-br from-gold/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
              Simulação em tempo real
            </span>
            <h3 className="font-serif text-4xl md:text-5xl text-cream mt-4 leading-tight">
              Crie a sua composição no{" "}
              <span className="font-serif italic font-normal text-gold">
                Simulador
              </span>
              .
            </h3>
            <p className="text-cream/50 text-sm mt-6 leading-relaxed font-medium">
              Escolha os desenhos, teste as cores da nossa paleta e planeje o
              layout do seu ambiente de forma 100% interativa.
            </p>
          </div>

          <Link
            href="/simulador"
            className="magnetic px-8 py-5 rounded-full bg-gold text-coal text-xs uppercase tracking-[0.2em] font-bold hover:bg-cream hover:text-coal transition-all duration-300 shadow-lg relative z-10"
            data-cursor-text="Criar Painel"
          >
            Abrir Simulador ↗
          </Link>
        </div>
      </section>

      {/* 12. Footer */}
      <footer
        id="contato"
        className="bg-coal text-cream pt-24 pb-12 border-t border-cream/5 w-full px-6 md:px-24 relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 border-b border-cream/10 pb-16">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-3xl tracking-widest text-cream uppercase select-none">
                Ladrilharia
              </h2>
              <span className="text-[9px] uppercase tracking-[0.35em] text-gold font-semibold mt-2 block">
                Curadoria Contemporânea
              </span>

              <div className="text-cream/50 text-sm mt-12 space-y-3 font-medium">
                <p>Ateliê de Ladrilhos Hidráulicos</p>
                <p>SOF Sul Quadra 2, Brasília - DF</p>
                <p>CEP: 71200-020 (Próximo ao Casa Park)</p>
              </div>
            </div>

            <div className="flex gap-6 mt-12">
              <a
                href="https://www.instagram.com/ladrilharia_bsb/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic text-gold text-xs uppercase tracking-widest font-bold hover:text-cream transition-colors duration-300"
                data-cursor-text="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/ladrilharia/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic text-gold text-xs uppercase tracking-widest font-bold hover:text-cream transition-colors duration-300"
                data-cursor-text="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">
                  Vendas & Orçamentos
                </h4>
                <div className="text-sm space-y-2 font-medium">
                  <a
                    href="https://wa.me/5561998432690"
                    className="block hover:text-gold transition-colors duration-300"
                  >
                    +55 (61) 99843-2690{" "}
                    <span className="text-[9px] uppercase tracking-wider text-cream/30 block mt-1">
                      (Ana Elisa)
                    </span>
                  </a>
                  <a
                    href="mailto:ladrilharia@ladrilharia.com"
                    className="block hover:text-gold transition-colors duration-300 pt-2"
                  >
                    ladrilharia@ladrilharia.com
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">
                  Sócios
                </h4>
                <div className="text-sm space-y-3 font-medium text-cream/70">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream/40 block">
                      Alessio
                    </span>
                    <a
                      href="tel:+5561993232213"
                      className="hover:text-gold transition-colors duration-300"
                    >
                      +55 (61) 99323-2213
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream/40 block">
                      João Diel
                    </span>
                    <a
                      href="tel:+5561991705876"
                      className="hover:text-gold transition-colors duration-300"
                    >
                      +55 (61) 99170-5876
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-cream/30">
          <div>
            © {new Date().getFullYear()} Ladrilharia Ltda. Todos os direitos
            reservados.
          </div>
          <div className="mt-4 sm:mt-0">
            Desenvolvido Pela{" "}
            <Link
              href="https://www.viraweb.online"
              className="font-bold text-5xl text-gold border-b border-gold"
            >
              ViraWeb
            </Link>
          </div>
        </div>
      </footer>

      {/* 13. "Ver Ladrilho" Modal Component */}
      {selectedTile && (
        <div
          className="fixed inset-0 bg-coal/80 backdrop-blur-md z-[60] flex items-center justify-center p-6"
          onClick={() => setSelectedTile(null)}
        >
          <div
            className="bg-cream border border-coal/5 rounded-[3rem] max-w-2xl w-full p-8 md:p-12 relative shadow-2xl flex flex-col md:flex-row gap-8 items-center"
            onClick={(e) => e.stopPropagation()} // Stop bubbling
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTile(null)}
              className="magnetic absolute top-6 right-6 w-10 h-10 rounded-full border border-coal/10 flex items-center justify-center text-coal hover:border-gold hover:text-gold transition-colors duration-300 bg-cream"
              data-cursor-text="Fechar"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 11L11 1M1 1L11 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Tile Image with Dynamic Color Filter Simulation */}
            <div className="relative w-48 h-48 bg-white border border-coal/5 rounded-[2rem] p-3 shadow-md">
              <div className="relative w-full h-full bg-cream/30 rounded-[calc(2rem-0.75rem)] overflow-hidden flex items-center justify-center">
                <Image
                  src={`https://static.wixstatic.com/media/${selectedTile.img}`}
                  alt={selectedTile.name}
                  fill
                  sizes="192px"
                  style={{ filter: simColor.filter }}
                  className="object-contain p-4 transition-all duration-500 filter drop-shadow-md"
                />
              </div>
            </div>

            {/* Description & Palette Simulator */}
            <div className="flex-1 flex flex-col items-start w-full">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                {selectedTile.type}
              </span>
              <h3 className="font-serif text-3xl text-coal mt-1 font-medium">
                {selectedTile.name}
              </h3>
              <span className="border border-coal/10 rounded-full px-3 py-1 bg-white text-[10px] font-semibold text-gold tracking-widest uppercase mt-3">
                {selectedTile.format}
              </span>

              <p className="text-coal/60 text-xs mt-4 leading-relaxed font-medium">
                Prensado manualmente com cimento e pigmentos de alta qualidade.
                Camada de estampa de 3mm de espessura, permitindo restauração e
                lixamento futuros.
              </p>

              {/* Color Simulator dots */}
              <div className="mt-6 w-full">
                <h5 className="text-[9px] uppercase tracking-widest text-coal/40 font-bold mb-2">
                  Simular Cor: {simColor.name}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {SIMULATOR_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSimColor(color)}
                      className={`w-6 h-6 rounded-full border transition-transform ${
                        simColor.name === color.name
                          ? "scale-110 border-gold border-2"
                          : "border-coal/10 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      data-cursor-text={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* WhatsApp quote request with color config */}
              <a
                href={`https://wa.me/5561998432690?text=${encodeURIComponent(
                  `Olá Ladrilharia! Gostaria de um orçamento do Ladrilho ${selectedTile.name} (${selectedTile.format}) na cor simulada: ${simColor.name}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic mt-6 w-full py-3 bg-gold hover:bg-coal hover:text-cream text-coal text-center block rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all"
                data-cursor-text="Pedir Quote"
              >
                Orçamento no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
