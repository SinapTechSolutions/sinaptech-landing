"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2, Zap } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Informe um e-mail válido.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        setError("Erro ao inscrever. Tente novamente.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="newsletter-titulo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-synaptic-mint/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-synaptic-mint">
            <Zap size={14} aria-hidden="true" />
            Newsletter
          </span>
          <h2
            id="newsletter-titulo"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl dark:text-slate-50"
          >
            Receba Insights de IA e Engenharia
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Artigos semanais sobre automação inteligente, boas práticas de
            arquitetura e estratégias para escalar seu negócio com tecnologia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-md"
        >
          {submitted ? (
            <div
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-200/50 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
              role="status"
              aria-live="polite"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-synaptic-mint/10 text-synaptic-mint">
                <CheckCircle2 size={24} aria-hidden="true" />
              </span>
              <p className="font-display text-lg font-bold text-brand-ink dark:text-slate-50">
                Inscrito com sucesso!
              </p>
              <p className="text-sm text-brand-muted">
                Você receberá nosso próximo artigo no e-mail informado.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-slate-200/50 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:flex sm:items-center sm:gap-3 sm:p-2 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
              aria-label="Inscrição na newsletter"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                E-mail
              </label>
              <span className="relative flex-1 sm:flex-1">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                  aria-hidden="true"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="seu@empresa.com.br"
                  className="w-full rounded-lg border border-slate-200 bg-transparent py-3 pl-10 pr-4 text-sm text-brand-ink placeholder:text-brand-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-1 focus:ring-offset-white dark:border-slate-700 dark:text-white dark:focus:ring-offset-slate-900"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-erro" : undefined}
                />
              </span>
              <button
                type="submit"
                disabled={loading}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#065F46] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80 sm:mt-0 sm:w-auto"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  "Inscrever"
                )}
              </button>
              {error && (
                <p
                  id="newsletter-erro"
                  className="mt-2 w-full text-xs font-medium text-amber-600 dark:text-amber-400"
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
