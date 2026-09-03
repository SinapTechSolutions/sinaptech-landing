import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300",
  primary:
    "bg-forest-trust/10 text-forest-trust dark:bg-synaptic-mint/10 dark:text-synaptic-mint",
  secondary:
    "bg-brand-ink/10 text-brand-ink dark:bg-white/10 dark:text-white",
  success:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  warning:
    "bg-human-amber/10 text-human-amber",
  error:
    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  info:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
};

function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
