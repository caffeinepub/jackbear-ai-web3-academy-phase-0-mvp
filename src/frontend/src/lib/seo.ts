/**
 * SEO utility for managing site-wide metadata with locked title and consistent social preview images
 */

import { JACKBEAR_LOGO_SRC } from "./assets";

const LOCKED_TITLE = "JackBear.ai";
const SITE_TAGLINE = "The World Computer's #1 Web3 Academy";

/**
 * Canonical OG/Twitter preview image.
 * Points to the real JackBear URL preview asset.
 * Note: index.html uses an absolute https://jackbear.app/... URL for static crawlers.
 * This runtime value uses a relative path (fine for JS-capable clients).
 */
const DEFAULT_OG_IMAGE = "/assets/jburl.png";

/**
 * Appends the site tagline to a description if not already present
 */
function appendTagline(description: string): string {
  if (!description) return SITE_TAGLINE;

  const normalizedDesc = description.toLowerCase();
  const normalizedTagline = SITE_TAGLINE.toLowerCase();

  if (normalizedDesc.includes(normalizedTagline)) {
    return description;
  }

  const trimmed = description.trim();
  const needsPeriod =
    !trimmed.endsWith(".") && !trimmed.endsWith("!") && !trimmed.endsWith("?");
  return `${trimmed}${needsPeriod ? "." : ""} ${SITE_TAGLINE}`;
}

function updateMetaTag(selector: string, content: string): void {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
}

export function updateDescriptionWithTagline(baseDescription: string): void {
  const fullDescription = appendTagline(baseDescription);
  updateMetaTag('meta[name="description"]', fullDescription);
  updateMetaTag('meta[property="og:description"]', fullDescription);
  updateMetaTag('meta[name="twitter:description"]', fullDescription);
  updateMetaTag('meta[property="twitter:description"]', fullDescription);
}

export function enforceLockedTitle(): void {
  document.title = LOCKED_TITLE;
  updateMetaTag('meta[name="title"]', LOCKED_TITLE);
  updateMetaTag('meta[property="og:title"]', LOCKED_TITLE);
  updateMetaTag('meta[name="twitter:title"]', LOCKED_TITLE);
  updateMetaTag('meta[property="twitter:title"]', LOCKED_TITLE);
}

/**
 * Ensures default social preview images.
 * Favicon is intentionally NOT overridden here — it is correctly set in index.html
 * as /assets/favicon.ico and must not be replaced by JS.
 * Header/footer logo uses the canonical full logo (JACKBEAR_LOGO_SRC).
 */
export function ensureDefaultSocialImages(): void {
  updateMetaTag('meta[property="og:image"]', DEFAULT_OG_IMAGE);
  updateMetaTag('meta[name="twitter:image"]', DEFAULT_OG_IMAGE);
  updateMetaTag('meta[property="twitter:image"]', DEFAULT_OG_IMAGE);
  // Favicon is managed by index.html only — no JS override here.
}

export function updatePageMetadata(options: {
  title?: string;
  description: string;
  language?: string;
}): void {
  const { description, language = "en" } = options;

  enforceLockedTitle();
  updateDescriptionWithTagline(description);

  const htmlElement = document.documentElement;
  if (htmlElement) {
    htmlElement.setAttribute("lang", language);
  }

  ensureDefaultSocialImages();
}

// Re-export for any consumers that import JACKBEAR_LOGO_SRC from seo.ts
export { JACKBEAR_LOGO_SRC };
