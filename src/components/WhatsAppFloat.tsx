import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const WhatsAppFloat: React.FC = () => {
  return (
    <aside
      aria-label="Atendimento rápido WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-medium shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Conversar no WhatsApp
      </span>

      {/* Floating button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp ((14) 99825-3655)"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl shadow-emerald-950/30 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Subtle discreet pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />
        
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </aside>
  );
};
