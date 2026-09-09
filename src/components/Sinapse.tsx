"use client";

import { motion } from "framer-motion";
import { ClipboardList, Compass, GitBranch, Rocket } from "lucide-react";

interface SinapseStep {
  icon: typeof ClipboardList;
  number: string;
  title: string;
  description: string;
}

const steps: SinapseStep[] = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Diagnóstico de Gargalos",
    description:
      "Imersão no seu negócio para mapear exatamente onde estão os gargalos e as oportunidades operacionais.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Arquitetura da Solução",
    description:
      "Desenho da solução com as melhores práticas de mercado e aprovação de protótipos antes de desenvolver.",
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Engenharia Ágil (IA + Humano)",
    description:
      "Desenvolvimento rápido e preciso, unindo a inteligência da IA à qualidade da engenharia humana.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Escala e Estabilidade",
    description:
      "Deploy contínuo, monitoramento de estabilidade, suporte e evolução constante do produto.",
  },
];

const pulseTransition = {
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export default function Sinapse() {
  return (
    <section
      id="ciclo"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="ciclo-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="ciclo-titulo"
            className="font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            O Ciclo Sináptico
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Do mapeamento à escala, um método claro e comprovado.
          </p>
        </motion.div>

        <div className="relative mt-16" role="list" aria-label="Etapas do Ciclo Sináptico">
          <div
            className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-synaptic-mint/60 via-synaptic-mint/25 to-synaptic-mint/60 lg:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-8 top-7 hidden h-px lg:block"
            aria-hidden="true"
          >
            <span className="relative block h-full" aria-hidden="true">
              <motion.span
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-synaptic-mint shadow-[0_0_12px_var(--color-synaptic-mint)]"
                animate={{ left: ["0%", "100%"] }}
                transition={pulseTransition}
              />
            </span>
          </div>

          <motion.div
            className="absolute left-7 top-0 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-synaptic-mint shadow-[0_0_12px_var(--color-synaptic-mint)] lg:hidden"
            aria-hidden="true"
            animate={{ top: [0, "100%"] }}
            transition={pulseTransition}
          />

          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="relative flex gap-5 lg:block lg:text-center"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <step.icon size={22} aria-hidden="true" className="text-synaptic-mint" />
                </div>

                <div className="lg:mt-6">
                  <span className="text-xs font-bold tracking-widest text-synaptic-mint">
                    {step.number}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-brand-ink dark:text-slate-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-muted lg:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}