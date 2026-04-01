/**
 * betaDebug.ts — Lightweight, non-invasive debug logger for trust-critical beta flows.
 *
 * Covers:
 *   - BP writes (point awards)
 *   - Leaderboard fetches
 *   - Display name changes
 *   - BP sync (localStorage → canister)
 *
 * Enabled when: localStorage.getItem('jb_debug') === '1'
 * Enable in browser console: localStorage.setItem('jb_debug', '1')
 * Disable:                    localStorage.removeItem('jb_debug')
 *
 * Never changes core logic. All calls are fire-and-forget.
 */

const PREFIX = "[JB-DEBUG]";

function isEnabled(): boolean {
  try {
    return localStorage.getItem("jb_debug") === "1";
  } catch {
    return false;
  }
}

/** Log a BP write event (lesson, quiz, easter egg, etc.) */
export function debugBPWrite(
  id: string,
  amount: number,
  totalAfter: number,
): void {
  if (!isEnabled()) return;
  console.log(
    `${PREFIX} BP_WRITE  id=${id}  amount=+${amount}  total=${totalAfter}  ts=${Date.now()}`,
  );
}

/** Log a leaderboard fetch attempt and result */
export function debugLeaderboardFetch(
  type: "allTime" | "monthly",
  month?: number,
  year?: number,
  resultCount?: number,
  error?: unknown,
): void {
  if (!isEnabled()) return;
  if (error) {
    console.warn(
      `${PREFIX} LEADERBOARD_FETCH  type=${type}  month=${month}/${year}  ERROR:`,
      error,
    );
  } else {
    console.log(
      `${PREFIX} LEADERBOARD_FETCH  type=${type}  month=${month ?? "-"}/${year ?? "-"}  rows=${resultCount ?? 0}`,
    );
  }
}

/** Log a BP sync attempt (localStorage → canister) */
export function debugBPSync(
  localBP: number,
  canisterBP: number,
  finalBP: number,
  monthlyBP: number,
  error?: unknown,
): void {
  if (!isEnabled()) return;
  if (error) {
    console.warn(
      `${PREFIX} BP_SYNC  local=${localBP}  canister=${canisterBP}  ERROR:`,
      error,
    );
  } else {
    console.log(
      `${PREFIX} BP_SYNC  local=${localBP}  canister=${canisterBP}  final=${finalBP}  monthly=${monthlyBP}`,
    );
  }
}

/** Log a display name change attempt and result */
export function debugNameChange(
  newName: string,
  result: string,
  changesRemaining?: number,
  error?: unknown,
): void {
  if (!isEnabled()) return;
  if (error) {
    console.warn(`${PREFIX} NAME_CHANGE  name="${newName}"  ERROR:`, error);
  } else {
    console.log(
      `${PREFIX} NAME_CHANGE  name="${newName}"  result=${result}  remaining=${changesRemaining ?? "?"}`,
    );
  }
}

/** Log actor readiness state on leaderboard load */
export function debugActorReady(
  actorPresent: boolean,
  actorFetching: boolean,
): void {
  if (!isEnabled()) return;
  console.log(
    `${PREFIX} ACTOR_READY  present=${actorPresent}  fetching=${actorFetching}`,
  );
}
