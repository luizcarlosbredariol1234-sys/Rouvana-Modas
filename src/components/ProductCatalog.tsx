import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  ShoppingBag,
  Instagram,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Eye,
  Ruler,
  Sparkles,
  Leaf,
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
      if (currentCategory !== 'todos') {
        if (p.category !== currentCategory && p.secondaryCategory !== currentCategory) return false;
      }

      // 2. Tab filter
      if (activeTab === 'cotton') {
        return (
          p.fiberHighlight.toLowerCase().includes('algodão') ||
          p.composition.toLowerCase().includes('algodão')
        );
      }
      if (activeTab === 'bestseller') return p.tag === 'bestseller' || p.rating >= 5;
      if (activeTab === 'new') return p.tag === 'new';
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
            Catálogo Exclusivo
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#331632] mb-3">
            Coleção Feminina
          </h2>
          <p className="text-xs sm:text-sm text-[#553954] max-w-2xl mx-auto mb-6">
            Peças femininas selecionadas com caimento harmonioso, tecidos confortáveis e acabamentos delicados para todas as ocasiões.
          </p>

          {/* Categorias da Loja */}
          <div className="mb-4">
            <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
              Selecione uma Categoria:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 justify-start sm:justify-center flex-wrap">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#60315F] text-[#FAF6EE] shadow-md ring-2 ring-[#DFB77C]/60 scale-105'
                        : 'bg-white text-[#331632] hover:bg-[#F5EDF4] hover:text-[#60315F] border border-[#60315F]/15'
                    }`}
                  >
                    <span>{cat.label}</span>
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
                    className={`relative aspect-3/4 mb-3 rounded-xl overflow-hidden ${
                      product.isLandscape || product.imageFit === 'contain'
                        ? 'bg-[#F9F6F0]'
                        : 'bg-slate-50'
                    } flex items-center justify-center cursor-pointer border border-[#60315F]/10`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full ${
                        product.isLandscape || product.imageFit === 'contain'
                          ? 'object-contain p-1.5'
                          : 'object-cover object-top'
                      } group-hover:scale-105 transition-transform duration-500`}
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

                  {/* Product Name */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display font-bold text-xs sm:text-sm text-[#331632] hover:text-[#60315F] transition-colors cursor-pointer truncate mb-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-[#553954] line-clamp-1 mb-2">
                    {product.shortDescription}
                  </p>

                  {/* Add to bag button */}
                  <div className="mt-auto pt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#F5EDF4] hover:bg-[#60315F] hover:text-[#FAF6EE] text-[#60315F] text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#60315F]/20 shadow-2xs hover:shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Adicionar à Sacola</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}



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
                Atenção e carinho
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
