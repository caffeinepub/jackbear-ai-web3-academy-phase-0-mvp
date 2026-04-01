import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  variant?: "default" | "grid" | "gradient";
  className?: string;
}

export function PageShell({
  children,
  variant = "default",
  className = "",
}: PageShellProps) {
  const baseClasses = "min-h-screen surface-base";

  const variantClasses = {
    default: "",
    grid: "cyber-grid",
    gradient: "relative",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {variant === "gradient" && (
        <div className="absolute inset-0 gradient-overlay-subtle pointer-events-none" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
