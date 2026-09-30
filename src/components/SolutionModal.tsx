"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { Check, MessageCircle } from "lucide-react";

import Modal from "@/components/Modal";
import { buildWhatsAppLink } from "@/lib/site";

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
  // Guarda a última solução aberta para que o conteúdo continue visível
  // durante a animação de saída do modal.
  const [rendered, setRendered] = useState<SolutionDetail | null>(null);
  if (solution && solution !== rendered) setRendered(solution);

  const active = solution ?? rendered;
  if (!active) return null;

  return (
    <Modal
      open={Boolean(solution)}
      onClose={onClose}
      labelledBy="solucao-modal-titulo"
      closeLabel="Fechar detalhes da solução"
      maxWidth="sm:max-w-lg"
    >
      <div className="p-6 pr-14 sm:p-8 sm:pr-14">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-synaptic-mint/10 text-synaptic-mint">
          <active.icon size={24} aria-hidden="true" />
        </span>

        <h3
          id="solucao-modal-titulo"
          className="mt-5 font-display text-2xl font-bold tracking-tight text-brand-ink"
        >
          {active.title}
        </h3>
        <p className="mt-3 leading-relaxed text-brand-body">{active.overview}</p>

        <h4 className="mt-7 text-xs font-bold uppercase tracking-widest text-brand-muted">
          Diferenciais
        </h4>
        <ul className="mt-4 space-y-3">
          {active.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-synaptic-mint/15 text-synaptic-mint">
                <Check size={12} aria-hidden="true" />
              </span>
              <span className="text-sm leading-relaxed text-brand-ink">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {active.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-brand-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={buildWhatsAppLink(
            `Olá! Gostaria de solicitar: ${active.title}. Poderiam me enviar mais detalhes sobre como a Sinaptech pode ajudar?`
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-forest-trust-light hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Solicitar
          <MessageCircle size={16} aria-hidden="true" />
        </a>
      </div>
    </Modal>
  );
}
