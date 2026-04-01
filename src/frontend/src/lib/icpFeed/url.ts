import type { FeedSource } from "./types";

/**
 * Validates if a URL is a proper http(s) URL and not a placeholder
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim().length === 0) return false;

  // Check if it's a valid http(s) URL
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
  } catch {
    return false;
  }

  // Check for known placeholder patterns
  const placeholderPatterns = ["example-", "placeholder", "test-url", "dummy"];

  const lowerUrl = url.toLowerCase();
  return !placeholderPatterns.some((pattern) => lowerUrl.includes(pattern));
}

/**
 * Returns a stable fallback URL for a given feed source
 */
export function getFallbackUrl(source: FeedSource): string {
  const fallbacks: Record<FeedSource, string> = {
    "dfinity-medium": "https://medium.com/dfinity",
    "internetcomputer-news": "https://internetcomputer.org/news",
    "youtube-rd": "https://www.youtube.com/@DFINITY",
  };

  return fallbacks[source];
}

/**
 * Normalizes a URL by removing trailing slashes for comparison
 */
function normalizeUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/**
 * Computes a safe destination URL for a feed item
 * Returns the item URL if valid, otherwise returns the source fallback
 * Also marks as fallback if the item URL equals the configured fallback
 */
export function getSafeUrl(
  itemUrl: string,
  source: FeedSource,
): {
  url: string;
  isFallback: boolean;
} {
  const fallbackUrl = getFallbackUrl(source);

  // Check if URL is valid
  if (!isValidUrl(itemUrl)) {
    return { url: fallbackUrl, isFallback: true };
  }

  // Check if the item URL is the same as the fallback URL (normalized)
  if (normalizeUrl(itemUrl) === normalizeUrl(fallbackUrl)) {
    return { url: fallbackUrl, isFallback: true };
  }

  return { url: itemUrl, isFallback: false };
}

/**
 * Returns appropriate CTA label based on whether fallback is used
 */
export function getCtaLabel(isFallback: boolean, source: FeedSource): string {
  if (!isFallback) {
    return "Read Full Article";
  }

  const fallbackLabels: Record<FeedSource, string> = {
    "dfinity-medium": "Open Medium Page",
    "internetcomputer-news": "Open News Page",
    "youtube-rd": "Open YouTube Channel",
  };

  return fallbackLabels[source];
}
