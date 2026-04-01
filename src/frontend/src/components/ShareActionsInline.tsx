import { Button } from "@/components/ui/button";
import { type PrestigeTier, getPrestigeTier } from "@/lib/prestige";
import { saveLeaderboardShareCard } from "@/lib/shareCardCanvas";
import {
  Check,
  Copy,
  Download,
  Facebook,
  Linkedin,
  Share2,
  X,
} from "lucide-react";
import { useState } from "react";

const TIER_CONFIG: Record<
  PrestigeTier,
  {
    emoji: string;
    label: string;
    text: string;
    border: string;
    bg: string;
    ring: string;
    cardBorder: string;
  }
> = {
  gold: {
    emoji: "🥇",
    label: "Gold Bear",
    text: "text-yellow-500",
    border: "border-yellow-500/40",
    bg: "bg-yellow-500/10",
    ring: "ring-1 ring-yellow-500/20",
    cardBorder: "border border-yellow-500/40 ring-1 ring-yellow-500/20",
  },
  platinum: {
    emoji: "🟡",
    label: "Platinum Bear",
    text: "text-zinc-400",
    border: "border-zinc-400/40",
    bg: "bg-zinc-400/10",
    ring: "ring-1 ring-zinc-400/20",
    cardBorder: "border border-zinc-400/40 ring-1 ring-zinc-400/20",
  },
  diamond: {
    emoji: "💎",
    label: "Diamond Bear",
    text: "text-cyan-400",
    border: "border-cyan-400/40",
    bg: "bg-cyan-400/10",
    ring: "ring-1 ring-cyan-400/20",
    cardBorder: "border border-cyan-400/40 ring-1 ring-cyan-400/20",
  },
};

interface ShareActionsInlineProps {
  rank?: number | null;
  bp: number;
  worldLabel?: string;
  displayName?: string;
  compact?: boolean;
  gapToTop10?: number | null;
  /** Preferred: explicit tier derived from getPrestigeTier() */
  prestigeTier?: PrestigeTier | null;
  /** Backwards compat: if prestigeTier not passed, derive 'gold' from this */
  isGoldBear?: boolean;
  onDismiss?: () => void;
}

function buildXCaption(
  rank: number | null | undefined,
  bp: number,
  gapToTop10?: number | null,
  tier?: PrestigeTier | null,
): string {
  let base: string;
  if (rank) {
    base = `Climbing the global leaderboard on @jackbearai 🐻\n\nRank #${rank}\n${bp.toLocaleString()} BP\n\nLearning Web3 > scrolling it\n\nCan you beat me?`;
  } else {
    base = `Learning Web3 on @jackbearai 🐻\n\n${bp.toLocaleString()} BP earned\n\nLearning Web3 > scrolling it`;
  }
  if (rank && rank <= 10) {
    base += `\nHolding rank #${rank}`;
  } else if (rank && rank > 10 && gapToTop10 != null && gapToTop10 > 0) {
    base += `\n\nOnly ${gapToTop10} BP from Top 10`;
  }
  if (tier === "diamond") base += "\n\nDiamond Bear status unlocked 💎";
  else if (tier === "platinum") base += "\n\nPlatinum Bear status unlocked 🟡";
  else if (tier === "gold") base += "\n\nGold Bear status unlocked 🥇";
  return base;
}

function buildLinkedInCaption(
  rank: number | null | undefined,
  tier?: PrestigeTier | null,
): string {
  let base: string;
  if (rank) {
    base = `Currently ranked #${rank} globally on JackBear.ai.\n\nLearning Web3, earning Bear Points, and climbing the leaderboard in real time.\n\nCurious to see how far I can take this.\n\nAnyone else exploring decentralized education?`;
  } else {
    base =
      "Learning Web3 on JackBear.ai.\n\nEarning Bear Points and climbing the leaderboard.";
  }
  if (tier === "diamond")
    base += "\n\nReached Diamond Bear status on JackBear.ai.";
  else if (tier === "platinum")
    base += "\n\nReached Platinum Bear status on JackBear.ai.";
  else if (tier === "gold")
    base += "\n\nReached Gold Bear status on JackBear.ai.";
  return base;
}

export default function ShareActionsInline({
  rank,
  bp,
  worldLabel,
  displayName,
  compact = false,
  gapToTop10,
  prestigeTier,
  isGoldBear = false,
  onDismiss,
}: ShareActionsInlineProps) {
  const [copied, setCopied] = useState(false);

  // Resolve effective tier: explicit prop wins, fallback to isGoldBear compat
  const effectiveTier: PrestigeTier | null =
    prestigeTier !== undefined
      ? (prestigeTier ?? null)
      : isGoldBear
        ? "gold"
        : null;

  const tierCfg = effectiveTier ? TIER_CONFIG[effectiveTier] : null;

  const xCaption = buildXCaption(rank, bp, gapToTop10, effectiveTier);
  const liCaption = buildLinkedInCaption(rank, effectiveTier);
  const copyCaption = xCaption;

  function handleX() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(xCaption)}`,
      "_blank",
    );
  }

  function handleLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://jackbear.ai")}&summary=${encodeURIComponent(liCaption)}`,
      "_blank",
    );
  }

  function handleFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://jackbear.ai")}`,
      "_blank",
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(copyCaption).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSaveCard() {
    saveLeaderboardShareCard({
      rank: rank ?? null,
      displayName: displayName ?? "Anonymous",
      bp,
    });
  }

  const cardBorderClass = tierCfg ? tierCfg.cardBorder : "border border-border";

  return (
    <div
      className={`bg-card ${cardBorderClass} rounded-xl p-4 relative`}
      data-ocid="share.card"
    >
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
          data-ocid="share.close_button"
        >
          <X size={14} />
        </button>
      )}

      {/* Header */}
      <p
        className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2"
        style={{ letterSpacing: "0.1em" }}
      >
        JackBear.ai
        {tierCfg && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${tierCfg.text} ${tierCfg.bg} border ${tierCfg.border} rounded px-1.5 py-0.5 ml-2`}
          >
            {tierCfg.emoji} {tierCfg.label}
          </span>
        )}
      </p>

      {/* Stats */}
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        {rank ? (
          <span className="text-foreground font-extrabold text-lg leading-none">
            #{rank}{" "}
            <span className="text-muted-foreground text-xs font-medium">
              Global Rank
            </span>
          </span>
        ) : null}
        <span className="text-foreground font-bold text-base leading-none">
          {bp.toLocaleString()}{" "}
          <span className="text-muted-foreground text-xs font-medium">BP</span>
        </span>
      </div>

      {/* World badge */}
      {worldLabel && (
        <div className="mb-2 mt-1">
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5 text-xs font-semibold">
            ✓ {worldLabel}
          </span>
        </div>
      )}

      {/* Tagline */}
      {!compact && (
        <p className="text-muted-foreground text-xs mb-3">
          Learn Web3. Earn. Climb.
        </p>
      )}

      {/* Share buttons */}
      <div className="flex gap-2 flex-wrap mt-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleX}
          data-ocid="share.button"
        >
          <Share2 size={12} />X
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleLinkedIn}
          data-ocid="share.button"
        >
          <Linkedin size={12} />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleFacebook}
          data-ocid="share.button"
        >
          <Facebook size={12} />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleCopy}
          data-ocid="share.button"
        >
          {copied ? (
            <Check size={12} className="text-emerald-500" />
          ) : (
            <Copy size={12} />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleSaveCard}
          data-ocid="share.save_button"
        >
          <Download size={12} />
          Save share card
        </Button>
      </div>
    </div>
  );
}
