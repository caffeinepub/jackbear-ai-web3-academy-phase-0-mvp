/**
 * Additions Layer Reward Engine
 *
 * PHASE 3 STATUS: Easter egg BP is DISABLED — backend authority only mode.
 *
 * Easter eggs still fire a discovery event for UX (animation, unlock state),
 * but do NOT award BP or increment any store.
 * BP will be re-enabled once a backend-backed awardBP method is wired.
 *
 * Only backend calls (completeLesson, submitQuiz) are authoritative BP sources.
 */

import { toast } from "sonner";
import { EASTER_EGG_REGISTRY } from "./EasterEggRegistry";
import { isRewardEngineEnabled } from "./featureFlags";
import {
  awardAllEggsBonus,
  checkAllEggsCompleted,
  getCycleMultiplier,
  hasAllEggsBonusBeenAwarded,
  hasBeenAwarded,
  isOnCooldown,
  markAwarded,
  setCooldown,
} from "./rewardRules";

export interface AwardRewardEvent {
  id: string;
  amount: number;
  source: "easterEgg";
  cooldownMs?: number;
}

/**
 * Determine rarity-based toast title from reward amount.
 */
function getDiscoveryToastTitle(amount: number): string {
  if (amount >= 100) return "🔥 Legendary Find";
  if (amount >= 50) return "💎 Rare Discovery";
  return "🐻 Hidden Easter Egg Found";
}

/**
 * Fire the Easter egg discovery toast directly — no event relay, no mount dependency.
 * Fires immediately on confirmed first-time discovery.
 */
function fireDiscoveryToast(eggId: string, rewardAmount: number): void {
  try {
    const egg = EASTER_EGG_REGISTRY[eggId as keyof typeof EASTER_EGG_REGISTRY];
    const amount = egg?.rewardAmount ?? rewardAmount;
    const title = getDiscoveryToastTitle(amount);

    toast(title, { description: "You found something others miss." });

    console.log(
      `[EASTER-EGG-TOAST] fired | eggId=${eggId} | rarity=${amount} | firstTime=true`,
    );
  } catch {
    // Non-critical — silently ignore
  }
}

/**
 * Dispatch legacy CustomEvent for other UX consumers (animations, unlock state).
 */
function dispatchDiscoveryEvent(eggId: string): void {
  try {
    const egg = EASTER_EGG_REGISTRY[eggId as keyof typeof EASTER_EGG_REGISTRY];
    const detail = { eggId, source: "easterEgg", name: egg?.name ?? eggId };
    // Dispatch both event names: legacy consumers + NotificationBell
    window.dispatchEvent(new CustomEvent("easter-egg-discovered", { detail }));
    window.dispatchEvent(
      new CustomEvent("additions:egg-awarded", {
        detail: { ...detail, message: egg?.name ?? eggId },
      }),
    );
  } catch {
    // Non-critical — silently ignore
  }
}

/**
 * Award an Easter Egg discovery.
 *
 * PHASE 3 — BP DISABLED:
 * - Discovery is tracked (dedup, cooldown) and UX fires
 * - NO BP is awarded to any store (frontend or backend)
 * - Copy shows "Discovered" not "+N BP"
 *
 * Backend-backed BP will be restored in Phase 4 via awardBP(actionId, amount).
 *
 * @param event - Reward event with unique id
 * @returns true if discovered (first time), false if duplicate/cooldown/disabled
 */
export function awardReward(event: AwardRewardEvent): boolean {
  // Guard: feature flag must be enabled
  if (!isRewardEngineEnabled()) {
    return false;
  }

  // Guard: validate amount
  if (event.amount <= 0) {
    console.warn(`[Additions] Invalid reward amount: ${event.amount}`);
    return false;
  }

  // Guard: check cooldown if specified
  if (event.cooldownMs && isOnCooldown(event.id, event.cooldownMs)) {
    console.warn(`[Additions] Reward on cooldown: ${event.id}`);
    return false;
  }

  // Guard: one-time check (unless cooldown is specified)
  if (!event.cooldownMs && hasBeenAwarded(event.id)) {
    console.warn(`[Additions] Duplicate discovery blocked: ${event.id}`);
    return false;
  }

  // Record award (dedup tracking only — no BP written)
  markAwarded(event.id);

  // Update cooldown if specified
  if (event.cooldownMs) {
    setCooldown(event.id);
  }

  // BP-AUDIT: explicit log that this path is presentation-only in Phase 3
  const multiplier = getCycleMultiplier();
  console.log(
    "[BP-AUDIT] EASTER EGG BP DISABLED — backend authority only mode",
    "| eggId =",
    event.id,
    "| intended amount =",
    event.amount,
    "| multiplier =",
    multiplier,
    "| NO BP written to any store",
    "| discovery tracked locally for dedup only",
  );

  console.log(
    `[Additions] Easter egg discovered (presentation-only): ${event.id}`,
  );

  // Fire toast directly — independent of BP write, no mount-dependent relay
  fireDiscoveryToast(event.id, event.amount);

  // Dispatch legacy event for other UX consumers (animations, unlock state)
  dispatchDiscoveryEvent(event.id);

  // Check if all eggs are now completed — bonus also disabled in Phase 3
  if (checkAllEggsCompleted() && !hasAllEggsBonusBeenAwarded()) {
    setTimeout(() => {
      awardAllEggsBonus();
    }, 1200);
  }

  return true;
}

/**
 * Clear all Additions Layer rewards (dev/testing only)
 */
export function clearAllRewards(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("jb_egg_award_history");
  localStorage.removeItem("jb_egg_cooldown");

  console.log("[Additions] All rewards cleared");
}
