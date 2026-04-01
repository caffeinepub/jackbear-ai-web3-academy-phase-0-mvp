import { JACKBEAR_LOGO_SRC } from "@/lib/assets";

interface JackBearIconLogoProps {
  /**
   * Size of the logo (width and height)
   * @default 40
   */
  size?: number;
  /**
   * Additional CSS classes for the image
   */
  className?: string;
}

/**
 * JackBear icon-only logo component (no text fallback).
 * Renders the canonical logo image with aspect ratio preservation.
 * Used in header and footer where no visible text fallback is desired.
 */
export default function JackBearIconLogo({
  size = 40,
  className = "",
}: JackBearIconLogoProps) {
  return (
    <img
      src={JACKBEAR_LOGO_SRC}
      alt="JackBear.ai"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      onError={(e) => {
        // Hide image on error without showing text fallback
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
