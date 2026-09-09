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
      className="border-y border-slate-200/70 bg-white/50 dark:border-slate-800/70 dark:bg-slate-950/50"
      aria-label="Conformidade e compliance"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-brand-muted opacity-80">
          Engenharia em conformidade com os mais rigorosos padrões corporativos
          e públicos:
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {badges.map((badge) => (
            <li key={badge.label} className="flex">
              <span className="group inline-flex items-center gap-2 text-sm text-brand-muted opacity-70 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:opacity-100">
                <badge.icon
                  size={16}
                  aria-hidden="true"
                  className="text-synaptic-mint transition-transform duration-300 ease-out group-hover:scale-110"
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