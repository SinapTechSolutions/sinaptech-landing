import { forwardRef, type InputHTMLAttributes } from "react";

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, helperText, className, id, ...props }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className="peer sr-only"
            {...props}
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 dark:bg-slate-700 transition-colors duration-200 peer-checked:bg-forest-trust cursor-pointer">
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
          </div>
        </div>
        <div className="flex-1">
          {label && (
            <label
              htmlFor={switchId}
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

Switch.displayName = "Switch";

export { Switch, type SwitchProps };
