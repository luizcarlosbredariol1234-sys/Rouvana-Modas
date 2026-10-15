import React from 'react';
import { COMPANY_INFO } from '../data/products';
import { MapPin, Phone, MessageCircle, Heart, ShieldCheck, Leaf, Instagram, Ruler, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#331632] text-[#EADDE8] pt-16 pb-12 border-t border-[#4D254C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4D254C]/70">
          {/* Brand & Logo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-5">
              <img
                src="/logo.jpg"
                alt="Rouvana Modas"
                className="h-20 sm:h-24 w-auto rounded-2xl border border-white/20 shadow-md object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#D8C7D6] leading-relaxed max-w-sm mb-4">
              Roupas femininas elegantes em Chavantes - SP. Peças cuidadosamente selecionadas com modelagem impecável e caimento elegante.
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-semibold text-[#DFB77C]">
                <Ruler className="w-3.5 h-3.5" />
                Tamanhos P ao G6 & Plus Size
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-semibold text-[#FAF6EE]">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                Temos Peças 100% Algodão
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-semibold text-[#FAF6EE]">
                <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                Estilo & Elegância
              </span>
            </div>
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
                  Produtos em Destaque
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

          {/* Categorias */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE] mb-4">
              Categorias
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8C7D6]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#92718B]" />
                <span>Vestidos Fluidos</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#92718B]" />
                <span>Camisas & Blusas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#92718B]" />
                <span>Moda Mulher</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#92718B]" />
                <span>Pantalonas & Calças</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#92718B]" />
                <span>Jaquetas & Blazers</span>
              </li>
            </ul>
          </div>

          {/* Contact Details in Footer */}
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
            <span>Feito com dedicação ao seu estilo</span>
            <Heart className="w-3.5 h-3.5 text-[#92718B] fill-[#92718B]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
