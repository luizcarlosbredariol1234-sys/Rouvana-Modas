import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, Send, ChevronDown, CheckCircle2, Sparkles, Navigation, Instagram, Ruler, Scissors } from 'lucide-react';
import { COMPANY_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Atendimento Geral & Dúvidas');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      </div>
    </section>
  );
};
