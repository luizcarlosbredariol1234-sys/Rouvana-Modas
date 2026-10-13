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
  Scissors,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new' | 'top_rated'>('bestseller');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      if (activeTab === 'bestseller') return p.tag === 'bestseller' || p.rating >= 5;
      if (activeTab === 'new') return p.tag === 'new' || p.badge?.includes('Nobre');
      if (activeTab === 'top_rated') return p.reviewsCount >= 70;
      return true;
    });
  }, [activeTab]);

  return (
    <section id="produtos" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION TITLE & TABS (Trending Products) */}
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#331632] mb-5">
            Produtos em Destaque
          </h2>

          {/* Filter Pills */}
          <div className="inline-flex items-center gap-2 p-1 bg-[#F5EDF4] rounded-full border border-[#60315F]/15">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Mais Vendidos
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Lançamentos
            </button>
            <button
              onClick={() => setActiveTab('top_rated')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'top_rated'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Mais Bem Avaliados
            </button>
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
                  ) : (
                    <span className="bg-[#FAF4EB] text-[#7A4B1A] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#DEC295]/40">
                      Linho Nobre
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

                {/* Sizing & Alteration differential tag */}
                <div className="flex items-center gap-1.5 text-[10px] text-[#60315F] font-semibold mb-1.5 flex-wrap">
                  <span className="bg-[#FAF5F9] px-1.5 py-0.5 rounded border border-[#60315F]/15 flex items-center gap-1">
                    <Ruler className="w-2.5 h-2.5 text-[#DFB77C]" />
                    P ao G6
                  </span>
                  <span className="bg-[#FAF4EB] text-[#7A4B1A] px-1.5 py-0.5 rounded border border-[#DEC295]/40 flex items-center gap-1">
                    <Scissors className="w-2.5 h-2.5" />
                    Ajustes sem custo
                  </span>
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
        <div className="flex items-center justify-center gap-3 mb-16">
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

          {/* 2. Ajustes sem custo */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FAF4EB] flex items-center justify-center text-[#7A4B1A] shrink-0 border border-[#DEC295]/30">
              <Scissors className="w-6 h-6 text-[#7A4B1A]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#7A4B1A] bg-[#FFF9F0] px-1.5 py-0.5 rounded">
                Exclusivo
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Ajustes sem Custo
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Bainha e caimento sob medida
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

          {/* 4. 30-Day Return */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F8EDF3] flex items-center justify-center text-[#92718B] shrink-0 border border-[#92718B]/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Troca em 30 Dias
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Sem burocracia ou taxas
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

        {/* 4. SECONDARY PROMO BANNER (Harmonized with Logo Palette) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FAF5F9] via-[#F4E8F2] to-[#EBD5E7] min-h-[360px] flex items-center px-6 sm:px-14 py-8 mb-16 border border-[#60315F]/15 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
            {/* Left promo copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#92718B] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#60315F]" />
                Nova Coleção Exclusiva
              </span>

              <h3 className="font-display font-bold text-[#331632] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-3">
                Lançamentos <br />
                <span className="text-[#60315F]">Feitos para Você</span>
              </h3>

              <p className="text-sm text-[#553954] max-w-md mb-6 leading-relaxed">
                Aproveite até 40% OFF no seu primeiro pedido. Peças selecionadas pela Rouvana Modas para valorizar sua beleza com conforto e sofisticação.
              </p>

              <button
                onClick={onContactClick}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#60315F] to-[#7A3D76] hover:from-[#4D254C] hover:to-[#60315F] text-[#FAF6EE] font-bold text-xs sm:text-sm shadow-md shadow-[#60315F]/25 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Comprar Agora</span>
                <ArrowRight className="w-4 h-4 text-[#DFB77C]" />
              </button>
            </div>

            {/* Right model image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80"
                alt="Coleção Rouvana Modas"
                className="w-64 sm:w-72 h-72 sm:h-80 object-cover object-top rounded-2xl shadow-lg border-2 border-white/90"
              />
            </div>
          </div>
        </div>

        {/* 5. BRAND LOGOS STRIP */}
        <div className="py-6 border-y border-slate-200/80 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10 opacity-70 grayscale hover:grayscale-0 transition-all text-xs font-bold text-slate-500">
            <span className="font-display text-xl sm:text-2xl tracking-widest text-slate-900">ZARA</span>
            <span className="font-display text-xl sm:text-2xl tracking-widest text-red-600 font-extrabold italic">H&M</span>
            <span className="font-display text-lg sm:text-xl tracking-widest text-slate-900">MANGO</span>
            <span className="font-display text-lg sm:text-xl tracking-widest bg-red-600 text-white px-2 py-0.5 rounded font-black">Levi's</span>
            <span className="font-display text-lg sm:text-xl tracking-widest text-slate-900 font-black">GUESS</span>
            <span className="font-display text-lg sm:text-xl tracking-widest text-slate-900 font-black">NIKE</span>
            <span className="font-display text-lg sm:text-xl tracking-widest text-slate-900 font-black">ADIDAS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
