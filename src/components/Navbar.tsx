import React, { useState } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Instagram,
  Phone,
  Headphones,
  Menu,
  X,
  Ruler,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { ProductCategory } from '../types/catalog';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onContactClick: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
  selectedCategory?: ProductCategory;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onContactClick,
  onSelectCategory,
  selectedCategory = 'todos',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoriesNav: { id: ProductCategory; label: string }[] = [
    { id: 'vestidos', label: 'Vestidos' },
    { id: 'pijamas', label: 'Pijamas' },
    { id: 'saias', label: 'Saias' },
    { id: 'camisas_blusas', label: 'Conjuntos e Blusas' },
    { id: 'pantalonas_calcas', label: 'Calças' },
    { id: 'bermudas', label: 'Bermudas' },
    { id: 'masculino', label: 'Masculino' },
  ];

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (e: React.MouseEvent, catId: ProductCategory) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const el = document.getElementById('produtos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT BAR (Color matched to logo #60315F) */}
      <div className="bg-[#60315F] text-[#FAF6EE] text-[11px] sm:text-xs py-2 px-3 sm:px-8 border-b border-[#4D254C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          {/* Informações da Loja & Diferenciais */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Aproveite até 10% OFF no seu primeiro pedido!</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-medium">
              <Ruler className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Tamanhos do P ao G6</span>
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

      {/* 2. MAIN HEADER: LOGO AMPLA & AÇÕES */}
      <div className="border-b border-[#60315F]/15 py-2.5 sm:py-3.5 px-3 sm:px-6 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-5">
          {/* Brand Logo Circular */}
          <a
            href="#inicio"
            onClick={(e) => handleScrollTo(e, 'inicio')}
            className="flex items-center gap-3.5 sm:gap-5 group cursor-pointer shrink-0"
          >
            <img
              src="/logo.jpg"
              alt="Rouvana Modas - Moda Feminina"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg border-2 border-[#60315F]/30 ring-2 ring-[#DFB77C]/40 group-hover:scale-105 transition-all duration-300 shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#331632] group-hover:text-[#60315F] transition-colors leading-tight">
                Rouvana Modas
              </span>
              <span className="text-xs sm:text-sm text-[#60315F] font-bold tracking-wider uppercase mt-0.5">
                Moda Feminina
              </span>
            </div>
          </a>

          {/* Right Action Icons: Lupa de Pesquisa, Perfil, Favoritos, Sacola */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-center">
            {/* Lupa de Pesquisa */}
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

      {/* 3. MENU DE NAVEGAÇÃO & CATEGORIAS */}
      <div className="bg-[#F5EDF4] border-b border-[#E8D8E5] py-2.5 px-3 sm:px-6 hidden lg:block overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Main Navigation & Category Links */}
          <nav className="flex items-center gap-3 sm:gap-4 text-xs font-bold uppercase tracking-wider text-slate-700 overflow-x-auto no-scrollbar py-0.5">
            <a
              href="#inicio"
              onClick={(e) => handleScrollTo(e, 'inicio')}
              className="hover:text-[#60315F] transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              Início
            </a>

            <span className="text-slate-300 shrink-0">|</span>

            {categoriesNav.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={(e) => handleCategoryClick(e, cat.id)}
                  className={`transition-all whitespace-nowrap cursor-pointer shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                      : 'hover:text-[#60315F] hover:bg-white/60'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}

            <a
              href="#sobre"
              onClick={(e) => handleScrollTo(e, 'sobre')}
              className="hover:text-[#60315F] transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              Sobre
            </a>

            <a
              href="#contato"
              onClick={(e) => handleScrollTo(e, 'contato')}
              className="hover:text-[#60315F] transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              Contato
            </a>
          </nav>

          {/* Right highlighted button: "Precisa de ajuda? WhatsApp" */}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#60315F] to-[#7A3D76] hover:opacity-95 text-[#FAF6EE] text-xs font-bold tracking-wide shadow-xs whitespace-nowrap cursor-pointer shrink-0"
          >
            <Headphones className="w-3.5 h-3.5 text-[#DFB77C]" />
            <span>WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl animate-in slide-in-from-top max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-3 font-semibold text-sm text-slate-800">
            <div className="pb-3 border-b border-slate-100 flex items-center gap-3.5">
              <img
                src="/logo.jpg"
                alt="Rouvana Modas - Moda Feminina"
                className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-[#60315F]/30 ring-2 ring-[#DFB77C]/40 shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-[#331632]">
                  Rouvana Modas
                </span>
                <span className="text-xs text-[#60315F] font-semibold">
                  Moda Feminina
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#60315F] bg-[#FAF6EE] p-2.5 rounded-xl border border-[#60315F]/20 font-medium">
              <Ruler className="w-4 h-4 text-[#DFB77C]" />
              <span>Tamanhos do P ao G6</span>
            </div>

            <div className="font-bold text-xs uppercase tracking-wider text-[#60315F] pt-2">
              Categorias:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoriesNav.map((cat) => (
                <button
                  key={cat.id}
                  onClick={(e) => handleCategoryClick(e, cat.id)}
                  className="p-2.5 text-left rounded-xl text-xs font-bold transition-colors bg-[#F5EDF4] hover:bg-[#60315F] hover:text-white text-[#331632]"
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <a
              href="#sobre"
              onClick={(e) => handleScrollTo(e, 'sobre')}
              className="py-2 border-b border-slate-100 hover:text-[#60315F]"
            >
              Sobre a Rouvana Modas
            </a>
            <a
              href="#contato"
              onClick={(e) => handleScrollTo(e, 'contato')}
              className="py-2 border-b border-slate-100 hover:text-[#60315F]"
            >
              Localização & Contato
            </a>

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
