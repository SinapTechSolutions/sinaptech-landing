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

import { validateCorporateEmail } from "@/lib/email";
import { WHATSAPP_LINK } from "@/lib/site";

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
    const emailError = validateCorporateEmail(form.email);
    setErrors((prev) => ({ ...prev, email: emailError ?? undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: ContactFormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "Informe seu nome completo.";
    }
    const emailError = validateCorporateEmail(form.email);
    if (emailError) {
      nextErrors.email = emailError;
    }
    if (!form.need) {
      nextErrors.need = "Selecione seu objetivo principal.";
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setErrors({ email: "Erro de conexão. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-lg border bg-surface-2 px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface ${
      hasError
        ? "border-human-amber focus:ring-human-amber/60"
        : "border-line focus:ring-synaptic-mint"
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
            className="font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
          >
            Pronto para sua próxima evolução?
          </h2>
          <p className="mt-4 text-lg text-brand-body">
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
                className="ui-card-hover group flex items-center justify-between gap-4 rounded-xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-brand-muted">E-mail</span>
                    <span className="block font-medium text-brand-ink">
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

              <div className="ui-card rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-synaptic-mint/10 text-synaptic-mint">
                    <MessageCircle size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-brand-muted">
                      WhatsApp
                    </span>
                    <span className="block font-medium text-brand-ink">
                      (83) 92154-9886
                    </span>
                  </span>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-synaptic-mint/50 bg-synaptic-mint/10 px-5 py-3 text-sm font-semibold text-synaptic-mint transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-synaptic-mint/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
                className="ui-card flex h-full flex-col items-center justify-center rounded-xl p-10 text-center"
                role="status"
                aria-live="polite"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-synaptic-mint/10 text-synaptic-mint">
                  <CheckCircle2 size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-brand-ink">
                  Sua conversa foi iniciada!
                </h3>
                <p className="mt-2 max-w-sm text-brand-body">
                  Nossa equipe de engenharia vai entrar em contato em até 24
                  horas úteis.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="ui-card rounded-xl p-6 sm:p-8"
                aria-label="Formulário de qualificação"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="nome-completo"
                      className="mb-1.5 block text-sm font-medium text-brand-ink"
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
                      <p id="erro-nome" className="mt-1.5 text-xs font-medium text-human-amber">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="email-corporativo"
                      className="mb-1.5 block text-sm font-medium text-brand-ink"
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
                      <p id="erro-email" className="mt-1.5 text-xs font-medium text-human-amber">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="objetivo-principal"
                      className="mb-1.5 block text-sm font-medium text-brand-ink"
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
                      <p id="erro-objetivo" className="mt-1.5 text-xs font-medium text-human-amber">
                        Selecione seu objetivo principal.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-forest-trust-light hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-forest-trust disabled:opacity-80"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={16}
                        aria-hidden="true"
                        className="animate-spin text-white/70"
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