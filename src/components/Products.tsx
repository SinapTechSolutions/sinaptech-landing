"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Crown } from "lucide-react";

interface TatameFeature {
  emoji: string;
  title: string;
  text: string;
}

const tatameFeatures: TatameFeature[] = [
  {
    emoji: "🔥",
    title: "Retenção Extrema:",
    text: "Gamificação com Streaks e Chamas de Treino.",
  },
  {
    emoji: "💸",
    title: "Inadimplência Zero:",
    text: "Bloqueio automático de catraca e cobrança push.",
  },
  {
    emoji: "🥋",
    title: "Receita Extra:",
    text: "Módulo Loja (Venda Kimonos e Seminários no app).",
  },
  {
    emoji: "🎨",
    title: "100% White-Label:",
    text: "O aplicativo com a marca da sua academia.",
  },
];

const tatameChips = [
  {
    label: "Jiu-Jitsu",
    tone: "text-[#F2A900] border-[#F2A900]/40 bg-[#F2A900]/10",
  },
  {
    label: "Artes Marciais",
    tone: "text-slate-300 border-slate-400/40 bg-slate-400/15",
  },
  {
    label: "Inadimplência Zero",
    tone: "text-red-500 border-red-500/40 bg-red-500/10",
  },
  {
    label: "Gamificação & Streaks",
    tone: "text-[#F2A900] border-[#F2A900]/40 bg-[#F2A900]/10",
  },
];

const upcomingProducts = [
  {
    tag: "Em produção",
    title: "Próximos lançamentos",
    text: "Novos produtos proprietários estão saindo do laboratório de engenharia. Acompanhe o que vem por aí.",
  },
  {
    tag: "Para você",
    title: "Seu produto no ecossistema",
    text: "Tem uma ideia que merece engenharia de verdade? Vamos construí-la como um produto, não como um projeto.",
  },
];

export default function Products() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (direction: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardWidth = scroller.querySelector<HTMLElement>("[data-carousel-card]")
      ?.offsetWidth ?? 320;
    scroller.scrollBy({
      left: direction * (cardWidth + 24),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="produtos"
      className="scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="produtos-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-trust dark:text-synaptic-mint">
              Nossos Produtos
            </span>
            <h2
              id="produtos-titulo"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
            >
              Ecossistema de Produtos
            </h2>
            <p className="mt-4 text-lg text-brand-muted">
              Produtos proprietários construídos com a mesma engenharia que
              aplicamos no seu projeto — e que já geram resultado no mercado.
            </p>
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="Controles do carrossel">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Produtos anteriores"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-muted shadow-sm transition-all duration-200 ease-out hover:border-emerald-500/40 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:hover:text-white"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Próximos produtos"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-muted shadow-sm transition-all duration-200 ease-out hover:border-emerald-500/40 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:hover:text-white"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          ref={scrollerRef}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            data-carousel-card
            className="w-[min(620px,92vw)] shrink-0 snap-start"
          >
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F2A900]/30 bg-[#121212] p-8 text-white shadow-2xl shadow-[#F2A900]/10 sm:p-10">
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F2A900] via-[#F2A900]/60 to-[#EF4444]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F2A900]/15 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-[#F2A900]/40 bg-[#F2A900]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F2A900]">
                  Produto Proprietário
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EF4444]/40 bg-[#EF4444]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#EF4444]">
                  🔥 Em destaque
                </span>
              </div>

              <h3 className="relative mt-7 flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight text-white">
                <Crown
                  size={26}
                  aria-hidden="true"
                  className="text-[#F2A900]"
                />
                Tatame Squad
              </h3>
              <p className="relative mt-2 text-base font-medium text-slate-300">
                O ERP Definitivo para Academias de Jiu-Jitsu e Artes
                Marciais.
              </p>

              <ul className="relative mt-8 space-y-5">
                {tatameFeatures.map((feature) => (
                  <li key={feature.title} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F2A900]/30 bg-[#F2A900]/10 text-base"
                    >
                      {feature.emoji}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed">
                      <span className="font-bold text-white">
                        {feature.title}
                      </span>{" "}
                      <span className="text-slate-300">{feature.text}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 flex flex-wrap gap-2">
                {tatameChips.map((chip) => (
                  <span
                    key={chip.label}
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${chip.tone}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              <a
                href="#contato"
                className="relative mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2A900] px-6 py-4 text-sm font-extrabold text-black shadow-lg shadow-[#F2A900]/25 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-xl hover:shadow-[#F2A900]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
              >
                Quero Dominar meu Tatame
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          </div>

          {upcomingProducts.map((product) => (
            <div
              key={product.title}
              data-carousel-card
              className="w-[min(320px,86vw)] shrink-0 snap-start"
            >
              <article className="flex min-h-[460px] flex-col justify-between rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                <div>
                  <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:border-slate-600">
                    {product.tag}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-brand-ink dark:text-slate-50">
                    {product.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-muted">
                    {product.text}
                  </p>
                </div>
                <a
                  href="#contato"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-ink shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 dark:border dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:shadow-none"
                >
                  Falar com a equipe
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </article>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}