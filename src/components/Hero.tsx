"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import SynapseVisual from "@/components/SynapseVisual";

export default function Hero() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="hero"
      className="relative scroll-mt-24 overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-px w-full bg-gradient-to-r from-transparent via-synaptic-mint/30 to-transparent" />
        <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-synaptic-mint/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-forest-trust/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-synaptic-mint/30 bg-synaptic-mint/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-forest-trust dark:text-synaptic-mint">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Tecnologia que entrega. Resultados que transformam.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-6 font-display text-4xl font-extrabold tracking-tight text-brand-ink md:text-5xl lg:text-6xl dark:text-slate-50"
            >
              A sinapse perfeita entre{" "}
              <span className="text-brand-ink dark:text-synaptic-mint">
                visão humana
              </span>{" "}
              e{" "}
              <span className="text-brand-ink dark:text-synaptic-mint">
                inteligência artificial
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted"
            >
              Do problema complexo ao resultado extraordinário, unimos visão de
              negócios, engenharia de software e inteligência artificial para
              transformar desafios em SaaS, aplicativos e ecossistemas GovTech
              que simplificam operações, aceleram decisões e geram vantagem
              competitiva.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#065F46] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                Vamos Construir
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200/50 bg-white px-7 py-3.5 text-sm font-semibold text-brand-ink shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-50 dark:shadow-none dark:hover:border-slate-700 dark:focus-visible:ring-offset-slate-950"
              >
                Explorar Soluções
                <ChevronRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
              <div
                className="bg-radial-mint absolute inset-0 rounded-full"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_72%)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"
                aria-hidden="true"
              />
              <div className="relative w-full px-2 py-8 sm:px-6">
                <SynapseVisual />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}