"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Produtos", href: "#produtos" },
  { label: "Metodologia", href: "#ciclo" },
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
      <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        SINAPTECH
      </span>
    </div>
  );
}

export { Wordmark };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest-trust focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
      >
        Pular para o conteúdo principal
      </a>

      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-slate-800 dark:bg-[#0B1120]/80 dark:shadow-none">
        <nav className="mx-auto max-w-7xl scroll-smooth px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#hero"
              onClick={scrollToTop}
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 rounded-lg"
              aria-label="SINAPTECH - Voltar ao topo"
            >
              <Wordmark />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 ease-out hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint dark:text-slate-300 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              <a
                href="#contato"
                className="hidden items-center justify-center rounded-lg bg-[#065F46] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 lg:inline-flex"
              >
                Vamos Construir
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 lg:hidden dark:text-white"
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
              className="overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md lg:hidden dark:border-slate-800/80 dark:bg-slate-900/95"
            >
              <ul className="space-y-1 px-4 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 ease-out hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint dark:text-slate-300 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="#contato"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center rounded-lg bg-forest-trust px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2"
                  >
                    Vamos Construir
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}