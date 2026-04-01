import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MasteryTier } from "@/types/mastery";
import { Award, Coins, Trophy, Zap } from "lucide-react";

interface BossRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  worldTitle: string;
  worldId: number;
  creditsEarned: number;
  xpEarned: number;
  masteryTier?: MasteryTier;
  onViewLeaderboard?: () => void;
}

const MASTERY_CONFIG: Record<
  MasteryTier,
  { label: string; color: string; bgColor: string }
> = {
  Gold: {
    label: "Gold Mastery",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/30",
  },
  Silver: {
    label: "Silver Mastery",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-500/10 border-slate-500/30",
  },
  Bronze: {
    label: "Bronze Mastery",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/30",
  },
  None: {
    label: "Mastery Pending",
    color: "text-muted-foreground",
    bgColor: "bg-muted/50 border-muted",
  },
};

export function BossRewardModal({
  isOpen,
  onClose,
  worldTitle,
  worldId: _worldId,
  creditsEarned,
  xpEarned,
  masteryTier = "None",
  onViewLeaderboard,
}: BossRewardModalProps) {
  const masteryConfig = MASTERY_CONFIG[masteryTier];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-glow-lg animate-in zoom-in duration-300">
            <Trophy className="h-10 w-10 text-primary-foreground" />
          </div>
          <DialogTitle className="text-center text-2xl font-display">
            Boss Defeated!
          </DialogTitle>
          <DialogDescription className="text-center">
            You have completed {worldTitle} and unlocked the next world
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  BEAR Credits
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-primary">
                +{creditsEarned}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">
                  XP Earned
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-accent">
                +{xpEarned}
              </p>
            </div>
          </div>

          {masteryTier !== "None" && (
            <div className={`p-4 rounded-lg border ${masteryConfig.bgColor}`}>
              <div className="flex items-center gap-3">
                <Award className={`h-6 w-6 ${masteryConfig.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Mastery Badge
                  </p>
                  <p
                    className={`text-lg font-display font-bold ${masteryConfig.color}`}
                  >
                    {masteryConfig.label}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 rounded-lg bg-muted/50 border border-muted">
            <p className="text-sm text-center text-muted-foreground">
              Continue your journey in the next world to earn more rewards
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={onClose} className="flex-1" size="lg">
            Continue Learning
          </Button>
          {onViewLeaderboard && (
            <Button
              onClick={onViewLeaderboard}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              View Leaderboard
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
