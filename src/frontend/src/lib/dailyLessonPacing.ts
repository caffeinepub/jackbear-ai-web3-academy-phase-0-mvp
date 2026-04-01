/**
 * Daily Lesson Pacing
 *
 * Tracks how many lessons have earned BP today and exposes helpers
 * for the soft pacing system (no hard lockouts).
 *
 * Storage: localStorage key jb_daily_bp_<YYYY-MM-DD>
 * Resets automatically the next calendar day.
 *
 * This is frontend-advisory only. The backend still awards BP for every
 * first lesson completion; this layer adds UI feedback to encourage
 * daily return habits without blocking learning.
 */

const DAILY_KEY_PREFIX = "jb_daily_bp_";

/** Full BP threshold per day (completions 1–3 are "full" day) */
export const DAILY_FULL_BP_THRESHOLD = 3;

/** Advisory reduced BP to display after threshold (50% of 10 BP) */
export const ADVISORY_REDUCED_BP = 5;

/** Normal lesson BP */
export const FULL_LESSON_BP = 10;

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${DAILY_KEY_PREFIX}${y}-${m}-${day}`;
}

/** Returns the number of BP-earning lesson completions recorded today */
export function getDailyBPLessons(): number {
  try {
    const raw = localStorage.getItem(todayKey());
    if (!raw) return 0;
    const n = Number.parseInt(raw, 10);
    return Number.isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

/** Records a BP-earning lesson completion for today; returns new count */
export function recordDailyBPLesson(): number {
  try {
    const count = getDailyBPLessons() + 1;
    localStorage.setItem(todayKey(), String(count));
    return count;
  } catch {
    return getDailyBPLessons() + 1;
  }
}

/** Returns true if the next lesson completion is within the full-BP window */
export function isWithinFullBPWindow(): boolean {
  return getDailyBPLessons() < DAILY_FULL_BP_THRESHOLD;
}

/** Returns how many full-BP lessons remain today */
export function fullBPLessonsRemaining(): number {
  return Math.max(0, DAILY_FULL_BP_THRESHOLD - getDailyBPLessons());
}
