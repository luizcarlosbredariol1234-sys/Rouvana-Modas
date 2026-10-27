import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { Product } from '../types/catalog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const isSizeQuery = ['plus', 'plus size', 'plussize', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'tamanho', 'tamanhos', 'medidas', 'p ao g6', '54', 'p ao 54'].includes(query.trim().toLowerCase());

  const results = query.trim() === ''
    ? []
    : PRODUCTS_DATA.filter((p) => {
        const q = query.toLowerCase().trim();
        if (isSizeQuery) return true; // Todas as peças possuem a grade completa P ao G6 e Plus Size
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.fullDescription.toLowerCase().includes(q) ||
          p.fiberHighlight.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.sizes.some((s) => s.toLowerCase() === q)
        );
      });

  const quickSearchTags = [
    'Vestidos',
    'Pijamas',
    'Saias',
    'Regatas',
    'Camisas e Blusas',
    'Pantalonas e Calças',
    'Bermudas',
    'Lingerie',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#60315F]/15 z-10 p-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-[#60315F]/15 pb-4 mb-3">
              <Search className="w-5 h-5 text-[#60315F]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por peça, tecido ou tamanho (ex: Plus Size, G2, Vestido...)"
                className="w-full text-base text-[#331632] placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-[#60315F] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex items-center gap-1.5 flex-wrap mb-4 pb-2 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Sugestões:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs px-2.5 py-1 rounded-full bg-[#F5EDF4] text-[#60315F] hover:bg-[#60315F] hover:text-[#FAF6EE] font-medium transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {query.trim() === '' ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Digite para buscar em todo o catálogo da Rouvana Modas
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  Nenhum produto encontrado para &quot;{query}&quot;
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F5EDF4] cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-12 h-14 ${
                        product.isLandscape || product.imageFit === 'contain'
                          ? 'object-contain p-1 bg-white'
                          : 'object-cover bg-slate-100'
                      } rounded-xl shrink-0 border border-[#60315F]/15`}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#331632] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#553954]">
                        {product.categoryLabel} · {product.fiberHighlight}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#60315F] bg-[#FAF5F9] px-2.5 py-1 rounded-lg border border-[#60315F]/15 shrink-0">
                      Ver Peça
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
