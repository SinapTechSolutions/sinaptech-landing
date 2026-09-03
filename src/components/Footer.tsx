import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Produto: [
    { label: "Software Sob Medida", href: "#solucoes" },
    { label: "IA Aplicada", href: "#solucoes" },
    { label: "SaaS GovTech", href: "#solucoes" },
    { label: "Plataforma", href: "#solucoes" },
  ],
  Institucional: [
    { label: "Sobre a SINAPTECH", href: "#dna" },
    { label: "Case de Sucesso", href: "#" },
    { label: "Carreiras", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-brand-ink dark:text-white"
            >
              <Image
                src="/gemini-svg.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
              SINAPTECH
            </Link>
            <p className="mt-3 text-sm text-brand-muted leading-relaxed">
              Software House Premium especializada em IA Local e GovTech. +10 empresas confiam na nossa engenharia.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-brand-ink dark:text-white mb-3">
                {category}
              </h4>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-muted transition-colors duration-200 hover:text-brand-ink dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 rounded px-1 py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            SINAPTECH &copy; {new Date().getFullYear()}. Tecnologia que protege e escala.
          </p>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center rounded-full bg-synaptic-mint/10 px-2.5 py-0.5 text-[11px] font-semibold text-synaptic-mint uppercase tracking-wider"
              aria-label="Em conformidade com a LGPD"
            >
              LGPD
            </span>
            <span
              className="inline-flex items-center rounded-full bg-forest-trust/10 px-2.5 py-0.5 text-[11px] font-semibold text-forest-trust dark:text-synaptic-mint uppercase tracking-wider"
              aria-label="Certificação SOC 2"
            >
              SOC 2
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
