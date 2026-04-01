const PUSH_CONSENT_KEY = "jb_push_consent";
const PUSH_DISMISSED_KEY = "jb_push_dismissed";

export function isPushEnabled(): boolean {
  if (typeof window === "undefined" || !("Notification" in window))
    return false;
  return (
    Notification.permission === "granted" &&
    localStorage.getItem(PUSH_CONSENT_KEY) === "true"
  );
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window))
    return false;
  const permission = await Notification.requestPermission();
  const granted = permission === "granted";
  localStorage.setItem(PUSH_CONSENT_KEY, granted ? "true" : "false");
  return granted;
}

export function scheduleStreakReminder(currentStreak: number): void {
  if (!isPushEnabled()) return;

  const existingId = localStorage.getItem("jb_streak_timeout_id");
  if (existingId) {
    clearTimeout(Number(existingId));
  }

  const message =
    currentStreak === 6
      ? "Day 6 streak — log in tomorrow for your 7-day streak bonus! 🐻"
      : "Keep your JackBear.ai streak alive!";

  const timeoutMs = 20 * 60 * 60 * 1000; // 20 hours
  const id = window.setTimeout(() => {
    new Notification("JackBear.ai Streak Reminder", {
      body: message,
      icon: "/jbailogo.png",
    });
    localStorage.removeItem("jb_streak_timeout_id");
  }, timeoutMs);

  localStorage.setItem("jb_streak_timeout_id", String(id));
}

export function notifyWorldUnlock(worldName: string): void {
  if (!isPushEnabled()) return;
  new Notification("JackBear.ai — World Unlocked!", {
    body: `World unlocked: ${worldName} is now available on JackBear.ai`,
    icon: "/jbailogo.png",
  });
}

export function notifyBPMilestone(totalBP: number): void {
  if (!isPushEnabled()) return;
  if (totalBP > 0 && totalBP % 100 === 0) {
    new Notification("JackBear.ai — Bear Points Milestone!", {
      body: `You've earned ${totalBP} Bear Points on JackBear.ai!`,
      icon: "/jbailogo.png",
    });
  }
}

export function isDismissed(): boolean {
  return localStorage.getItem(PUSH_DISMISSED_KEY) === "true";
}

export function dismissBanner(): void {
  localStorage.setItem(PUSH_DISMISSED_KEY, "true");
}
