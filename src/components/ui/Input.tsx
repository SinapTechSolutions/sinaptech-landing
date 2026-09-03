import { forwardRef, type InputHTMLAttributes } from "react";

type InputVariant = "default" | "error" | "success";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<InputVariant, string> = {
  default:
    "border-gray-200 dark:border-slate-700 focus:ring-synaptic-mint focus:border-synaptic-mint",
  error:
    "border-red-500 focus:ring-red-500 focus:border-red-500",
  success:
    "border-green-500 focus:ring-green-500 focus:border-green-500",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      label,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-brand-ink dark:text-white mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-brand-ink dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${variantStyles[variant]} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={`mt-1.5 text-xs ${
              variant === "error"
                ? "text-red-500"
                : variant === "success"
                ? "text-green-500"
                : "text-brand-muted"
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps, type InputVariant };
