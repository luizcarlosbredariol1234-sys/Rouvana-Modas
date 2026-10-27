import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, Send, ChevronDown, CheckCircle2, Sparkles, Navigation, Instagram, Ruler, Scissors, Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Atendimento Geral & Dúvidas');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isFacadeZoomOpen, setIsFacadeZoomOpen] = useState(false);
  const [facadeScale, setFacadeScale] = useState(1);
  const [facadePan, setFacadePan] = useState({ x: 0, y: 0 });
  const [isDraggingFacade, setIsDraggingFacade] = useState(false);
  const [facadeDragStart, setFacadeDragStart] = useState({ x: 0, y: 0 });

  const openFacadeModal = () => {
    setFacadeScale(1);
    setFacadePan({ x: 0, y: 0 });
    setIsFacadeZoomOpen(true);
  };

  const closeFacadeModal = () => {
    setIsFacadeZoomOpen(false);
    setFacadeScale(1);
    setFacadePan({ x: 0, y: 0 });
  };

  const handleFacadeMouseDown = (e: React.MouseEvent) => {
    if (facadeScale > 1) {
      e.preventDefault();
      setIsDraggingFacade(true);
      setFacadeDragStart({ x: e.clientX - facadePan.x, y: e.clientY - facadePan.y });
    }
  };

  const handleFacadeMouseMove = (e: React.MouseEvent) => {
    if (isDraggingFacade && facadeScale > 1) {
      e.preventDefault();
      setFacadePan({ x: e.clientX - facadeDragStart.x, y: e.clientY - facadeDragStart.y });
    }
  };

  const handleFacadeMouseUp = () => {
    setIsDraggingFacade(false);
  };

  const handleFacadeTouchStart = (e: React.TouchEvent) => {
    if (facadeScale > 1 && e.touches.length === 1) {
      setIsDraggingFacade(true);
      setFacadeDragStart({
        x: e.touches[0].clientX - facadePan.x,
        y: e.touches[0].clientY - facadePan.y,
      });
    }
  };

  const handleFacadeTouchMove = (e: React.TouchEvent) => {
    if (isDraggingFacade && facadeScale > 1 && e.touches.length === 1) {
      setFacadePan({
        x: e.touches[0].clientX - facadeDragStart.x,
        y: e.touches[0].clientY - facadeDragStart.y,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = `Olá, Rouvana Modas! Meu nome é ${name || 'Cliente'}.
Tenho interesse em: *${interest}*.
Telefone: ${phone || 'Não informado'}
${message ? `Mensagem: ${message}` : ''}`;

    const url = `https://wa.me/${COMPANY_INFO.phoneClean}?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank');
    setSentSuccess(true);
  };

  const faqs = [
    {
      q: 'Qual é o horário de atendimento da Rouvana Modas?',
      a: 'Nosso horário de atendimento é de Segunda a Sexta das 09:00 às 18:00, e aos Domingos das 08:30 às 12:00. Aos sábados a loja física permanece fechada.',
    },
    {
      q: 'Vocês fazem pequenos ajustes nas peças?',
      a: 'Sim! Fazemos pequenos ajustes com muito carinho nas roupas (como barras, ajustes de cintura ou mangas) para garantir o caimento perfeito no seu corpo.',
    },
    {
      q: 'Quais tamanhos vocês atendem na Rouvana Modas?',
      a: 'Um dos nossos grandes diferenciais é a grade de tamanhos ampla, vestindo com elegância do tamanho P até o G6! Queremos que você se sinta linda, confiante e confortável em qualquer modelagem.',
    },
    {
      q: 'Quais tipos de roupas estão disponíveis na loja?',
      a: 'Trabalhamos com uma coleção ampla e diversificada de moda feminina, incluindo vestidos, pijamas, saias, regatas, camisas, blusas, pantalonas, calças, bermudas, lingerie e novidades constantes para todas as ocasiões.',
    },
    {
      q: 'Como aproveitar o desconto de 10% no primeiro pedido?',
      a: 'Ao realizar seu primeiro pedido ou efetuar o pagamento via Pix, você garante até 10% OFF em peças selecionadas da nossa coleção exclusiva!',
    },
  ];

  return (
    <section id="contato" className="py-24 bg-[#FAF6EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#60315F] uppercase tracking-widest mb-3">
            <span>Canal Direto · Atendimento Humanizado</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#331632] tracking-tight mb-4">
            Estamos Prontos para Atender Você
          </h2>

          <p className="text-base sm:text-lg text-[#553954] leading-relaxed">
            Tire dúvidas sobre as peças, consulte a numeração ideal ou combine uma visita ao nosso espaço físico em Chavantes - SP.
          </p>
        </div>

        {/* Contact Grid: Details + Interactive Direct Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-[#FAF6EE] p-6 sm:p-7 rounded-3xl border border-[#60315F]/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#92718B] block mb-1">
                    Endereço Físico
                  </span>
                  <h3 className="font-display font-bold text-[#331632] text-lg mb-1">
                    {COMPANY_INFO.address}
                  </h3>
                  <p className="text-xs text-[#553954] mb-3">
                    Centro, Chavantes - SP · CEP 18970-007
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60315F] hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#DFB77C]" />
                    <span>Abrir no Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule Card with User Requested Hours */}
            <div className="bg-[#FAF6EE] p-6 sm:p-7 rounded-3xl border border-[#60315F]/15 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15">
                  <Clock className="w-6 h-6 text-[#60315F]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#92718B] block mb-1">
                    Horário de Atendimento
                  </span>
                  <h3 className="font-display font-bold text-[#331632] text-lg mb-2">
                    Horário da Loja em Chavantes
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#331632] bg-white p-3 rounded-xl border border-[#60315F]/15">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#553954]">Segunda a Sexta:</span>
                      <strong className="text-[#60315F] font-bold">09:00 às 18:00</strong>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                      <span className="font-semibold text-[#553954]">Domingos:</span>
                      <strong className="text-[#60315F] font-bold">08:30 às 12:00</strong>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                      <span className="font-semibold text-rose-700">Sábados:</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">Fechado</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#553954] mt-2.5">
                    Atendemos no espaço físico e pelo WhatsApp para sua total comodidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-[#FAF6EE] p-6 sm:p-7 rounded-3xl border border-[#60315F]/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#92718B] block mb-1">
                    Telefone & WhatsApp
                  </span>
                  <h3 className="font-display font-bold text-[#331632] text-xl mb-1">
                    {COMPANY_INFO.phone}
                  </h3>
                  <p className="text-xs text-[#553954] mb-4">
                    Atendimento ágil para reservas, esclarecimento de caimento e suporte exclusivo.
                  </p>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-semibold text-xs transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#DFB77C]" />
                    <span>Iniciar conversa no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="bg-[#FAF6EE] p-6 sm:p-7 rounded-3xl border border-[#60315F]/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#92718B] block mb-1">
                    Instagram Oficial
                  </span>
                  <h3 className="font-display font-bold text-[#331632] text-xl mb-1">
                    {COMPANY_INFO.instagram}
                  </h3>
                  <p className="text-xs text-[#553954] mb-4">
                    Acompanhe provadores, lançamentos da coleção e novidades exclusivas da Rouvana Modas.
                  </p>
                  <a
                    href={COMPANY_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-sm"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                    <span>Seguir @rouvana.modas</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#60315F]/15 shadow-xl shadow-[#60315F]/5">
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-[#92718B] block mb-1">
                Fale Conosco em Segundos
              </span>
              <h3 className="font-display text-2xl font-bold text-[#331632] mb-1">
                Solicitar Atendimento
              </h3>
              <p className="text-xs sm:text-sm text-[#553954]">
                Preencha os campos abaixo para abrir uma conversa direta com as informações já organizadas no WhatsApp da loja.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#331632] mb-1.5">
                  Seu Nome:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria Clara Silva"
                  className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#60315F]/15 rounded-xl text-sm text-[#331632] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#60315F] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#331632] mb-1.5">
                  Seu Telefone / WhatsApp:
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (14) 99825-3655"
                  className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#60315F]/15 rounded-xl text-sm text-[#331632] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#60315F] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#331632] mb-1.5">
                  Assunto de Interesse:
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#60315F]/15 rounded-xl text-sm text-[#331632] focus:outline-none focus:ring-2 focus:ring-[#60315F] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Atendimento Geral & Dúvidas">Atendimento Geral & Dúvidas</option>
                  <option value="Fazemos Pequenos Ajustes (Consultar Ajuste)">Fazemos Pequenos Ajustes (Consultar Ajuste)</option>
                  <option value="Dúvidas sobre 10% OFF no Primeiro Pedido">10% OFF no Primeiro Pedido</option>
                  <option value="Disponibilidade de Peça Específica">Disponibilidade de Peça Específica</option>
                  <option value="Conhecer Categorias: Vestidos, Pijamas, Saias, etc.">Conhecer Categorias da Loja</option>
                  <option value="Visita à Loja em Chavantes (Horários)">Visita à Loja em Chavantes</option>
                  <option value="Outras Dúvidas">Outras Dúvidas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#331632] mb-1.5">
                  Mensagem Adicional (Opcional):
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte-nos qual categoria ou modelo chamou sua atenção, medidas ou ajuste desejado..."
                  className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#60315F]/15 rounded-xl text-sm text-[#331632] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#60315F] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Main CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-semibold text-base shadow-lg shadow-[#60315F]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#DFB77C]" />
                <span>Entrar em contato via WhatsApp</span>
              </button>

              {sentSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mensagem preparada com sucesso! Abrindo sua conversa no WhatsApp...</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-[#60315F]/15">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#60315F] block mb-1">
              Esclarecimentos Frequentes
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#331632]">
              Dúvidas sobre Atendimento & Serviços
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF6EE] rounded-2xl border border-[#60315F]/15 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#331632] hover:text-[#60315F] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#60315F]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#553954] leading-relaxed border-t border-[#60315F]/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fachada da Loja e Localização no Final do Site */}
        <div id="localizacao" className="mt-20 pt-16 border-t border-[#60315F]/15">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#60315F] uppercase tracking-widest mb-2">
              <MapPin className="w-4 h-4 text-[#DFB77C]" />
              <span>Espaço Físico · Chavantes - SP</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#331632] tracking-tight mb-3">
              Fachada da Nossa Loja
            </h2>
            <p className="text-sm sm:text-base text-[#553954] max-w-2xl mx-auto">
              Venha nos visitar em Chavantes - SP! Um ambiente acolhedor e preparado especialmente para você experimentar suas peças favoritas com conforto e carinho.
            </p>
          </div>

          {/* Imagem da Fachada em Alta Resolução */}
          <div className="max-w-4xl mx-auto mb-8">
            <div
              className="relative rounded-3xl overflow-hidden border border-[#60315F]/20 shadow-2xl bg-[#2D122C] group cursor-pointer"
              onClick={openFacadeModal}
              title="Clique para dar zoom e ver a fachada com máxima nitidez"
            >
              <img
                src="/fachada-loja-rouvana-modas.jpg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://i.postimg.cc/Lm1zJcRq/IMG-20261027-WA0061.jpg';
                }}
                alt="Fachada da Loja Rouvana Modas em Chavantes - SP"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                className="w-full h-auto max-h-[580px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.015] contrast-[1.03] brightness-[1.01]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 sm:p-6 pointer-events-none">
                <span className="text-white text-xs sm:text-sm font-medium bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-[#DFB77C]" />
                  Clique para ampliar e ver detalhes de perto
                </span>
                <span className="text-[#FAF6EE] text-xs font-semibold bg-[#60315F]/85 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm hidden sm:inline-flex">
                  Rua Altino Arantes, 209 · Centro
                </span>
              </div>
            </div>
          </div>

          {/* Localização Embaixo da Imagem */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#60315F]/15 shadow-xl shadow-[#60315F]/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-[#60315F]/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F5EDF4] flex items-center justify-center text-[#60315F] shrink-0 border border-[#60315F]/15">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#60315F]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#92718B] block mb-1">
                    Localização da Loja
                  </span>
                  <h3 className="font-display font-bold text-[#331632] text-xl sm:text-2xl mb-1">
                    {COMPANY_INFO.address}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#553954]">
                    Centro · Chavantes - SP · CEP 18970-007
                  </p>
                </div>
              </div>

              {/* Botão de Localização */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#60315F] hover:bg-[#4D254C] text-[#FAF6EE] font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#60315F]/20 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#DFB77C]" />
                  <span>Abrir no Google Maps</span>
                </a>
              </div>
            </div>

            {/* Grid: Horários & Telefone + Mapa Interativo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
              <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border border-[#60315F]/15">
                  <div className="flex items-center gap-2 text-[#331632] font-semibold text-xs sm:text-sm mb-2.5">
                    <Clock className="w-4 h-4 text-[#60315F]" />
                    <span>Horário de Funcionamento</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#553954]">
                    <div className="flex justify-between items-center py-1 border-b border-black/5">
                      <span className="font-medium">Segunda a Sexta:</span>
                      <strong className="text-[#331632] font-bold">09:00 às 18:00</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-black/5">
                      <span className="font-medium">Domingos:</span>
                      <strong className="text-[#331632] font-bold">08:30 às 12:00</strong>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-rose-700">Sábados:</span>
                      <span className="text-rose-700 font-bold px-2 py-0.5 rounded bg-rose-50 text-[11px]">Fechado</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border border-[#60315F]/15">
                  <div className="flex items-center gap-2 text-[#331632] font-semibold text-xs sm:text-sm mb-1.5">
                    <Phone className="w-4 h-4 text-[#60315F]" />
                    <span>Telefone da Loja</span>
                  </div>
                  <p className="text-xs text-[#553954] mb-2">
                    Ligue ou mande mensagem para dúvidas ou encomendas:
                  </p>
                  <a
                    href={`tel:${COMPANY_INFO.phoneClean}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#60315F] hover:underline"
                  >
                    <span>{COMPANY_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Mapa Google Interativo */}
              <div className="lg:col-span-7 h-56 sm:h-auto min-h-[220px] rounded-2xl overflow-hidden border border-[#60315F]/20 shadow-inner">
                <iframe
                  title="Localização da Loja Rouvana Modas em Chavantes - SP"
                  src="https://maps.google.com/maps?q=Rua%20Altino%20Arantes%20209,%20Chavantes%20-%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 min-h-[220px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Zoom da Fachada com Alta Resolução e Foco */}
        {isFacadeZoomOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 select-none"
            onClick={closeFacadeModal}
          >
            {/* Top Toolbar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between py-2 px-3 z-20 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-xs sm:text-sm bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  Fachada da Loja Física · Chavantes - SP
                </span>
                <span className="hidden sm:inline-block text-white/60 text-xs">
                  {Math.round(facadeScale * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/15 p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFacadeScale((s) => Math.max(1, +(s - 0.4).toFixed(1)));
                      if (facadeScale <= 1.4) setFacadePan({ x: 0, y: 0 });
                    }}
                    disabled={facadeScale <= 1}
                    className="p-1.5 rounded-full text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Diminuir Zoom"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFacadeScale(1);
                      setFacadePan({ x: 0, y: 0 });
                    }}
                    className="p-1.5 rounded-full text-white hover:bg-white/20 transition-all cursor-pointer text-xs font-semibold px-2"
                    title="Restaurar tamanho (1x)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFacadeScale((s) => Math.min(3.5, +(s + 0.5).toFixed(1)));
                    }}
                    disabled={facadeScale >= 3.5}
                    className="p-1.5 rounded-full text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Aumentar Zoom"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeFacadeModal}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer border border-white/15"
                  title="Fechar visualizador"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Zoom Canvas Area */}
            <div
              className={`flex-1 w-full max-w-5xl flex items-center justify-center overflow-hidden relative ${
                facadeScale > 1 ? (isDraggingFacade ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
              }`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleFacadeMouseDown}
              onMouseMove={handleFacadeMouseMove}
              onMouseUp={handleFacadeMouseUp}
              onMouseLeave={handleFacadeMouseUp}
              onTouchStart={handleFacadeTouchStart}
              onTouchMove={handleFacadeTouchMove}
              onTouchEnd={() => setIsDraggingFacade(false)}
              onWheel={(e) => {
                e.preventDefault();
                const delta = e.deltaY < 0 ? 0.3 : -0.3;
                setFacadeScale((s) => {
                  const next = Math.min(3.5, Math.max(1, +(s + delta).toFixed(1)));
                  if (next === 1) setFacadePan({ x: 0, y: 0 });
                  return next;
                });
              }}
              onDoubleClick={() => {
                if (facadeScale > 1) {
                  setFacadeScale(1);
                  setFacadePan({ x: 0, y: 0 });
                } else {
                  setFacadeScale(2.2);
                }
              }}
            >
              <img
                src="/fachada-loja-rouvana-modas.jpg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://i.postimg.cc/Lm1zJcRq/IMG-20261027-WA0061.jpg';
                }}
                alt="Fachada da Loja Rouvana Modas em Alta Resolução e Nitidez"
                draggable={false}
                style={{
                  transform: `scale(${facadeScale}) translate(${facadePan.x / facadeScale}px, ${facadePan.y / facadeScale}px)`,
                  transition: isDraggingFacade ? 'none' : 'transform 0.15s ease-out',
                  imageRendering: '-webkit-optimize-contrast',
                  maxWidth: '92vw',
                  maxHeight: '76vh',
                  objectFit: 'contain',
                }}
                className="select-none rounded-xl shadow-2xl contrast-[1.03] brightness-[1.01]"
              />
            </div>

            {/* Bottom Caption & Tip Bar */}
            <div
              className="py-2.5 px-4 text-center shrink-0 max-w-2xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-semibold text-white text-sm">
                Rouvana Modas · Fachada da Loja Física
              </p>
              <p className="text-xs text-white/75 mt-0.5">
                Rua Altino Arantes 209, Centro · Chavantes - SP
              </p>
              <p className="text-[11px] text-[#DFB77C] mt-1 hidden sm:block">
                Dica: Duplo clique ou use os botões +/- para aproximar · Arraste para inspecionar os detalhes
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
