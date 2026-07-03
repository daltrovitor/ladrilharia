"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export interface TileItem {
  name: string;
  format: string;
  img: string;
  type: "Quadrado" | "Hexagonal";
}

// Exactly correct mapped images from the Ladrilharia website
export const TILE_DATA: TileItem[] = [
  { name: "Zé", format: "20x20 cm", img: "58320f_7c043d49771e4064bfac480941b2f939~mv2.png", type: "Quadrado" },
  { name: "Quina", format: "20x20 cm", img: "58320f_b0ebfaeecd24410db5f424b813987402~mv2.png", type: "Quadrado" },
  { name: "Tesourinha", format: "20x20 cm", img: "58320f_c7b6b52451e64e14a61660844b92cb76~mv2.png", type: "Quadrado" },
  { name: "Setenta", format: "20x20 cm", img: "58320f_5a06c9b7a1ca4757856ead2a59372ebf~mv2.png", type: "Quadrado" },
  { name: "Bossa Nova", format: "20x20 cm", img: "58320f_ebdfcbd63a9744c5881b768181cf3556~mv2.png", type: "Quadrado" },
  { name: "Geo", format: "20x20 cm", img: "58320f_7bdec39a9e58481799592f6c06fcc7ee~mv2.png", type: "Quadrado" },
  { name: "Traço", format: "20x20 cm", img: "58320f_a8c7c5bdea32497390e0fc465a56b4b9~mv2.png", type: "Quadrado" },
  { name: "Ponto Linha", format: "20x20 cm", img: "58320f_162e23b6af944e7eb8be52d072372d9e~mv2.png", type: "Quadrado" },
  { name: "Coração", format: "20x20 cm", img: "58320f_3efcc01d623f4152ac498d8ae1131bb0~mv2.png", type: "Quadrado" },
  { name: "Bumerangue", format: "20x20 cm", img: "58320f_ddd29d8537dd43e488a831e79016082f~mv2.png", type: "Quadrado" },
  { name: "Bolotas", format: "20x20 cm", img: "58320f_56053d37047944b089eb03cc1b9d6c5c~mv2.png", type: "Quadrado" },
  { name: "Origami", format: "20x20 cm", img: "58320f_a32e345567d64a3bb643337a679a5b7b~mv2.png", type: "Quadrado" },
  { name: "Arco-íris", format: "20x20 cm", img: "58320f_a02b251994b34744bd04c93bab77c3bf~mv2.png", type: "Quadrado" },
  { name: "Mina", format: "20x20 cm", img: "58320f_f28004e1cf284f3681906b23c1b9696b~mv2.png", type: "Quadrado" },
  { name: "Cata-vento", format: "20x20 cm", img: "58320f_1d3d1a63e750441583278a0882c368d7~mv2.png", type: "Quadrado" },
  { name: "Meião", format: "20x20 cm", img: "58320f_fe525cc42f3a49de92c78cf431e367bf~mv2.png", type: "Quadrado" },
  { name: "Meio", format: "20x20 cm", img: "58320f_0869534935fd446a9b7f36245d5c61a1~mv2.png", type: "Quadrado" }
];

interface CatalogSliderProps {
  onSelectTile: (tile: TileItem) => void;
}

export default function CatalogSlider({ onSelectTile }: CatalogSliderProps) {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="w-full relative mt-12">
      {/* Slider Controls Header */}
      <div className="flex justify-between items-end mb-8 px-6 md:px-24">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">Portfólio de Moldes</span>
          <h3 className="text-3xl md:text-5xl font-serif text-coal mt-2">Nossas Linhas</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="magnetic w-12 h-12 rounded-full border border-coal/10 flex items-center justify-center text-coal hover:border-gold hover:text-gold transition-colors duration-300 bg-cream"
            data-cursor-text="Voltar"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 7L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="magnetic w-12 h-12 rounded-full border border-coal/10 flex items-center justify-center text-coal hover:border-gold hover:text-gold transition-colors duration-300 bg-cream"
            data-cursor-text="Avançar"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L7 7L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Slider Wrapper */}
      <div className="w-full pl-6 md:pl-24 pr-6 md:pr-0 overflow-visible">
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
            1440: { slidesPerView: 4.5 }
          }}
          className="swiper-container !overflow-visible"
        >
          {TILE_DATA.map((item, idx) => (
            <SwiperSlide key={idx} className="h-full">
              <div 
                onClick={() => onSelectTile(item)}
                className="flex flex-col h-full select-none cursor-none"
                data-cursor-text="Ver Ladrilho"
              >
                {/* Image Container with Double Bezel */}
                <div className="relative w-full aspect-square bg-white border border-coal/5 rounded-[2rem] p-3 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-transform duration-700 ease-out group hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                  <div className="relative w-full h-full bg-cream/30 rounded-[calc(2rem-0.75rem)] overflow-hidden flex items-center justify-center">
                    <Image
                      src={`https://static.wixstatic.com/media/${item.img}`}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-8 md:p-12 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08] filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Details Footer */}
                <div className="mt-5 flex justify-between items-start px-2">
                  <div>
                    <h4 className="font-serif text-2xl text-coal font-medium">{item.name}</h4>
                    <span className="text-[10px] uppercase tracking-widest text-coal/40 font-semibold">{item.type}</span>
                  </div>
                  <div className="border border-coal/10 rounded-full px-3 py-1 bg-cream/50 text-[10px] font-semibold text-gold tracking-widest uppercase">
                    {item.format}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
