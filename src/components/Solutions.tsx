"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Shield, Smartphone } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "IA & Automação",
    description:
      "IA Local, LLMs, fluxos automatizados e eliminação de tarefas manuais. Transformamos processos repetitivos em intelligent workflows.",
    span: "col-span-1 lg:col-span-2 lg:row-span-2",
    gradient: "from-synaptic-mint/10 to-forest-trust/5",
  },
  {
    icon: Cloud,
    title: "SaaS B2B",
    description:
      "Plataformas robustas, alta conversão e infraestrutura em nuvem/híbrida. Escalabilidade que acompanha o crescimento do seu negócio.",
    span: "col-span-1",
    gradient: "from-forest-trust/10 to-brand-snow",
  },
  {
    icon: Shield,
    title: "GovTech",
    description:
      "Soluções para o setor público, focadas em conformidade, licitações, segurança e LGPD. Tecnologia que atende aos mais altos padrões.",
    span: "col-span-1",
    gradient: "from-human-amber/10 to-brand-snow",
  },
  {
    icon: Smartphone,
    title: "Produtos Sob Demanda",
    description:
      "Web, Mobile, APIs. Engenharia feita sob medida para desafios únicos. Do conceito ao deploy, com precisão e excelência.",
    span: "col-span-1 lg:col-span-2",
    gradient: "from-synaptic-mint/5 to-forest-trust/10",
  },
];

export default function Solutions() {
  return (
    <section id="solucoes" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink dark:text-white">
            O que construímos
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Desenhamos arquiteturas digitais para impulsionar a operação do seu
            negócio e do setor público.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {solutions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 ${item.span}`}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-synaptic-mint/10 text-synaptic-mint mb-4">
                  <item.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-ink dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
