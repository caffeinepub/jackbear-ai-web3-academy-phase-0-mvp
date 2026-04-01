import { JACKBEAR_LOGO_SRC } from "@/lib/assets";
import { useState } from "react";

interface JackBearLogoProps {
  /**
   * Size of the logo container (width and height)
   * @default 40 (10 in Tailwind units = 40px)
   */
  size?: number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Whether to show the gradient background container
   * @default true
   */
  showContainer?: boolean;
}

/**
 * Reusable JackBear logo component that uses the canonical logo source.
 * This is the single source of truth for rendering the JackBear logo across the application.
 * Includes graceful fallback ('JB' text) for failed image loads.
 * Uses object-contain to preserve aspect ratio and prevent stretching/cropping.
 */
export default function JackBearLogo({
  size = 40,
  className = "",
  showContainer = true,
}: JackBearLogoProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback content when image fails to load
  if (imageError) {
    const fallbackContent = (
      <div
        className={`flex items-center justify-center font-display font-bold text-primary ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size / 3}px`,
        }}
      >
        JB
      </div>
    );

    if (!showContainer) {
      return fallbackContent;
    }

    return (
      <div
        className={`rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-glow-sm overflow-hidden ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {fallbackContent}
      </div>
    );
  }

  // When showContainer=false: clean presentation container with proper
  // theme-adaptive contrast — subtle in dark mode, readable in light mode.
  if (!showContainer) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-lg
          bg-white/80 dark:bg-primary/10
          ring-1 ring-primary/20 dark:ring-primary/15
          shadow-sm dark:shadow-none
          overflow-hidden
          ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          padding: Math.max(3, Math.round(size * 0.08)),
        }}
      >
        <img
          src={JACKBEAR_LOGO_SRC}
          alt="JackBear.ai Logo"
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-glow-sm overflow-hidden ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img
        src={JACKBEAR_LOGO_SRC}
        alt="JackBear.ai Logo"
        className="w-full h-full object-contain p-1"
        onError={handleImageError}
      />
    </div>
  );
}
