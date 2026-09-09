"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Loader2,
  Send,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/5583921549886?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20Sinaptech.";

const NEED_OPTIONS = [
  "IA Local & Automação",
  "Desenvolvimento de SaaS",
  "Soluções GovTech",
  "Projeto sob Demanda",
] as const;

interface ContactFormState {
  name: string;
  email: string;
  need: string;
}

const INITIAL_STATE: ContactFormState = {
  name: "",
  email: "",
  need: "",
};

interface ContactFormErrors {
  name?: string;
  email?: string;
  need?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "outlook.com.br",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "bol.com.br",
  "uol.com.br",
  "terra.com.br",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
];

function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Informe seu e-mail corporativo.";
  if (!EMAIL_REGEX.test(trimmed)) return "Formato de e-mail inválido.";
  if (
    FREE_EMAIL_DOMAINS.some((domain) =>
      trimmed.toLowerCase().endsWith(`@${domain}`)
    )
  ) {
    return "Use um e-mail corporativo (ex.: nome@empresa.com.br).";
  }
  return null;
}

export default function Contact() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEmailBlur = () => {
    const emailError = validateEmail(form.email);
    setErrors((prev) => ({ ...prev, email: emailError ?? undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: ContactFormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome completo.";
    }
    const emailError = validateEmail(form.email);
    if (emailError) {
      nextErrors.email = emailError;
    }
    if (!form.need) {
      nextErrors.need = "Selecione seu objetivo principal.";
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:text-white dark:focus:ring-offset-slate-900 ${
      hasError
        ? "border-human-amber focus:ring-human-amber/60"
        : "border-slate-200 focus:ring-synaptic-mint dark:border-slate-700"
    }`;

  return (
    <section
      id="contato"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="contato-titulo"
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
            id="contato-titulo"
            className="font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            Pronto para sua próxima evolução?
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Entre em contato diretamente com nossa equipe de engenharia e
            negócios.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="space-y-5">
              <a
                href="mailto:contato@sinaptech.com.br"
                className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-brand-muted">E-mail</span>
                    <span className="block font-medium text-brand-ink dark:text-slate-50">
                      contato@sinaptech.com.br
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="text-brand-muted transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-synaptic-mint"
                />
              </a>

              <div className="rounded-xl border border-slate-200/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint">
                    <MessageCircle size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-brand-muted">
                      WhatsApp
                    </span>
                    <span className="block font-medium text-brand-ink dark:text-slate-50">
                      (83) 92154-9886
                    </span>
                  </span>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-synaptic-mint/40 bg-synaptic-mint/10 px-5 py-3 text-sm font-semibold text-forest-trust transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-synaptic-mint/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 dark:text-synaptic-mint"
                >
                  Falar no WhatsApp
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {submitted ? (
              <div
                className="flex h-full flex-col items-center justify-center rounded-xl border border-slate-200/50 bg-white p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                role="status"
                aria-live="polite"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-synaptic-mint/10 text-synaptic-mint">
                  <CheckCircle2 size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-brand-ink dark:text-slate-50">
                  Sua conversa foi iniciada!
                </h3>
                <p className="mt-2 max-w-sm text-brand-muted">
                  Nossa equipe de engenharia vai entrar em contato em até 24
                  horas úteis.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-slate-200/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                aria-label="Formulário de qualificação"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="nome-completo"
                      className="mb-1.5 block text-sm font-medium text-brand-ink dark:text-slate-50"
                    >
                      Nome
                    </label>
                    <input
                      id="nome-completo"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputClasses(Boolean(errors.name))}
                      placeholder="Seu nome"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "erro-nome" : undefined}
                    />
                    {errors.name && (
                      <p id="erro-nome" className="mt-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="email-corporativo"
                      className="mb-1.5 block text-sm font-medium text-brand-ink dark:text-slate-50"
                    >
                      E-mail Corporativo
                    </label>
                    <input
                      id="email-corporativo"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={handleEmailBlur}
                      className={inputClasses(Boolean(errors.email))}
                      placeholder="nome@empresa.com.br"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "erro-email" : undefined}
                    />
                    {errors.email && (
                      <p id="erro-email" className="mt-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="objetivo-principal"
                      className="mb-1.5 block text-sm font-medium text-brand-ink dark:text-slate-50"
                    >
                      Qual é o seu objetivo principal?
                    </label>
                    <div className="relative">
                      <select
                        id="objetivo-principal"
                        value={form.need}
                        onChange={(e) => handleChange("need", e.target.value)}
                        className={`${inputClasses(Boolean(errors.need))} appearance-none pr-10`}
                        aria-invalid={Boolean(errors.need)}
                        aria-describedby={errors.need ? "erro-objetivo" : undefined}
                      >
                        <option value="" disabled>
                          Selecione uma opção
                        </option>
                        {NEED_OPTIONS.map((option) => (
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
                    {errors.need && (
                      <p id="erro-objetivo" className="mt-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                        Selecione seu objetivo principal.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#065F46] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-forest-trust disabled:opacity-80"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={16}
                        aria-hidden="true"
                        className="animate-spin text-emerald-200"
                      />
                      Sincronizando sinapses...
                    </>
                  ) : (
                    <>
                      Iniciar Conversa
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}