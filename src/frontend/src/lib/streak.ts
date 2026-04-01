export interface StreakStatus {
  currentStreak: number;
  isAtRisk: boolean;
  hoursUntilReset: number;
  minutesUntilReset: number;
  countdownText: string;
}

const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;
const MILLISECONDS_PER_MINUTE = 60000;

export function getStreakStatus(
  lastActivityTime: bigint,
  currentStreak: number,
): StreakStatus {
  const now = Date.now();
  const lastActivity = Number(lastActivityTime) / 1000000; // Convert nanoseconds to milliseconds

  const timeSinceActivity = now - lastActivity;
  const hoursInactive = timeSinceActivity / MILLISECONDS_PER_HOUR;

  // Streak is at risk if no activity in last 18 hours (6 hours before 24h deadline)
  const isAtRisk = hoursInactive >= 18;

  // Calculate time until streak resets (24 hours from last activity)
  const timeUntilReset = MILLISECONDS_PER_DAY - timeSinceActivity;
  const hoursUntilReset = Math.floor(timeUntilReset / MILLISECONDS_PER_HOUR);
  const minutesUntilReset = Math.floor(
    (timeUntilReset % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE,
  );

  let countdownText = "";
  if (timeUntilReset > 0) {
    if (hoursUntilReset > 0) {
      countdownText = `${hoursUntilReset}h ${minutesUntilReset}m remaining`;
    } else {
      countdownText = `${minutesUntilReset}m remaining`;
    }
  } else {
    countdownText = "Streak expired";
  }

  return {
    currentStreak,
    isAtRisk,
    hoursUntilReset,
    minutesUntilReset,
    countdownText,
  };
}

export function shouldShowStreakWarning(streakStatus: StreakStatus): boolean {
  return streakStatus.isAtRisk && streakStatus.hoursUntilReset > 0;
}
