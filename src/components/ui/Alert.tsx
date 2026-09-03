import type { HTMLAttributes } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
}

const variantConfig: Record<
  AlertVariant,
  { icon: typeof Info; styles: string; iconColor: string }
> = {
  info: {
    icon: Info,
    styles: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-500",
  },
  success: {
    icon: CheckCircle2,
    styles: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    iconColor: "text-green-500",
  },
  warning: {
    icon: AlertTriangle,
    styles: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-500",
  },
  error: {
    icon: XCircle,
    styles: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    iconColor: "text-red-500",
  },
};

function Alert({
  variant = "info",
  title,
  closable = false,
  onClose,
  className = "",
  children,
  ...props
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={`relative flex gap-3 rounded-xl border p-4 ${config.styles} ${className}`}
      {...props}
    >
      <Icon size={18} className={`mt-0.5 flex-shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1">
        {title && (
          <h4 className="text-sm font-semibold text-brand-ink dark:text-white">
            {title}
          </h4>
        )}
        <div className={`text-sm text-brand-muted ${title ? "mt-1" : ""}`}>
          {children}
        </div>
      </div>
      {closable && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Fechar"
        >
          <X size={14} className="text-brand-muted" />
        </button>
      )}
    </div>
  );
}

export { Alert, type AlertProps, type AlertVariant };
