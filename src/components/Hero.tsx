"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Brain, BarChart3 } from "lucide-react";

const nodes = [
  { id: 1, x: 40, y: 25 },
  { id: 2, x: 100, y: 50 },
  { id: 3, x: 60, y: 90 },
  { id: 4, x: 140, y: 80 },
  { id: 5, x: 180, y: 35 },
  { id: 6, x: 120, y: 130 },
  { id: 7, x: 200, y: 110 },
  { id: 8, x: 50, y: 150 },
  { id: 9, x: 220, y: 65 },
  { id: 10, x: 160, y: 160 },
  { id: 11, x: 90, y: 170 },
  { id: 12, x: 240, y: 140 },
];

const edges = [
  [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 8],
  [4, 7], [4, 9], [5, 9], [6, 7], [6, 10], [7, 12],
  [8, 11], [10, 11], [10, 12], [11, 8],
];

const floatingCards = [
  { icon: Brain, label: "IA Local", x: "5%", y: "10%", delay: 0.5 },
  { icon: Code2, label: "Clean Code", x: "70%", y: "5%", delay: 0.8 },
  { icon: BarChart3, label: "Performance", x: "60%", y: "70%", delay: 1.1 },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-synaptic-mint/15 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-forest-trust/10 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center rounded-full bg-synaptic-mint/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-synaptic-mint uppercase">
                Soluções Premium para GovTech e Empresas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-8 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-950 dark:text-white"
            >
              A sinapse perfeita{" "}
              <span className="text-forest-trust">entre visão humana</span>{" "}
              <span className="text-synaptic-mint">e inteligência artificial</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Criamos softwares, SaaS e soluções GovTech que unem engenharia e IA
              para transformar problemas complexos em tecnologia que funciona.
              Não adaptamos negócios à tecnologia. Criamos a tecnologia que os faz avançar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-forest-trust-light hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 w-full sm:w-auto"
              >
                Agende uma demo
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-ink/15 dark:border-white/15 px-7 py-3.5 text-sm font-semibold text-brand-ink dark:text-white transition-all duration-300 ease-out hover:border-brand-ink/30 dark:hover:border-white/30 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 w-full sm:w-auto"
              >
                Nossas Soluções
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-synaptic-mint/20 rounded-full blur-3xl" />

            <svg viewBox="0 0 280 200" className="w-full h-auto relative z-10">
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#065F46" stopOpacity="0.3" />
                </linearGradient>
                <filter id="nodeGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g>
                {edges.map(([fromId, toId], i) => {
                  const from = nodes.find((n) => n.id === fromId)!;
                  const to = nodes.find((n) => n.id === toId)!;
                  return (
                    <motion.line
                      key={`e-${i}`}
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="url(#edgeGrad)" strokeWidth="1.5" strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.2, delay: i * 0.06, ease: "easeInOut" }}
                    />
                  );
                })}
              </g>

              <g>
                {edges.map(([fromId, toId], i) => {
                  const from = nodes.find((n) => n.id === fromId)!;
                  const to = nodes.find((n) => n.id === toId)!;
                  return (
                    <motion.circle
                      key={`p-${i}`} r="2.5" fill="#10B981" filter="url(#nodeGlow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0], cx: [from.x, to.x], cy: [from.y, to.y] }}
                      transition={{ duration: 1.8, delay: 1.2 + i * 0.15, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  );
                })}
              </g>

              <g>
                {nodes.map((node, i) => (
                  <motion.g key={node.id}>
                    <motion.circle
                      cx={node.x} cy={node.y} r="5"
                      fill="#065F46" stroke="#10B981" strokeWidth="1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    />
                    <motion.circle
                      cx={node.x} cy={node.y} r="9"
                      fill="none" stroke="#10B981" strokeWidth="0.8"
                      animate={{ opacity: [0.15, 0.4, 0.15] }}
                      transition={{ duration: 2.5, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.g>
                ))}
              </g>
            </svg>

            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-xl p-3 shadow-lg z-20"
                style={{ left: card.x, top: card.y }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: card.delay, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-2"
                >
                  <card.icon size={14} className="text-synaptic-mint" aria-hidden="true" />
                  <span className="text-xs font-medium text-brand-ink dark:text-white">{card.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
