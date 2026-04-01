import { Badge } from "@/components/ui/badge";
import type { MasteryTier } from "@/types/leaderboard";
import { Award } from "lucide-react";

interface MasteryTierBadgeProps {
  tier: MasteryTier;
  size?: "sm" | "md" | "lg";
}

const TIER_CONFIG: Record<MasteryTier, { label: string; className: string }> = {
  Gold: {
    label: "Gold",
    className:
      "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40",
  },
  Silver: {
    label: "Silver",
    className:
      "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/40",
  },
  Bronze: {
    label: "Bronze",
    className:
      "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/40",
  },
};

export function MasteryTierBadge({ tier, size = "md" }: MasteryTierBadgeProps) {
  const config = TIER_CONFIG[tier];
  const iconSize =
    size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${textSize} font-semibold`}
    >
      <Award className={`${iconSize} mr-1`} />
      {config.label}
    </Badge>
  );
}
