import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Leaf, Award, Sparkles, Check, X as CloseIcon, MessageCircle, Ruler, Scissors } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'filosofia' | 'comparativo'>('filosofia');

  const comparisonData = [
    {
      criterio: 'Respiração e Circulação de Ar',
      natural: 'Fibras nobres que dissipam o calor e evitam acúmulo de suor.',
      sintetico: 'Plástico derivado de petróleo que retém o calor e bloqueia a pele.',
    },
    {
      criterio: 'Proliferação de Odores',
      natural: 'Propriedades antibacterianas naturais. A peça permanece fresca.',
      sintetico: 'Favorece o crescimento bacteriano (efeito cheiro impregnado crônico).',
    },
    {
      criterio: 'Sensibilidade & Alergias',
      natural: 'Hipoalergênico, livre de resinas e químicos tóxicos pesados.',
      sintetico: 'Causa frequente de dermatite de contato e irritação cutânea.',
    },
    {
      criterio: 'Durabilidade Real',
      natural: 'Fibras de linho e algodão nobre ganham maciez e duram anos.',
      sintetico: 'Degenera com facilidade, forma bolinhas (peeling) e perde a forma.',
    },
    {
      criterio: 'Impacto no Planeta',
      natural: '100% Biodegradável. Volta à terra sem gerar microplásticos.',
      sintetico: 'Leva até 500 anos para se decompor, liberando microplásticos no oceano.',
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-[#FAF6EE] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#60315F] uppercase tracking-widest mb-3">
            <span>Atelier & Boutique em Chavantes - SP</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#331632] tracking-tight mb-4">
            Moda que Respeita a Sua Pele e o Seu Estilo
          </h2>

          <p className="text-base sm:text-lg text-[#553954] leading-relaxed">
            Na Rouvana Modas, cada peça é escolhida a dedo para proporcionar o equilíbrio perfeito entre sofisticação, caimento impecável e conforto térmico.
          </p>
        </div>

        {/* 4 Pillar Cards com Diferenciais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#60315F]/15 shadow-sm hover:shadow-lg hover:border-[#60315F]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] mb-5">
                <Ruler className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#60315F] bg-[#FAF5F9] px-2 py-0.5 rounded-full mb-2">
                <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                Diferencial
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#331632] mb-2">
                Tamanhos do P ao G6
              </h3>
              <p className="text-xs sm:text-sm text-[#553954] leading-relaxed">
                Grade verdadeiramente inclusiva. Modelagens desenvolvidas para valorizar a beleza e a essência de todos os corpos com conforto absoluto.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#60315F]/15 shadow-sm hover:shadow-lg hover:border-[#60315F]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF4EB] flex items-center justify-center text-[#7A4B1A] mb-5">
                <Scissors className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#7A4B1A] bg-[#FFF9F0] px-2 py-0.5 rounded-full mb-2">
                Cortesia Exclusiva
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#331632] mb-2">
                Ajustes sem Custo
              </h3>
              <p className="text-xs sm:text-sm text-[#553954] leading-relaxed">
                Ajustes finos de comprimento, barra e mangas sem custo adicional para assegurar um caimento feito sob medida especialmente para você.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#60315F]/15 shadow-sm hover:shadow-lg hover:border-[#60315F]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] mb-5">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#331632] mb-2">
                Fibras Nobres
              </h3>
              <p className="text-xs sm:text-sm text-[#553954] leading-relaxed">
                Linho europeu e algodão puro de alta densidade. Roupas respiráveis e hipoalergênicas que respeitam a pele em qualquer clima.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#60315F]/15 shadow-sm hover:shadow-lg hover:border-[#60315F]/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] mb-5">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#331632] mb-2">
                Atendimento Próximo
              </h3>
              <p className="text-xs sm:text-sm text-[#553954] leading-relaxed">
                Na Rua Altino Arantes 209 (Chavantes - SP) ou pelo WhatsApp, oferecemos consultoria atenciosa e humanizada para suas escolhas.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison card */}
        <div className="bg-white rounded-3xl border border-[#60315F]/15 shadow-md p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#60315F]/10 mb-6 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#92718B] block mb-0.5">
                Critérios de Qualidade Rouvana Modas
              </span>
              <h3 className="font-display text-2xl font-bold text-[#331632]">
                Por que escolher tecidos nobres e naturais?
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('filosofia')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'filosofia'
                    ? 'bg-[#60315F] text-[#FAF6EE]'
                    : 'bg-[#F5EDF4] text-[#553954] hover:text-[#60315F]'
                }`}
              >
                Nossa Filosofia
              </button>
              <button
                onClick={() => setActiveTab('comparativo')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'comparativo'
                    ? 'bg-[#60315F] text-[#FAF6EE]'
                    : 'bg-[#F5EDF4] text-[#553954] hover:text-[#60315F]'
                }`}
              >
                Tabela Técnica
              </button>
            </div>
          </div>

          {activeTab === 'comparativo' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#60315F]/15 text-[#553954] font-bold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Critério</th>
                    <th className="py-3 px-4 text-[#60315F] bg-[#F5EDF4] rounded-t-xl font-bold">
                      Peças Rouvana Modas
                    </th>
                    <th className="py-3 px-4 text-slate-600">
                      Vestuário Sintético Comum
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-4 px-4 font-semibold text-[#331632] text-xs sm:text-sm">
                        {item.criterio}
                      </td>
                      <td className="py-4 px-4 bg-[#F5EDF4]/60 text-[#60315F] font-medium text-xs sm:text-sm">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item.natural}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-500 text-xs sm:text-sm">
                        <div className="flex items-start gap-2">
                          <CloseIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{item.sintetico}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-[#553954] leading-relaxed text-sm sm:text-base">
                <p>
                  A <strong className="text-[#331632] font-semibold">Rouvana Modas</strong> tem como propósito oferecer a você uma experiência de moda acolhedora, com roupas femininas e peças de linho que combinam beleza clássica e conforto moderno.
                </p>
                <p>
                  Acreditamos que se vestir bem é uma forma diária de autocuidado. Por isso, prestamos atenção aos acabamentos, às cores elegantes e aos tecidos que deixam a pele respirar livremente.
                </p>
              </div>

              <div className="bg-[#60315F] text-[#FAF6EE] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md border border-[#4D254C]">
                <div className="mb-6">
                  <img src="/logo.jpg" alt="Rouvana Modas" className="h-16 sm:h-20 w-auto rounded-xl mb-5 border border-white/25 shadow-sm object-contain" />
                  <blockquote className="font-display text-lg sm:text-xl font-medium leading-snug text-[#FAF6EE]">
                    &ldquo;Roupas com caimento primoroso que valorizam a sua essência e acompanham os seus melhores momentos.&rdquo;
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-white/15 text-xs text-[#E5D5E3]">
                  <span className="font-bold text-[#FAF6EE] block">Atelier Rouvana Modas</span>
                  <span>Rua Altino Arantes 209, Centro · Chavantes - SP</span>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-[#60315F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#553954]">
              Deseja conhecer as peças pessoalmente ou agendar um atendimento exclusivo?
            </span>
            <button
              onClick={onContactClick}
              className="py-3 px-6 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-semibold text-xs sm:text-sm shadow-md shadow-[#60315F]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#DFB77C]" />
              <span>Entrar em contato</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
