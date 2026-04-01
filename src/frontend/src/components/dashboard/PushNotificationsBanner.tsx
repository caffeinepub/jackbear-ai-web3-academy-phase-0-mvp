import {
  dismissBanner,
  isDismissed,
  requestNotificationPermission,
} from "@/additions/pushNotifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, X } from "lucide-react";
import { useState } from "react";

export default function PushNotificationsBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined" || !("Notification" in window))
      return false;
    if (Notification.permission === "granted") return false;
    if (isDismissed()) return false;
    return true;
  });
  const [success, setSuccess] = useState(false);

  if (!visible) return null;

  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setSuccess(true);
      setTimeout(() => setVisible(false), 2000);
    }
  };

  const handleDismiss = () => {
    dismissBanner();
    setVisible(false);
  };

  return (
    <Card
      className="border-primary/30 bg-primary/5 shadow-[0_0_18px_rgba(139,92,246,0.12)]"
      data-ocid="push_banner.card"
    >
      <CardContent className="py-3 px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-primary/15 flex-shrink-0">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            {success ? (
              <p className="text-sm font-medium text-primary">
                ✓ Notifications enabled! You'll get streak and unlock alerts.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enable streak reminders and world unlock alerts
              </p>
            )}
          </div>
          {!success && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                className="h-7 text-xs px-3"
                onClick={handleEnable}
                data-ocid="push_banner.primary_button"
              >
                Enable Notifications
              </Button>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
                data-ocid="push_banner.close_button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
