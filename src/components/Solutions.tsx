"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Cloud, Landmark, Code2 } from "lucide-react";
import SolutionModal, { type SolutionDetail } from "@/components/SolutionModal";

interface SolutionCard extends SolutionDetail {
  span: string;
}

const solutions: SolutionCard[] = [
  {
    id: "automacao-ia",
    icon: BrainCircuit,
    title: "Automação & IA Aplicada",
    description:
      "Ferramentas inteligentes que eliminam trabalho braçal, tratam dados complexos e reduzem custos operacionais.",
    overview:
      "Racionalizamos processos inteiros com agentes de IA e automação sob medida. Modelos privados e auditáveis rodam dentro da sua infraestrutura, garantindo que dados sensíveis — governamentais ou empresariais — nunca saiam do seu domínio.",
    highlights: [
      "Eliminação de tarefas manuais e repetitivas",
      "IA privada e auditável (Llama/Mistral)",
      "Processamento seguro de documentos complexos",
      "Redução mensurável de custos operacionais",
    ],
    tags: ["Automação", "IA Aplicada", "LGPD"],
    span: "lg:col-span-2",
  },
  {
    id: "saas-b2b",
    icon: Cloud,
    title: "Plataformas SaaS B2B",
    description:
      "Sistemas em nuvem de alta disponibilidade, painéis analíticos rápidos e painéis de gestão.",
    overview:
      "Design e construção de plataformas SaaS prontas para escala e para reter clientes. Arquitetura de microsserviços, painéis analíticos ultrarrápidos e uma experiência que converte assinantes em defensores do produto.",
    highlights: [
      "Cloud nativa com alta disponibilidade",
      "Painéis analíticos em tempo real",
      "Arquitetura de microsserviços",
      "Onboarding e retenção otimizados",
    ],
    tags: ["SaaS", "Cloud", "Analytics"],
    span: "lg:col-span-1",
  },
  {
    id: "govtech",
    icon: Landmark,
    title: "Soluções GovTech",
    description:
      "Tecnologia projetada para o setor público. Transparência, segurança e processos 100% aderentes a leis e licitações.",
    overview:
      "Ecossistemas digitais desenhados para o setor público com foco absoluto em transparência, conformidade e segurança jurídica. Cada entrega passa por trilhas de auditoria e aderência total a leis e editais de licitação.",
    highlights: [
      "Conformidade com leis e editais de licitação",
      "Transparência e auditabilidade ponta a ponta",
      "Segurança jurídica em todas as camadas",
      "Integração de dados públicos e de cidadãos",
    ],
    tags: ["GovTech", "Licitações", "LGPD"],
    span: "lg:col-span-1",
  },
  {
    id: "sob-medida",
    icon: Code2,
    title: "Sistemas sob Medida",
    description:
      "Softwares, Apps e APIs desenvolvidos exclusivamente para a realidade e os desafios únicos da sua operação.",
    overview:
      "Engenharia sob demanda para gargalos específicos. Softwares, aplicativos e APIs projetados exclusivamente para a realidade do seu negócio — com escopo fechado, prazo garantido e uma equipe dedicada que escala sem inflar a folha.",
    highlights: [
      "Desenvolvimento 100% sob medida",
      "Softwares, apps e APIs escaláveis",
      "Entregas por sprint com escopo fechado",
      "Suporte e evolução contínua do produto",
    ],
    tags: ["Web", "Mobile", "APIs"],
    span: "lg:col-span-2",
  },
];

export default function Solutions() {
  const [active, setActive] = useState<SolutionCard | null>(null);

  return (
    <section
      id="solucoes"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="solucoes-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            id="solucoes-titulo"
            className="font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            O que construímos
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Arquiteturas robustas desenvolvidas para governos e empresas
            líderes.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <motion.button
              key={solution.id}
              type="button"
              onClick={() => setActive(solution)}
              aria-haspopup="dialog"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-xl border border-slate-200/50 bg-white p-8 text-left shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:shadow-none ${solution.span}`}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-synaptic-mint/8 via-transparent to-forest-trust/8 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint transition-transform duration-300 ease-out group-hover:scale-105">
                    <solution.icon size={24} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-muted transition-colors duration-300 ease-out group-hover:text-synaptic-mint">
                    Ver detalhes
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-brand-ink dark:text-slate-50">
                  {solution.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-brand-muted">
                  {solution.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-brand-muted transition-colors duration-300 ease-out group-hover:border-synaptic-mint/40 dark:border-slate-700"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <SolutionModal
        solution={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}