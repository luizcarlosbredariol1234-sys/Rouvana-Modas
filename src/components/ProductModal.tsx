import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColor } from '../types/catalog';
import {
  X,
  MessageCircle,
  ShoppingBag,
  ShieldCheck,
  Feather,
  Info,
  Sparkles,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
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
  const [addedNotice, setAddedNotice] = useState(false);

  // Hover zoom lens state
  const [isHoveringZoom, setIsHoveringZoom] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Fullscreen high-resolution zoom lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Sync state if product changes
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setIsLightboxOpen(false);
    setLightboxScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, [product]);

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
          setLightboxScale(1);
          setPanOffset({ x: 0, y: 0 });
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (lightboxScale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && lightboxScale > 1) {
      e.preventDefault();
      setPanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (lightboxScale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && lightboxScale > 1 && e.touches.length === 1) {
      setPanOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

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
            <div
              onMouseEnter={() => setIsHoveringZoom(true)}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={() => setIsHoveringZoom(false)}
              onClick={() => setIsLightboxOpen(true)}
              className={`relative ${isLandscape ? 'aspect-4/3' : 'aspect-3/4'} rounded-2xl overflow-hidden ${isLandscape ? 'bg-[#F9F6F0]' : 'bg-slate-50'} border border-[#60315F]/15 shadow-sm flex items-center justify-center cursor-zoom-in group select-none`}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  transform: isHoveringZoom ? 'scale(2.2)' : 'scale(1)',
                  transition: isHoveringZoom ? 'transform 0.08s ease-out' : 'transform 0.3s ease-out',
                }}
                className={`w-full h-full ${isLandscape ? 'object-contain p-2' : 'object-cover object-top'} pointer-events-none`}
              />
            </div>

            {product.id.includes('pijama-regata-bolinhas') && (
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

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#331632] mb-3">
                {product.name}
              </h2>

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

              {/* Product Details & Composition */}
              <div className="mb-6 space-y-2 text-xs text-slate-600 border-t border-[#60315F]/15 pt-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#60315F]">
                  Descrição & Detalhes da Peça
                </span>
                <p className="leading-relaxed text-[#553954] whitespace-pre-line text-xs sm:text-sm">
                  {product.fullDescription}
                </p>
                <p className="font-semibold text-[#331632] pt-1">
                  Composição: {product.composition}
                </p>
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

        {/* Full-Screen High-Resolution Zoom Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setIsLightboxOpen(false);
                setLightboxScale(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col p-3 sm:p-6 select-none"
            >
              {/* Top Control Bar */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 shrink-0 text-white"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[11px] font-bold text-[#DFB77C] uppercase tracking-wider block">
                    Modo Detalhes em Alta Definição
                  </span>
                  <h3 className="text-sm sm:text-base font-bold truncate text-white">
                    {product.name}
                  </h3>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={lightboxScale <= 1}
                    onClick={() => setLightboxScale((s) => Math.max(1, +(s - 0.5).toFixed(1)))}
                    title="Diminuir Zoom"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer text-white"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>

                  <span className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-bold text-[#DFB77C] min-w-[52px] text-center">
                    {Math.round(lightboxScale * 100)}%
                  </span>

                  <button
                    type="button"
                    disabled={lightboxScale >= 4}
                    onClick={() => setLightboxScale((s) => Math.min(4, +(s + 0.5).toFixed(1)))}
                    title="Aumentar Zoom"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer text-white"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLightboxScale(1);
                      setPanOffset({ x: 0, y: 0 });
                    }}
                    title="Redefinir Zoom (100%)"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLightboxOpen(false);
                      setLightboxScale(1);
                      setPanOffset({ x: 0, y: 0 });
                    }}
                    title="Fechar Zoom"
                    className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer active:scale-95"
                  >
                    <span>Fechar</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Centered Zoom Canvas Area */}
              <div
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setIsDragging(false)}
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY < 0 ? 0.3 : -0.3;
                  setLightboxScale((s) => Math.min(4, Math.max(1, +(s + delta).toFixed(1))));
                }}
                onDoubleClick={() => {
                  if (lightboxScale > 1) {
                    setLightboxScale(1);
                    setPanOffset({ x: 0, y: 0 });
                  } else {
                    setLightboxScale(2.5);
                  }
                }}
                className={`flex-1 overflow-hidden flex items-center justify-center relative ${
                  lightboxScale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  draggable={false}
                  style={{
                    transform: `scale(${lightboxScale}) translate(${panOffset.x / lightboxScale}px, ${panOffset.y / lightboxScale}px)`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                    maxWidth: '85vw',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                  }}
                  className="select-none pointer-events-auto rounded-xl shadow-2xl"
                />
              </div>

              {/* Bottom Instruction Bar */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="pt-2 text-center text-xs text-white/70 shrink-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFB77C]" />
                <span>Duplo clique ou use o scroll para aproximar/afastar · Arraste para inspecionar os detalhes do tecido e acabamento</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
};
