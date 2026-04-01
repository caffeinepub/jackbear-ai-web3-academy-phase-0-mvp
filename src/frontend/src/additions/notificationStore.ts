export interface AppNotification {
  id: string;
  type: "bp_award" | "world_unlock" | "egg_earned" | "lesson_complete";
  title: string;
  message: string;
  source?: string;
  timestamp: number;
  read: boolean;
}

const KEY = "jb_notifications";
const MAX_ITEMS = 20;
const EXPIRE_MS = 7 * 24 * 60 * 60 * 1000;

function load(): AppNotification[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: AppNotification[] = JSON.parse(raw);
    const now = Date.now();
    return parsed.filter((n) => now - n.timestamp < EXPIRE_MS);
  } catch {
    return [];
  }
}

function save(notifications: AppNotification[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(notifications));
  } catch {
    // ignore quota errors
  }
}

export function addNotification(
  n: Omit<AppNotification, "id" | "timestamp" | "read">,
): void {
  const notifications = load();
  const newItem: AppNotification = {
    ...n,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    read: false,
  };
  const updated = [newItem, ...notifications].slice(0, MAX_ITEMS);
  save(updated);
}

export function getNotifications(): AppNotification[] {
  return load();
}

export function markAllRead(): void {
  const notifications = load().map((n) => ({ ...n, read: true }));
  save(notifications);
}

export function clearNotifications(): void {
  save([]);
}
