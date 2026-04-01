/**
 * Additions Layer Root Component
 *
 * Passive, UI-less component that mounts a single global listener set
 * when feature flags are enabled.
 *
 * NOTE: Easter egg discovery toasts are now fired directly from
 * `awardReward.ts` via `fireDiscoveryToast()` — no event listener needed here.
 * This eliminates the mount-timing race that could silently drop toasts.
 *
 * CONSTRAINTS:
 * - Renders null (no UI)
 * - Single global event listener (no duplicates)
 * - No wrapping existing layout
 * - No modification of lesson components
 * - No routing changes
 * - Feature flag OFF by default
 */

import { useEffect, useRef } from "react";
import { areEasterEggsEnabled } from "./featureFlags";
import { injectFooterHotspot, removeFooterHotspot } from "./footerHotspot";
import {
  setupGlobalListeners,
  teardownGlobalListeners,
} from "./globalListener";
import { resetEasterEggsForTesting } from "./rewardRules";

/**
 * Returns true only in draft or local-dev environments.
 * Checked at runtime so the function is never registered in production.
 */
function isDraftOrDev(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    host.includes("draft") ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    import.meta.env.DEV === true
  );
}

type WindowWithTestHelpers = Window &
  typeof globalThis & { resetEasterEggsForTesting?: () => void };

/**
 * AdditionsRoot Component
 *
 * Mounts passive Easter egg detection when enabled.
 * Returns null - no visible UI.
 */
export default function AdditionsRoot() {
  const listenersAttached = useRef(false);

  useEffect(() => {
    // Guard: feature flag must be enabled
    if (!areEasterEggsEnabled()) {
      return;
    }

    // Guard: prevent duplicate listeners
    if (listenersAttached.current) {
      return;
    }

    console.log("[Additions] Mounting Easter egg detection");

    // Inject footer hotspot FIRST so the DOM element exists
    // before setupGlobalListeners queries for it
    injectFooterHotspot();

    // Setup single global listener set
    setupGlobalListeners();

    listenersAttached.current = true;

    // ---------------------------------------------------------------
    // DRAFT / DEV ONLY — expose testing reset as a global function.
    // Never runs in production (hostname guard above).
    // Usage: open browser console and call:
    //   window.resetEasterEggsForTesting()
    // ---------------------------------------------------------------
    if (isDraftOrDev()) {
      (window as WindowWithTestHelpers).resetEasterEggsForTesting =
        resetEasterEggsForTesting;
      console.log(
        "%c[DRAFT] window.resetEasterEggsForTesting() is available.\nCall it in the console to clear egg discovery state for retesting.",
        "color: #facc15;",
      );
    }

    // Cleanup
    return () => {
      console.log("[Additions] Unmounting Easter egg detection");

      teardownGlobalListeners();
      removeFooterHotspot();

      // Unregister draft global on unmount
      if (isDraftOrDev()) {
        (window as WindowWithTestHelpers).resetEasterEggsForTesting = undefined;
      }

      listenersAttached.current = false;
    };
  }, []);

  // Render nothing - passive component
  return null;
}
