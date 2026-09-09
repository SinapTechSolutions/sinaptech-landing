"use client";

import { motion } from "framer-motion";
import { Crosshair, BrainCircuit, TrendingUp } from "lucide-react";

interface Pillar {
  icon: typeof Crosshair;
  title: string;
  text: string;
}

const pillars: Pillar[] = [
  {
    icon: Crosshair,
    title: "Engenharia de Alta Precisão",
    text: "Arquitetura limpa que não quebra sob pressão.",
  },
  {
    icon: BrainCircuit,
    title: "Inteligência Colaborativa",
    text: "A IA trabalhando ao lado do intelecto humano para velocidade e segurança.",
  },
  {
    icon: TrendingUp,
    title: "Resultados Tangíveis",
    text: "Não vendemos código, vendemos resolução de gargalos operacionais e financeiros.",
  },
];

const manifesto =
  "Arquitetura digital de ponta, construída pela união entre a inteligência humana e a precisão tecnológica. Não vendemos promessas; entregamos infraestrutura robusta, segurança de dados e produtos que geram retorno financeiro real.";

export default function DNA() {
  return (
    <section
      id="dna"
      className="scroll-mt-24 border-y border-slate-200 py-24 sm:py-32 dark:border-slate-800"
      aria-labelledby="dna-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-forest-trust dark:text-synaptic-mint">
            Manifesto e DNA
          </span>
          <h2
            id="dna-titulo"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            Nossa Essência
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Os pilares que guiam cada linha de código que entregamos.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group rounded-2xl border border-slate-200/50 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:shadow-none"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-synaptic-mint/10 text-synaptic-mint transition-transform duration-300 ease-out group-hover:scale-105">
                <pillar.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-brand-ink dark:text-slate-50">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted dark:text-slate-400">
                {pillar.text}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p className="mx-auto max-w-3xl text-center text-sm font-light leading-relaxed text-brand-muted md:text-base dark:text-slate-400">
            {manifesto}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}