"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = !mounted
    ? "Alternar tema"
    : isDark
      ? "Ativar tema claro"
      : "Ativar tema escuro";

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/70"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/70 text-brand-muted backdrop-blur transition-all duration-300 ease-out hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synaptic-mint focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-label={label}
    >
      <Sun
        size={16}
        aria-hidden="true"
        className="absolute transition-all duration-300 ease-out scale-100 rotate-0 opacity-100 dark:scale-0 dark:-rotate-90 dark:opacity-0"
      />
      <Moon
        size={16}
        aria-hidden="true"
        className="absolute transition-all duration-300 ease-out scale-0 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100"
      />
    </button>
  );
}