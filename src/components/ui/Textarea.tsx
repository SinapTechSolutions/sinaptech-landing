import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaVariant = "default" | "error" | "success";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  label?: string;
  helperText?: string;
}

const variantStyles: Record<TextareaVariant, string> = {
  default:
    "border-gray-200 dark:border-slate-700 focus:ring-synaptic-mint focus:border-synaptic-mint",
  error:
    "border-red-500 focus:ring-red-500 focus:border-red-500",
  success:
    "border-green-500 focus:ring-green-500 focus:border-green-500",
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      label,
      helperText,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-brand-ink dark:text-white mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-brand-ink dark:text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 min-h-[100px] resize-y ${variantStyles[variant]} ${className}`}
          {...props}
        />
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

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps, type TextareaVariant };
