// Testing unlock configuration
// Set VITE_TESTING_UNLOCK_ALL_LESSONS=true in your .env to enable testing mode
// This bypasses lesson gating and allows all lessons to be accessible for testing

export const TESTING_UNLOCK_ENABLED =
  import.meta.env.VITE_TESTING_UNLOCK_ALL_LESSONS === "true";
