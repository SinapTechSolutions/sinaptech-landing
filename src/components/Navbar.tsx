"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "A Sinapse", href: "#sinapse" },
  { label: "Sobre Nós", href: "#dna" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-forest-trust focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
      >
        Pular para o conteúdo principal
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-brand-ink dark:text-white"
            >
              <Image
                src="/gemini-svg.svg"
                alt=""
                width={28}
                height={28}
                priority
                aria-hidden="true"
              />
              SINAPTECH
            </Link>

            <ul className="hidden md:flex items-center gap-8" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-brand-muted transition-colors duration-200 hover:text-brand-ink dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 rounded px-2 py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 text-brand-ink dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
                aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
              >
                <Sun size={16} className="absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                <Moon size={16} className="absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" aria-hidden="true" />
              </button>

              <a
                href="#contato"
                className="hidden md:inline-flex items-center justify-center rounded-xl bg-forest-trust px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-forest-trust-light hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
              >
                Vamos Construir
              </a>

              <button
                className="md:hidden p-2 rounded-xl text-brand-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
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
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800"
              role="menu"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-medium text-brand-muted hover:text-brand-ink dark:hover:text-white transition-colors duration-200 py-2 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2 rounded px-2"
                    role="menuitem"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  className="block w-full text-center rounded-xl bg-forest-trust px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-forest-trust-light mt-2 focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                >
                  Vamos Construir
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
