import type { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

function Divider({
  orientation = "horizontal",
  className = "",
  ...props
}: DividerProps) {
  return (
    <hr
      className={`border-gray-200 dark:border-slate-700 ${
        orientation === "vertical"
          ? "h-full w-px inline-block"
          : "w-full"
      } ${className}`}
      {...props}
    />
  );
}

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-slate-700 ${variantStyles[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
      {...props}
    />
  );
}

export { Divider, Skeleton, type DividerProps, type SkeletonProps };
