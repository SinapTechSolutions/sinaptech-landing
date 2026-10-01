"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Produtos", href: "#produtos" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Essência", href: "#dna" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/sinaptech-icon.svg"
        alt="Sinaptech"
        className="h-8 w-8"
      />
      <span className="font-display text-xl font-bold tracking-tight text-brand-ink">
        SINAPTECH
      </span>
    </div>
  );
}

export { Wordmark };

/** Âncora de seção; o item "Início" usa `<Link>` para não cair no lint de
 *  links HTML para páginas. */
function NavAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  if (href === "/") {
    return (
      <Link href="/" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    // Volta para o estado inicial da página: rota limpa (`/`) e topo,
    // em vez de deixar um hash de seção preso na URL.
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest-trust focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 focus:ring-offset-brand-snow"
      >
        Pular para o conteúdo principal
      </a>

      <header className="fixed top-0 z-50 w-full border-b border-line bg-surface/80 shadow-card backdrop-blur-xl">
        <nav className="mx-auto max-w-7xl scroll-smooth px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              onClick={goHome}
              className="flex items-center gap-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-lg"
              aria-label="SINAPTECH - Voltar ao topo"
            >
              <Wordmark />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavAnchor
                    href={link.href}
                    onClick={link.href === "/" ? goHome : undefined}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-brand-muted transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint"
                  >
                    {link.label}
                  </NavAnchor>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <a
                href="#contato"
                className="hidden items-center justify-center rounded-lg bg-forest-trust px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-forest-trust-light hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:inline-flex"
              >
                Vamos Construir
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface lg:hidden"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-line bg-surface/95 backdrop-blur-md lg:hidden"
            >
              <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto">
                <ul className="space-y-1 px-4 py-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <NavAnchor
                        href={link.href}
                        onClick={
                          link.href === "/"
                            ? goHome
                            : () => setMobileOpen(false)
                        }
                        className="block rounded-lg px-3 py-3 text-sm font-medium text-brand-muted transition-colors duration-200 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint"
                      >
                        {link.label}
                      </NavAnchor>
                    </li>
                  ))}
                  <li className="pt-2">
                    <a
                      href="#contato"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-lg bg-forest-trust px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-forest-trust-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      Vamos Construir
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}