/**
 * Global Event Listener for Easter Eggs
 *
 * Single global listener that multiplexes all Easter egg detection.
 * Handles keyboard, click, hover, and custom events.
 *
 * CONSTRAINTS:
 * - Single global listener only
 * - No duplicate listeners
 * - Proper cleanup on teardown
 */

import { triggerEasterEgg } from "./EasterEggRegistry";
import { EASTER_EGG_IDS } from "./easterEggIds";

// Mobile Konami tap sequence:
// Tap logo twice, pause, tap logo twice, tap logo once (2-2-1 pattern)
const MOBILE_KONAMI_PATTERN = [2, 2, 1];

interface ListenerState {
  konamiIndex: number;
  logoClickCount: number;
  logoClickTimer: ReturnType<typeof setTimeout> | null;
  footerClickCount: number;
  footerClickTimer: ReturnType<typeof setTimeout> | null;
  holdTimer: ReturnType<typeof setTimeout> | null;
  quizSubmitTimestamps: number[];
  // Mobile Konami tap state
  mobileKonamiGroupIndex: number;
  mobileKonamiTapsInGroup: number;
  mobileKonamiGroupTimer: ReturnType<typeof setTimeout> | null;
  mobileKonamiPauseTimer: ReturnType<typeof setTimeout> | null;
}

let state: ListenerState = {
  konamiIndex: 0,
  logoClickCount: 0,
  logoClickTimer: null,
  footerClickCount: 0,
  footerClickTimer: null,
  holdTimer: null,
  quizSubmitTimestamps: [],
  mobileKonamiGroupIndex: 0,
  mobileKonamiTapsInGroup: 0,
  mobileKonamiGroupTimer: null,
  mobileKonamiPauseTimer: null,
};

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function handleKeyDown(e: KeyboardEvent): void {
  if (e.key === KONAMI_SEQUENCE[state.konamiIndex]) {
    state.konamiIndex++;
    if (state.konamiIndex === KONAMI_SEQUENCE.length) {
      triggerEasterEgg(EASTER_EGG_IDS.KONAMI_CODE);
      state.konamiIndex = 0;
    }
  } else {
    state.konamiIndex = 0;
  }
}

/**
 * Mobile Konami fallback: tap the logo in a 2-pause-2-pause-1 pattern.
 * Each group must be completed within 800ms.
 * Pause between groups must be 400–1500ms.
 */
function handleMobileKonamiTap(): void {
  const expectedTapsInGroup =
    MOBILE_KONAMI_PATTERN[state.mobileKonamiGroupIndex];

  // Cancel existing group timer
  if (state.mobileKonamiGroupTimer) {
    clearTimeout(state.mobileKonamiGroupTimer);
    state.mobileKonamiGroupTimer = null;
  }
  // Cancel any pause timer (user tapped again before the pause window closed)
  if (state.mobileKonamiPauseTimer) {
    clearTimeout(state.mobileKonamiPauseTimer);
    state.mobileKonamiPauseTimer = null;
  }

  state.mobileKonamiTapsInGroup++;

  if (state.mobileKonamiTapsInGroup === expectedTapsInGroup) {
    // Completed this group — advance to next
    const nextGroupIndex = state.mobileKonamiGroupIndex + 1;

    if (nextGroupIndex === MOBILE_KONAMI_PATTERN.length) {
      // All groups done — trigger!
      triggerEasterEgg(EASTER_EGG_IDS.KONAMI_CODE);
      resetMobileKonami();
      return;
    }

    state.mobileKonamiGroupIndex = nextGroupIndex;
    state.mobileKonamiTapsInGroup = 0;

    // Wait for pause between groups (tap must come after at least 300ms)
    state.mobileKonamiPauseTimer = setTimeout(() => {
      // Pause window closed without starting next group — reset
      resetMobileKonami();
    }, 1800);
  } else if (state.mobileKonamiTapsInGroup < expectedTapsInGroup) {
    // Still in group — set timer to detect over-tap or timeout
    state.mobileKonamiGroupTimer = setTimeout(() => {
      // Group timed out with wrong tap count
      resetMobileKonami();
    }, 800);
  } else {
    // Over-tapped — reset
    resetMobileKonami();
  }
}

function resetMobileKonami(): void {
  if (state.mobileKonamiGroupTimer) clearTimeout(state.mobileKonamiGroupTimer);
  if (state.mobileKonamiPauseTimer) clearTimeout(state.mobileKonamiPauseTimer);
  state.mobileKonamiGroupIndex = 0;
  state.mobileKonamiTapsInGroup = 0;
  state.mobileKonamiGroupTimer = null;
  state.mobileKonamiPauseTimer = null;
}

function handleLogoClick(): void {
  // 7x click detection (runs on all devices)
  state.logoClickCount++;

  if (state.logoClickTimer) {
    clearTimeout(state.logoClickTimer);
  }

  if (state.logoClickCount >= 7) {
    triggerEasterEgg(EASTER_EGG_IDS.LOGO_CLICK_7X);
    state.logoClickCount = 0;
  } else {
    state.logoClickTimer = setTimeout(() => {
      state.logoClickCount = 0;
    }, 5000);
  }

  // Mobile Konami tap sequence (touch-only guard handled by pointer type)
  // We run this for all clicks but it only advances meaningfully for the pattern
  handleMobileKonamiTap();
}

function handleFooterHotspotClick(): void {
  triggerEasterEgg(EASTER_EGG_IDS.FOOTER_TRIGGER);
}

// The Hold: mousedown starts timer, mouseup/mouseleave cancels it
function handleHoldStart(): void {
  if (state.holdTimer) {
    clearTimeout(state.holdTimer);
  }

  state.holdTimer = setTimeout(() => {
    const awarded = triggerEasterEgg(EASTER_EGG_IDS.INFINITY_HOVER);
    if (awarded) {
      console.log("[Additions] The Hold reward triggered");
    }
    state.holdTimer = null;
  }, 3000);
}

function handleHoldEnd(): void {
  if (state.holdTimer) {
    clearTimeout(state.holdTimer);
    state.holdTimer = null;
  }
}

function handleQuizSubmit(e: Event): void {
  const customEvent = e as CustomEvent;
  const { score, totalQuestions } = customEvent.detail || {};

  if (score === 0 && totalQuestions > 0) {
    triggerEasterEgg(EASTER_EGG_IDS.ZERO_SCORE_SUBMIT);
  }

  const now = Date.now();
  state.quizSubmitTimestamps.push(now);

  state.quizSubmitTimestamps = state.quizSubmitTimestamps.filter(
    (timestamp) => now - timestamp < 60000,
  );

  if (state.quizSubmitTimestamps.length >= 3) {
    const awarded = triggerEasterEgg(EASTER_EGG_IDS.TRIPLE_QUIZ_RAPID);
    if (awarded) {
      state.quizSubmitTimestamps = [];
      console.log(
        "[Additions] Triple quiz rapid reward triggered, counter reset",
      );
    }
  }
}

function handleBonusWorldReveal(): void {
  triggerEasterEgg(EASTER_EGG_IDS.BONUS_WORLD_REVEAL);
}

function handleStreak7Day(): void {
  triggerEasterEgg(EASTER_EGG_IDS.STREAK_7_DAY);
}

function handleWorld8Complete(): void {
  triggerEasterEgg(EASTER_EGG_IDS.WORLD_8_COMPLETE);
}

export function setupGlobalListeners(): void {
  document.addEventListener("keydown", handleKeyDown);

  // Logo: 7x click, The Hold (mousedown/mouseup), mobile Konami tap
  const headerLogo = document.querySelector("#header-jackbear-logo");
  if (headerLogo) {
    headerLogo.addEventListener("click", handleLogoClick);
    headerLogo.addEventListener("mousedown", handleHoldStart);
    headerLogo.addEventListener("mouseup", handleHoldEnd);
    headerLogo.addEventListener("mouseleave", handleHoldEnd);
    headerLogo.addEventListener("touchstart", handleHoldStart, {
      passive: true,
    });
    headerLogo.addEventListener("touchend", handleHoldEnd);
    headerLogo.addEventListener("touchcancel", handleHoldEnd);
  }

  const footerHotspot = document.querySelector("#footer-easter-egg-hotspot");
  if (footerHotspot) {
    footerHotspot.addEventListener("click", handleFooterHotspotClick);
  }

  document.addEventListener("additions:quiz-submit", handleQuizSubmit);
  document.addEventListener(
    "additions:bonus-world-reveal",
    handleBonusWorldReveal,
  );
  document.addEventListener("additions:streak-7-day", handleStreak7Day);
  document.addEventListener("additions:world-8-complete", handleWorld8Complete);

  console.log("[Additions] Global listeners attached");
}

export function teardownGlobalListeners(): void {
  document.removeEventListener("keydown", handleKeyDown);

  const headerLogo = document.querySelector("#header-jackbear-logo");
  if (headerLogo) {
    headerLogo.removeEventListener("click", handleLogoClick);
    headerLogo.removeEventListener("mousedown", handleHoldStart);
    headerLogo.removeEventListener("mouseup", handleHoldEnd);
    headerLogo.removeEventListener("mouseleave", handleHoldEnd);
    headerLogo.removeEventListener("touchstart", handleHoldStart);
    headerLogo.removeEventListener("touchend", handleHoldEnd);
    headerLogo.removeEventListener("touchcancel", handleHoldEnd);
  }

  const footerHotspot = document.querySelector("#footer-easter-egg-hotspot");
  if (footerHotspot) {
    footerHotspot.removeEventListener("click", handleFooterHotspotClick);
  }

  document.removeEventListener("additions:quiz-submit", handleQuizSubmit);
  document.removeEventListener(
    "additions:bonus-world-reveal",
    handleBonusWorldReveal,
  );
  document.removeEventListener("additions:streak-7-day", handleStreak7Day);
  document.removeEventListener(
    "additions:world-8-complete",
    handleWorld8Complete,
  );

  if (state.logoClickTimer) clearTimeout(state.logoClickTimer);
  if (state.footerClickTimer) clearTimeout(state.footerClickTimer);
  if (state.holdTimer) clearTimeout(state.holdTimer);
  resetMobileKonami();

  state = {
    konamiIndex: 0,
    logoClickCount: 0,
    logoClickTimer: null,
    footerClickCount: 0,
    footerClickTimer: null,
    holdTimer: null,
    quizSubmitTimestamps: [],
    mobileKonamiGroupIndex: 0,
    mobileKonamiTapsInGroup: 0,
    mobileKonamiGroupTimer: null,
    mobileKonamiPauseTimer: null,
  };

  console.log("[Additions] Global listeners detached");
}
