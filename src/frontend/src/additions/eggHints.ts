/**
 * Easter Egg Hints
 *
 * Progressive hints per egg, based on login count.
 * Vague hint after 3 logins, specific hint after 7 logins.
 * Additive-only, no changes to existing logic.
 */

import { EASTER_EGG_IDS, type EasterEggId } from "./easterEggIds";

const LOGIN_COUNT_KEY = "jb_login_count";

export function getLoginCount(): number {
  try {
    const raw = localStorage.getItem(LOGIN_COUNT_KEY);
    return raw ? Number.parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementLoginCount(): void {
  try {
    const count = getLoginCount();
    localStorage.setItem(LOGIN_COUNT_KEY, String(count + 1));
  } catch {
    // ignore
  }
}

interface EggHints {
  vague: string; // shown after 3 logins
  specific: string; // shown after 7 logins
}

const EGG_HINTS: Record<EasterEggId, EggHints> = {
  [EASTER_EGG_IDS.KONAMI_CODE]: {
    vague: "Some sequences transcend their origins.",
    specific: "Thirty years old. Still works.",
  },
  [EASTER_EGG_IDS.LOGO_CLICK_7X]: {
    vague: "Not everything at the top is decoration.",
    specific: "Seven times, fast. The bear responds to persistence.",
  },
  [EASTER_EGG_IDS.INFINITY_HOVER]: {
    vague: "The patient find what others scroll past.",
    specific: "Hold your ground. Three seconds is enough.",
  },
  [EASTER_EGG_IDS.ZERO_SCORE_SUBMIT]: {
    vague: "The floor has its own rewards.",
    specific: "Answer nothing. Submit anyway.",
  },
  [EASTER_EGG_IDS.TRIPLE_QUIZ_RAPID]: {
    vague: "Some things only appear at velocity.",
    specific: "Three in a minute. The system notices.",
  },
  [EASTER_EGG_IDS.FOOTER_TRIGGER]: {
    vague: "Some things hide where no one scrolls.",
    specific: "The footer has a blind spot. Find it.",
  },
  [EASTER_EGG_IDS.HIDDEN_VAULT]: {
    vague: "The map is not the territory.",
    specific: "Type the door before it appears.",
  },
  [EASTER_EGG_IDS.STREAK_7_DAY]: {
    vague: "Show up. Then show up again.",
    specific: "Seven mornings. No exceptions.",
  },
  [EASTER_EGG_IDS.BONUS_WORLD_REVEAL]: {
    vague: "The curriculum ends. Something else begins.",
    specific: "The boss isn't the last door.",
  },
  [EASTER_EGG_IDS.WORLD_8_COMPLETE]: {
    vague: "Understanding everything is only the beginning.",
    specific: "Finish World 8. All of it.",
  },
};

/**
 * Get hint text for an undiscovered egg based on login count.
 * Returns null if logins < 3 (no hint yet).
 */
export function getEggHint(eggId: EasterEggId): string | null {
  const logins = getLoginCount();
  if (logins < 3) return null;
  const hints = EGG_HINTS[eggId];
  if (!hints) return null;
  if (logins >= 7) return hints.specific;
  return hints.vague;
}
