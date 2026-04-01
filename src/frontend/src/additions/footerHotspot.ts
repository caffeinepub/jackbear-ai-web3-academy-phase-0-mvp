/**
 * Footer Hotspot Injection
 *
 * Additive DOM insertion that finds the existing footer and injects
 * a non-visible hotspot element without changing layout/styling.
 *
 * CONSTRAINTS:
 * - No modification of Footer.tsx
 * - No visible layout changes
 * - Cleanup on unmount
 *
 * DELTA: New file - footer hotspot injection
 * SCOPE: No impact on existing systems
 */

const HOTSPOT_ID = "footer-easter-egg-hotspot";

/**
 * Inject invisible hotspot into footer
 */
export function injectFooterHotspot(): void {
  if (typeof window === "undefined") {
    return;
  }

  // Check if already injected
  if (document.getElementById(HOTSPOT_ID)) {
    return;
  }

  // Find footer
  const footer = document.querySelector("footer");
  if (!footer) {
    console.warn("[Additions] Footer not found, cannot inject hotspot");
    return;
  }

  // Create invisible hotspot
  const hotspot = document.createElement("div");
  hotspot.id = HOTSPOT_ID;
  hotspot.style.position = "absolute";
  hotspot.style.bottom = "10px";
  hotspot.style.right = "10px";
  hotspot.style.width = "20px";
  hotspot.style.height = "20px";
  hotspot.style.cursor = "pointer";
  hotspot.style.opacity = "0";
  hotspot.style.zIndex = "10";
  hotspot.title = "Easter egg hotspot";

  // Inject into footer
  footer.style.position = "relative"; // Ensure footer is positioned
  footer.appendChild(hotspot);

  console.log("[Additions] Footer hotspot injected");
}

/**
 * Remove footer hotspot
 */
export function removeFooterHotspot(): void {
  if (typeof window === "undefined") {
    return;
  }

  const hotspot = document.getElementById(HOTSPOT_ID);
  if (hotspot) {
    hotspot.remove();
    console.log("[Additions] Footer hotspot removed");
  }
}
