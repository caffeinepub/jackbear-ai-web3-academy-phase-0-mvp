/**
 * Wrapper component for Font Awesome icons
 * Use this instead of emoji characters throughout the application
 */

import type React from "react";

interface FontAwesomeIconProps {
  icon: string; // e.g., "fa-solid fa-heart", "fa-brands fa-twitter"
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export function FontAwesomeIcon({
  icon,
  className = "",
  style,
  title,
}: FontAwesomeIconProps) {
  return (
    <i
      className={`${icon} ${className}`}
      style={style}
      title={title}
      aria-hidden={!title}
    />
  );
}

// Common icon presets for convenience
export const FAIcons = {
  heart: "fa-solid fa-heart",
  fire: "fa-solid fa-fire",
  star: "fa-solid fa-star",
  trophy: "fa-solid fa-trophy",
  rocket: "fa-solid fa-rocket",
  sparkles: "fa-solid fa-sparkles",
  bolt: "fa-solid fa-bolt",
  coins: "fa-solid fa-coins",
  crown: "fa-solid fa-crown",
  shield: "fa-solid fa-shield",
  check: "fa-solid fa-check",
  xmark: "fa-solid fa-xmark",
  coffee: "fa-solid fa-mug-hot",
  book: "fa-solid fa-book",
  graduation: "fa-solid fa-graduation-cap",
  users: "fa-solid fa-users",
  chart: "fa-solid fa-chart-line",
  egg: "fa-solid fa-egg",

  // Brand icons
  twitter: "fa-brands fa-x-twitter",
  github: "fa-brands fa-github",
  youtube: "fa-brands fa-youtube",
  discord: "fa-brands fa-discord",

  // World icons
  faCompass: "fa-solid fa-compass",
  faShieldHalved: "fa-solid fa-shield-halved",
  faInfinity: "fa-solid fa-infinity",
  faCode: "fa-solid fa-code",
  faChartLine: "fa-solid fa-chart-line",
  faCubes: "fa-solid fa-cubes",
  faCrown: "fa-solid fa-crown",
} as const;
