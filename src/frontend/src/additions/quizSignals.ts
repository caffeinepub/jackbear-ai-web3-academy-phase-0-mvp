/**
 * Quiz Submission Signals
 *
 * Small internal signaling layer for quiz submission events.
 * Allows AdditionsRoot to detect quiz submissions without
 * modifying lesson content or routing.
 */

export interface QuizSubmitSignal {
  lessonId: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
}

/**
 * Emit a quiz submission signal
 * Called from useQueries after quiz submission
 */
export function emitQuizSubmitSignal(signal: QuizSubmitSignal): void {
  if (typeof window === "undefined") {
    return;
  }

  const event = new CustomEvent("additions:quiz-submit", {
    detail: signal,
  });

  document.dispatchEvent(event);
}

/**
 * Emit a bonus world reveal signal
 * Called when World 6 boss quiz is submitted (pass or fail)
 */
export function emitBonusWorldRevealEvent(): void {
  if (typeof window === "undefined") {
    return;
  }

  // Dispatch on both document (for globalListener) and window (for CoursesPage listener)
  const event = new CustomEvent("additions:bonus-world-reveal", {
    detail: { timestamp: Date.now() },
  });

  document.dispatchEvent(event);
  window.dispatchEvent(event);
}

/**
 * Emit a 7-day streak signal
 * Called when user achieves 7-day streak
 */
export function emitStreak7DaySignal(): void {
  if (typeof window === "undefined") {
    return;
  }

  const event = new CustomEvent("additions:streak-7-day", {
    detail: { timestamp: Date.now() },
  });

  document.dispatchEvent(event);
}
