"use client";

import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

export interface SolutionDetail {
  id: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  overview: string;
  highlights: string[];
  tags: string[];
}

interface SolutionModalProps {
  solution: SolutionDetail | null;
  onClose: () => void;
}

export default function SolutionModal({
  solution,
  onClose,
}: SolutionModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!solution) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [solution, onClose]);

  return (
    <AnimatePresence>
      {solution && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          <motion.button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="solucao-modal-titulo"
            tabIndex={-1}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200/50 bg-white/90 p-8 shadow-2xl backdrop-blur-xl outline-none sm:max-h-[80vh] dark:border-slate-800/60 dark:bg-slate-900/90 dark:shadow-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes da solução"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-muted transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint dark:border-slate-800 dark:hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-synaptic-mint/10 text-synaptic-mint">
              <solution.icon size={24} aria-hidden="true" />
            </span>

            <h3
              id="solucao-modal-titulo"
              className="mt-5 font-display text-2xl font-bold tracking-tight text-brand-ink dark:text-slate-50"
            >
              {solution.title}
            </h3>
            <p className="mt-3 leading-relaxed text-brand-muted">
              {solution.overview}
            </p>

            <h4 className="mt-7 text-xs font-bold uppercase tracking-widest text-brand-muted">
              Diferenciais
            </h4>
            <ul className="mt-4 space-y-3">
              {solution.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-synaptic-mint/15 text-synaptic-mint">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-brand-ink dark:text-slate-100">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {solution.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-brand-muted dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#contato"
              onClick={onClose}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2"
            >
              Vamos Construir
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}