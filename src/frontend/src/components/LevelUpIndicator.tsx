import { Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

interface LevelUpIndicatorProps {
  level: number;
}

export function LevelUpIndicator({ level }: LevelUpIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: level is a prop that triggers re-animation on change
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 2800);
    return () => clearTimeout(timer);
  }, [level]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative animate-in zoom-in-95 fade-in duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-3xl animate-pulse" />
        <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/50 rounded-2xl p-8 shadow-glow-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 animate-pulse" />
              <Trophy className="relative h-16 w-16 text-amber-400 neon-glow animate-bounce" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-display font-bold glow-text">
                Level Up!
              </h2>
              <p className="text-5xl font-display font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Level {level}
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm">You're getting stronger!</span>
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
