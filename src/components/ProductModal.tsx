import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Product, ProductColor } from '../types/catalog';
import { X, Check, MessageCircle, ShoppingBag, Star, ShieldCheck, Feather, Info, Sparkles, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [activeTab, setActiveTab] = useState<'detalhes' | 'cuidados'>('detalhes');
  const [addedNotice, setAddedNotice] = useState(false);

  // Sync state if product changes
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }, [product]);

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  const handleWhatsAppInquiry = () => {
    const text = `Olá, Rouvana Modas! Gostaria de solicitar um orçamento para a peça "${product.name}", tamanho ${selectedSize} e cor ${selectedColor.name}.`;
    const url = `https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const isLandscape = product.isLandscape || product.imageFit === 'contain';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 z-10 p-5 sm:p-8"
      >
        {/* Top Sticky Bar: Botão Voltar & Fechar em Destaque */}
        <div className="sticky -top-5 sm:-top-8 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 bg-white/95 backdrop-blur-md border-b border-slate-100 z-30 flex items-center justify-between mb-5 rounded-t-3xl shadow-2xs">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5F9] hover:bg-[#F5EDF4] text-[#60315F] font-bold text-xs sm:text-sm border border-[#60315F]/20 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#60315F]" />
            <span>← Voltar ao Catálogo</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <span>Fechar</span>
            <X className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Grid: Image on left + Details on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Product Image */}
          <div className={`${isLandscape ? 'md:col-span-6' : 'md:col-span-5'} flex flex-col gap-3`}>
            <div className={`relative ${isLandscape ? 'aspect-4/3' : 'aspect-3/4'} rounded-2xl overflow-hidden ${isLandscape ? 'bg-[#F9F6F0]' : 'bg-slate-50'} border border-[#60315F]/15 shadow-sm flex items-center justify-center`}>
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full ${isLandscape ? 'object-contain p-2' : 'object-cover object-top'}`}
              />
              {product.discount && (
                <span className="absolute top-3 left-3 bg-[#60315F] text-[#FAF6EE] text-xs font-black px-2.5 py-1 rounded-full shadow-sm">
                  {product.discount}
                </span>
              )}
            </div>

            {isLandscape && (
              <div className="p-2.5 rounded-xl bg-[#FAF5F9] border border-[#60315F]/15 text-center">
                <span className="text-[11px] font-semibold text-[#60315F] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                  Enquadramento completo exibindo ambas as modelos
                </span>
              </div>
            )}

            {/* Trust micro badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F5EDF4] text-[#60315F] font-medium border border-[#60315F]/15">
                <Feather className="w-3.5 h-3.5 text-[#60315F] shrink-0" />
                <span>100% Conforto</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#FAF4EB] text-[#7A4B1A] font-medium border border-[#DEC295]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A4B1A] shrink-0" />
                <span>Troca em 30 Dias</span>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className={`${isLandscape ? 'md:col-span-6' : 'md:col-span-7'} flex flex-col`}>
              <div className="flex items-center gap-2 text-xs font-bold text-[#60315F] uppercase mb-1">
                <span>{product.categoryLabel}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-normal">{product.fiberHighlight}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#331632] mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex text-[#DFB77C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#DFB77C]" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  ({product.reviewsCount} avaliações de clientes)
                </span>
              </div>

              {/* Product Description Highlight */}
              <div className="mb-4 pb-4 border-b border-[#60315F]/15 space-y-2.5">
                <p className="text-xs sm:text-sm text-[#553954] font-medium leading-relaxed bg-[#FAF5F9] p-3 rounded-xl border border-[#60315F]/15 whitespace-pre-line">
                  {product.shortDescription}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#60315F] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                    Orçamento sob consulta · Atendimento exclusivo
                  </span>
                </div>
              </div>

              {/* Color swatches */}
              <div className="mb-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Cor: <strong className="text-[#331632]">{selectedColor.name}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                            : 'bg-[#F5EDF4] text-[#553954] hover:bg-[#EBD8E9]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full shrink-0 ${color.border ? 'border border-slate-300' : ''}`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Tamanho Selecionado: <strong className="text-[#331632] text-sm">{selectedSize}</strong>
                    </span>
                    {['G1', 'G2', 'G3', 'G4', 'G5', 'G6'].includes(selectedSize) && (
                      <span className="bg-[#60315F] text-[#FAF6EE] font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 text-[#DFB77C]" />
                        Modelagem Plus Size
                      </span>
                    )}
                  </div>
                </div>

                {/* Grade Completa de Tamanhos */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[42px] h-9 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#60315F] text-[#FAF6EE] shadow-xs'
                            : 'bg-[#F5EDF4] text-[#553954] hover:bg-[#EBD8E9]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Diferencial: Modelagem & Caimento Exclusivo */}
                <div className="p-2.5 rounded-xl bg-white border border-[#60315F]/15 flex items-start gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-[#DFB77C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#60315F] block">
                      Diferencial Rouvana Modas: Grade do P ao G6
                    </span>
                    <p className="text-[11px] text-[#553954] mt-0.5 leading-snug">
                      Peças pensadas para valorizar seu corpo e estilo com extremo conforto. Dúvidas no tamanho? Nossa equipe auxilia você pelo WhatsApp.
                    </p>
                  </div>
                </div>

              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#60315F]/15 mb-4 gap-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('detalhes')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'detalhes'
                      ? 'text-[#60315F] border-b-2 border-[#60315F]'
                      : 'text-slate-500 hover:text-[#60315F]'
                  }`}
                >
                  Descrição & Tecido
                </button>
                <button
                  onClick={() => setActiveTab('cuidados')}
                  className={`pb-2.5 transition-colors cursor-pointer ${
                    activeTab === 'cuidados'
                      ? 'text-[#60315F] border-b-2 border-[#60315F]'
                      : 'text-slate-500 hover:text-[#60315F]'
                  }`}
                >
                  Cuidados
                </button>
              </div>

              {/* Tab Content */}
              <div className="mb-6 min-h-[100px] text-xs text-slate-600">
                {activeTab === 'detalhes' && (
                  <div className="space-y-2">
                    <p className="leading-relaxed text-[#553954] whitespace-pre-line">
                      {product.fullDescription}
                    </p>
                    <p className="font-semibold text-[#331632]">
                      Composição: {product.composition}
                    </p>
                  </div>
                )}

                {activeTab === 'cuidados' && (
                  <ul className="space-y-1.5">
                    {product.careGuide.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#60315F] to-[#7A3D76] hover:from-[#4D254C] hover:to-[#60315F] text-[#FAF6EE] font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DFB77C]" />
                    <span>{addedNotice ? 'Adicionado com Sucesso!' : 'Adicionar à Sacola'}</span>
                  </button>

                  <button
                    onClick={handleWhatsAppInquiry}
                    className="py-3.5 px-5 rounded-2xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Solicitar Orçamento no WhatsApp</span>
                  </button>
                </div>

                {/* Botão Voltar Inferior */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 px-5 rounded-2xl bg-[#FAF5F9] hover:bg-[#F5EDF4] text-[#60315F] border border-[#60315F]/20 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs active:scale-98"
                >
                  <ArrowLeft className="w-4 h-4 text-[#60315F]" />
                  <span>← Voltar e Continuar Vendo as Peças</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
  );
};
