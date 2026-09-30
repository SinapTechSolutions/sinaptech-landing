"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  Search,
  Send,
  ShieldCheck,
  Target,
} from "lucide-react";

import Modal from "@/components/Modal";
import { validateCorporateEmail } from "@/lib/email";

const SEGMENTS = [
  "Gestão Pública / Prefeituras",
  "SaaS B2B",
  "Empresa de Serviços",
  "Indústria / Comércio",
  "Outro",
] as const;

const TEAM_SIZES = [
  "1 a 10 pessoas",
  "11 a 50 pessoas",
  "51 a 200 pessoas",
  "Mais de 200 pessoas",
] as const;

const CHALLENGES = [
  "Processos manuais e repetitivos",
  "Sistemas que não conversam entre si",
  "Segurança da informação e LGPD",
  "Automação e aplicação de IA",
  "Dados, relatórios e tomada de decisão",
  "Lançar um novo produto digital",
  "Escalar a operação sem aumentar o time",
] as const;

const BUDGETS = [
  "Até R$ 25 mil",
  "R$ 25 mil a R$ 75 mil",
  "R$ 75 mil a R$ 150 mil",
  "Acima de R$ 150 mil",
  "Quero definir junto com a Sinaptech",
] as const;

const TIMELINES = [
  "O mais rápido possível",
  "Em 1 a 3 meses",
  "Em 3 a 6 meses",
  "Apenas avaliando possibilidades",
] as const;

const DELIVERABLES = [
  {
    icon: Search,
    title: "Mapeamento dos gargalos",
    text: "Onde sua operação perde horas e dinheiro hoje.",
  },
  {
    icon: Target,
    title: "Plano priorizado",
    text: "O que atacar primeiro, com esforço e impacto estimados.",
  },
  {
    icon: ShieldCheck,
    title: "Análise de risco e LGPD",
    text: "Pontos de exposição técnica e de conformidade.",
  },
] as const;

interface DiagnosticState {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  segment: string;
  teamSize: string;
  challenges: string[];
  tools: string;
  budget: string;
  timeline: string;
  context: string;
}

type DiagnosticErrors = Partial<Record<keyof DiagnosticState, string>>;

const INITIAL_STATE: DiagnosticState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  segment: "",
  teamSize: "",
  challenges: [],
  tools: "",
  budget: "",
  timeline: "",
  context: "",
};

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function inputClasses(hasError: boolean): string {
  return `w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface ${
    hasError
      ? "border-human-amber focus:ring-human-amber/60"
      : "border-line focus:ring-synaptic-mint"
  }`;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
  options: readonly string[];
  error?: string;
}

function SelectField({
  id,
  label,
  value,
  onChange,
  hasError,
  options,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses(hasError)} appearance-none pr-10`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-erro` : undefined}
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-xs font-medium text-human-amber">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  hint?: string;
}

function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  hasError,
  error,
  placeholder,
  type = "text",
  autoComplete,
  optional,
  hint,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label}
        {optional && (
          <span className="ml-1.5 text-xs font-normal text-brand-muted">
            (opcional)
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClasses(hasError)}
        aria-invalid={hasError}
        aria-describedby={
          hasError ? `${id}-erro` : hint ? `${id}-hint` : undefined
        }
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-brand-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-xs font-medium text-human-amber">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Diagnostic() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<DiagnosticState>(INITIAL_STATE);
  const [errors, setErrors] = useState<DiagnosticErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof DiagnosticState>(
    field: K,
    value: DiagnosticState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleChallenge = (challenge: string) => {
    setForm((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((item) => item !== challenge)
        : [...prev.challenges, challenge],
    }));
    if (errors.challenges) {
      setErrors((prev) => ({ ...prev, challenges: undefined }));
    }
  };

  const validate = (): DiagnosticErrors => {
    const next: DiagnosticErrors = {};
    if (!form.name.trim()) next.name = "Informe seu nome completo.";

    const emailError = validateCorporateEmail(form.email);
    if (emailError) next.email = emailError;

    if (form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Informe um telefone com DDD (ex.: 83 92154-9886).";
    }

    if (!form.company.trim()) next.company = "Informe o nome da empresa ou órgão.";
    if (!form.segment) next.segment = "Selecione seu segmento.";
    if (!form.teamSize) next.teamSize = "Selecione o porte do seu time.";
    if (form.challenges.length === 0) {
      next.challenges = "Selecione ao menos um desafio.";
    }
    if (!form.budget) next.budget = "Selecione uma faixa de investimento.";
    if (!form.timeline) next.timeline = "Selecione o prazo esperado.";
    if (form.context.trim().length < 20) {
      next.context =
        "Descreva o cenário em pelo menos 20 caracteres para conseguirmos avaliar.";
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ context: "Erro de conexão. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="diagnostico"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="diagnostico-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="ui-card relative overflow-hidden rounded-2xl"
        >
          <div className="bg-radial-mint absolute inset-0 opacity-60" aria-hidden="true" />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-synaptic-mint/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-synaptic-mint">
                <ClipboardCheck size={14} aria-hidden="true" />
                Diagnóstico Gratuito
              </span>
              <h2
                id="diagnostico-titulo"
                className="mt-4 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
              >
                Saiba exatamente onde a Sinaptech pode ajudar
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-brand-body">
                Responda algumas perguntas sobre a sua operação e receba, em até
                24 horas úteis, um plano priorizado de oportunidades — sem custo
                e sem compromisso.
              </p>

              <ul className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {DELIVERABLES.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint">
                      <item.icon size={16} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-brand-ink">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-brand-muted">
                        {item.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-forest-trust-light hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-auto lg:w-auto"
              >
                Solicitar Diagnóstico Gratuito
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="text-xs text-brand-muted">
                Leva cerca de 3 minutos · Suas respostas ficam protegidas pela LGPD
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="diagnostico-modal-titulo"
        closeLabel="Fechar diagnóstico gratuito"
      >
        <div className="border-b border-line bg-surface-2 p-6 pr-14 sm:p-8 sm:pr-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-synaptic-mint">
            <ClipboardCheck size={14} aria-hidden="true" />
            Diagnóstico Gratuito
          </span>
          <h3
            id="diagnostico-modal-titulo"
            className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-ink"
          >
            Conte sobre a sua operação
          </h3>
          <p className="mt-2 max-w-xl text-sm text-brand-body">
            Em até 24 horas úteis você recebe um plano priorizado do que atacar
            primeiro, com impacto e esforço estimados.
          </p>
        </div>

        {submitted ? (
          <div
            className="flex flex-col items-center px-6 py-14 text-center sm:px-10"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-synaptic-mint/10 text-synaptic-mint">
              <CheckCircle2 size={30} aria-hidden="true" />
            </span>
            <h4 className="mt-6 font-display text-2xl font-bold text-brand-ink">
              Diagnóstico enviado!
            </h4>
            <p className="mt-3 max-w-md text-brand-body">
              Recebemos suas respostas. Nossa equipe de engenharia vai analisar o
              cenário e retornar em até 24 horas úteis com os próximos passos.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-forest-trust px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-forest-trust-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Fechar
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8"
            aria-label="Formulário de diagnóstico gratuito"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <TextField
                id="diag-nome"
                label="Nome completo"
                autoComplete="name"
                value={form.name}
                onChange={(value) => setField("name", value)}
                hasError={Boolean(errors.name)}
                error={errors.name}
                placeholder="Seu nome"
              />
              <TextField
                id="diag-email"
                label="E-mail corporativo"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(value) => setField("email", value)}
                onBlur={() =>
                  setErrors((prev) => ({
                    ...prev,
                    email: validateCorporateEmail(form.email) ?? undefined,
                  }))
                }
                hasError={Boolean(errors.email)}
                error={errors.email}
                placeholder="nome@empresa.com.br"
                hint="Usamos este e-mail apenas para retornar o diagnóstico."
              />
              <TextField
                id="diag-telefone"
                label="Telefone / WhatsApp"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(value) => setField("phone", formatPhone(value))}
                hasError={Boolean(errors.phone)}
                error={errors.phone}
                placeholder="(83) 92154-9886"
              />
              <TextField
                id="diag-empresa"
                label="Empresa ou órgão"
                autoComplete="organization"
                value={form.company}
                onChange={(value) => setField("company", value)}
                hasError={Boolean(errors.company)}
                error={errors.company}
                placeholder="Nome da organização"
              />
              <TextField
                id="diag-cargo"
                label="Seu cargo"
                autoComplete="organization-title"
                value={form.role}
                onChange={(value) => setField("role", value)}
                hasError={false}
                optional
                placeholder="Ex.: CTO, Diretor de TI, Secretário"
              />
              <SelectField
                id="diag-segmento"
                label="Segmento"
                value={form.segment}
                onChange={(value) => setField("segment", value)}
                hasError={Boolean(errors.segment)}
                error={errors.segment}
                options={SEGMENTS}
              />
              <SelectField
                id="diag-time"
                label="Porte do time"
                value={form.teamSize}
                onChange={(value) => setField("teamSize", value)}
                hasError={Boolean(errors.teamSize)}
                error={errors.teamSize}
                options={TEAM_SIZES}
              />
              <TextField
                id="diag-ferramentas"
                label="Ferramentas ou sistemas usados hoje"
                value={form.tools}
                onChange={(value) => setField("tools", value)}
                hasError={false}
                optional
                placeholder="Ex.: ERP, planilhas, CRM, sistema próprio"
              />
            </div>

            <fieldset className="mt-6">
              <legend className="mb-1.5 text-sm font-medium text-brand-ink">
                Quais são seus principais desafios?
                <span className="ml-1.5 text-xs font-normal text-brand-muted">
                  (selecione todos que se aplicam)
                </span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {CHALLENGES.map((challenge) => {
                  const active = form.challenges.includes(challenge);
                  return (
                    <button
                      key={challenge}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleChallenge(challenge)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                        active
                          ? "border-forest-trust bg-forest-trust text-white"
                          : errors.challenges
                            ? "border-human-amber/60 bg-surface-2 text-brand-body hover:border-human-amber"
                            : "border-line bg-surface-2 text-brand-body hover:border-synaptic-mint/60 hover:text-brand-ink"
                      }`}
                    >
                      {active && <CheckCircle2 size={13} aria-hidden="true" />}
                      {challenge}
                    </button>
                  );
                })}
              </div>
              {errors.challenges && (
                <p className="mt-2 text-xs font-medium text-human-amber">
                  {errors.challenges}
                </p>
              )}
            </fieldset>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <SelectField
                id="diag-investimento"
                label="Faixa de investimento pretendida"
                value={form.budget}
                onChange={(value) => setField("budget", value)}
                hasError={Boolean(errors.budget)}
                error={errors.budget}
                options={BUDGETS}
              />
              <SelectField
                id="diag-prazo"
                label="Prazo esperado"
                value={form.timeline}
                onChange={(value) => setField("timeline", value)}
                hasError={Boolean(errors.timeline)}
                error={errors.timeline}
                options={TIMELINES}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="diag-contexto"
                className="mb-1.5 block text-sm font-medium text-brand-ink"
              >
                Conte como está o cenário hoje
              </label>
              <textarea
                id="diag-contexto"
                rows={5}
                value={form.context}
                onChange={(e) => setField("context", e.target.value)}
                placeholder="Ex.: controlamos matrículas e cobranças em três planilhas diferentes, a inadimplência sobe todo mês e o time perde cerca de 15 horas por semana com lançamentos manuais..."
                className={`${inputClasses(Boolean(errors.context))} resize-y`}
                aria-invalid={Boolean(errors.context)}
                aria-describedby={
                  errors.context ? "diag-contexto-erro" : "diag-contexto-hint"
                }
              />
              <p id="diag-contexto-hint" className="mt-1.5 text-xs text-brand-muted">
                Quanto mais detalhe, mais preciso fica o diagnóstico.{" "}
                {form.context.trim().length}/20 caracteres mínimos.
              </p>
              {errors.context && (
                <p
                  id="diag-contexto-erro"
                  className="mt-1.5 text-xs font-medium text-human-amber"
                >
                  {errors.context}
                </p>
              )}
            </div>

            <div className="mt-7 flex flex-col items-start gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-brand-muted">
                Seus dados são usados apenas para preparar o diagnóstico e são
                tratados conforme a LGPD.
              </p>
              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-forest-trust-light hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-forest-trust disabled:opacity-80 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      aria-hidden="true"
                      className="animate-spin text-white/70"
                    />
                    Enviando diagnóstico...
                  </>
                ) : (
                  <>
                    Enviar Diagnóstico
                    <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
}
