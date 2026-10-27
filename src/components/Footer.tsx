import React from 'react';
import { COMPANY_INFO } from '../data/products';
import { MapPin, Phone, MessageCircle, Heart, ShieldCheck, Leaf, Instagram, Ruler, Sparkles, Scissors, Clock } from 'lucide-react';
import { ProductCategory } from '../types/catalog';

interface FooterProps {
  onSelectCategory?: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    handleScrollTo('produtos');
  };

  const categories = [
    { id: 'vestidos' as ProductCategory, label: 'Vestidos' },
    { id: 'pijamas' as ProductCategory, label: 'Pijamas' },
    { id: 'saias' as ProductCategory, label: 'Saias' },
    { id: 'camisas_blusas' as ProductCategory, label: 'Conjuntos e Blusas' },
    { id: 'pantalonas_calcas' as ProductCategory, label: 'Calças' },
    { id: 'bermudas' as ProductCategory, label: 'Bermudas' },
    { id: 'masculino' as ProductCategory, label: 'Masculino' },
  ];

  return (
    <footer className="bg-[#331632] text-[#EADDE8] pt-16 pb-12 border-t border-[#4D254C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Informativo no Final do Site: Horário de Atendimento & Pequenos Ajustes */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl bg-black/30 border border-[#DFB77C]/30 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DFB77C]/20 border border-[#DFB77C]/40 flex items-center justify-center shrink-0 text-[#DFB77C]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#DFB77C] block">
                Horário de Atendimento da Loja
              </span>
              <p className="text-xs sm:text-sm text-[#FAF6EE] font-medium mt-0.5">
                <strong>Segunda a Sexta:</strong> 09h às 18h &nbsp;·&nbsp; <strong>Domingos:</strong> 08:30 às 12h &nbsp;·&nbsp; <span className="text-rose-300 font-semibold">Sábados: Fechado</span>
              </p>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3 md:border-l md:border-white/15 md:pl-6">
            <div className="w-10 h-10 rounded-xl bg-[#DFB77C]/20 border border-[#DFB77C]/40 flex items-center justify-center shrink-0 text-[#DFB77C]">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#DFB77C] block">
                Diferencial Exclusivo
              </span>
              <p className="text-xs sm:text-sm text-[#FAF6EE] font-medium mt-0.5">
                <strong className="text-white">Fazemos pequenos ajustes</strong> nas peças para o caimento perfeito no seu corpo!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4D254C]/70">
          {/* Brand & Logo */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-5 flex items-center gap-4">
              <img
                src="/logo.jpg"
                alt="Rouvana Modas - Moda Feminina"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/30 ring-2 ring-[#DFB77C]/40 shadow-md object-cover shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl sm:text-2xl text-[#FAF6EE]">
                  Rouvana Modas
                </span>
                <span className="text-xs sm:text-sm text-[#DFB77C] font-semibold">
                  Moda Feminina
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#D8C7D6] leading-relaxed max-w-sm mb-4">
              Roupas femininas com elegância e caimento impecável em Chavantes - SP. Do tamanho P ao G6 com atendimento acolhedor.
            </p>

          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleScrollTo('inicio')}
                  className="hover:text-[#DFB77C] transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('produtos')}
                  className="hover:text-[#DFB77C] transition-colors cursor-pointer text-left"
                >
                  Catálogo de Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('sobre')}
                  className="hover:text-[#DFB77C] transition-colors cursor-pointer text-left"
                >
                  Sobre a Rouvana
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('contato')}
                  className="hover:text-[#DFB77C] transition-colors cursor-pointer text-left"
                >
                  Localização & Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Categorias da Loja */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE] mb-4">
              Categorias
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-[#D8C7D6]">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-[#DFB77C] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFB77C]" />
                    <span>{cat.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Horário in Footer */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE] mb-4">
              Atendimento em Chavantes
            </h4>
            <div className="space-y-3 text-xs text-[#D8C7D6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFB77C] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFB77C] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 transition-opacity shadow-sm text-xs font-semibold"
                >
                  <Instagram className="w-4 h-4 text-white" />
                  <span>@rouvana.modas</span>
                </a>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] border border-white/10 transition-colors shadow-sm text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-[#DFB77C]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B8A3B6] gap-4">
          <p>
            © {new Date().getFullYear()} Rouvana Modas. Todos os direitos reservados. Chavantes - SP.
          </p>
          <div className="flex items-center gap-2">
            <span>Moda Feminina Feita com Carinho ao Seu Estilo</span>
            <Heart className="w-3.5 h-3.5 text-[#DFB77C] fill-[#DFB77C]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
