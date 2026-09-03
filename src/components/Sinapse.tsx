"use client";

import { motion } from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico Gratuito",
    description:
      "Mapeamos seus processos e identificamos exatamente onde a IA pode gerar economia. Sem compromisso.",
  },
  {
    icon: Layers,
    number: "02",
    title: "Arquitetura Sob Medida",
    description:
      "Desenhamos a solução ideal para o seu caso. Você aprova antes de qualquer linha de código.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Desenvolvimento Transparente",
    description:
      "Acompanhe cada etapa em tempo real. Sprints semanais com entregas concretas.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Evolução Garantida",
    description:
      "Deploy seguro + 90 dias de suporte. Monitoramos a performance para garantir resultados.",
  },
];

export default function Sinapse() {
  return (
    <section id="sinapse" className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink dark:text-white">
            Seu projeto em 4 passos simples
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Processo testado em +10 projetos. Sem surpresas, sem atrasos, sem custos ocultos.
          </p>
        </motion.div>

        <div className="mt-16 relative" role="list" aria-label="Etapas do Ciclo Sináptico">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-700 -translate-y-1/2" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
                role="listitem"
              >
                <div className="relative z-10 w-16 h-16 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-synaptic-mint" aria-hidden="true" />
                </div>

                <span className="text-xs font-bold text-synaptic-mint tracking-wider" aria-hidden="true">
                  {step.number}
                </span>

                <h3 className="mt-2 font-display text-lg font-bold text-brand-ink dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-brand-muted leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
