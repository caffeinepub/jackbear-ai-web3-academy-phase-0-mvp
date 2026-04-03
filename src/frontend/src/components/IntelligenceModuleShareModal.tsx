/**
 * IntelligenceModuleShareModal.tsx
 *
 * Appears ONCE per module when a user completes an Intelligence Layer module.
 * Stores jb_intel_share_seen_mod-XX = true per module after first display.
 * No backend. No logic changes. Frontend-only share moment.
 */

import { Button } from "@/components/ui/button";
import { Check, Copy, Linkedin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SITE_URL = "https://jackbear.ai/intelligence";

function seenKey(moduleId: string): string {
  return `jb_intel_share_seen_${moduleId}`;
}

function hasSeen(moduleId: string): boolean {
  return localStorage.getItem(seenKey(moduleId)) === "true";
}

function markSeen(moduleId: string): void {
  localStorage.setItem(seenKey(moduleId), "true");
}

function parseModuleNumber(moduleId: string): number {
  const match = moduleId.match(/(\d+)$/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function buildShareText(
  moduleId: string,
  moduleTitle: string,
  completedCount: number,
  totalModules: number,
): string {
  const num = parseModuleNumber(moduleId);
  const label = `Module ${String(num).padStart(2, "0")} \u2014 ${moduleTitle}`;
  return `I just completed ${label} on JackBear.ai.\n\nVerifiable Intelligence Layer progress: ${completedCount}/${totalModules}.\n\nMost people won't get this far.\n\n${SITE_URL}`;
}

function buildXUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

function buildLinkedInUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;
}

// ── Module accent colours ─────────────────────────────────────────────────────
const MODULE_ACCENTS: Record<
  string,
  { border: string; dot: string; text: string; chipBg: string }
> = {
  "mod-01": {
    border: "oklch(0.65 0.22 290 / 0.40)",
    dot: "oklch(0.72 0.20 290)",
    text: "oklch(0.72 0.18 290)",
    chipBg: "oklch(0.72 0.18 290 / 0.08)",
  },
  "mod-02": {
    border: "oklch(0.72 0.18 200 / 0.40)",
    dot: "oklch(0.78 0.16 200)",
    text: "oklch(0.76 0.14 200)",
    chipBg: "oklch(0.76 0.14 200 / 0.08)",
  },
  "mod-03": {
    border: "oklch(0.72 0.18 200 / 0.40)",
    dot: "oklch(0.78 0.16 200)",
    text: "oklch(0.76 0.14 200)",
    chipBg: "oklch(0.76 0.14 200 / 0.08)",
  },
  "mod-04": {
    border: "oklch(0.72 0.18 200 / 0.40)",
    dot: "oklch(0.78 0.16 200)",
    text: "oklch(0.76 0.14 200)",
    chipBg: "oklch(0.76 0.14 200 / 0.08)",
  },
  "mod-05": {
    border: "oklch(0.72 0.15 85 / 0.40)",
    dot: "oklch(0.72 0.15 85)",
    text: "oklch(0.72 0.15 85)",
    chipBg: "oklch(0.72 0.15 85 / 0.08)",
  },
};

const DEFAULT_ACCENT = MODULE_ACCENTS["mod-02"];

function getAccent(moduleId: string) {
  return MODULE_ACCENTS[moduleId] ?? DEFAULT_ACCENT;
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal Component
// ─────────────────────────────────────────────────────────────────────────────

export interface IntelligenceModuleShareModalProps {
  moduleId: string;
  moduleTitle: string;
  moduleNumber: string;
  completedCount: number;
  totalModules: number;
  onClose: () => void;
}

export function IntelligenceModuleShareModal({
  moduleId,
  moduleTitle,
  moduleNumber,
  completedCount,
  totalModules,
  onClose,
}: IntelligenceModuleShareModalProps) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const accent = getAccent(moduleId);

  const shareText = buildShareText(
    moduleId,
    moduleTitle,
    completedCount,
    totalModules,
  );

  // Mark seen on mount
  useEffect(() => {
    markSeen(moduleId);
  }, [moduleId]);

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleShareX() {
    window.open(buildXUrl(shareText), "_blank", "noopener,noreferrer");
  }

  function handleShareLinkedIn() {
    window.open(buildLinkedInUrl(), "_blank", "noopener,noreferrer");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SITE_URL);
    } catch {
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

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "sovereignFadeIn 0.30s ease forwards",
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border overflow-hidden"
        style={{
          background: "oklch(0.11 0.025 280)",
          borderColor: accent.border,
          boxShadow: `0 0 0 1px ${accent.border}, 0 24px 64px rgba(0,0,0,0.6)`,
          animation:
            "sovereignCardIn 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.dot} 40%, ${accent.dot} 60%, transparent)`,
          }}
        />

        {/* Close button */}
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
                background: accent.chipBg,
                borderColor: accent.border,
                color: accent.text,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: accent.dot,
                  boxShadow: `0 0 6px ${accent.dot}`,
                }}
              />
              INTELLIGENCE LAYER
            </span>
          </div>

          {/* Module number */}
          <p
            className="text-xs font-mono uppercase tracking-[0.18em] mb-1"
            style={{ color: accent.text, opacity: 0.7 }}
          >
            {moduleNumber}
          </p>

          {/* Title */}
          <h2
            className="text-2xl font-black uppercase tracking-[0.10em] mb-1.5"
            style={{ color: accent.text }}
          >
            COMPLETE
          </h2>

          {/* Module title */}
          <p
            className="text-base font-semibold mb-1"
            style={{ color: "oklch(0.82 0.06 280)" }}
          >
            {moduleTitle}
          </p>

          {/* Divider */}
          <div
            className="w-16 h-px mx-auto my-5"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent.dot}, transparent)`,
            }}
          />

          {/* Progress */}
          <p
            className="text-sm font-mono tracking-wider mb-1"
            style={{ color: "oklch(0.68 0.10 280)" }}
          >
            Intelligence Layer progress:{" "}
            <span style={{ color: accent.text, fontWeight: 700 }}>
              {completedCount}/{totalModules}
            </span>
          </p>

          {/* Body copy */}
          <p className="text-sm text-muted-foreground mt-3 mb-7 leading-relaxed">
            Most people won't get this far.
          </p>

          {/* Share label */}
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.55 0.08 280)" }}
          >
            Share your progress
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2.5">
            <Button
              onClick={handleShareX}
              className="w-full font-semibold text-sm"
              variant="outline"
              style={{
                background: "oklch(0.13 0.03 280)",
                borderColor: accent.border,
                color: accent.text,
              }}
            >
              <X className="h-3.5 w-3.5 mr-2" />
              Share on X
            </Button>

            <Button
              onClick={handleShareLinkedIn}
              className="w-full font-semibold text-sm"
              variant="outline"
              style={{
                background: "oklch(0.13 0.03 280)",
                borderColor: "oklch(0.55 0.20 280 / 0.35)",
                color: "oklch(0.76 0.12 280)",
              }}
            >
              <Linkedin className="h-3.5 w-3.5 mr-2" />
              Share on LinkedIn
            </Button>

            <Button
              onClick={handleCopy}
              className="w-full font-semibold text-sm"
              variant="ghost"
              style={{ color: "oklch(0.58 0.06 280)" }}
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
              "linear-gradient(90deg, transparent, oklch(0.55 0.20 280 / 0.35) 40%, oklch(0.55 0.20 280 / 0.35) 60%, transparent)",
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export interface ModuleShareState {
  pendingModuleId: string | null;
  dismiss: () => void;
}

/**
 * Watches all module completion flags.
 * When a module transitions to complete for the first time
 * (no seen-flag in localStorage), queues it for display.
 * Only one modal shows at a time; dismissing it advances to the next.
 */
export function useModuleShareQueue(
  completions: Record<string, boolean>,
  moduleMeta: Array<{ id: string; number: string; title: string }>,
): ModuleShareState {
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    const newlyComplete = moduleMeta
      .filter((m) => completions[m.id] && !hasSeen(m.id))
      .map((m) => m.id);

    if (newlyComplete.length > 0) {
      setQueue((prev) => {
        const toAdd = newlyComplete.filter((id) => !prev.includes(id));
        return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
      });
    }
  }, [completions, moduleMeta]);

  function dismiss() {
    const current = queue[0];
    if (current) markSeen(current);
    setQueue((prev) => prev.slice(1));
  }

  return {
    pendingModuleId: queue[0] ?? null,
    dismiss,
  };
}

export { hasSeen, markSeen };
