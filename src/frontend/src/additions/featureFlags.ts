/**
 * Additions Layer Feature Flags
 *
 * Controls all Additions Layer behavior including Easter eggs and reward engine.
 * Default state: ENABLED (production)
 *
 * DELTA: Updated to default ON for production Easter Egg launch
 * SCOPE: No impact on existing systems
 */

export interface AdditionsFeatureFlags {
  enabled: boolean;
  easterEggsEnabled: boolean;
  rewardEngineEnabled: boolean;
}

// Default state: ALL ENABLED (production)
const DEFAULT_FLAGS: AdditionsFeatureFlags = {
  enabled: true,
  easterEggsEnabled: true,
  rewardEngineEnabled: true,
};

/**
 * Get current Additions Layer feature flags
 * Returns ENABLED by default unless explicitly overridden in DEV
 */
export function getAdditionsFlags(): AdditionsFeatureFlags {
  // Check localStorage for dev/testing overrides only
  if (typeof window !== "undefined" && import.meta.env.DEV) {
    try {
      const override = localStorage.getItem("additions_flags_override");
      if (override) {
        return { ...DEFAULT_FLAGS, ...JSON.parse(override) };
      }
    } catch (error) {
      // Invalid override or localStorage unavailable, return defaults
      console.warn("Failed to read feature flag overrides:", error);
    }
  }

  return DEFAULT_FLAGS;
}

/**
 * Check if Additions Layer is enabled
 * Returns true by default
 */
export function isAdditionsEnabled(): boolean {
  try {
    return getAdditionsFlags().enabled;
  } catch (error) {
    console.warn("Failed to check if additions enabled:", error);
    return true; // Default to enabled
  }
}

/**
 * Check if Easter eggs are enabled
 * Returns true by default
 */
export function areEasterEggsEnabled(): boolean {
  try {
    const flags = getAdditionsFlags();
    return flags.enabled && flags.easterEggsEnabled;
  } catch (error) {
    console.warn("Failed to check if Easter eggs enabled:", error);
    return true; // Default to enabled
  }
}

/**
 * Check if reward engine is enabled
 * Returns true by default
 */
export function isRewardEngineEnabled(): boolean {
  try {
    const flags = getAdditionsFlags();
    return flags.enabled && flags.rewardEngineEnabled;
  } catch (error) {
    console.warn("Failed to check if reward engine enabled:", error);
    return true; // Default to enabled
  }
}
