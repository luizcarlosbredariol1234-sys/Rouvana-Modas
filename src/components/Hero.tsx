import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Ruler, Scissors } from 'lucide-react';
import { CATEGORY_CARDS, COMPANY_INFO } from '../data/products';

interface HeroProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onContactClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      kicker: 'Coleção Exclusiva Rouvana',
      titlePart1: 'Renove o Seu',
      titlePart2: 'Estilo de Vestir',
      subtitle: 'Aproveite até 40% OFF no primeiro pedido. Peças selecionadas com caimento refinado e tecidos nobres.',
      modelImg: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    },
    {
      kicker: 'Lançamentos de Verão',
      titlePart1: 'Elegância Pura',
      titlePart2: 'Feita para Você',
      subtitle: 'Descubra a sofisticação das peças atemporais com acabamento de alfaiataria impecável.',
      modelImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    },
    {
      kicker: 'Chavantes - SP',
      titlePart1: 'Moda Feminina',
      titlePart2: '& Acessórios',
      subtitle: 'Modelagens que valorizam a sua essência com conforto absoluto em todas as ocasiões.',
      modelImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <section id="inicio" className="pt-3 pb-12 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HERO MAIN BANNER (Chronics layout styled with Rouvana Logo Palette) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FAF5F9] via-[#F4E8F2] to-[#EBD5E7] min-h-[440px] sm:min-h-[500px] flex items-center px-6 sm:px-14 py-10 border border-[#60315F]/15 shadow-xs">
          {/* Subtle decorative dot grid background */}
          <div className="absolute top-8 right-12 w-48 h-48 opacity-20 pointer-events-none hidden md:block">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#60315F" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#60315F] flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-[#60315F]/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                  {currentSlide.kicker}
                </span>
              </div>

              <h1 className="font-display font-bold text-[#331632] text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-4">
                {currentSlide.titlePart1} <br />
                <span className="text-[#60315F] underline decoration-[#DFB77C]/70 decoration-wavy decoration-2">
                  {currentSlide.titlePart2}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#553954] max-w-lg mb-6 leading-relaxed font-normal">
                {currentSlide.subtitle}
              </p>

              {/* Diferenciais Rouvana Modas: P ao G6 & Ajustes sem custo */}
              <div className="flex flex-wrap items-center gap-2.5 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#60315F]/20 text-[#60315F] text-xs font-bold shadow-xs">
                  <Ruler className="w-3.5 h-3.5 text-[#DFB77C]" />
                  <span>Diferencial: Tamanhos do P ao G6</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF4EB] border border-[#DEC295]/40 text-[#7A4B1A] text-xs font-bold shadow-xs">
                  <Scissors className="w-3.5 h-3.5 text-[#7A4B1A]" />
                  <span>Ajustes sem custo</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <button
                  onClick={onExploreProducts}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#60315F] via-[#6D366B] to-[#7A3D76] hover:from-[#4D254C] hover:to-[#60315F] text-[#FAF6EE] font-bold text-sm shadow-md shadow-[#60315F]/25 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
                >
                  <span>Comprar Agora</span>
                  <ArrowRight className="w-4 h-4 text-[#DFB77C]" />
                </button>

                <button
                  onClick={onExploreProducts}
                  className="px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#60315F] font-bold text-sm border border-[#60315F]/25 shadow-xs transition-colors cursor-pointer"
                >
                  Explorar Coleção
                </button>
              </div>

              {/* Carousel navigation dots */}
              <div className="flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'w-7 bg-[#60315F]'
                        : 'w-2 bg-[#60315F]/25 hover:bg-[#60315F]/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right model image column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow ring in logo wine plum */}
                <div className="absolute inset-0 bg-[#60315F]/15 rounded-full blur-2xl transform scale-90" />
                <img
                  src={currentSlide.modelImg}
                  alt="Modelo Rouvana Modas"
                  className="relative z-10 w-72 sm:w-84 lg:w-96 h-80 sm:h-96 lg:h-[420px] object-cover object-top rounded-3xl shadow-xl border-4 border-white/90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. FIVE CATEGORY CARDS (Harmonized with Logo Palette) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-8">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={onExploreProducts}
              className={`rounded-2xl p-4 flex flex-col justify-between overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${card.bgClass}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-75 block truncate">
                    {card.tag}
                  </span>
                  <h3 className="font-display font-bold text-xs sm:text-sm tracking-tight truncate">
                    {card.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/5 text-[11px] font-bold">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  {card.linkText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
