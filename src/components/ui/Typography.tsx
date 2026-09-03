import type { HTMLAttributes } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}

const sizeStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl sm:text-4xl font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl font-semibold tracking-tight",
  h4: "text-xl sm:text-2xl font-semibold",
  h5: "text-lg sm:text-xl font-medium",
  h6: "text-base sm:text-lg font-medium",
};

function Heading({ level = "h2", className = "", ...props }: HeadingProps) {
  const Tag = level;
  return (
    <Tag
      className={`font-display text-brand-ink dark:text-white ${sizeStyles[level]} ${className}`}
      {...props}
    />
  );
}

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextWeight = "normal" | "medium" | "semibold" | "bold";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  weight?: TextWeight;
  muted?: boolean;
}

const textSizeStyles: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const textWeightStyles: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

function Text({
  size = "base",
  weight = "normal",
  muted = false,
  className = "",
  ...props
}: TextProps) {
  return (
    <p
      className={`text-brand-ink dark:text-white leading-relaxed ${
        muted ? "text-brand-muted" : ""
      } ${textSizeStyles[size]} ${textWeightStyles[weight]} ${className}`}
      {...props}
    />
  );
}

export { Heading, Text, type HeadingProps, type TextProps, type HeadingLevel, type TextSize, type TextWeight };
