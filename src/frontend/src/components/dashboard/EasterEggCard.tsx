import type { EasterEggId } from "@/additions/easterEggIds";
import { Lock } from "lucide-react";
import { useState } from "react";
import { EasterEggDetailModal } from "./EasterEggDetailModal";

// Canonical art assets for Hidden Fragment states
const FRAGMENT_LOCKED_SRC =
  "/assets/generated/hidden-fragment-locked-transparent.dim_128x128.png";
const FRAGMENT_UNLOCKED_SRC =
  "/assets/generated/hidden-fragment-unlocked.dim_128x128.png";

interface EasterEggCardProps {
  eggId: EasterEggId;
  name: string;
  description: string;
  rewardAmount: number;
  isDiscovered: boolean;
  lastDiscoveredAt?: number;
}

export function EasterEggCard({
  eggId,
  name,
  description,
  rewardAmount,
  isDiscovered,
  lastDiscoveredAt,
}: EasterEggCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const iconSrc = isDiscovered ? FRAGMENT_UNLOCKED_SRC : FRAGMENT_LOCKED_SRC;
  // Fallback to legacy assets if generated images fail to load
  const fallbackSrc = isDiscovered
    ? "/assets/generated/easter-egg-found.dim_128x128.png"
    : "/assets/generated/easter-egg-unknown.dim_128x128.png";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`
          group relative cursor-pointer rounded-lg border bg-card p-4
          transition-all duration-300 ease-in-out
          motion-safe:hover:scale-105
          ${
            isDiscovered
              ? "border-primary/30 hover:border-primary/50 hover:shadow-glow-cyan motion-safe:hover:brightness-110"
              : "border-muted/30 hover:border-muted/50 opacity-60 hover:opacity-80"
          }
        `}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            {/* Galactic glow backdrop — unlocked fragments only */}
            {isDiscovered && (
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.55 0.28 290 / 0.35) 0%, oklch(0.55 0.22 200 / 0.18) 50%, transparent 70%)",
                }}
              />
            )}

            <img
              src={imgError ? fallbackSrc : iconSrc}
              alt={isDiscovered ? name : "Undiscovered Hidden Fragment"}
              onError={() => setImgError(true)}
              className={`h-20 w-20 object-contain relative transition-all duration-300 ${
                isDiscovered ? "" : "opacity-35 saturate-0"
              }`}
              style={
                isDiscovered
                  ? {
                      filter:
                        "drop-shadow(0 0 18px oklch(0.60 0.30 290 / 0.75)) drop-shadow(0 0 8px oklch(0.65 0.22 200 / 0.5))",
                    }
                  : {
                      // Locked: flat muted look — no glow, no color
                      filter: "brightness(0.55) contrast(0.8)",
                    }
              }
            />

            {/* Lock overlay on locked fragments */}
            {!isDiscovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-background/70 p-1.5 backdrop-blur-sm">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-sm">
              {isDiscovered ? name : "???"}
            </h3>
            {isDiscovered && (
              <p className="text-xs text-muted-foreground mt-1">
                {rewardAmount} BP
              </p>
            )}
          </div>
        </div>
      </button>

      <EasterEggDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eggId={eggId}
        name={name}
        description={description}
        rewardAmount={rewardAmount}
        isDiscovered={isDiscovered}
        lastDiscoveredAt={lastDiscoveredAt}
      />
    </>
  );
}
