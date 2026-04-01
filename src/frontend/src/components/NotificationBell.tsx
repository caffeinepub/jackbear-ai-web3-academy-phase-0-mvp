import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  type AppNotification,
  addNotification,
  getNotifications,
  markAllRead,
} from "../additions/notificationStore";

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(() => {
    setNotifications(getNotifications().slice(0, 10));
  }, []);

  useEffect(() => {
    refresh();

    const handleBP = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const amount = detail?.amount ?? detail?.bp ?? "";
      const rawSource: string | undefined = detail?.source;
      const sourceLabel =
        rawSource === "lesson"
          ? "Lesson"
          : rawSource === "quiz"
            ? "Quiz"
            : rawSource === "quest"
              ? "Quest"
              : undefined;
      const message = amount
        ? `+${amount} BP awarded${sourceLabel ? ` · ${sourceLabel}` : ""}`
        : "Bear Points awarded";
      addNotification({
        type: "bp_award",
        title: "Bear Points Earned",
        message,
        source: sourceLabel,
      });
      refresh();
    };

    const handleEgg = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      addNotification({
        type: "egg_earned",
        title: "Easter Egg Found!",
        message:
          detail?.message ?? detail?.name ?? "You found a hidden Easter Egg!",
      });
      refresh();
    };

    window.addEventListener("bear-points-awarded", handleBP);
    window.addEventListener("additions:egg-awarded", handleEgg);

    return () => {
      window.removeEventListener("bear-points-awarded", handleBP);
      window.removeEventListener("additions:egg-awarded", handleEgg);
    };
  }, [refresh]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    markAllRead();
    refresh();
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) refresh();
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-ocid="notification.bell_button"
          className="relative h-9 w-9 flex items-center justify-center rounded-md text-foreground/80 hover:text-primary hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-[0_0_6px_hsl(var(--primary)/0.7)]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0 overflow-hidden"
        data-ocid="notification.panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
          <span className="text-sm font-semibold text-foreground">
            Notifications
          </span>
          {notifications.length > 0 && (
            <button
              type="button"
              data-ocid="notification.mark_read_button"
              onClick={handleMarkAllRead}
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Body */}
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.map((n, idx) => (
              <DropdownMenuItem
                key={n.id}
                data-ocid={`notification.item.${idx + 1}`}
                className="flex flex-col items-start gap-0.5 px-4 py-3 cursor-default focus:bg-accent/50 border-b border-border/20 last:border-0"
              >
                <div className="flex items-center justify-between w-full gap-2">
                  <span
                    className={`text-sm font-medium leading-snug ${
                      !n.read ? "text-foreground" : "text-foreground/70"
                    }`}
                  >
                    {!n.read && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1.5 mb-0.5 shadow-[0_0_4px_hsl(var(--primary)/0.8)]" />
                    )}
                    {n.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground shrink-0">
                    {timeAgo(n.timestamp)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground leading-snug">
                  {n.message}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
