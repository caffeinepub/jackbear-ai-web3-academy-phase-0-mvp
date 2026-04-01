import type { EasterEggId } from "@/additions/easterEggIds";
import { getEggHint } from "@/additions/eggHints";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveFragmentShareCard } from "@/lib/shareCardCanvas";
import {
  CheckCircle,
  Coins,
  Download,
  EyeOff,
  Flame,
  Gem,
  Lightbulb,
  Lock,
  Share2,
} from "lucide-react";

// Must match EasterEggCard.tsx canonical art assets
const FRAGMENT_LOCKED_SRC =
  "/assets/generated/hidden-fragment-locked-transparent.dim_128x128.png";
const FRAGMENT_UNLOCKED_SRC =
  "/assets/generated/hidden-fragment-unlocked.dim_128x128.png";

interface EasterEggDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  eggId: EasterEggId;
  name: string;
  description: string;
  rewardAmount: number;
  isDiscovered: boolean;
  lastDiscoveredAt?: number;
}

type Rarity = {
  label: string;
  flavor: string;
  colorClass: string;
  bgClass: string;
  icon: React.ReactNode;
};

function getRarity(rewardAmount: number): Rarity {
  if (rewardAmount >= 100) {
    return {
      label: "Legendary",
      flavor: "Few reach this.",
      colorClass: "text-orange-500",
      bgClass: "bg-orange-500/10 border-orange-500/20",
      icon: <Flame className="h-3 w-3" />,
    };
  }
  if (rewardAmount >= 50) {
    return {
      label: "Rare",
      flavor: "Some paths are quieter than others.",
      colorClass: "text-cyan-500",
      bgClass: "bg-cyan-500/10 border-cyan-500/20",
      icon: <Gem className="h-3 w-3" />,
    };
  }
  return {
    label: "Hidden",
    flavor: "Hidden in plain sight.",
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/30 border-muted/20",
    icon: <EyeOff className="h-3 w-3" />,
  };
}

export function EasterEggDetailModal({
  isOpen,
  onClose,
  eggId,
  name,
  description,
  rewardAmount,
  isDiscovered,
  lastDiscoveredAt,
}: EasterEggDetailModalProps) {
  // Use canonical art assets — same source as EasterEggCard
  const iconSrc = isDiscovered ? FRAGMENT_UNLOCKED_SRC : FRAGMENT_LOCKED_SRC;

  const hint = !isDiscovered ? getEggHint(eggId) : null;
  const rarity = getRarity(rewardAmount);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = () => {
    const eggLine = name ? `"${name}"\n\n` : "";
    const text = `Found something hidden on JackBear.ai 🐻\n\n${eggLine}Didn't expect that.\n\nhttps://jackbear.ai\n\n#ICP #BuildInPublic`;
    const encoded = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
  };

  const handleSaveCard = () => {
    saveFragmentShareCard({ fragmentName: name });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* Image area — canonical art, state-consistent with dashboard card */}
          <div className="relative flex justify-center mb-4">
            {/* Galactic glow backdrop — unlocked only */}
            {isDiscovered && (
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.55 0.28 290 / 0.25) 0%, transparent 60%)",
                }}
              />
            )}

            <div className="relative inline-block">
              <img
                src={iconSrc}
                alt={isDiscovered ? name : "Hidden Fragment"}
                className={`h-32 w-32 object-contain relative transition-all duration-300 ${
                  !isDiscovered ? "opacity-35 saturate-0" : ""
                }`}
                style={
                  isDiscovered
                    ? {
                        filter:
                          "drop-shadow(0 0 22px oklch(0.60 0.28 290 / 0.75)) drop-shadow(0 0 8px oklch(0.65 0.22 200 / 0.5))",
                      }
                    : {
                        filter: "brightness(0.55) contrast(0.8)",
                      }
                }
              />

              {/* Lock icon overlay — visible on locked fragments */}
              {!isDiscovered && (
                <div className="absolute inset-0 flex items-end justify-end pb-1 pr-1">
                  <div className="rounded-full bg-background/80 p-1.5 backdrop-blur-sm ring-1 ring-muted/30">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogTitle className="text-center text-2xl">
            {isDiscovered ? name : "Hidden"}
          </DialogTitle>

          {/* Rarity chip — only for discovered fragments */}
          {isDiscovered && (
            <div className="flex justify-center mt-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${rarity.colorClass} ${rarity.bgClass}`}
              >
                {rarity.icon}
                {rarity.label}
              </span>
            </div>
          )}

          <DialogDescription className="text-center">
            {isDiscovered
              ? description
              : "Not everything reveals itself at once."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Reward Amount */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Coins className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              {rewardAmount} Bear Points (BP)
            </span>
          </div>

          {/* Flavor line — only for discovered fragments */}
          {isDiscovered && (
            <p className="text-xs text-center text-muted-foreground italic">
              {rarity.flavor}
            </p>
          )}

          {/* Discovery Status */}
          <div
            className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
              isDiscovered
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-muted/50 border border-muted"
            }`}
          >
            {isDiscovered ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="text-center">
                  <p className="font-semibold text-green-500">Found</p>
                  {lastDiscoveredAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(lastDiscoveredAt)}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <Lock className="h-5 w-5 text-muted-foreground" />
                <p className="font-semibold text-muted-foreground">
                  Undiscovered
                </p>
              </>
            )}
          </div>

          {/* Progressive Hint */}
          {hint && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {hint}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center gap-2">
            {isDiscovered && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  data-ocid="easter_egg.share_button"
                  className="flex items-center gap-1.5 shrink-0"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCard}
                  data-ocid="easter_egg.save_button"
                  className="flex items-center gap-1.5 shrink-0"
                >
                  <Download className="h-3.5 w-3.5" />
                  Save share card
                </Button>
              </>
            )}
            <Button
              onClick={onClose}
              className="flex-1"
              data-ocid="easter_egg.close_button"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
