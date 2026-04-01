import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveLeaderboardShareCard } from "@/lib/shareCardCanvas";
import {
  Check,
  Copy,
  Download,
  Facebook,
  Linkedin,
  Share2,
} from "lucide-react";
import { useState } from "react";

interface ShareCardModalProps {
  open: boolean;
  onClose: () => void;
  rank: number | null;
  bp: number;
  worldLabel?: string;
  displayName?: string;
}

function buildXCaption(rank: number | null, bp: number): string {
  const rankStr = rank !== null ? `#${rank}` : "Unranked";
  return `Climbing the global leaderboard on @jackbearai \u{1F43B}\n\nRank ${rankStr}\n${bp.toLocaleString()} BP\n\nLearning Web3 > scrolling it\n\nCan you beat me?`;
}

function buildLinkedInCaption(rank: number | null): string {
  const rankStr = rank !== null ? `#${rank}` : "Unranked";
  return `Currently ranked ${rankStr} globally on JackBear.ai.\n\nLearning Web3, earning Bear Points, and climbing the leaderboard in real time.\n\nCurious to see how far I can take this.\n\nAnyone else exploring decentralized education?`;
}

export default function ShareCardModal({
  open,
  onClose,
  rank,
  bp,
  worldLabel,
  displayName,
}: ShareCardModalProps) {
  const [copiedX, setCopiedX] = useState(false);

  const rankDisplay = rank !== null ? `#${rank}` : "Unranked";
  const xCaption = buildXCaption(rank, bp);
  const liCaption = buildLinkedInCaption(rank);

  function copyText(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedX(true);
    setTimeout(() => setCopiedX(false), 2000);
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

  function handleX() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(xCaption)}`,
      "_blank",
    );
  }

  function handleSaveCard() {
    saveLeaderboardShareCard({
      rank,
      displayName: displayName ?? "Anonymous",
      bp,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="share_card.dialog">
        <DialogHeader>
          <DialogTitle className="text-sm text-foreground">
            Share your progress
          </DialogTitle>
        </DialogHeader>

        {/* Share card */}
        <div className="bg-muted border border-border rounded-xl p-6 text-center">
          {/* Brand */}
          <p
            className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4"
            style={{ letterSpacing: "0.12em" }}
          >
            JackBear.ai
          </p>

          {/* Rank */}
          <p className="text-4xl font-extrabold leading-none text-foreground mb-1">
            {rankDisplay}
          </p>
          <p className="text-xs text-muted-foreground mb-4 tracking-wide">
            Global Rank
          </p>

          {/* BP */}
          <p
            className={`text-xl font-bold text-foreground ${
              worldLabel ? "mb-1.5" : "mb-4"
            }`}
          >
            {bp.toLocaleString()}{" "}
            <span className="text-sm font-medium text-muted-foreground">
              Bear Points
            </span>
          </p>

          {worldLabel && (
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4 tracking-wide">
              ✓ {worldLabel}
            </p>
          )}

          {/* Footer */}
          <p
            className="text-xs font-semibold tracking-widest uppercase text-muted-foreground"
            style={{ letterSpacing: "0.08em" }}
          >
            Learn Web3. Earn. Climb.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={handleX}
            data-ocid="share_card.button"
          >
            <Share2 size={13} />
            Share on X (Twitter)
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={handleLinkedIn}
            data-ocid="share_card.button"
          >
            <Linkedin size={13} />
            Share on LinkedIn
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={handleFacebook}
            data-ocid="share_card.button"
          >
            <Facebook size={13} />
            Share on Facebook
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={() => copyText(xCaption)}
            data-ocid="share_card.secondary_button"
          >
            {copiedX ? (
              <Check size={13} className="text-emerald-500" />
            ) : (
              <Copy size={13} />
            )}
            {copiedX ? "Copied!" : "Copy text"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-xs"
            onClick={handleSaveCard}
            data-ocid="share_card.save_button"
          >
            <Download size={13} />
            Save share card
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs mt-1 text-muted-foreground"
          onClick={onClose}
          data-ocid="share_card.close_button"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
