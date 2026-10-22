import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORY_CARDS, COMPANY_INFO } from '../data/products';
import { ProductCategory } from '../types/catalog';

interface HeroProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onContactClick, onSelectCategory }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      kicker: 'Rouvana Modas',
      titlePart1: 'Moda que Respeita',
      titlePart2: 'o Seu Estilo',
      subtitle: 'Descubra peças femininas pensadas para valorizar a sua essência.',
      modelImg: '/products/vestido-viscolycra-9394.jpg',
    },
    {
      kicker: 'Rouvana Modas',
      titlePart1: 'Elegância Pura',
      titlePart2: 'Feita a Você',
      subtitle: 'Descubra peças femininas sofisticadas com modelagem impecável, do P ao G6.',
      modelImg: '/products/vestido-viscolycra-9401.jpg',
    },
    {
      kicker: 'Rouvana Modas',
      titlePart1: 'Grade do P ao G6,',
      titlePart2: 'Voltado para Moda Mulher',
      subtitle: 'Modelagens exclusivas que abraçam e valorizam suas curvas com caimento impecável e elegância pura.',
      modelImg: '/products/vestido-viscolycra-9402.jpg',
    },
    {
      kicker: 'Rouvana Modas',
      titlePart1: 'Moda Noite & Casual',
      titlePart2: 'Beleza & Conforto',
      subtitle: 'Peças com corte impecável para acompanhar todos os seus momentos com estilo e bem-estar.',
      modelImg: '/products/pijama-canelado-101156.jpg',
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  const handleCardClick = (catId: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    onExploreProducts();
  };

  return (
    <section id="inicio" className="pt-3 pb-12 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* APRESENTAÇÃO DA ROUVANA MODAS (Logo abaixo da Logo no Início da Página) */}
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-[#FAF5F9] via-[#FFFFFF] to-[#F5EDF4] p-6 sm:p-8 md:p-10 border border-[#60315F]/20 shadow-xs relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-xs font-bold text-[#60315F] border border-[#60315F]/20 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Rouvana Modas</span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#331632] tracking-tight mb-4">
              Seja muito bem-vinda à Rouvana Modas! ✨
            </h1>

            <div className="space-y-3.5 text-sm sm:text-base text-[#553954] leading-relaxed max-w-3xl mx-auto font-normal">
              <p>
                Aqui, acreditamos que a moda não foi feita para moldar você, mas sim para acompanhar, celebrar e destacar quem você já é. A Rouvana Modas nasceu com um propósito claro: vestir a mulher real com elegância, conforto e muita personalidade.
              </p>
              <p>
                Sabemos que a beleza feminina é diversa, única e plural. Por isso, nosso compromisso vai do P ao Plus Size, garantindo que cada peça seja desenhada e pensada para valorizar todos os biotipos, curvas e estilos — sem abrir mão do caimento perfeito e do bem-estar.
              </p>
            </div>
          </div>
        </div>

        {/* 1. HERO MAIN BANNER */}
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

              <p className="text-sm sm:text-base text-[#553954] max-w-lg mb-8 leading-relaxed font-normal">
                {currentSlide.subtitle}
              </p>

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
                  onClick={onContactClick}
                  className="px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#60315F] font-bold text-sm border border-[#60315F]/25 shadow-xs transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Fale Conosco</span>
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

        {/* 2. CATEGORIAS EM DESTAQUE */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#60315F] block">
                Navegue por Categoria
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#331632]">
                Categorias em Destaque
              </h2>
            </div>
            <button
              onClick={onExploreProducts}
              className="text-xs font-bold text-[#60315F] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {CATEGORY_CARDS.map((card) => {
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`relative rounded-2xl p-4 flex flex-col justify-between overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${card.bgClass}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 pr-6">
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
              );
            })}
          </div>
        </div>

        {/* 3. MENSAGEM INSPIRACIONAL: AUTOESTIMA & CONEXÃO (Abaixo das Categorias em Destaque e Acima do Catálogo Exclusivo) */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#FAF5F9] via-[#FFFFFF] to-[#F5EDF4] p-6 sm:p-8 md:p-10 border border-[#60315F]/20 shadow-xs relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-xs font-bold text-[#60315F] border border-[#60315F]/20 mb-3.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Autoestima & Conexão</span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[#331632] tracking-tight mb-4">
              ✨ Sabe aquela roupa que faz você se olhar no espelho e sorrir na hora?
            </h3>

            <div className="space-y-3.5 text-sm sm:text-base text-[#553954] leading-relaxed max-w-3xl mx-auto font-normal">
              <p>
                É exatamente para isso que a gente existe! Aqui na Rouvana Modas, a gente não acredita em regras chatas de moda ou em &quot;corpo ideal&quot;. A gente acredita em você.
              </p>
              <p>
                Nosso compromisso é fazer você se sentir linda, leve e super confiante — seja vestindo P, G ou Plus Size. Aqui, todas as curvas, estilos e biotipos têm lugar garantido, com peças pensadas com carinho para abraçar o seu corpo do jeito que ele é.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
