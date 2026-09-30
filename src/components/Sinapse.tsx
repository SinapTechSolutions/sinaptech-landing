"use client";

import { motion } from "framer-motion";
import { ClipboardList, Compass, GitBranch, Rocket } from "lucide-react";

interface MethodStep {
  icon: typeof ClipboardList;
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

const steps: MethodStep[] = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Diagnóstico & Descoberta",
    description:
      "Imersão real no seu processo: entrevistas com stakeholders, mapeamento dos fluxos de trabalho, auditoria dos sistemas e dados em uso e quantificação dos gargalos em horas perdidas e custo. Identificamos o que destravar primeiro, o que automatizar e o que deixar de lado.",
    deliverable:
      "Mapa de processos priorizado + business case com hipóteses de ganho em números.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Arquitetura & Protótipo",
    description:
      "Desenho técnico da solução — modelo de dados, integrações, infraestrutura, segurança e conformidade com a LGPD. Antes da primeira linha de código você valida um protótipo navegável e um backlog priorizado, eliminando surpresas de escopo, prazo e investimento.",
    deliverable:
      "Documento de arquitetura, protótipo aprovado e backlog priorizado com estimativa.",
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Engenharia Ágil (IA + Humano)",
    description:
      "Sprints de 1 a 2 semanas com entrega demostrável a cada ciclo, integração e deploy contínuos desde o primeiro dia e revisão de código por engenheiros seniores. A IA acelera testes, componentes e documentação; a engenharia humana responde por arquitetura, decisões críticas e qualidade.",
    deliverable:
      "Incrementos funcionais a cada sprint, testes automatizados e ambiente de homologação sempre disponível.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Escala, Suporte & Evolução",
    description:
      "Go-live monitorado com alertas de disponibilidade e performance, SLA de suporte, treinamento do seu time e roadmap de evolução contínua. Acompanhamos adoção e retorno real do produto com métricas revisadas de forma periódica com você.",
    deliverable:
      "Produto em produção, painel de métricas, documentação e plano de evolução trimestral.",
  },
];

const pulseTransition = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

const STEP_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Sinapse() {
  return (
    <section
      id="metodologia"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="metodologia-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: STEP_EASE }}
            className="text-xs font-bold uppercase tracking-widest text-synaptic-mint"
          >
            Como trabalhamos
          </motion.span>
          <motion.h2
            id="metodologia-titulo"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: STEP_EASE }}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
          >
            Metodologia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease: STEP_EASE }}
            className="mt-4 text-lg text-brand-body"
          >
            Da primeira entrevista ao produto em escala: quatro etapas
            conectadas, com escopo transparente e um entregável verificável ao
            final de cada uma delas.
          </motion.p>
        </div>

        <div className="relative mt-16" role="list" aria-label="Etapas da Metodologia">
          <div
            className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-synaptic-mint/60 via-synaptic-mint/25 to-synaptic-mint/60 lg:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-8 top-7 hidden h-px bg-gradient-to-r from-synaptic-mint/15 via-synaptic-mint/45 to-synaptic-mint/15 lg:block"
            aria-hidden="true"
          >
            <span className="relative block h-full" aria-hidden="true">
              <motion.span
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-synaptic-mint shadow-[0_0_16px_var(--color-synaptic-mint)]"
                animate={{ left: ["0%", "100%"] }}
                transition={pulseTransition}
              />
            </span>
          </div>

          <motion.div
            className="absolute left-7 top-0 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-synaptic-mint shadow-[0_0_16px_var(--color-synaptic-mint)] lg:hidden"
            aria-hidden="true"
            animate={{ top: [0, "100%"] }}
            transition={pulseTransition}
          />

          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: STEP_EASE }}
                className="relative flex gap-5 lg:block lg:text-center"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-line bg-surface shadow-lift">
                  <step.icon size={22} aria-hidden="true" className="text-synaptic-mint" />
                </div>

                <div className="lg:mt-6">
                  <span className="text-xs font-bold tracking-widest text-synaptic-mint">
                    {step.number}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-brand-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-body lg:mx-auto">
                    {step.description}
                  </p>
                  <p className="mt-3 max-w-xs rounded-lg border border-line-soft bg-surface-2 px-3 py-2.5 text-xs leading-relaxed text-brand-muted shadow-card lg:mx-auto">
                    <span className="font-semibold text-synaptic-mint">
                      Entregável:{" "}
                    </span>
                    {step.deliverable}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
