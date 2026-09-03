"use client";

import { motion } from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Demanda e Diagnóstico",
    description:
      "Entendimento profundo do negócio, perfilamento de dados e identificação de gargalos.",
  },
  {
    icon: Layers,
    number: "02",
    title: "Arquitetura de Solução",
    description:
      "Desenho estrutural, escolha de stack (Cloud/Local IA) e aprovação de protótipos.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Desenvolvimento Ágil",
    description:
      "Engenharia de precisão humana guiada por ferramentas de inteligência colaborativa.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Evolução e Escala",
    description:
      "Deploy contínuo, monitoramento, otimização de processos e garantia de estabilidade.",
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
            O Ciclo Sináptico
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Nosso framework de engenharia ágil. Do mapeamento à escala, passo a
            passo.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-700 -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 w-16 h-16 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm flex items-center justify-center mb-4"
                >
                  <step.icon size={24} className="text-synaptic-mint" />
                </motion.div>

                <span className="text-xs font-bold text-synaptic-mint tracking-wider">
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
