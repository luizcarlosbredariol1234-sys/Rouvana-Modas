import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight, Scissors } from 'lucide-react';
import { CartItem } from '../types/catalog';
import { COMPANY_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const itemsList = items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.product.name} (Tam: ${it.selectedSize}, Cor: ${it.selectedColor.name}) - R$ ${(it.product.price * it.quantity).toFixed(2).replace('.', ',')}`
      )
      .join('\n');

    const msg = `Olá, Rouvana Modas! Gostaria de finalizar o meu pedido com os seguintes itens:\n\n${itemsList}\n\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\nComo posso prosseguir com a entrega para o meu endereço?`;
    const url = `https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Drawer Window */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#60315F]/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] border border-[#60315F]/15">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#331632]">
                    Sua Sacola de Compras
                  </h3>
                  <span className="text-xs text-[#553954]">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} selecionados
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar sacola"
                className="p-2 rounded-xl text-slate-400 hover:text-[#60315F] hover:bg-[#F5EDF4] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <ShoppingBag className="w-16 h-16 text-[#CDB9CA] mb-3" />
                  <p className="font-bold text-[#331632] mb-1">Sua sacola está vazia</p>
                  <p className="text-xs text-[#553954] max-w-xs mb-5">
                    Explore nossos lançamentos em destaque e adicione suas peças favoritas!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#60315F] text-[#FAF6EE] text-xs font-semibold shadow-sm hover:bg-[#4D254C] transition-colors cursor-pointer"
                  >
                    Explorar Produtos
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-3.5 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-xl bg-slate-50 border border-[#60315F]/15 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#331632] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Tamanho: <strong className="text-[#331632]">{item.selectedSize}</strong> · Cor: <strong className="text-[#331632]">{item.selectedColor.name}</strong>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#60315F]">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#F5EDF4] text-slate-500 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#331632]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#F5EDF4] text-slate-500 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#60315F]/15 bg-[#FAF6EE] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#553954]">Subtotal</span>
                  <span className="font-bold text-[#60315F] text-lg">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="text-[11px] text-[#60315F] bg-[#F5EDF4] border border-[#60315F]/20 p-2.5 rounded-xl space-y-1">
                  <div className="text-center font-medium">
                    ✨ 10% OFF no Pix • Siga no Instagram <strong>{COMPANY_INFO.instagram}</strong>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A4B1A] font-semibold pt-1 border-t border-[#60315F]/10">
                    <Scissors className="w-3 h-3 text-[#7A4B1A]" />
                    <span>Diferencial Rouvana: Ajustes de caimento sem custo!</span>
                  </div>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#DFB77C]" />
                  <span>Finalizar Pedido pelo WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-[#553954] hover:text-[#60315F] text-center font-semibold cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
