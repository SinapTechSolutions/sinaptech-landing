import { ShieldCheck, Gavel, Lock, Layers } from "lucide-react";

interface TrustBadge {
  icon: typeof ShieldCheck;
  label: string;
}

const badges: TrustBadge[] = [
  { icon: ShieldCheck, label: "LGPD Native (Processamento Local)" },
  { icon: Gavel, label: "Pronto para Licitações (GovTech)" },
  { icon: Lock, label: "Segurança End-to-End" },
  { icon: Layers, label: "Arquitetura Multi-Cloud & Bare-Metal" },
];

export default function TrustBadges() {
  return (
    <section
      className="border-y border-slate-200/70 bg-slate-50 dark:border-slate-800/70 dark:bg-slate-950/50"
      aria-label="Conformidade e compliance"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          Engenharia em conformidade com os mais rigorosos padrões corporativos
          e públicos:
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {badges.map((badge) => (
            <li key={badge.label} className="flex">
              <span className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                <badge.icon
                  size={16}
                  aria-hidden="true"
                  className="text-emerald-600 transition-transform duration-300 ease-out group-hover:scale-110 dark:text-synaptic-mint"
                />
                {badge.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}