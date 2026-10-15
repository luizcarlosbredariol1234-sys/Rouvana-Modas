import React, { useState } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Instagram,
  Smartphone,
  Phone,
  Headphones,
  Menu,
  X,
  ChevronDown,
  Ruler,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMenuItems = [
    { label: 'Início', href: '#inicio', active: true },
    { label: 'Catálogo de Produtos', href: '#produtos' },
    { label: 'Moda Mulher', href: '#produtos' },
    { label: 'Plus Size (G1 ao G6)', href: '#produtos', highlight: true },
    { label: '100% Algodão', href: '#produtos' },
    { label: 'Sobre a Rouvana', href: '#sobre' },
    { label: 'Localização & Contato', href: '#contato' },
  ];

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT BAR (Color matched to logo #60315F) */}
      <div className="bg-[#60315F] text-[#FAF6EE] text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-[#4D254C]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Informações da Loja & Diferenciais */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 font-medium">
              <Ruler className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Tamanhos do P ao G6</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Compre também pelo WhatsApp</span>
            </div>
          </div>

          {/* Right Phone & Instagram contact */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-medium">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#F5EDF4] hover:text-[#DFB77C] transition-colors font-medium"
            >
              <Instagram className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>{COMPANY_INFO.instagram}</span>
            </a>
            <span className="text-white/30">•</span>
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="flex items-center gap-1.5 text-[#F5EDF4] hover:text-[#DFB77C] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER: LOGO AMPLA, AUMENTADA E AJUSTADA ATÉ A LUPA */}
      <div className="border-b border-[#60315F]/15 py-2.5 sm:py-3.5 px-3 sm:px-6 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-5">
          {/* Brand Logo - Tamanho aumentado, esticada e perfeitamente ajustada */}
          <a
            href="#inicio"
            onClick={(e) => handleScrollTo(e, 'inicio')}
            className="flex-1 flex items-center group cursor-pointer min-w-0 pr-2 sm:pr-4"
          >
            <img
              src="/logo.jpg"
              alt="Rouvana Modas"
              className="w-full h-28 sm:h-36 md:h-44 lg:h-52 object-fill rounded-2xl shadow-md border border-[#60315F]/25 group-hover:scale-[1.005] transition-all duration-300"
            />
          </a>

          {/* Right Action Icons: Lupa de Pesquisa, Perfil, Favoritos, Sacola */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-center">
            {/* Lupa de Pesquisa posicionada diretamente ao lado da logo expandida */}
            <button
              onClick={onOpenSearch}
              aria-label="Buscar produtos"
              className="flex items-center gap-2 px-3.5 py-3 sm:px-5 sm:py-3 text-slate-700 hover:text-[#60315F] bg-white hover:bg-[#F5EDF4] rounded-2xl transition-all cursor-pointer border border-[#60315F]/20 shadow-xs"
            >
              <Search className="w-5 h-5 text-[#60315F]" />
              <span className="hidden md:inline text-xs font-bold text-slate-600">
                Buscar no site...
              </span>
            </button>

            <button
              onClick={onContactClick}
              aria-label="Minha conta / Atendimento"
              className="p-2.5 text-slate-700 hover:text-[#60315F] hover:bg-white rounded-2xl transition-colors cursor-pointer hidden sm:block border border-transparent hover:border-[#60315F]/15"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenWishlist}
              aria-label="Favoritos"
              className="p-2.5 text-slate-700 hover:text-[#60315F] hover:bg-white rounded-2xl transition-colors cursor-pointer relative border border-transparent hover:border-[#60315F]/15"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#60315F] text-[#FAF6EE] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Sacola de compras"
              className="p-2.5 text-slate-700 hover:text-[#60315F] hover:bg-white rounded-2xl transition-colors cursor-pointer relative border border-transparent hover:border-[#60315F]/15"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#60315F] text-[#FAF6EE] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 lg:hidden rounded-2xl hover:bg-white border border-transparent hover:border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MENU DE NAVEGAÇÃO & CATEGORIAS (Abaixo da logo esticada) */}
      <div className="bg-[#F5EDF4] border-b border-[#E8D8E5] py-2.5 px-4 sm:px-8 hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Main Navigation Links */}
          <nav className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-700">
            {navMenuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href.replace('#', ''))}
                className={`transition-all whitespace-nowrap cursor-pointer ${
                  item.highlight
                    ? 'bg-[#60315F] text-[#FAF6EE] px-3 py-1 rounded-full text-[11px] font-black shadow-xs hover:bg-[#4D254C] hover:text-white flex items-center gap-1.5'
                    : item.active
                    ? 'text-[#60315F] font-extrabold border-b-2 border-[#60315F] pb-0.5'
                    : 'hover:text-[#60315F]'
                }`}
              >
                {item.highlight && <Sparkles className="w-3 h-3 text-[#DFB77C]" />}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right highlighted button: "Precisa de ajuda? WhatsApp" */}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#60315F] to-[#7A3D76] hover:opacity-95 text-[#FAF6EE] text-xs font-bold tracking-wide shadow-xs whitespace-nowrap cursor-pointer shrink-0"
          >
            <Headphones className="w-3.5 h-3.5 text-[#DFB77C]" />
            <span>PRECISA DE AJUDA? WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl animate-in slide-in-from-top">
          <div className="flex flex-col gap-3 font-semibold text-sm text-slate-800">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-start">
              <img
                src="/logo.jpg"
                alt="Rouvana Modas"
                className="w-full h-28 sm:h-36 object-fill rounded-xl shadow-xs border border-[#60315F]/20"
              />
            </div>
            {navMenuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href.replace('#', ''))}
                className={`py-2 border-b border-slate-100 flex items-center justify-between ${
                  item.highlight
                    ? 'text-[#60315F] font-bold bg-[#FAF5F9] px-2.5 rounded-lg'
                    : 'hover:text-[#60315F]'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="text-[10px] bg-[#60315F] text-[#FAF6EE] px-2 py-0.5 rounded-full font-bold">
                    Diferencial
                  </span>
                )}
              </a>
            ))}
            {/* Diferencial em destaque */}
            <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#60315F]/20 text-xs text-[#331632] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#60315F]">
                <Ruler className="w-4 h-4 text-[#DFB77C]" />
                <span>Tamanhos do P ao G6</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#553954]">
                <Sparkles className="w-4 h-4 text-[#60315F]" />
                <span>Modelagens que valorizam sua beleza</span>
              </div>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>Instagram {COMPANY_INFO.instagram}</span>
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#60315F] text-[#FAF6EE] font-bold text-xs flex items-center justify-center gap-2"
              >
                <Headphones className="w-4 h-4 text-[#DFB77C]" />
                <span>Atendimento WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
