import { debugNameChange } from "./betaDebug";
/**
 * sharedLeaderboard.ts
 * Typed wrappers for the new shared leaderboard backend methods.
 * Uses (actor as any) internally since backend.ts is auto-generated and
 * will be regenerated with correct types on next full build.
 */

export interface BPLeaderboardEntry {
  userId: string;
  displayName: string;
  allTimeBP: bigint;
  rank: bigint;
}

export interface WinnerClaim {
  userId: string;
  displayName: string;
  month: bigint;
  year: bigint;
  usdcAddress: string;
  submittedAt: bigint;
  isPaid: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

export async function submitBearPoints(
  actor: AnyActor,
  allTimeBP: number,
  monthlyBP: number,
  month: number,
  year: number,
): Promise<void> {
  console.log(
    "[BP-AUDIT] sharedLeaderboard.submitBearPoints: calling canister — allTimeBP:",
    allTimeBP,
    "monthlyBP:",
    monthlyBP,
    "month:",
    month,
    "year:",
    year,
  );
  try {
    await actor.submitBearPoints(
      BigInt(allTimeBP),
      BigInt(monthlyBP),
      BigInt(month),
      BigInt(year),
    );
    console.log(
      "[BP-AUDIT] sharedLeaderboard.submitBearPoints: canister call SUCCEEDED",
    );
  } catch (err) {
    console.error(
      "[BP-AUDIT] sharedLeaderboard.submitBearPoints: canister call THREW —",
      err,
    );
    throw err;
  }
}

export async function getGlobalLeaderboard(
  actor: AnyActor,
): Promise<BPLeaderboardEntry[]> {
  console.log(
    "[BP-AUDIT] sharedLeaderboard.getGlobalLeaderboard: calling canister",
  );
  const result = await actor.getGlobalLeaderboard();
  console.log(
    "[BP-AUDIT] sharedLeaderboard.getGlobalLeaderboard: returned",
    Array.isArray(result) ? result.length : "?",
    "rows | raw:",
    result,
  );
  return result as BPLeaderboardEntry[];
}

export async function getMonthlyLeaderboard(
  actor: AnyActor,
  month: number,
  year: number,
): Promise<BPLeaderboardEntry[]> {
  console.log(
    "[BP-AUDIT] sharedLeaderboard.getMonthlyLeaderboard: calling canister — month:",
    month,
    "year:",
    year,
  );
  const result = await actor.getMonthlyLeaderboard(BigInt(month), BigInt(year));
  console.log(
    "[BP-AUDIT] sharedLeaderboard.getMonthlyLeaderboard: returned",
    Array.isArray(result) ? result.length : "?",
    "rows | raw:",
    result,
  );
  return result as BPLeaderboardEntry[];
}

export async function submitWinnerClaim(
  actor: AnyActor,
  month: number,
  year: number,
  usdcAddress: string,
): Promise<string> {
  const result = await actor.submitWinnerClaim(
    BigInt(month),
    BigInt(year),
    usdcAddress,
  );
  return result as string;
}

export async function getWinnerClaims(actor: AnyActor): Promise<WinnerClaim[]> {
  const result = await actor.getWinnerClaims();
  return result as WinnerClaim[];
}

export async function markClaimPaid(
  actor: AnyActor,
  month: number,
  year: number,
): Promise<void> {
  await actor.markClaimPaid(BigInt(month), BigInt(year));
}

export async function getWinnerHistory(
  actor: AnyActor,
): Promise<WinnerClaim[]> {
  const result = await actor.getWinnerHistory();
  return result as WinnerClaim[];
}

export async function changeDisplayName(
  actor: AnyActor,
  newName: string,
): Promise<{ success: boolean; changesRemaining: number; error?: string }> {
  const result: string = await actor.changeDisplayName(newName);
  if (result.startsWith("success:")) {
    const remaining = Number.parseInt(result.split(":")[1] || "0", 10);
    debugNameChange(newName, "success", remaining);
    return { success: true, changesRemaining: remaining };
  }
  const errMsg = result.replace("error:", "");
  debugNameChange(newName, "error", undefined, errMsg);
  return {
    success: false,
    changesRemaining: 0,
    error: errMsg,
  };
}

export async function getNameChangeCount(actor: AnyActor): Promise<number> {
  const result: bigint = await actor.getNameChangeCount();
  return Number(result);
}
