"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2 } from "lucide-react";

const challengeOptions = [
  "SaaS B2B",
  "GovTech",
  "IA Local / Automação",
  "Aplicativo Mobile",
  "API / Integração",
  "Outro",
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contato" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-ink dark:text-white">
              Pronto para sua próxima evolução?
            </h2>
            <p className="mt-4 text-lg text-brand-muted">
              Converse com nossa equipe e descubra como podemos transformar sua
              visão em tecnologia de alto impacto.
            </p>

            <div className="mt-10 space-y-6">
              <a
                href="mailto:hello@sinaptech.com.br"
                className="flex items-center gap-4 text-brand-ink dark:text-white hover:text-synaptic-mint dark:hover:text-synaptic-mint transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-synaptic-mint/10 text-synaptic-mint">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-brand-muted">E-mail</p>
                  <p className="font-medium">hello@sinaptech.com.br</p>
                </div>
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-brand-ink dark:text-white hover:text-synaptic-mint dark:hover:text-synaptic-mint transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-synaptic-mint/10 text-synaptic-mint">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-brand-muted">WhatsApp</p>
                  <p className="font-medium">(11) 99999-9999</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-synaptic-mint/10 text-synaptic-mint mb-4">
                  <Send size={28} />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-ink dark:text-white">
                  Conexão estabelecida com sucesso.
                </h3>
                <p className="mt-2 text-brand-muted">
                  Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 shadow-sm space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-brand-ink dark:text-white mb-1.5">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-brand-ink dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 transition-all duration-200"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-ink dark:text-white mb-1.5">
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-brand-ink dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 transition-all duration-200"
                    placeholder="voce@empresa.com.br"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-ink dark:text-white mb-1.5">
                    Empresa
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-brand-ink dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 transition-all duration-200"
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-ink dark:text-white mb-1.5">
                    Qual o seu desafio?
                  </label>
                  <select
                    required
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-brand-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 transition-all duration-200"
                  >
                    <option value="">Selecione...</option>
                    {challengeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-forest-trust-light hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sincronizando sinapses...
                    </>
                  ) : (
                    <>
                      Iniciar Conversa
                      <Send size={16} />
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
