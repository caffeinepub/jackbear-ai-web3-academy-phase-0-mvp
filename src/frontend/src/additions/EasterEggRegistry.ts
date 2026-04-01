/**
 * Additions Layer Easter Egg Registry
 *
 * Single registry for all 9 Easter egg definitions.
 * Each egg has a stable ID and routes through awardReward() only.
 */

import { type AwardRewardEvent, awardReward } from "./awardReward";
import { EASTER_EGG_IDS, type EasterEggId } from "./easterEggIds";

export interface EasterEggDefinition {
  id: EasterEggId;
  name: string;
  description: string;
  rewardAmount: number;
  cooldownMs?: number;
  detectionType: "keyboard" | "click" | "hover" | "event" | "route";
  detectionMetadata?: Record<string, unknown>;
}

/**
 * Single registry containing all 9 required Easter eggs
 */
export const EASTER_EGG_REGISTRY: Record<EasterEggId, EasterEggDefinition> = {
  [EASTER_EGG_IDS.KONAMI_CODE]: {
    id: EASTER_EGG_IDS.KONAMI_CODE,
    name: "Legacy Sequence",
    description: "A sequence from another era. Still opens doors.",
    rewardAmount: 50,
    detectionType: "keyboard",
    detectionMetadata: {
      sequence: [
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
      ],
    },
  },

  [EASTER_EGG_IDS.LOGO_CLICK_7X]: {
    id: EASTER_EGG_IDS.LOGO_CLICK_7X,
    name: "The Persistent",
    description: "Some things respond only to repetition.",
    rewardAmount: 25,
    detectionType: "click",
    detectionMetadata: {
      targetSelector: "#header-jackbear-logo",
      clickCount: 7,
      timeWindow: 5000,
    },
  },

  [EASTER_EGG_IDS.INFINITY_HOVER]: {
    id: EASTER_EGG_IDS.INFINITY_HOVER,
    name: "The Hold",
    description: "Three seconds. Most people let go.",
    rewardAmount: 25,
    detectionType: "hover",
    detectionMetadata: {
      targetSelector: "#header-jackbear-logo",
      holdDuration: 3000,
    },
  },

  [EASTER_EGG_IDS.ZERO_SCORE_SUBMIT]: {
    id: EASTER_EGG_IDS.ZERO_SCORE_SUBMIT,
    name: "The Empty Answer",
    description: "Not all knowledge looks like knowledge.",
    rewardAmount: 25,
    detectionType: "event",
    detectionMetadata: {
      eventName: "quiz-zero-score",
    },
  },

  [EASTER_EGG_IDS.TRIPLE_QUIZ_RAPID]: {
    id: EASTER_EGG_IDS.TRIPLE_QUIZ_RAPID,
    name: "Velocity",
    description: "Speed, when intentional, gets noticed.",
    rewardAmount: 50,
    cooldownMs: 24 * 60 * 60 * 1000,
    detectionType: "event",
    detectionMetadata: {
      eventName: "quiz-rapid-submit",
      count: 3,
      timeWindow: 60000,
    },
  },

  [EASTER_EGG_IDS.FOOTER_TRIGGER]: {
    id: EASTER_EGG_IDS.FOOTER_TRIGGER,
    name: "The Blind Spot",
    description: "You looked where others don't.",
    rewardAmount: 25,
    detectionType: "click",
    detectionMetadata: {
      targetSelector: "#footer-easter-egg-hotspot",
      clickCount: 1,
    },
  },

  [EASTER_EGG_IDS.HIDDEN_VAULT]: {
    id: EASTER_EGG_IDS.HIDDEN_VAULT,
    name: "The Vault",
    description: "You typed a door that wasn't on the map.",
    rewardAmount: 100,
    detectionType: "route",
    detectionMetadata: {
      route: "/vault",
    },
  },

  [EASTER_EGG_IDS.STREAK_7_DAY]: {
    id: EASTER_EGG_IDS.STREAK_7_DAY,
    name: "The Seven",
    description: "Seven days. No gaps.",
    rewardAmount: 50,
    detectionType: "event",
    detectionMetadata: {
      eventName: "streak-7-day",
      threshold: 7,
    },
  },

  [EASTER_EGG_IDS.WORLD_8_COMPLETE]: {
    id: EASTER_EGG_IDS.WORLD_8_COMPLETE,
    name: "World 8.5 — The Verifiable Intelligence Layer",
    description: "You finished what most never start.",
    rewardAmount: 100,
    detectionType: "event",
    detectionMetadata: { eventName: "world-8-complete" },
  },

  [EASTER_EGG_IDS.BONUS_WORLD_REVEAL]: {
    id: EASTER_EGG_IDS.BONUS_WORLD_REVEAL,
    name: "Beyond the Boss",
    description: "Past the final exam is another door.",
    rewardAmount: 50,
    detectionType: "event",
    detectionMetadata: {
      eventName: "bonus-world-reveal",
    },
  },
};

/**
 * Award reward for an Easter egg discovery
 *
 * SINGLE EFFECT for all eggs: call awardReward() only
 *
 * @param eggId - Easter egg identifier
 * @returns true if awarded, false if duplicate or disabled
 */
export function triggerEasterEgg(eggId: EasterEggId): boolean {
  const egg = EASTER_EGG_REGISTRY[eggId];

  if (!egg) {
    console.warn(`[Additions] Unknown Easter egg: ${eggId}`);
    return false;
  }

  const event: AwardRewardEvent = {
    id: eggId,
    amount: egg.rewardAmount,
    source: "easterEgg",
    cooldownMs: egg.cooldownMs,
  };

  return awardReward(event);
}

/**
 * Get all Easter egg definitions
 */
export function getAllEasterEggs(): EasterEggDefinition[] {
  return Object.values(EASTER_EGG_REGISTRY);
}

/**
 * Get Easter egg definition by ID
 */
export function getEasterEgg(eggId: EasterEggId): EasterEggDefinition | null {
  return EASTER_EGG_REGISTRY[eggId] || null;
}
