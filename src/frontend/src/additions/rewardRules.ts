/**
 * Reward Rules Engine
 *
 * Internal helpers for one-time and cooldown enforcement using localStorage.
 * Now includes 30-day reset cycle management and all-eggs bonus tracking.
 *
 * PHASE 3: localStorage here tracks easter egg DISCOVERY state only — not BP.
 * No BP values are stored. These keys control UX dedup (show egg once per cycle).
 */

import { EASTER_EGG_IDS } from "./easterEggIds";

const AWARD_HISTORY_KEY = "jb_egg_award_history";
const COOLDOWN_KEY = "jb_egg_cooldown";
const LAST_RESET_KEY = "jb_egg_last_reset";
const CYCLE_COUNT_KEY = "jb_egg_cycle_count";
const ALL_EGGS_BONUS_KEY = "jb_all_eggs_bonus_awarded";
const EGG_HUNTER_BADGE_KEY = "jb_egg_hunter_badge";
const CYCLE_MULTIPLIER_KEY = "jb_egg_cycle_multiplier";

const MAX_MULTIPLIER = 100;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
// ALL_EGGS_BONUS_BP and ALL_EGGS_MULTIPLIER_BOOST are retained for Phase 4 backend wiring
const ALL_EGGS_BONUS_BP = 500;
const ALL_EGGS_MULTIPLIER_BOOST = 10;

function safeGetJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSetJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn("[rewardRules] localStorage write failed for key:", key);
  }
}

export interface AwardHistoryEntry {
  eventId: string;
  timestamp: number;
}

export function getAwardHistory(): AwardHistoryEntry[] {
  try {
    const map = safeGetJSON<Record<string, number>>(AWARD_HISTORY_KEY, {});
    return Object.entries(map).map(([eventId, timestamp]) => ({
      eventId,
      timestamp,
    }));
  } catch {
    return [];
  }
}

function getAwardHistoryMap(): Record<string, number> {
  return safeGetJSON<Record<string, number>>(AWARD_HISTORY_KEY, {});
}

function setAwardHistoryMap(history: Record<string, number>): void {
  safeSetJSON(AWARD_HISTORY_KEY, history);
}

export function hasBeenAwarded(eggId: string): boolean {
  try {
    const history = getAwardHistoryMap();
    return !!history[eggId];
  } catch {
    return false;
  }
}

export function markAwarded(eggId: string): void {
  try {
    const history = getAwardHistoryMap();
    history[eggId] = Date.now();
    setAwardHistoryMap(history);
  } catch {
    console.warn("[rewardRules] Failed to mark egg as awarded:", eggId);
  }
}

export function recordAward(eventId: string): void {
  markAwarded(eventId);
}

function getCooldownState(): Record<string, number> {
  return safeGetJSON<Record<string, number>>(COOLDOWN_KEY, {});
}

function setCooldownState(state: Record<string, number>): void {
  safeSetJSON(COOLDOWN_KEY, state);
}

export function isOnCooldown(eggId: string, cooldownMs: number): boolean {
  try {
    const state = getCooldownState();
    const lastTriggered = state[eggId];
    if (!lastTriggered) return false;
    return Date.now() - lastTriggered < cooldownMs;
  } catch {
    return false;
  }
}

export function setCooldown(eggId: string): void {
  try {
    const state = getCooldownState();
    state[eggId] = Date.now();
    setCooldownState(state);
  } catch {
    console.warn("[rewardRules] Failed to set cooldown for egg:", eggId);
  }
}

export function updateCooldown(eventType: string, timestamp: number): void {
  try {
    const state = getCooldownState();
    state[eventType] = timestamp;
    setCooldownState(state);
  } catch {
    console.warn(
      "[rewardRules] Failed to update cooldown state in localStorage",
    );
  }
}

export function getLastResetTimestamp(): number {
  try {
    const raw = localStorage.getItem(LAST_RESET_KEY);
    if (!raw) return 0;
    return Number.parseInt(raw, 10) || 0;
  } catch {
    return 0;
  }
}

export function getCycleCount(): number {
  try {
    const raw = localStorage.getItem(CYCLE_COUNT_KEY);
    if (!raw) return 0;
    return Number.parseInt(raw, 10) || 0;
  } catch {
    return 0;
  }
}

export function getCycleMultiplier(): number {
  try {
    const raw = localStorage.getItem(CYCLE_MULTIPLIER_KEY);
    if (!raw) return 1;
    const val = Number.parseInt(raw, 10);
    return Math.min(Number.isNaN(val) ? 1 : Math.max(1, val), MAX_MULTIPLIER);
  } catch {
    return 1;
  }
}

function setCycleMultiplier(value: number): void {
  const capped = Math.min(Math.max(1, value), MAX_MULTIPLIER);
  try {
    localStorage.setItem(CYCLE_MULTIPLIER_KEY, String(capped));
  } catch {
    console.warn("[rewardRules] Failed to set cycle multiplier");
  }
}

export function performEasterEggReset(): void {
  try {
    setAwardHistoryMap({});
    setCooldownState({});
    localStorage.removeItem(ALL_EGGS_BONUS_KEY);
    const newCycleCount = getCycleCount() + 1;
    localStorage.setItem(CYCLE_COUNT_KEY, String(newCycleCount));
    localStorage.setItem(LAST_RESET_KEY, String(Date.now()));
    const currentMultiplier = getCycleMultiplier();
    setCycleMultiplier(currentMultiplier + 1);
    console.info(
      `[rewardRules] Easter egg reset performed. Cycle #${newCycleCount}, multiplier: ${getCycleMultiplier()}x (Phase 4: multiplier will apply to backend awardBP)`,
    );
  } catch {
    console.warn("[rewardRules] Failed to perform easter egg reset");
  }
}

/**
 * DRAFT/DEV ONLY — Testing reset for Easter egg discovery state.
 *
 * Clears discovery flags, cooldowns, and all-eggs bonus so eggs can be
 * re-triggered in the current browser session without affecting:
 * - cycle count / multiplier (preserved so production logic is untouched)
 * - login / auth
 * - lesson progress
 * - BP / leaderboard state
 *
 * Exposed as window.resetEasterEggsForTesting() in AdditionsRoot.
 * Never registered in production builds.
 */
export function resetEasterEggsForTesting(): void {
  try {
    // Clear discovered flags
    setAwardHistoryMap({});
    // Clear cooldowns
    setCooldownState({});
    // Clear all-eggs completion bonus
    localStorage.removeItem(ALL_EGGS_BONUS_KEY);
    // Clear egg hunter badge
    localStorage.removeItem(EGG_HUNTER_BADGE_KEY);

    console.log(
      "%c[DRAFT] Easter egg discovery state cleared.\nAll eggs can now be re-discovered in this browser.\nBP / auth / lesson progress untouched.",
      "color: #facc15; font-weight: bold;",
    );
  } catch {
    console.warn(
      "[DRAFT] resetEasterEggsForTesting: localStorage write failed",
    );
  }
}

export function check30DayResetCycle(): void {
  try {
    const lastReset = getLastResetTimestamp();
    const now = Date.now();
    if (lastReset === 0) {
      localStorage.setItem(LAST_RESET_KEY, String(now));
      return;
    }
    if (now - lastReset >= THIRTY_DAYS_MS) {
      performEasterEggReset();
    }
  } catch {
    console.warn("[rewardRules] Failed to check 30-day reset cycle");
  }
}

export function hasAllEggsBonusBeenAwarded(): boolean {
  try {
    return localStorage.getItem(ALL_EGGS_BONUS_KEY) === "true";
  } catch {
    return false;
  }
}

export function hasEggHunterBadge(): boolean {
  try {
    return localStorage.getItem(EGG_HUNTER_BADGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function checkAllEggsCompleted(): boolean {
  try {
    const history = getAwardHistoryMap();
    const allIds = Object.values(EASTER_EGG_IDS) as string[];
    return allIds.every((id) => !!history[id]);
  } catch {
    return false;
  }
}

/**
 * PHASE 3: All-eggs bonus is DISABLED — no BP written.
 * Tracks completion state only for future Phase 4 backend wiring.
 */
export function awardAllEggsBonus(): void {
  try {
    if (hasAllEggsBonusBeenAwarded()) return;
    // Mark locally so we don't fire again this cycle
    localStorage.setItem(ALL_EGGS_BONUS_KEY, "true");
    localStorage.setItem(EGG_HUNTER_BADGE_KEY, "true");
    const currentMultiplier = getCycleMultiplier();
    setCycleMultiplier(currentMultiplier + ALL_EGGS_MULTIPLIER_BOOST);

    console.log(
      "[BP-AUDIT] EASTER EGG ALL-EGGS BONUS DISABLED — backend authority only mode",
      "| intended BP =",
      ALL_EGGS_BONUS_BP,
      "| NO BP written to any store",
      "| badge and multiplier tracked locally for Phase 4 backend wiring",
    );

    // Fire discovery event only — no BP amount
    window.dispatchEvent(
      new CustomEvent("easter-egg-discovered", {
        detail: {
          eggId: "all-eggs-bonus",
          label: "All Eggs Found!",
          source: "easterEgg",
        },
      }),
    );
    console.info(
      "[rewardRules] All-eggs bonus: discovery recorded. BP will be awarded via backend in Phase 4.",
    );
  } catch {
    console.warn("[rewardRules] Failed to process all-eggs bonus");
  }
}

export interface CooldownState {
  [eventType: string]: number;
}
