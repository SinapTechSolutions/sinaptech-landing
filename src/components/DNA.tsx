"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Missão",
    description:
      "Construir a ponte definitiva entre a capacidade humana e a precisão da IA para o mercado B2B e governamental.",
  },
  {
    icon: Users,
    title: "Manifesto",
    description:
      "Somos uma equipe de engenheiros focados em impacto. Tratamos a IA como nossa principal aliada colaborativa, garantindo entregas mais rápidas, seguras e inovadoras.",
  },
  {
    icon: Zap,
    title: "Visão",
    description:
      "Ser referência em engenharia de software premium no Brasil, onde tecnologia e inteligência humana convergem para resolver os desafios mais complexos.",
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
            Nosso DNA
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Os pilares que guiam cada linha de código que escrevemos.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-forest-trust/10 text-forest-trust dark:text-synaptic-mint mb-4">
                <item.icon size={28} />
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
