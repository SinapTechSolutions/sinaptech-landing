"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Shield, Smartphone } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "IA que Protege seus Dados",
    description:
      "IA 100% local que nunca envia seus dados para a nuvem. Automatize processos repetitivos e reduza custos operacionais em até 60% — sem riscos de vazamento.",
    span: "col-span-1 lg:col-span-2 lg:row-span-2",
    gradient: "from-synaptic-mint/10 to-forest-trust/5",
  },
  {
    icon: Cloud,
    title: "SaaS que Converte",
    description:
      "Plataformas que transformam visitantes em clientes. Arquitetura robusta que suporta 10x mais usuários sem quedas de performance.",
    span: "col-span-1",
    gradient: "from-forest-trust/10 to-brand-snow",
  },
  {
    icon: Shield,
    title: "GovTech Certificado",
    description:
      "Soluções que atendem 100% dos requisitos de licitação e LGPD. Tecnologia aprovada em órgãos públicos de todos os portes.",
    span: "col-span-1",
    gradient: "from-human-amber/10 to-brand-snow",
  },
  {
    icon: Smartphone,
    title: "Sob Demanda, Sem Surpresas",
    description:
      "Web, Mobile e APIs desenvolvidas com escopo fechado e prazo garantido. Do conceito ao deploy em semanas, não meses.",
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
            Soluções que geram resultado real
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Cada projeto é construído para resolver problemas específicos — com tecnologia que você controla.
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
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-3xl`} />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-synaptic-mint/10 text-synaptic-mint mb-4">
                  <item.icon size={24} aria-hidden="true" />
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
