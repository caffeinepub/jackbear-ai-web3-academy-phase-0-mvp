/**
 * Pure frontend helper — no side effects, no backend calls.
 * Returns the highest prestige tier for the given rank/BP, or null.
 */
export type PrestigeTier = "diamond" | "platinum" | "gold";

export function getPrestigeTier(
  rank: number | null | undefined,
  bp: number | null | undefined,
): PrestigeTier | null {
  const r = rank ?? null;
  const b = bp ?? null;
  if ((r != null && r <= 3) || (b != null && b >= 100000)) return "diamond";
  if ((r != null && r <= 5) || (b != null && b >= 50000)) return "platinum";
  if ((r != null && r <= 10) || (b != null && b >= 10000)) return "gold";
  return null;
}

// backwards-compat
export function isGoldBear(
  rank: number | null | undefined,
  bp: number | null | undefined,
): boolean {
  return getPrestigeTier(rank, bp) !== null;
}
