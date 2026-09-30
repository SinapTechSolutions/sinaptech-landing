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
    tone: "text-human-amber border-human-amber/45 bg-human-amber/12 dark:text-[#F2A900] dark:border-[#F2A900]/40 dark:bg-[#F2A900]/10",
  },
  {
    label: "Artes Marciais",
    tone: "text-brand-body border-line bg-surface-2 dark:text-slate-300 dark:border-slate-600/50 dark:bg-white/5",
  },
  {
    label: "Inadimplência Zero",
    tone: "text-danger border-danger/40 bg-danger/10",
  },
  {
    label: "Gamificação & Streaks",
    tone: "text-human-amber border-human-amber/45 bg-human-amber/12 dark:text-[#F2A900] dark:border-[#F2A900]/40 dark:bg-[#F2A900]/10",
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
            <span className="text-xs font-bold uppercase tracking-widest text-synaptic-mint">
              Nossos Produtos
            </span>
            <h2
              id="produtos-titulo"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
            >
              Ecossistema de Produtos
            </h2>
            <p className="mt-4 text-lg text-brand-body">
              Produtos proprietários construídos com a mesma engenharia que
              aplicamos no seu projeto — e que já geram resultado no mercado.
            </p>
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="Controles do carrossel">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Produtos anteriores"
              className="ui-card inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-muted transition-all duration-200 ease-out hover:border-synaptic-mint/60 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Próximos produtos"
              className="ui-card inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-muted transition-all duration-200 ease-out hover:border-synaptic-mint/60 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
            <article className="ui-card relative flex h-full flex-col overflow-hidden rounded-2xl border-[#F59E0B]/55 bg-[#FDF8EE] p-8 shadow-[0_1px_2px_rgb(15_23_42_/_0.05),0_32px_64px_-28px_rgb(217_119_6_/_0.4)] sm:p-10 dark:border-[#F2A900]/35 dark:bg-[#121212] dark:shadow-[0_0_0_1px_rgb(242_169_0_/_0.12),0_32px_72px_-28px_rgb(242_169_0_/_0.28)]">
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F2A900] via-[#F2A900]/60 to-[#EF4444]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F59E0B]/25 blur-3xl dark:bg-[#F2A900]/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 via-transparent to-transparent dark:from-white/[0.06]"
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-[#F59E0B]/60 bg-[#F59E0B]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-human-amber dark:border-[#F2A900]/40 dark:bg-[#F2A900]/10 dark:text-[#F2A900]">
                  Produto Proprietário
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EF4444]/45 bg-[#EF4444]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#B91C1C] dark:text-[#F87171]">
                  🔥 Em destaque
                </span>
              </div>

              <h3 className="relative mt-7 flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight text-brand-ink dark:text-white">
                <Crown
                  size={26}
                  aria-hidden="true"
                  className="text-human-amber dark:text-[#F2A900]"
                />
                Tatame Squad
              </h3>
              <p className="relative mt-2 text-base font-medium text-brand-body dark:text-slate-300">
                O ERP Definitivo para Academias de Jiu-Jitsu e Artes
                Marciais.
              </p>

              <ul className="relative mt-8 space-y-5">
                {tatameFeatures.map((feature) => (
                  <li key={feature.title} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F59E0B]/50 bg-[#F59E0B]/15 text-base dark:border-[#F2A900]/30 dark:bg-[#F2A900]/10"
                    >
                      {feature.emoji}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed">
                      <span className="font-bold text-brand-ink dark:text-white">
                        {feature.title}
                      </span>{" "}
                      <span className="text-brand-body dark:text-slate-300">{feature.text}</span>
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
                className="relative mt-9 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2A900] px-6 py-4 text-sm font-extrabold text-[#1C1400] shadow-lg shadow-[#F2A900]/30 transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-[#FFC533] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
              <article className="ui-card flex min-h-[460px] flex-col justify-between rounded-2xl border-2 border-dashed p-8">
                <div>
                  <span className="inline-flex items-center rounded-full border border-line bg-surface-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                    {product.tag}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-brand-ink">
                    {product.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-brand-body">
                    {product.text}
                  </p>
                </div>
                <a
                  href="#contato"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-6 py-3 text-sm font-semibold text-brand-ink transition-all duration-300 ease-out hover:-translate-y-1 hover:border-synaptic-mint/60 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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