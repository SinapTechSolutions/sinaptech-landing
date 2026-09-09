"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, Cloud, Briefcase, Timer, ShieldCheck, Gauge, Sparkles } from "lucide-react";

type OperationId = "public" | "saas" | "services";

interface Operation {
  id: OperationId;
  icon: typeof Landmark;
  label: string;
  metrics: {
    manualReduction: number;
    lgpdProtection: number;
    deliverySpeed: number;
  };
}

interface MetricCard {
  icon: typeof Timer;
  label: string;
  value: string;
  suffix: string;
  shade: string;
  base: number;
}

const OPERATIONS: Operation[] = [
  {
    id: "public",
    icon: Landmark,
    label: "Gestão Pública / Prefeituras",
    metrics: { manualReduction: 80, lgpdProtection: 100, deliverySpeed: 3.4 },
  },
  {
    id: "saas",
    icon: Cloud,
    label: "SaaS B2B",
    metrics: { manualReduction: 74, lgpdProtection: 100, deliverySpeed: 3.0 },
  },
  {
    id: "services",
    icon: Briefcase,
    label: "Empresa de Serviços",
    metrics: { manualReduction: 68, lgpdProtection: 100, deliverySpeed: 2.6 },
  },
];

function buildMetrics(operation: Operation): MetricCard[] {
  return [
    {
      icon: Timer,
      label: "Redução de tempo em tarefas manuais",
      value: String(operation.metrics.manualReduction),
      suffix: "%",
      shade: "text-synaptic-mint",
      base: 100,
    },
    {
      icon: ShieldCheck,
      label: "Mitigação de riscos de vazamento LGPD",
      value: String(operation.metrics.lgpdProtection),
      suffix: "%",
      shade: "text-forest-trust dark:text-synaptic-mint",
      base: 100,
    },
    {
      icon: Gauge,
      label: "Aumento na velocidade de entregas operacionais",
      value: operation.metrics.deliverySpeed.toFixed(1).replace(".", ","),
      suffix: "x",
      shade: "text-human-amber",
      base: 4,
    },
  ];
}

export default function ROICalculator() {
  const [activeId, setActiveId] = useState<OperationId>("public");
  const activeOperation =
    OPERATIONS.find((operation) => operation.id === activeId) ?? OPERATIONS[0];
  const metrics = buildMetrics(activeOperation);

  return (
    <section
      id="impacto"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="impacto-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div
            className="relative border-b border-slate-200 bg-slate-50/80 px-6 py-10 sm:px-10 dark:border-slate-800 dark:bg-slate-900/40"
            aria-hidden="true"
          >
            <div className="bg-radial-mint absolute inset-0 opacity-60" />
            <span className="relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-synaptic-mint">
              <Sparkles size={14} aria-hidden="true" />
              Simulador de Impacto Operacional
            </span>
            <h2
              id="impacto-titulo"
              className="relative mt-3 font-display text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl dark:text-slate-50"
            >
              Quanto a sua operação pode ganhar?
            </h2>
            <p className="relative mt-3 max-w-xl text-brand-muted">
              Selecione o tipo de operação e veja o impacto estimado da
              engenharia Sinaptech.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div
              className="flex flex-wrap gap-3"
              role="radiogroup"
              aria-label="Tipo de operação"
            >
              {OPERATIONS.map((operation) => {
                const selected = operation.id === activeId;
                return (
                  <button
                    key={operation.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setActiveId(operation.id)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 ${
                      selected
                        ? "border-forest-trust bg-forest-trust text-white shadow-sm hover:bg-emerald-700"
                        : "border-slate-200 bg-transparent text-brand-muted hover:border-slate-300 hover:text-brand-ink dark:border-slate-700 dark:hover:border-slate-600 dark:hover:text-slate-50"
                    }`}
                  >
                    <operation.icon size={16} aria-hidden="true" />
                    {operation.label}
                  </button>
                );
              })}
            </div>

            <div
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3"
              role="status"
              aria-live="polite"
            >
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint">
                      <metric.icon size={18} aria-hidden="true" />
                    </span>
                    <p className="text-sm font-medium leading-snug text-brand-ink dark:text-slate-50">
                      {metric.label}
                    </p>
                  </div>

                  <p className={`mt-5 font-display text-4xl font-extrabold tracking-tight ${metric.shade}`}>
                    {metric.value}
                    <span className="text-2xl">{metric.suffix}</span>
                  </p>

                  <div
                    className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                    aria-hidden="true"
                  >
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-forest-trust to-synaptic-mint"
                      initial={false}
                      animate={{ width: `${(parseFloat(metric.value.replace(",", ".")) / metric.base) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-brand-muted">
              Estimativas baseadas em projetos já entregues pela Sinaptech para
              operações de cada segmento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}