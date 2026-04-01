/**
 * Easter Egg ID Constants
 *
 * Single source of truth for all Easter egg IDs used across
 * registry, listener, and routing to prevent drift.
 *
 * DELTA: New file - centralized ID constants
 * SCOPE: No impact on existing systems
 */

export const EASTER_EGG_IDS = {
  KONAMI_CODE: "konami-code",
  LOGO_CLICK_7X: "logo-click-7x",
  INFINITY_HOVER: "infinity-hover",
  ZERO_SCORE_SUBMIT: "zero-score-submit",
  TRIPLE_QUIZ_RAPID: "triple-quiz-rapid",
  FOOTER_TRIGGER: "footer-trigger",
  HIDDEN_VAULT: "hidden-vault",
  STREAK_7_DAY: "streak-7-day",
  BONUS_WORLD_REVEAL: "bonus-world-reveal",
  WORLD_8_COMPLETE: "world-8-complete",
} as const;

export type EasterEggId = (typeof EASTER_EGG_IDS)[keyof typeof EASTER_EGG_IDS];
