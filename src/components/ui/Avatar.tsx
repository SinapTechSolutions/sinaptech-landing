import type { ImgHTMLAttributes } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarShape = "circle" | "square";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  fallback?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-lg",
};

function Avatar({
  size = "md",
  shape = "circle",
  fallback,
  src,
  alt,
  className = "",
  ...props
}: AvatarProps) {
  const initials = fallback || alt?.charAt(0)?.toUpperCase() || "?";

  if (!src) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-forest-trust/10 text-forest-trust dark:bg-synaptic-mint/10 dark:text-synaptic-mint font-medium ${sizeStyles[size]} ${shapeStyles[shape]} ${className}`}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${sizeStyles[size]} ${shapeStyles[shape]} ${className}`}
      {...props}
    />
  );
}

interface AvatarGroupProps {
  avatars: Array<{ src?: string; alt: string; fallback?: string }>;
  size?: AvatarSize;
  max?: number;
}

function AvatarGroup({ avatars, size = "md", max = 3 }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((avatar, i) => (
        <div key={i} className="relative ring-2 ring-white dark:ring-slate-800 rounded-full">
          <Avatar size={size} src={avatar.src} alt={avatar.alt} fallback={avatar.fallback} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`relative inline-flex items-center justify-center bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-medium ring-2 ring-white dark:ring-slate-800 rounded-full ${sizeStyles[size]}`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps, type AvatarSize, type AvatarShape };
