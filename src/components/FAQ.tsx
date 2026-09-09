"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Quais tipos de soluções a Sinaptech desenvolve?",
    answer:
      "Trabalhamos com foco em SaaS B2B, ecossistemas GovTech, integrações de IA e produtos sob demanda — como ERPs e aplicativos nativos. Cada projeto nasce de um diagnóstico profundo do seu negócio para definir a arquitetura certa, no tempo certo.",
  },
  {
    question: "A Sinaptech presta manutenção pós-entrega?",
    answer:
      "Sim. Tratamos a evolução do software como pilar e não como acessório. Entregamos deploy contínuo, monitoramento de estabilidade, suporte técnico e evolução orientada por dados reais de uso.",
  },
  {
    question: "Como funciona a segurança e privacidade de dados (LGPD)?",
    answer:
      "Construímos arquiteturas seguras por padrão: opções de processamento em IA Local (on-premise) ou nuvens dedicadas, criptografia end-to-end e blindagem total de dados sensíveis. Nenhum dado é tratado sem consentimento e sempre dentro dos parâmetros da LGPD.",
  },
  {
    question: "O que é o Tatame Squad?",
    answer:
      "É o nosso produto proprietário: o sistema de gestão mais avançado para academias de artes marciais, focado em retenção de alunos e inadimplência zero. Inclui gamificação anti-churn, motor financeiro com kill-switch, aplicativo white-label e split de pagamento automático na fonte.",
  },
  {
    question: "Como é o modelo de contratação para softwares sob medida?",
    answer:
      "Trabalhamos com escopo ágil. Começamos com um diagnóstico profundo, definimos a arquitetura da solução e realizamos entregas mapeadas em ciclos rápidos (sprints), com transparência total de prazo e custo em cada etapa.",
  },
  {
    question:
      "Qual a diferença entre uma Software House comum e a abordagem da Sinaptech?",
    answer:
      "Uma software house comum entrega código; nós entregamos resultado. Unimos engenharia, IA local e visão de negócio para arquitetar sistemas que evoluem e escalam com a sua operação — com governança, privacidade de dados e controle total da sua infraestrutura.",
  },
  {
    question:
      "A Sinaptech atende órgãos públicos e participa de processos licitatórios?",
    answer:
      "Sim. Construímos sistemas com aderência às leis de licitação, transparência pública e segurança jurídica. A Sinaptech está pronta para atuar em processos licitatórios e fornece toda a documentação técnica e de conformidade exigida por órgãos públicos.",
  },
  {
    question:
      "Como funciona a IA Local da Sinaptech e por que ela é segura para a LGPD?",
    answer:
      "Toda a IA que entregamos roda em infraestrutura local — no seu servidor, na sua nuvem privada ou em ambiente on-premises. Seus dados nunca saem do seu ambiente para treinamento ou inferência, o que elimina o risco de vazamento e garante conformidade com a LGPD desde a arquitetura, não como um acessório.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="faq-titulo"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2
            id="faq-titulo"
            className="font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            As respostas diretas para as dúvidas mais comuns sobre como
            trabalhamos.
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `faq-pregunta-${index}`;
            const answerId = `faq-resposta-${index}`;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                className={`rounded-xl border bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out dark:bg-slate-900 dark:shadow-none ${
                  isOpen
                    ? "border-emerald-500/40 dark:border-emerald-500/40"
                    : "border-slate-200/50 dark:border-slate-800"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    id={questionId}
                    className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2"
                  >
                    <span className="font-display text-base font-semibold text-brand-ink sm:text-lg dark:text-slate-50">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ease-out ${
                        isOpen
                          ? "bg-synaptic-mint/10 text-synaptic-mint"
                          : "bg-slate-100 text-brand-muted dark:bg-slate-800"
                      }`}
                      aria-hidden="true"
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="inline-flex"
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed text-brand-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}