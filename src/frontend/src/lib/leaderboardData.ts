// leaderboardData.ts — BP leaderboard data (READ ONLY MODE — Phase 1)
// submitBearPoints import removed; syncCurrentUserBP and createDebouncedBPSync are stubbed out.

import { debugLeaderboardFetch } from "./betaDebug";
import {
  getGlobalLeaderboard as backendGetGlobal,
  getMonthlyLeaderboard as backendGetMonthly,
} from "./sharedLeaderboard";

export type BPMasteryTier = "Novice" | "Scholar" | "Expert" | "Master";

export interface BPLeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  allTimeBP: number;
  monthlyBP: number;
  tier: BPMasteryTier;
  isCurrentUser?: boolean;
}

export interface UserLeaderboardData {
  userId: string;
  displayName: string;
  allTimeBP: number;
  monthlyBP: number;
  tier: BPMasteryTier;
  rank: number;
}

export function getMasteryTier(bp: number): BPMasteryTier {
  if (bp >= 5000) return "Master";
  if (bp >= 2000) return "Expert";
  if (bp >= 500) return "Scholar";
  return "Novice";
}

function getLocalTotalBP(): number {
  console.log(
    "[BP-AUDIT] BACKEND SOURCE OF TRUTH ACTIVE — getLocalTotalBP returning 0 (localStorage disabled)",
  );
  return 0;
}

/**
 * Shared UTC-safe monthly BP helper.
 * Sums ledger entries for the given UTC year+month.
 * Used by getMonthlyBP() and imported by monthlyPrize.ts.
 */
export function getMonthlyBPForMonth(_year: number, _month: number): number {
  console.log(
    "[BP-AUDIT] BACKEND SOURCE OF TRUTH ACTIVE — getMonthlyBPForMonth returning 0 (localStorage disabled)",
  );
  return 0;
}

export interface FlatLeaderboardEntry {
  userId: string;
  displayName: string;
  allTimeBP: number;
  rank: number;
  isCurrentUser: boolean;
}

/**
 * DISABLED — Phase 1: leaderboard is now read-only.
 * This function is stubbed to prevent any frontend writes to the leaderboard.
 */
export async function syncCurrentUserBP(_actor: any): Promise<void> {
  console.log("[BP-AUDIT] syncCurrentUserBP: DISABLED — read-only mode");
}

/**
 * DISABLED — Phase 1: leaderboard is now read-only.
 * Returns inert attach/detach stubs so callers continue to compile.
 */
export function createDebouncedBPSync(
  _getActor: () => any,
  _debounceMs = 750,
): { attach: () => void; detach: () => void } {
  console.log("[BP-AUDIT] createDebouncedBPSync: DISABLED — read-only mode");
  return { attach: () => {}, detach: () => {} };
}

export async function fetchGlobalLeaderboard(
  actor: any,
  currentPrincipal?: string,
): Promise<FlatLeaderboardEntry[]> {
  try {
    const entries = await backendGetGlobal(actor);
    debugLeaderboardFetch("allTime", undefined, undefined, entries.length);
    return entries.map((e) => ({
      userId: e.userId,
      displayName: e.displayName,
      allTimeBP: Number(e.allTimeBP),
      rank: Number(e.rank),
      isCurrentUser: !!currentPrincipal && e.userId === currentPrincipal,
    }));
  } catch (err) {
    debugLeaderboardFetch("allTime", undefined, undefined, 0, err);
    return [];
  }
}

export async function fetchMonthlyLeaderboard(
  actor: any,
  month: number,
  year: number,
  currentPrincipal?: string,
): Promise<FlatLeaderboardEntry[]> {
  try {
    const entries = await backendGetMonthly(actor, month, year);
    debugLeaderboardFetch("monthly", month, year, entries.length);
    return entries.map((e) => ({
      userId: e.userId,
      displayName: e.displayName,
      allTimeBP: Number(e.allTimeBP),
      rank: Number(e.rank),
      isCurrentUser: !!currentPrincipal && e.userId === currentPrincipal,
    }));
  } catch (err) {
    debugLeaderboardFetch("monthly", month, year, 0, err);
    return [];
  }
}

// Keep getLocalTotalBP accessible if any external code references it
export { getLocalTotalBP };
