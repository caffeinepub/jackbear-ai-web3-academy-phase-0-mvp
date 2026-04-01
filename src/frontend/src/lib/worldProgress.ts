/**
 * World progression utilities.
 *
 * Unlock rules (attempt-only, no pass/fail gating):
 *  - A lesson is unlocked once it has been attempted at least once (attempted === true).
 *  - A world is unlocked once every lesson in it has been attempted at least once.
 *  - The Boss Quiz is available once every lesson in the world has been attempted at least once.
 *  - Boss Quiz attempts also count toward world unlock.
 *  - None of these states ever revert based on score or pass/fail outcome.
 */

import type { LessonProgress } from "../backend";

// ─── Types ───────────────────────────────────────────────────────────────────

export type LessonMeta = {
  id: string;
  title: string;
};

export type WorldMeta = {
  id: string;
  title: string;
  lessons: LessonMeta[];
};

export type NextAction =
  | { type: "lesson"; worldId: string; lessonId: string; lessonTitle: string }
  | { type: "boss"; worldId: string; lessonTitle: string }
  | { type: "world_complete" };

// ─── Core helpers ─────────────────────────────────────────────────────────────

/**
 * Returns true if the lesson has been attempted at least once.
 * Once attempted, a lesson is permanently unlocked — no re-locking ever.
 */
export function isLessonUnlockedInWorld(
  lessonId: string,
  progress: LessonProgress[],
): boolean {
  const entry = progress.find((p) => p.lessonId === lessonId);
  if (!entry) return false;
  // Attempted OR unlocked flag from backend — either is sufficient
  return entry.attempted || entry.unlocked;
}

/**
 * Returns true once every lesson in the world has at least one attempt recorded.
 * Pass/fail outcome is irrelevant.
 */
export function isWorldUnlocked(
  world: WorldMeta,
  progress: LessonProgress[],
): boolean {
  if (world.lessons.length === 0) return false;
  return world.lessons.every((lesson) =>
    isLessonUnlockedInWorld(lesson.id, progress),
  );
}

/**
 * Returns true once every lesson in the world has been attempted at least once.
 * The Boss Quiz becomes available at this point, regardless of scores.
 */
export function isBossAvailable(
  world: WorldMeta,
  progress: LessonProgress[],
): boolean {
  return isWorldUnlocked(world, progress);
}

/**
 * Legacy alias kept for backward compatibility.
 */
export function isBossQuizUnlocked(
  world: WorldMeta,
  progress: LessonProgress[],
): boolean {
  return isBossAvailable(world, progress);
}

/**
 * Returns true if the boss quiz for this world has been attempted.
 * Derived from backend progress data (lessonAttempts["boss-<worldId>"]).
 * Pass the full progress array from useGetLessonProgress("all").
 */
export function isBossCompleted(
  worldId: string | number,
  progress: LessonProgress[] = [],
): boolean {
  const bossId = `boss-${String(worldId)}`;
  return progress.some((p) => p.lessonId === bossId && p.attempted);
}

/**
 * Legacy alias for isBossCompleted.
 */
export function hasMegaQuizBeenAttempted(
  worldId: string | number,
  progress: LessonProgress[] = [],
): boolean {
  return isBossCompleted(worldId, progress);
}

// ─── Next action finder ───────────────────────────────────────────────────────

/**
 * Determines the recommended next action for a learner given the current
 * world metadata and progress snapshot.
 */
export function findNextAction(
  worlds: WorldMeta[],
  allProgress: LessonProgress[],
): NextAction {
  for (const world of worlds) {
    for (const lesson of world.lessons) {
      const entry = allProgress.find((p) => p.lessonId === lesson.id);
      if (!entry || !entry.attempted) {
        return {
          type: "lesson",
          worldId: world.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        };
      }
    }

    // All lessons attempted — check boss
    if (!isBossCompleted(world.id, allProgress)) {
      return {
        type: "boss",
        worldId: world.id,
        lessonTitle: `${world.title} — Boss Quiz`,
      };
    }
  }

  return { type: "world_complete" };
}
