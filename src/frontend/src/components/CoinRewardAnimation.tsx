import { Coins } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CoinRewardAnimationProps {
  amount: number;
  onComplete?: () => void;
}

export function CoinRewardAnimation({
  amount,
  onComplete,
}: CoinRewardAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  const isPositive = amount >= 0;

  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-4 fade-in duration-300 bg-card border-amber-500/40">
      <Coins
        className={`w-5 h-5 shrink-0 ${isPositive ? "text-amber-500" : "text-destructive"}`}
      />
      <span
        className={`font-bold text-sm ${isPositive ? "text-amber-600 dark:text-amber-400" : "text-destructive"}`}
      >
        {isPositive ? "+" : ""}
        {amount} Bear Points
      </span>
    </div>
  );
}

/**
 * Global listener component — mount once at app root level.
 * Listens for 'bear-points-awarded' custom events and renders stacked toasts.
 */
export function BearPointsToastListener() {
  const [toasts, setToasts] = useState<Array<{ id: number; amount: number }>>(
    [],
  );
  const counterRef = React.useRef(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ amount: number; source: string }>)
        .detail;
      const id = ++counterRef.current;
      setToasts((prev) => [...prev, { id, amount: detail.amount }]);
    };

    window.addEventListener("bear-points-awarded", handler);
    return () => window.removeEventListener("bear-points-awarded", handler);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <CoinRewardAnimation
          key={toast.id}
          amount={toast.amount}
          onComplete={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default CoinRewardAnimation;
