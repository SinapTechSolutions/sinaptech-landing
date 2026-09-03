"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Por que existimos",
    description:
      "Governos e empresas perdem meses com sistemas que não funcionam. Nós existimos para acabar com isso — com tecnologia que funciona na primeira vez.",
  },
  {
    icon: Users,
    title: "Como trabalhamos",
    description:
      "Cada membro da equipe é engenheiro, não vendedor. Sua demanda fala diretamente com quem vai construir. Isso garante que nada se perca no caminho.",
  },
  {
    icon: Zap,
    title: "Onde queremos chegar",
    description:
      "Ser a Software House mais confiável do Brasil. Não pelo tamanho, mas pela qualidade que nossos clientes sentem em cada interação.",
  },
];

export default function DNA() {
  return (
    <section id="dna" className="py-20 sm:py-28 bg-brand-snow dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink dark:text-white">
            Por que empresas escolhem a SINAPTECH
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Não somos mais uma Software House. Somos a que seus concorrentes temem.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Valores da SINAPTECH">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 shadow-sm"
              role="listitem"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-forest-trust/10 text-forest-trust dark:text-synaptic-mint mb-4">
                <item.icon size={28} aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-ink dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-brand-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
