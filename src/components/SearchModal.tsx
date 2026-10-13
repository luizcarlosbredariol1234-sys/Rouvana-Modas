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

  const results = query.trim() === ''
    ? []
    : PRODUCTS_DATA.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
        p.fiberHighlight.toLowerCase().includes(query.toLowerCase())
      );

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
            <div className="flex items-center gap-3 border-b border-[#60315F]/15 pb-4 mb-4">
              <Search className="w-5 h-5 text-[#60315F]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que você está procurando hoje? (ex: vestido, camisa, jaqueta...)"
                className="w-full text-base text-[#331632] placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-[#60315F] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
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
                      className="w-12 h-14 object-cover rounded-xl bg-slate-100 shrink-0 border border-[#60315F]/15"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#331632] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#553954]">
                        {product.categoryLabel} · {product.fiberHighlight}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#60315F]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
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
