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
  Moon,
} from 'lucide-react';
import { PRODUCTS_DATA, COMPANY_INFO, CATEGORIES_LIST } from '../data/products';
import { Product, ProductCategory } from '../types/catalog';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onContactClick: () => void;
  selectedCategory?: ProductCategory;
  onSelectCategory?: (category: ProductCategory) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onContactClick,
  selectedCategory = 'todos',
  onSelectCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<ProductCategory>(selectedCategory);
  const [activeTab, setActiveTab] = useState<'all' | 'bestseller' | 'cotton' | 'new' | 'top_rated'>('all');

  // Sync if prop changes
  React.useEffect(() => {
    setInternalCategory(selectedCategory);
  }, [selectedCategory]);

  const currentCategory = onSelectCategory ? selectedCategory : internalCategory;

  const handleCategorySelect = (cat: ProductCategory) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setInternalCategory(cat);
    }
    setActiveTab('all');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // 1. Category filter
      if (currentCategory === 'plus_size') {
        const hasPlus = p.sizes.some((s) => ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'].includes(s));
        if (!hasPlus) return false;
      } else if (currentCategory !== 'todos') {
        if (p.category !== currentCategory) return false;
      }

      // 2. Tab filter
      if (activeTab === 'cotton') {
        return (
          p.fiberHighlight.toLowerCase().includes('algodão') ||
          p.composition.toLowerCase().includes('algodão')
        );
      }
      if (activeTab === 'bestseller') return p.tag === 'bestseller' || p.rating >= 5;
      if (activeTab === 'new') return p.tag === 'new' || p.badge?.includes('Novo');
      if (activeTab === 'top_rated') return p.reviewsCount >= 70;
      return true;
    });
  }, [currentCategory, activeTab]);

  return (
    <section id="produtos" className="py-16 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION TITLE */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60315F] block mb-2">
            Catálogo Exclusivo · Chavantes - SP
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#331632] mb-3">
            Coleção Feminina & Moda Plus Size
          </h2>
          <p className="text-xs sm:text-sm text-[#553954] max-w-2xl mx-auto mb-6">
            Peças femininas selecionadas com caimento harmonioso, tecidos confortáveis e acabamentos delicados para todas as ocasiões.
          </p>

          {/* 🌟 8 CATEGORIAS OFICIAIS SOLICITADAS + PLUS SIZE 🌟 */}
          <div className="mb-4">
            <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
              Selecione uma Categoria:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 justify-start sm:justify-center flex-wrap">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = currentCategory === cat.id;
                const isPajamas = cat.id === 'pijamas';
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#60315F] text-[#FAF6EE] shadow-md ring-2 ring-[#DFB77C]/60 scale-105'
                        : isPajamas
                        ? 'bg-gradient-to-r from-[#FAF5F9] to-[#F5EDF4] text-[#60315F] border-2 border-[#60315F]/40 hover:bg-[#60315F] hover:text-[#FAF6EE] shadow-xs'
                        : 'bg-white text-[#331632] hover:bg-[#F5EDF4] hover:text-[#60315F] border border-[#60315F]/15'
                    }`}
                  >
                    {isPajamas && <Moon className="w-3.5 h-3.5 text-[#DFB77C]" />}
                    {cat.id === 'plus_size' && <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />}
                    <span>{cat.label}</span>
                    {cat.highlightBadge && (
                      <span className="text-[9px] bg-[#DFB77C] text-[#331632] px-1.5 py-0.2 rounded-full font-black">
                        {cat.highlightBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Quick Filter Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F5EDF4] rounded-full border border-[#60315F]/20 shadow-xs flex-wrap justify-center mt-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Todos os Destaques
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Mais Vendidos
            </button>
            <button
              onClick={() => setActiveTab('cotton')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cotton'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Algodão</span>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                  : 'text-[#553954] hover:text-[#60315F]'
              }`}
            >
              Lançamentos
            </button>
          </div>

        </div>

        {/* 🌙 BANNER ESPECIAL DE DESTAQUE QUANDO CATEGORIA PIJAMAS ESTÁ ATIVA 🌙 */}
        {currentCategory === 'pijamas' && (
          <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#331632] via-[#4D254C] to-[#60315F] text-[#FAF6EE] shadow-lg border-2 border-[#DFB77C]/60 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[#DFB77C] shadow-md bg-white">
                <img
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80"
                  alt="Pijamas do P ao 54"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#DFB77C]/25 text-[#DFB77C] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 border border-[#DFB77C]/40">
                  <Sparkles className="w-3 h-3 text-[#DFB77C]" />
                  <span>Coleção Especial Noite & Conforto</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#FAF6EE] flex items-center gap-2">
                  <span>PIJAMAS DO P AO 54</span>
                  <Moon className="w-5 h-5 text-[#DFB77C] shrink-0" />
                </h3>
                <p className="text-xs sm:text-sm text-[#F5EDF4]/90 mt-1 max-w-xl leading-relaxed">
                  Conforto sem igual para suas noites. Malhas antialérgicas, macias e toque aveludado com modelagem pensada do <strong className="text-[#DFB77C]">tamanho P até o 54 (G4/G6)</strong> com caimento aconchegante e acolhedor.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-[#DFB77C] bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
                ⭐ Conforto & Aconchego
              </span>
              <span className="text-xs font-bold text-[#FAF6EE] bg-white/10 px-3.5 py-2 rounded-xl border border-white/15">
                📏 Grade: P ao 54
              </span>
            </div>
          </div>
        )}

        {/* 2. PRODUCT CARDS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#60315F]/15 p-8 max-w-md mx-auto mb-12">
            <p className="text-sm text-[#553954] mb-4">
              Nenhuma peça encontrada com os filtros selecionados.
            </p>
            <button
              onClick={() => {
                handleCategorySelect('todos');
                setActiveTab('all');
              }}
              className="px-4 py-2 bg-[#60315F] text-white rounded-xl text-xs font-bold"
            >
              Ver todas as peças da loja
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-[#60315F]/15 p-3.5 hover:shadow-xl hover:border-[#60315F]/40 transition-all duration-300"
                >
                  {/* Upper row: Category badge & Wishlist Heart */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#F5EDF4] text-[#60315F] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#60315F]/20">
                      {product.categoryLabel}
                    </span>

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
                    {product.badge && (
                      <div className="absolute top-2 left-2 z-10 bg-[#60315F] text-[#FAF6EE] text-[9px] font-black px-2 py-0.5 rounded-full shadow-md border border-[#DFB77C]/60 flex items-center gap-1">
                        {product.category === 'pijamas' ? (
                          <Moon className="w-2.5 h-2.5 text-[#DFB77C]" />
                        ) : (
                          <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                        )}
                        <span>{product.badge}</span>
                      </div>
                    )}

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

                  {/* Sizing differential tags */}
                  {product.category === 'pijamas' ? (
                    <div className="my-1.5 p-2 bg-gradient-to-r from-[#FAF5F9] to-[#F5EDF4] rounded-xl border border-[#60315F]/30 shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] font-black text-[#60315F] mb-1">
                        <span className="flex items-center gap-1">
                          <Moon className="w-3 h-3 text-[#DFB77C]" />
                          PIJAMAS DO P AO 54
                        </span>
                        <span className="text-[9px] bg-[#60315F] text-[#FAF6EE] px-1.5 py-0.5 rounded-full font-black flex items-center gap-0.5">
                          <Sparkles className="w-2 h-2 text-[#DFB77C]" />
                          P ao 54
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-[#553954] font-semibold">
                        <span>Grade P ao 54 (G4)</span>
                        <span className="text-[#60315F] font-bold flex items-center gap-0.5">
                          <Moon className="w-2.5 h-2.5 text-[#DFB77C]" />
                          Conforto Total
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="my-1.5 p-2 bg-[#FAF5F9] rounded-xl border border-[#60315F]/15">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#60315F] mb-1">
                        <span className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-[#DFB77C]" />
                          Grade P ao G6
                        </span>
                        <span className="text-[9px] bg-[#60315F] text-[#FAF6EE] px-1.5 py-0.5 rounded-full font-extrabold flex items-center gap-0.5">
                          <Sparkles className="w-2 h-2 text-[#DFB77C]" />
                          Plus Size
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-500 font-medium">
                        <span>{product.sizes.length} tamanhos</span>
                        <span className="text-[#60315F] font-semibold flex items-center gap-0.5">
                          <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                          Caimento Impecável
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Prices */}
                  <div className="mt-auto flex items-baseline gap-2 pt-2">
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
        )}

        {/* 🌟 BANNER EXCLUSIVO DE DESTAQUE: DIFERENCIAIS DA LOJA 🌟 */}
        <div className="mb-14 rounded-3xl bg-gradient-to-br from-[#FAF5F9] via-[#FFFFFF] to-[#F5EDF4] p-6 sm:p-10 border-2 border-[#60315F]/25 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#60315F] text-[#FAF6EE] text-xs font-bold mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                <span>COLEÇÃO EXCLUSIVA ROUVANA MODAS</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#331632] mb-3">
                Grade Inclusiva do P ao G6: <br className="hidden sm:inline" />
                <span className="text-[#60315F]">Elegância e Modelagem Impecável</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#553954] leading-relaxed mb-6">
                Aqui na Rouvana Modas você encontra todas as categorias de roupas femininas (vestidos, pijamas, saias, regatas, camisas e blusas, pantalonas e calças, bermudas e lingerie) com extremo bom gosto, acabamento primoroso e modelagens que abraçam todos os biotipos.
              </p>

              {/* 3 cards de diferenciais */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-white border border-[#60315F]/15 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#60315F] mb-1">
                    <Ruler className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>Grade P ao G6</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Do regular ao plus size real sem diferença de valor. Modelagens inclusivas.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#60315F]/15 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#60315F] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>8 Categorias</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Coleções completas do casual à alfaiataria e moda noite.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#60315F]/15 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#60315F] mb-1">
                    <Heart className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>Atendimento Próximo</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Orientamos você sobre medidas e modelos pelo WhatsApp da loja.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onContactClick}
                  className="px-6 py-3 rounded-full bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Falar Conosco no WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#DFB77C]" />
                </button>
              </div>
            </div>

            {/* Imagem */}
            <div className="relative shrink-0 w-64 sm:w-72">
              <img
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
                alt="Rouvana Modas"
                className="w-full h-80 object-cover object-top rounded-3xl shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-[#60315F]/20 shadow-lg text-[11px] font-bold text-[#60315F]">
                ✨ Grade Completa P ao G6
              </div>
            </div>
          </div>
        </div>

        {/* 3. FIVE TRUST & DIFFERENTIAL FEATURE BADGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[#FAF6EE] border border-[#60315F]/15 shadow-xs mb-16">
          {/* 1. Atendimento Personalizado */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/20 shadow-xs">
              <Headphones className="w-6 h-6 text-[#60315F]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#60315F] bg-[#FAF5F9] px-1.5 py-0.5 rounded">
                <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                Dedicação
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Atendimento Próximo
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Consultoria e carinho
              </p>
            </div>
          </div>

          {/* 2. Compra Segura & Prática */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/20">
              <ShieldCheck className="w-6 h-6 text-[#60315F]" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Compra Confiável
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Pix e cartões em até 3x
              </p>
            </div>
          </div>

          {/* 3. Tamanhos P ao G6 */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/20">
              <Ruler className="w-6 h-6 text-[#60315F]" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                Tamanhos P ao G6
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Modelagens inclusivas
              </p>
            </div>
          </div>

          {/* 4. Instagram */}
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

          {/* 5. Pagamento Seguro & 10% OFF */}
          <div className="flex items-center gap-3.5 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-[#ECE2EA] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#331632]">
                10% OFF 1º Pedido
              </h4>
              <p className="text-[11px] text-[#553954] mt-0.5">
                Pix com desconto ou 3x s/ juros
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
