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
    title: "Desenvolvimento de Alta Precisão",
    text: "Cada solução nasce de uma arquitetura limpa, testada e documentada — construída para absorver picos de demanda, crescer sem reescritas e operar com estabilidade ano após ano.",
  },
  {
    icon: BrainCircuit,
    title: "Inteligência Colaborativa",
    text: "IA onde ela realmente acelera e engenheiros onde a decisão importa. Essa combinação encurta o ciclo de entrega sem abrir mão de código revisado, seguro e auditável.",
  },
  {
    icon: TrendingUp,
    title: "Resultados Tangíveis",
    text: "Não entregamos código: entregamos menos retrabalho, ciclos de decisão mais curtos, conformidade com a LGPD e retorno mensurável sobre cada real investido.",
  },
];

const manifesto =
  "Arquitetura digital de ponta, construída pela união entre a inteligência humana e a precisão tecnológica. Não vendemos promessas; entregamos infraestrutura robusta, segurança de dados e produtos que geram retorno financeiro real.";

export default function DNA() {
  return (
    <section
      id="dna"
      className="scroll-mt-24 border-y border-line py-24 sm:py-32"
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
          <span className="text-xs font-bold uppercase tracking-widest text-synaptic-mint">
            Manifesto e DNA
          </span>
          <h2
            id="dna-titulo"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
          >
            Nossa Essência
          </h2>
          <p className="mt-4 text-lg text-brand-body">
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
              className="ui-card-hover group rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-synaptic-mint/10 text-synaptic-mint transition-transform duration-300 ease-out group-hover:scale-105">
                <pillar.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-lg font-bold text-brand-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-body">
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
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-brand-body md:text-base">
            {manifesto}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}