import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface AnimatedXPBarProps {
  currentXP: number;
  maxXP: number;
  showLabel?: boolean;
}

export function AnimatedXPBar({
  currentXP,
  maxXP,
  showLabel = true,
}: AnimatedXPBarProps) {
  const [displayXP, setDisplayXP] = useState(0);
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = currentXP / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, currentXP);
      setDisplayXP(Math.floor(current));

      if (step >= steps || current >= currentXP) {
        clearInterval(timer);
        setDisplayXP(currentXP);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [currentXP]);

  return (
    <div className="space-y-1">
      <Progress
        value={percentage}
        className="h-2 bg-muted/30 border border-primary/20 shadow-inner transition-all duration-1000 ease-out"
      />
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="font-medium tabular-nums">
            {displayXP.toLocaleString()} BP
          </span>
          <span className="tabular-nums">{maxXP.toLocaleString()} BP</span>
        </div>
      )}
    </div>
  );
}
