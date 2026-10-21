import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/catalog';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            <div className="p-5 border-b border-[#60315F]/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] border border-[#60315F]/15">
                  <Heart className="w-5 h-5 fill-[#60315F]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#331632]">
                    Seus Favoritos
                  </h3>
                  <span className="text-xs text-[#553954]">
                    {wishlistProducts.length} {wishlistProducts.length === 1 ? 'peça salva' : 'peças salvas'}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-[#60315F] hover:bg-[#F5EDF4] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <Heart className="w-16 h-16 text-[#CDB9CA] mb-3" />
                  <p className="font-bold text-[#331632] mb-1">Nenhum favorito salvo</p>
                  <p className="text-xs text-[#553954] max-w-xs mb-5">
                    Clique no ícone de coração nos produtos que você mais gostou para salvá-los aqui!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Ver Produtos
                  </button>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div key={product.id} className="py-4 flex gap-3.5 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="w-16 h-20 object-cover rounded-xl bg-slate-50 border border-[#60315F]/15 shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="text-xs font-bold text-[#331632] truncate cursor-pointer hover:text-[#60315F]"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {product.categoryLabel}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-2 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] text-xs font-semibold cursor-pointer"
                        title="Adicionar à sacola"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#DFB77C]" />
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
