/**
 * SovereignShareModal
 *
 * Appears ONCE when Sovereign Mode is first unlocked.
 * Stores jb_sovereign_share_seen = true after first display.
 * No backend. No logic changes. Frontend-only share moment.
 */

import { Button } from "@/components/ui/button";
import { Check, Copy, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SHARE_SEEN_KEY = "jb_sovereign_share_seen";
const SITE_URL = "https://jackbear.ai/intelligence";

const SHARE_TEXT = `I just unlocked Sovereign Mode on JackBear.ai.

Most people won't reach this layer.

Verifiable Intelligence > AI hype.

${SITE_URL}`;

function buildXUrl(): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`;
}

function buildLinkedInUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;
}

interface SovereignShareModalProps {
  onClose: () => void;
}

export function SovereignShareModal({ onClose }: SovereignShareModalProps) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Mark as seen immediately on mount
  useEffect(() => {
    localStorage.setItem(SHARE_SEEN_KEY, "true");
  }, []);

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SITE_URL);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = SITE_URL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShareX() {
    window.open(buildXUrl(), "_blank", "noopener,noreferrer");
  }

  function handleShareLinkedIn() {
    window.open(buildLinkedInUrl(), "_blank", "noopener,noreferrer");
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="sovereign-share-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "sovereignFadeIn 0.35s ease forwards",
      }}
    >
      <div
        className="sovereign-share-card relative w-full max-w-md rounded-2xl border overflow-hidden"
        style={{
          background: "var(--sovereign-card-bg, oklch(0.13 0.025 280))",
          borderColor: "oklch(0.72 0.15 85 / 0.35)",
          boxShadow:
            "0 0 0 1px oklch(0.72 0.15 85 / 0.12), 0 24px 64px rgba(0,0,0,0.6), 0 0 40px oklch(0.55 0.20 280 / 0.15)",
          animation:
            "sovereignCardIn 0.40s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        {/* Gold top line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.72 0.15 85 / 0.7) 40%, oklch(0.72 0.15 85 / 0.7) 60%, transparent)",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="px-8 pt-8 pb-7 text-center">
          {/* System chip */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{
                background: "oklch(0.72 0.15 85 / 0.08)",
                borderColor: "oklch(0.72 0.15 85 / 0.30)",
                color: "oklch(0.72 0.15 85)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "oklch(0.72 0.15 85)",
                  boxShadow: "0 0 6px oklch(0.72 0.15 85 / 0.8)",
                }}
              />
              SYSTEM ACHIEVEMENT
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-2xl font-black uppercase tracking-[0.12em] mb-1.5"
            style={{ color: "oklch(0.72 0.15 85)" }}
          >
            SOVEREIGN MODE
          </h2>
          <p
            className="text-lg font-semibold uppercase tracking-widest mb-1"
            style={{ color: "oklch(0.82 0.10 85 / 0.85)" }}
          >
            ACTIVATED
          </p>

          {/* Divider */}
          <div
            className="w-16 h-px mx-auto my-5"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.72 0.15 85 / 0.5), transparent)",
            }}
          />

          {/* Subtitle */}
          <p
            className="text-sm font-mono tracking-wider mb-1"
            style={{ color: "oklch(0.75 0.10 280)" }}
          >
            Verifiable Intelligence Layer Complete
          </p>

          {/* Body */}
          <p className="text-sm text-muted-foreground mt-3 mb-7 leading-relaxed">
            Most people won't reach this layer.
          </p>

          {/* Share section label */}
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.72 0.15 85 / 0.6)" }}
          >
            Share your achievement
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-2.5">
            <Button
              onClick={handleShareX}
              className="w-full font-semibold text-sm relative overflow-hidden"
              style={{
                background: "oklch(0.15 0.03 280)",
                borderColor: "oklch(0.72 0.15 85 / 0.30)",
                color: "oklch(0.72 0.15 85)",
              }}
              variant="outline"
            >
              <X className="h-3.5 w-3.5 mr-2" />
              Share on X
            </Button>

            <Button
              onClick={handleShareLinkedIn}
              className="w-full font-semibold text-sm"
              style={{
                background: "oklch(0.15 0.03 280)",
                borderColor: "oklch(0.55 0.20 280 / 0.40)",
                color: "oklch(0.78 0.12 280)",
              }}
              variant="outline"
            >
              <Share2 className="h-3.5 w-3.5 mr-2" />
              Share on LinkedIn
            </Button>

            <Button
              onClick={handleCopy}
              className="w-full font-semibold text-sm"
              variant="ghost"
              style={{ color: "oklch(0.60 0.05 280)" }}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-2 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.55 0.20 280 / 0.4) 40%, oklch(0.55 0.20 280 / 0.4) 60%, transparent)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Hook: returns whether the sovereign share modal should be shown.
 * Shows once: when jb_ui_mode === "sovereign" AND jb_sovereign_share_seen is not set.
 */
export function useSovereignShareTrigger(isSovereign: boolean): {
  shouldShow: boolean;
  dismiss: () => void;
  show: () => void;
} {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!isSovereign) return;
    const alreadySeen = localStorage.getItem(SHARE_SEEN_KEY) === "true";
    if (!alreadySeen) {
      // Small delay so the page renders first
      const t = setTimeout(() => setShouldShow(true), 800);
      return () => clearTimeout(t);
    }
  }, [isSovereign]);

  function dismiss() {
    localStorage.setItem(SHARE_SEEN_KEY, "true");
    setShouldShow(false);
  }

  function show() {
    setShouldShow(true);
  }

  return { shouldShow, dismiss, show };
}
