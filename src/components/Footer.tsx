import { ShieldCheck, Landmark } from "lucide-react";
import { Wordmark } from "@/components/Navbar";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#hero" },
      { label: "Soluções", href: "#solucoes" },
      { label: "Produtos", href: "#produtos" },
      { label: "Metodologia", href: "#ciclo" },
      { label: "Essência", href: "#dna" },
      { label: "Dúvidas", href: "#faq" },
      { label: "Contato", href: "#contato" },
    ],
  },
  {
    title: "O que construímos",
    links: [
      { label: "Automação & IA Aplicada", href: "#solucoes" },
      { label: "Plataformas SaaS B2B", href: "#solucoes" },
      { label: "Soluções GovTech", href: "#solucoes" },
      { label: "Sistemas sob Medida", href: "#solucoes" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "contato@sinaptech.com.br", href: "mailto:contato@sinaptech.com.br" },
      { label: "(83) 92154-9886", href: "https://wa.me/5583921549886" },
    ],
  },
];

const complianceBadges = [
  { icon: ShieldCheck, label: "LGPD Native — Dados Locais" },
  { icon: Landmark, label: "Pronto para Licitações" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-200 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.04)] dark:border-slate-800 dark:bg-[#0B1120] dark:shadow-none"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a
              href="#hero"
              className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 rounded-lg"
              aria-label="SINAPTECH - Voltar ao topo"
            >
              <Wordmark />
            </a>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-brand-muted">
              Software House Premium. Criamos software, inteligência artificial
              e soluções GovTech que combinam engenharia de alto nível,
              inteligência e visão de negócio. Desenvolvemos arquiteturas
              seguras, escaláveis e eficientes, com processamento local sempre
              que aplicável, privacidade desde a concepção e tratamento
              responsável de dados em conformidade com a LGPD. Tecnologia
              pensada para funcionar hoje, evoluir amanhã e gerar resultados
              concretos.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {complianceBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-muted dark:border-slate-800"
                >
                  <badge.icon
                    size={12}
                    aria-hidden="true"
                    className="text-synaptic-mint"
                  />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-brand-ink dark:text-slate-50">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-brand-muted transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint rounded focus-visible:ring-offset-2 dark:hover:text-slate-50"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-center text-sm text-brand-muted sm:text-left">
            SINAPTECH © 2027. Tecnologia que impulsiona resultados. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}