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
      className="scroll-mt-24 bg-surface-2 py-20 sm:py-28"
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
          <span className="text-xs font-bold uppercase tracking-widest text-synaptic-mint">
            Depoimentos
          </span>
          <h2
            id="depoimentos-titulo"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
          >
            Quem Confia na Sinaptech
          </h2>
          <p className="mt-4 text-lg text-brand-body">
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
              className="ui-card-hover group relative rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-1"
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

              <blockquote className="mt-5 text-sm leading-relaxed text-brand-body">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-synaptic-mint/10 text-sm font-bold text-synaptic-mint">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <span className="block text-sm font-semibold text-brand-ink">
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
