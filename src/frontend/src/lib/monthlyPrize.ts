// monthlyPrize.ts — Monthly $100 USDC leaderboard prize system

import { getMonthlyBPForMonth } from "./leaderboardData";

// ── Feature Flag ─────────────────────────────────────────────────────────────

export const MONTHLY_PRIZE_ACTIVE = false;

// ── Types ──────────────────────────────────────────────────────────────────────────────

export interface MonthlyBPEntry {
  userId: string;
  displayName: string;
  bp: number;
  monthKey: string;
}

export interface WinnerClaim {
  monthKey: string;
  userId: string;
  displayName: string;
  bp: number;
  usdcAddress: string;
  claimedAt: number;
  paid: boolean;
  prizeAmount: string;
}

export interface PastWinner {
  monthKey: string;
  displayName: string;
  bp: number;
  prizeAmount: string;
  paidAt?: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────────

export const PRIZE_AMOUNT = "$100 USDC";

// ── Helpers ─────────────────────────────────────────────────────────────────────────

export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function getPreviousMonthKey(): string {
  const now = new Date();
  const utcMonth = now.getUTCMonth(); // 0-based
  const utcYear = now.getUTCFullYear();
  const prevMonth = utcMonth === 0 ? 12 : utcMonth; // Jan -> Dec of prev year
  const prevYear = utcMonth === 0 ? utcYear - 1 : utcYear;
  return `${prevYear}-${String(prevMonth).padStart(2, "0")}`;
}

export function formatMonthKey(key: string): string {
  const [year, month] = key.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getOrCreateAnonId(): string {
  const stored = localStorage.getItem("anonLeaderboardId");
  if (stored) return stored;
  const id = `bear-${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem("anonLeaderboardId", id);
  return id;
}

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getUserDisplayName(): string {
  const anonId = getOrCreateAnonId();
  const hash = hashCode(anonId);
  return `Bear #${(hash % 9000) + 1000}`;
}

// ── Monthly BP computation ────────────────────────────────────────────────────────────

function getUserMonthlyBP(monthKey: string): number {
  const [yearStr, monthStr] = monthKey.split("-");
  return getMonthlyBPForMonth(Number(yearStr), Number(monthStr));
}

// ── Public API ───────────────────────────────────────────────────────────────────────

/** Returns monthly leaderboard with only real users (local fallback). */
export function getMonthlyLeaderboard(
  monthKey: string,
): (MonthlyBPEntry & { rank: number; isCurrentUser: boolean })[] {
  const userId = getOrCreateAnonId();
  const displayName = getUserDisplayName();
  const bp = getUserMonthlyBP(monthKey);
  if (bp === 0) return [];
  return [{ userId, displayName, bp, monthKey, rank: 1, isCurrentUser: true }];
}

/** Check if the current user has already claimed for the given month. */
export function hasUserClaimed(monthKey: string, userId: string): boolean {
  try {
    const raw = localStorage.getItem("winnerClaims");
    if (!raw) return false;
    const claims: WinnerClaim[] = JSON.parse(raw);
    return claims.some((c) => c.monthKey === monthKey && c.userId === userId);
  } catch {
    return false;
  }
}

/** Check if prize has been marked as paid for a given month. */
export function isPrizePaid(monthKey: string): boolean {
  try {
    const raw = localStorage.getItem("winnerClaims");
    if (!raw) return false;
    const claims: WinnerClaim[] = JSON.parse(raw);
    return claims.some((c) => c.monthKey === monthKey && c.paid);
  } catch {
    return false;
  }
}

/** Submit a winner claim to localStorage. */
export function submitWinnerClaim(
  usdcAddress: string,
  userId: string,
  displayName: string,
  bp: number,
  monthKey: string,
): void {
  try {
    const raw = localStorage.getItem("winnerClaims");
    const claims: WinnerClaim[] = raw ? JSON.parse(raw) : [];
    if (claims.some((c) => c.monthKey === monthKey && c.userId === userId)) {
      return;
    }
    claims.push({
      monthKey,
      userId,
      displayName,
      bp,
      usdcAddress,
      claimedAt: Date.now(),
      paid: false,
      prizeAmount: PRIZE_AMOUNT,
    });
    localStorage.setItem("winnerClaims", JSON.stringify(claims));
  } catch {
    // ignore
  }
}

/** Get all winner claims from localStorage (admin). */
export function getWinnerClaims(): WinnerClaim[] {
  try {
    const raw = localStorage.getItem("winnerClaims");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/** Mark a winner as paid in localStorage. */
export function markWinnerPaid(monthKey: string): void {
  try {
    const raw = localStorage.getItem("winnerClaims");
    if (!raw) return;
    const claims: WinnerClaim[] = JSON.parse(raw);
    const idx = claims.findIndex((c) => c.monthKey === monthKey);
    if (idx >= 0) {
      claims[idx].paid = true;
      localStorage.setItem("winnerClaims", JSON.stringify(claims));
    }
  } catch {
    // ignore
  }
}

/** Get winner history (paid claims only). */
export function getWinnerHistory(): PastWinner[] {
  try {
    const raw = localStorage.getItem("winnerClaims");
    if (!raw) return [];
    const claims: WinnerClaim[] = JSON.parse(raw);
    return claims
      .filter((c) => c.paid)
      .map((c) => ({
        monthKey: c.monthKey,
        displayName: c.displayName,
        bp: c.bp,
        prizeAmount: c.prizeAmount,
      }));
  } catch {
    return [];
  }
}
