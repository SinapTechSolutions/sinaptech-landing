import { forwardRef, type HTMLAttributes } from "react";

type CardVariant = "default" | "bordered" | "elevated" | "interactive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700",
  bordered:
    "bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700",
  elevated:
    "bg-white dark:bg-slate-800 shadow-lg",
  interactive:
    "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

function CardHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 dark:border-slate-700 ${className}`}
      {...props}
    />
  );
}

function CardTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold text-brand-ink dark:text-white ${className}`}
      {...props}
    />
  );
}

function CardDescription({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-brand-muted ${className}`}
      {...props}
    />
  );
}

function CardContent({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props} />
  );
}

function CardFooter({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 dark:border-slate-700 ${className}`}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardVariant,
};
