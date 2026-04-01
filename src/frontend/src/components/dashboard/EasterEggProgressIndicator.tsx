import { EASTER_EGG_REGISTRY } from "@/additions/EasterEggRegistry";
import { getAwardHistory } from "@/additions/rewardRules";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export function EasterEggProgressIndicator() {
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const totalEggs = Object.keys(EASTER_EGG_REGISTRY).length;

  useEffect(() => {
    const updateCount = () => {
      try {
        const awardHistory = getAwardHistory();
        const count = Object.keys(EASTER_EGG_REGISTRY).filter((eggId) =>
          awardHistory.some((entry) => entry.eventId === eggId),
        ).length;
        setDiscoveredCount(count);
      } catch {
        setDiscoveredCount(0);
      }
    };

    updateCount();

    window.addEventListener("bear-points-awarded", updateCount);
    window.addEventListener("focus", updateCount);

    return () => {
      window.removeEventListener("bear-points-awarded", updateCount);
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  const percentage = totalEggs > 0 ? (discoveredCount / totalEggs) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          <span className="font-semibold">
            {discoveredCount} of {totalEggs} discovered
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
        {/* biome-ignore lint/a11y/useFocusableInteractive: progress bar is not interactive */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${discoveredCount} of ${totalEggs} Hidden Fragments discovered`}
        />
      </div>
    </div>
  );
}
