"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: 5;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendes",
    role: "CTO",
    company: "FinTech Brasil",
    content:
      "A Sinaptech transformou nosso processo manual em uma automação com IA que reduziu 70% do tempo de processamento de documentos. A entrega foi além das expectativas.",
    rating: 5,
  },
  {
    name: "Ana Paula Silva",
    role: "Diretora de TI",
    company: "Grupo Municipal S.A.",
    content:
      "O sistema de governança que desenvolveram para nosso município resolveu um problema de 5 anos. Agora temos transparência total e economia de R$ 2M anuais.",
    rating: 5,
  },
  {
    name: "Ricardo Oliveira",
    role: "CEO",
    company: "SaaSHub",
    content:
      "Contratamos a Sinaptech para construir nosso SaaS do zero. Em 4 meses tínhamos um MVP robusto que já fatura 6 dígitos. A qualidade do código é excepcional.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="scroll-mt-24 bg-slate-50 py-20 sm:py-28 dark:bg-slate-900/50"
      aria-labelledby="depoimentos-titulo"
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
            Depoimentos
          </span>
          <h2
            id="depoimentos-titulo"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            Quem Confia na Sinaptech
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Resultados reais de empresas que já passaram pela evolução sináptica.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl border border-slate-200/50 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:shadow-none"
            >
              <Quote
                size={32}
                className="absolute right-6 top-6 text-synaptic-mint/20 dark:text-synaptic-mint/10"
                aria-hidden="true"
              />

              <div className="flex gap-1" aria-label={`${t.rating} de 5 estrelas`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-5 text-sm leading-relaxed text-brand-muted dark:text-slate-400">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-synaptic-mint/10 text-sm font-bold text-synaptic-mint">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <span className="block text-sm font-semibold text-brand-ink dark:text-slate-50">
                    {t.name}
                  </span>
                  <span className="block text-xs text-brand-muted">
                    {t.role} — {t.company}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
