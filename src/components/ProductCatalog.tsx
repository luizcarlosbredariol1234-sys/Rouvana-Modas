import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronLeft,
  ChevronRight,
  Instagram,
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Eye,
  Ruler,
  Sparkles,
  Leaf,
} from 'lucide-react';
import { PRODUCTS_DATA, COMPANY_INFO } from '../data/products';
import { Product } from '../types/catalog';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onContactClick: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onContactClick,
}) => {
  const [activeTab, setActiveTab] = useState<'bestseller' | 'plus_size' | 'cotton' | 'new' | 'top_rated'>('bestseller');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // Size filter if selected
      if (selectedSizeFilter !== 'all' && !p.sizes.includes(selectedSizeFilter)) {
        return false;
      }

      if (activeTab === 'plus_size') {
        // Todas as peças possuem grade Plus Size (G1 ao G6)
        return p.sizes.some((s) => ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'].includes(s));
      }
      if (activeTab === 'cotton') {
        return (
          p.fiberHighlight.toLowerCase().includes('algodão') ||
          p.composition.toLowerCase().includes('algodão')
        );
      }
      if (activeTab === 'bestseller') return p.tag === 'bestseller' || p.rating >= 5;
      if (activeTab === 'new') return p.tag === 'new' || p.badge?.includes('Puro');
      if (activeTab === 'top_rated') return p.reviewsCount >= 70;
      return true;
    });
  }, [activeTab, selectedSizeFilter]);

  const regularSizes = ['P', 'M', 'G', 'GG'];
  const plusSizes = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'];

  return (
    <section id="produtos" className="py-16 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION TITLE & TABS (Trending Products) */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60315F] block mb-2">
            Catálogo Exclusivo · Chavantes - SP
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#331632] mb-4">
            Coleção Feminina & Moda Plus Size
          </h2>
          <p className="text-xs sm:text-sm text-[#553954] max-w-xl mx-auto mb-6">
            Nosso grande diferencial é a grade completa do <strong className="text-[#60315F]">P ao G6</strong>, com modelagens que abraçam e valorizam as curvas com caimento impecável.
          </p>

          {/* Filter Tabs Harmonized with Logo */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F5EDF4] rounded-full border border-[#60315F]/20 shadow-xs flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Mais Vendidos
            </button>
            <button
              onClick={() => {
                setActiveTab('plus_size');
                setSelectedSizeFilter('all');
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'plus_size'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs ring-2 ring-[#DFB77C]/60'
                  : 'text-[#60315F] bg-white/70 hover:bg-[#EBD8E9]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
              <span>Destaque Plus Size (G1 ao G6)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('cotton');
                setSelectedSizeFilter('all');
              }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cotton'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs ring-2 ring-[#DFB77C]/60'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Algodão</span>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Lançamentos
            </button>
            <button
              onClick={() => setActiveTab('top_rated')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'top_rated'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Mais Bem Avaliados
            </button>
          </div>

          {/* SELETOR INTERATIVO DE TAMANHOS (GRANDE DIFERENCIAL DA LOJA) */}
          <div className="mt-6 p-4 rounded-2xl bg-white/80 border border-[#60315F]/15 shadow-xs max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#331632]">
                <Ruler className="w-4 h-4 text-[#DFB77C]" />
                <span>Filtrar pelo seu Tamanho:</span>
                <span className="text-[11px] font-semibold text-[#60315F] bg-[#FAF5F9] px-2 py-0.5 rounded-full border border-[#60315F]/15">
                  Diferencial Rouvana Modas
                </span>
              </div>
              <button
                onClick={() => setSelectedSizeFilter('all')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedSizeFilter === 'all'
                    ? 'bg-[#60315F] text-[#FAF6EE]'
                    : 'text-slate-500 hover:text-[#60315F]'
                }`}
              >
                Todos ({PRODUCTS_DATA.length} peças)
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Regular:</span>
              {regularSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSizeFilter(size === selectedSizeFilter ? 'all' : size)}
                  className={`min-w-[34px] h-8 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSizeFilter === size
                      ? 'bg-[#60315F] text-[#FAF6EE] shadow-sm scale-105'
                      : 'bg-[#F5EDF4] text-[#553954] hover:bg-[#EBD8E9]'
                  }`}
                >
                  {size}
                </button>
              ))}

              <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

              <span className="text-[10px] uppercase font-bold text-[#60315F] mr-1 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                Plus Size:
              </span>
              {plusSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSizeFilter(size === selectedSizeFilter ? 'all' : size)}
                  className={`min-w-[36px] h-8 px-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedSizeFilter === size
                      ? 'bg-[#60315F] text-[#FAF6EE] ring-2 ring-[#DFB77C] shadow-sm scale-105'
                      : 'bg-[#FAF4EB] text-[#7A4B1A] border border-[#DEC295]/40 hover:bg-[#F3E7D5]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. FIVE PRODUCT CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">
          {filteredProducts.slice(0, 5).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white rounded-2xl border border-[#60315F]/15 p-3 hover:shadow-xl hover:border-[#60315F]/40 transition-all duration-300"
              >
                {/* Upper row: Discount Badge & Wishlist Heart */}
                <div className="flex items-center justify-between mb-2">
                  {product.discount ? (
                    <span className="bg-[#F5EDF4] text-[#60315F] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#60315F]/20">
                      {product.discount}
                    </span>
                  ) : product.fiberHighlight.toLowerCase().includes('algodão') ? (
                    <span className="bg-[#EBF7EE] text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                      100% Algodão
                    </span>
                  ) : (
                    <span className="bg-[#FAF4EB] text-[#7A4B1A] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#DEC295]/40">
                      Moda Mulher
                    </span>
                  )}

                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label="Adicionar aos favoritos"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'text-[#60315F] bg-[#F5EDF4]'
                        : 'text-slate-400 hover:text-[#60315F] hover:bg-[#F5EDF4]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-[#60315F]' : ''}`}
                    />
                  </button>
                </div>

                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-3/4 mb-3 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer border border-[#60315F]/10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-[#60315F]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-[2px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="p-2.5 rounded-full bg-white text-[#331632] hover:bg-[#60315F] hover:text-[#FAF6EE] transition-colors shadow-md"
                      title="Adicionar à sacola"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2.5 rounded-full bg-white text-[#331632] hover:bg-[#7A3D76] hover:text-[#FAF6EE] transition-colors shadow-md"
                      title="Ver detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex text-[#DFB77C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#DFB77C]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* Product Name */}
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="font-display font-bold text-xs sm:text-sm text-[#331632] hover:text-[#60315F] transition-colors cursor-pointer truncate mb-1"
                >
                  {product.name}
                </h3>

                {/* Sizing differential tags & visual size chips */}
                <div className="my-1.5 p-2 bg-[#FAF5F9] rounded-xl border border-[#60315F]/15">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#60315F] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-[#DFB77C]" />
                      Grade P ao G6
                    </span>
                    <span className="text-[9px] bg-[#60315F] text-[#FAF6EE] px-1.5 py-0.5 rounded-full font-extrabold flex items-center gap-0.5">
                      <Sparkles className="w-2 h-2 text-[#DFB77C]" />
                      Plus Size
                    </span>
                  </div>

                  {/* Size chips */}
                  <div className="flex flex-wrap items-center gap-1">
                    {product.sizes.map((s) => {
                      const isPlus = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'].includes(s);
                      const isSelected = selectedSizeFilter === s;
                      return (
                        <span
                          key={s}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-all ${
                            isSelected
                              ? 'bg-[#60315F] text-[#FAF6EE] ring-1 ring-[#DFB77C]'
                              : isPlus
                              ? 'bg-[#FAF4EB] text-[#7A4B1A] border border-[#DEC295]/50'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {s}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Prices */}
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="font-bold text-sm text-[#60315F]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-slate-400 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                {/* Add to bag button */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="mt-2.5 w-full py-2 px-2 rounded-xl bg-[#F5EDF4] hover:bg-[#60315F] hover:text-[#FAF6EE] text-[#60315F] text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#60315F]/20"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Adicionar à Sacola</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination dots */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#60315F] hover:border-[#60315F]/40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-[#60315F]" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#60315F] hover:border-[#60315F]/40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 🌟 BANNER EXCLUSIVO DE DESTAQUE: DIFERENCIAL DOS TAMANHOS & PLUS SIZE REAL 🌟 */}
        <div className="mb-14 rounded-3xl bg-gradient-to-br from-[#FAF5F9] via-[#FFFFFF] to-[#F5EDF4] p-6 sm:p-10 border-2 border-[#60315F]/25 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#60315F] text-[#FAF6EE] text-xs font-bold mb-3 shadow-xs">
                <Ruler className="w-3.5 h-3.5 text-[#DFB77C]" />
                <span>O GRANDE DIFERENCIAL DA ROUVANA MODAS</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#331632] mb-3">
                Moda Inclusiva & Plus Size Real: <br className="hidden sm:inline" />
                <span className="text-[#60315F]">Modelagens do P ao G6 Feitas para Você</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#553954] leading-relaxed mb-6">
                Aqui na Rouvana Modas, toda mulher encontra seu caimento perfeito. Não é adaptação de molde: nossa modelagem do <strong>P ao G6</strong> é pensada com proporções generosas no busto, braços e quadril para garantir liberdade, elegância e segurança.
              </p>

              {/* 3 cards de diferenciais de tamanho */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-white border border-[#60315F]/15 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#60315F] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>Grade G1 ao G6</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Busto até 164 cm e quadril até 172 cm com corte fluido que valoriza.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#60315F]/15 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#60315F] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>Mesmo Valor</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Sem acréscimos por tamanho. Respeito e transparência do P ao G6.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#60315F]/15 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#60315F] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>Auxílio no WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Tire dúvidas das suas medidas diretamente com nossa equipe.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onContactClick}
                  className="px-6 py-3 rounded-full bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Tirar Dúvida de Medidas no WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#DFB77C]" />
                </button>
              </div>
            </div>

            {/* Imagem de modelo plus size elegante */}
            <div className="relative shrink-0 w-64 sm:w-72">
              <img
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
                alt="Moda Plus Size Rouvana Modas"
                className="w-full h-80 object-cover object-top rounded-3xl shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-[#60315F]/20 shadow-lg text-[11px] font-bold text-[#60315F]">
                ✨ Do P ao G6 com Elegância
              </div>
            </div>
          </div>
        </div>

        {/* 3. FIVE TRUST & DIFFERENTIAL FEATURE BADGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[#FAF6EE] border border-[#60315F]/15 shadow-xs mb-16">
          {/* 1. Diferencial: Tamanhos do P ao G6 */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/20 shadow-xs">
              <Ruler className="w-6 h-6 text-[#60315F]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#60315F] bg-[#FAF5F9] px-1.5 py-0.5 rounded">
                <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                Diferencial
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Tamanhos P ao G6
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Modelagens inclusivas para você
              </p>
            </div>
          </div>

          {/* 2. 10% OFF 1º Pedido */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/20">
              <Sparkles className="w-6 h-6 text-[#60315F]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#60315F] bg-[#FAF5F9] px-1.5 py-0.5 rounded">
                10% OFF
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Primeiro Pedido
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Realce seu estilo com desconto
              </p>
            </div>
          </div>

          {/* 3. Instagram Rouvana Modas */}
          <a
            href={COMPANY_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-[#F5EDF4] group-hover:bg-[#60315F] group-hover:text-[#FAF6EE] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15 transition-all shadow-xs">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632] group-hover:text-[#60315F] transition-colors">
                Instagram Oficial
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5 font-semibold">
                {COMPANY_INFO.instagram}
              </p>
            </div>
          </a>

          {/* 4. Peças 100% Algodão */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#EBF7EE] flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-200 shadow-xs">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-800 bg-[#EBF7EE] px-1.5 py-0.5 rounded">
                100% Algodão
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                100% Algodão
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Temos peças 100% algodão
              </p>
            </div>
          </div>

          {/* 5. Secure Payment */}
          <div className="flex items-center gap-3.5 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-[#ECE2EA] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                100% Seguro
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Pix 10% OFF ou 3x s/ juros
              </p>
            </div>
          </div>
        </div>

        {/* 4. SECONDARY PROMO BANNER (Fiel à Identidade Visual da Logo) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#331632] via-[#4D254C] to-[#60315F] text-[#FAF6EE] min-h-[360px] flex items-center px-6 sm:px-14 py-10 mb-16 border border-[#DFB77C]/30 shadow-xl">
          {/* Decorative glowing plum orb */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#7A3D76]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
            {/* Left promo copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFB77C] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DFB77C]" />
                Moda Mulher · Temos Peças 100% Algodão · Rouvana Modas
              </span>

              <h3 className="font-display font-bold text-[#FAF6EE] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
                Elegância Feita <br />
                <span className="text-[#DFB77C] italic">Especialmente para Você</span>
              </h3>

              <p className="text-sm text-[#E6D4E3] max-w-md mb-6 leading-relaxed">
                Tamanhos do P ao G6 com modelagens que abraçam sua beleza. Temos peças 100% algodão com caimento impecável e elegância atemporal.
              </p>

              <button
                onClick={onContactClick}
                className="px-8 py-4 rounded-full bg-[#DFB77C] hover:bg-[#E5C38E] text-[#331632] font-bold text-xs sm:text-sm shadow-lg shadow-black/25 flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Falar no WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#331632]" />
              </button>
            </div>

            {/* Right model image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80"
                alt="Coleção Rouvana Modas"
                className="w-64 sm:w-72 h-72 sm:h-80 object-cover object-top rounded-2xl shadow-2xl border-2 border-[#DFB77C]/40"
              />
            </div>
          </div>
        </div>

        {/* 5. EXCELLENCE SEALS (Harmonizado com a Logo e Chavantes - SP) */}
        <div className="py-8 border-y border-[#60315F]/15 mb-8 bg-[#F5EDF4]/60 rounded-2xl px-6">
          <div className="flex flex-wrap items-center justify-around gap-6 sm:gap-8 text-xs font-bold text-[#60315F]">
            <div className="flex items-center gap-2 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB77C]" />
              <span className="font-display text-sm tracking-wider">ROUVANA MODAS · CHAVANTES</span>
            </div>
            <div className="flex items-center gap-2 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB77C]" />
              <span className="font-display text-sm tracking-wider">TAMANHOS P AO G6</span>
            </div>
            <div className="flex items-center gap-2 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB77C]" />
              <span className="font-display text-sm tracking-wider">PEÇAS 100% ALGODÃO</span>
            </div>
            <div className="flex items-center gap-2 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB77C]" />
              <span className="font-display text-sm tracking-wider">CAIMENTO IMPECÁVEL</span>
            </div>
            <div className="flex items-center gap-2 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB77C]" />
              <span className="font-display text-sm tracking-wider">ATENDIMENTO HUMANIZADO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
