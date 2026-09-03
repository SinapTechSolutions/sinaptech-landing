import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, className, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div className="h-5 w-5 rounded-md border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all duration-200 peer-checked:bg-forest-trust peer-checked:border-forest-trust peer-focus:ring-2 peer-focus:ring-synaptic-mint peer-focus:ring-offset-2 cursor-pointer">
            <Check
              size={12}
              className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex-1">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm text-brand-ink dark:text-white cursor-pointer"
            >
              {label}
            </label>
          )}
          {helperText && (
            <p className="mt-0.5 text-xs text-brand-muted">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
