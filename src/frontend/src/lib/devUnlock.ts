/**
 * DRAFT-ONLY DEV UNLOCK — Verifiable Intelligence Layer
 *
 * Allows allowlisted principals to bypass the Coherence gate on /intelligence
 * ONLY when running on a non-production hostname (draft, canister URL, localhost).
 *
 * This file has ZERO effect on jackbear.app or jackbear.ai.
 *
 * ─────────────────────────────────────────────────────────────────
 * HOW TO ADD YOUR PRINCIPAL:
 *   1. Log in with Internet Identity on any page
 *   2. Open browser console and run:
 *        window.__debugPrincipal  (or check the II URL after login)
 *   3. Paste your principal string into DEV_PRINCIPAL_ALLOWLIST below
 * ─────────────────────────────────────────────────────────────────
 */

/** Production hostnames — bypass is permanently disabled on these. */
const PRODUCTION_HOSTNAMES = ["jackbear.app", "jackbear.ai"];

/**
 * Internet Identity principals for the app owner / dev team.
 * Paste the principal string exactly as it appears after login.
 * Example format: "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxx-cai"
 */
export const DEV_PRINCIPAL_ALLOWLIST: string[] = [
  "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe",
];

/**
 * Returns true when the current hostname is NOT a known production domain.
 * Draft canister URLs (*.icp0.io, *.raw.icp0.io, localhost, etc.) return true.
 */
export function isDraftEnv(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return !PRODUCTION_HOSTNAMES.some(
    (prod) => h === prod || h.endsWith(`.${prod}`),
  );
}

/**
 * Returns true only when ALL of these conditions hold:
 *   1. Running on a non-production hostname (draft/canister URL)
 *   2. The supplied principal text is in DEV_PRINCIPAL_ALLOWLIST
 *   3. The allowlist is non-empty (safeguard against accidental open access)
 *
 * Returns false for anonymous/unauthenticated principals.
 */
export function isDevUnlocked(principalText: string | undefined): boolean {
  if (!principalText) return false;
  if (!isDraftEnv()) return false;
  if (DEV_PRINCIPAL_ALLOWLIST.length === 0) return false;
  return DEV_PRINCIPAL_ALLOWLIST.includes(principalText);
}
