/**
 * ModuleAchievementsBadges
 *
 * Persistent, always-visible badge cards for completed Intelligence modules.
 * This is NOT a modal — it renders inline in the /intelligence page.
 * One card per completed module. Clearly below the Intelligence Certificate in hierarchy.
 *
 * Data source: module completion booleans passed as props (already computed from
 * localStorage jb_lesson_progress in VerifiableIntelligencePage).
 * No backend calls. No PDF generation. No new data structures.
 */

import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, Facebook, Link, Share2 } from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ModuleBadgeInfo {
  id: string; // "mod-01" ... "mod-05"
  number: string; // "Module 01"
  title: string;
  completed: boolean;
}

interface ModuleAchievementsBadgesProps {
  modules: ModuleBadgeInfo[];
}

// ── Per-module accent palette ─────────────────────────────────────────────────
// mod-01: violet  |  mod-02/03/04: cyan  |  mod-05: gold (future)

const ACCENT: Record<
  string,
  {
    border: string;
    bg: string;
    chip: string;
    chipText: string;
    dot: string;
    icon: string;
    badgeLabel: string;
  }
> = {
  "mod-01": {
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    chip: "bg-violet-500/10 border-violet-500/25",
    chipText: "text-violet-400",
    dot: "bg-violet-400",
    icon: "text-violet-400",
    badgeLabel: "INTELLIGENCE",
  },
  "mod-02": {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    chip: "bg-cyan-500/10 border-cyan-500/25",
    chipText: "text-cyan-400",
    dot: "bg-cyan-400",
    icon: "text-cyan-400",
    badgeLabel: "INTELLIGENCE",
  },
  "mod-03": {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    chip: "bg-cyan-500/10 border-cyan-500/25",
    chipText: "text-cyan-400",
    dot: "bg-cyan-400",
    icon: "text-cyan-400",
    badgeLabel: "INTELLIGENCE",
  },
  "mod-04": {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    chip: "bg-cyan-500/10 border-cyan-500/25",
    chipText: "text-cyan-400",
    dot: "bg-cyan-400",
    icon: "text-cyan-400",
    badgeLabel: "INTELLIGENCE",
  },
  "mod-05": {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    chip: "bg-yellow-500/10 border-yellow-500/25",
    chipText: "text-yellow-400",
    dot: "bg-yellow-400",
    icon: "text-yellow-400",
    badgeLabel: "INTELLIGENCE",
  },
};

// Fallback for any unknown module id
const ACCENT_FALLBACK = ACCENT["mod-02"];

// ── Single badge card ─────────────────────────────────────────────────────────

function ModuleBadgeCard({ module }: { module: ModuleBadgeInfo }) {
  const accent = ACCENT[module.id] ?? ACCENT_FALLBACK;
  const [copied, setCopied] = useState(false);

  const shareUrl = "https://jackbear.ai/intelligence";
  const shareText = `I just completed ${module.number} — ${module.title} on JackBear.ai.\n\nVerifiable Intelligence Layer in progress.\n\nMost people won't get this far.\n\n${shareUrl}`;

  function handleShare() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={`relative rounded-xl border ${accent.border} ${accent.bg} p-4 flex flex-col gap-3 transition-all`}
    >
      {/* Top row: system chip + completed dot */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${accent.chip} ${accent.chipText}`}
        >
          {accent.badgeLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Completed
          </span>
        </span>
      </div>

      {/* Module label */}
      <div className="flex items-start gap-2.5">
        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${accent.icon}`} />
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">
            {module.number}
          </p>
          <p className="text-sm font-bold text-foreground leading-snug">
            {module.title}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-border/40">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleShare}
        >
          <Share2 className="h-3 w-3" />
          Share on X
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleFacebook}
        >
          <Facebook className="h-3 w-3" />
          Facebook
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3 text-emerald-500" />
          ) : (
            <Link className="h-3 w-3" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
    </div>
  );
}

// ── Section component (exported) ──────────────────────────────────────────────

export function ModuleAchievementsBadges({
  modules,
}: ModuleAchievementsBadgesProps) {
  const completedModules = modules.filter((m) => m.completed);

  // Don't render the section at all if nothing is completed yet
  if (completedModules.length === 0) return null;

  return (
    <div className="mt-8" data-ocid="intelligence.module_achievements">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Module Achievements
        </h3>
        <span className="flex-1 h-px bg-border/50" />
        <span className="text-xs text-muted-foreground">
          {completedModules.length}/{modules.length} complete
        </span>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {completedModules.map((module) => (
          <ModuleBadgeCard key={module.id} module={module} />
        ))}
      </div>

      {/* Hierarchy note — makes it clear this is below the Intelligence Certificate */}
      <p className="mt-3 text-[11px] text-muted-foreground/60 text-center">
        Complete all modules to earn the Verifiable Intelligence Certification
      </p>
    </div>
  );
}
