/**
 * useSovereignMode
 *
 * Detects when all 5 Intelligence modules are completed (same threshold used
 * by VerifiableIntelligencePage: each module requires >= 3 lessons attempted).
 *
 * When complete:
 * - writes jb_ui_mode = "sovereign" to localStorage
 * - returns isSovereign: true
 *
 * This is a purely visual-state hook. No backend calls, no reward logic.
 */

import { useEffect, useState } from "react";

const SOVEREIGN_LS_KEY = "jb_ui_mode";
const SOVEREIGN_VALUE = "sovereign";

const MODULE_LESSON_IDS: Record<string, string[]> = {
  "mod-01": [
    "vil-01",
    "vil-02",
    "vil-03",
    "vil-04",
    "vil-05",
    "vil-06",
    "vil-07",
    "vil-08",
    "vil-09",
    "vil-10",
  ],
  "mod-02": [
    "ags-01",
    "ags-02",
    "ags-03",
    "ags-04",
    "ags-05",
    "ags-06",
    "ags-07",
    "ags-08",
    "ags-09",
    "ags-10",
  ],
  "mod-03": [
    "aut-01",
    "aut-02",
    "aut-03",
    "aut-04",
    "aut-05",
    "aut-06",
    "aut-07",
    "aut-08",
    "aut-09",
    "aut-10",
  ],
  "mod-04": [
    "aec-01",
    "aec-02",
    "aec-03",
    "aec-04",
    "aec-05",
    "aec-06",
    "aec-07",
    "aec-08",
    "aec-09",
    "aec-10",
  ],
  "mod-05": [
    "sov-01",
    "sov-02",
    "sov-03",
    "sov-04",
    "sov-05",
    "sov-06",
    "sov-07",
    "sov-08",
    "sov-09",
    "sov-10",
  ],
};

const MODULE_UNLOCK_THRESHOLD = 3;

function readLessonProgress(): Record<string, { attempted?: boolean }> {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function isModuleComplete(
  ids: string[],
  progress: Record<string, { attempted?: boolean }>,
): boolean {
  const count = ids.filter((id) => progress[id]?.attempted === true).length;
  return count >= MODULE_UNLOCK_THRESHOLD;
}

function computeSovereign(): boolean {
  // Fast-path: already stored
  if (localStorage.getItem(SOVEREIGN_LS_KEY) === SOVEREIGN_VALUE) return true;

  const progress = readLessonProgress();
  const allComplete = Object.values(MODULE_LESSON_IDS).every((ids) =>
    isModuleComplete(ids, progress),
  );

  if (allComplete) {
    localStorage.setItem(SOVEREIGN_LS_KEY, SOVEREIGN_VALUE);
  }

  return allComplete;
}

export function useSovereignMode(): boolean {
  const [isSovereign, setIsSovereign] = useState<boolean>(() =>
    computeSovereign(),
  );

  useEffect(() => {
    if (isSovereign) return;

    // Re-check when storage events fire (e.g. lesson completed in another tab
    // or right after a lesson modal closes via jb:lesson-progress-updated)
    function recheck() {
      if (computeSovereign()) setIsSovereign(true);
    }

    window.addEventListener("storage", recheck);
    window.addEventListener("jb:lesson-progress-updated", recheck);
    // Also poll lightly once per second until achieved, then stop
    const interval = setInterval(recheck, 1000);

    return () => {
      window.removeEventListener("storage", recheck);
      window.removeEventListener("jb:lesson-progress-updated", recheck);
      clearInterval(interval);
    };
  }, [isSovereign]);

  return isSovereign;
}
