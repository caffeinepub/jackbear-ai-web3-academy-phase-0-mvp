/**
 * DevTestPanel — DRAFT-ONLY testing utility
 *
 * Renders ONLY on non-production hostnames (draft canister URLs, localhost).
 * Zero effect on jackbear.ai / jackbear.app — those hostnames always return null.
 *
 * Allows seeding / resetting jb_* localStorage state without console commands
 * so progression, unlocks, certificates, and UI states can be tested safely.
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isDraftEnv } from "@/lib/devUnlock";
import {
  Check,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Copy,
  FlaskConical,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

/** All module lesson IDs — mirrors useSovereignMode.ts / VerifiableIntelligencePage */
const MODULE_LESSON_IDS: Record<string, string[]> = {
  "mod-01": [
    "vil-01",
    "vil-02",
    "vil-03",
    "vil-04",
    "vil-05",
    "vil-06",
    "vil-07",
    "vil-08",
    "vil-09",
    "vil-10",
  ],
  "mod-02": [
    "ags-01",
    "ags-02",
    "ags-03",
    "ags-04",
    "ags-05",
    "ags-06",
    "ags-07",
    "ags-08",
    "ags-09",
    "ags-10",
  ],
  "mod-03": [
    "aut-01",
    "aut-02",
    "aut-03",
    "aut-04",
    "aut-05",
    "aut-06",
    "aut-07",
    "aut-08",
    "aut-09",
    "aut-10",
  ],
  "mod-04": [
    "aec-01",
    "aec-02",
    "aec-03",
    "aec-04",
    "aec-05",
    "aec-06",
    "aec-07",
    "aec-08",
    "aec-09",
    "aec-10",
  ],
  "mod-05": [
    "sov-01",
    "sov-02",
    "sov-03",
    "sov-04",
    "sov-05",
    "sov-06",
    "sov-07",
    "sov-08",
    "sov-09",
    "sov-10",
  ],
};

const COHERENCE_KEY = "jb_coherence_keys";
const SOVEREIGN_KEY = "jb_ui_mode";
const LESSON_PROGRESS_KEY = "jb_lesson_progress";
const SOVEREIGN_SHARE_SEEN_KEY = "jb_sovereign_share_seen";

function moduleShareSeenKey(moduleId: string) {
  return `jb_intel_share_seen_${moduleId}`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readLessonProgress(): Record<
  string,
  { attempted?: boolean; unlocked?: boolean }
> {
  try {
    const raw = localStorage.getItem(LESSON_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLessonProgress(
  data: Record<string, { attempted?: boolean; unlocked?: boolean }>,
) {
  localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("jb:lesson-progress-updated"));
  window.dispatchEvent(
    new StorageEvent("storage", { key: LESSON_PROGRESS_KEY }),
  );
}

function getCurrentStateSummary(): string {
  const coherenceRaw = localStorage.getItem(COHERENCE_KEY);
  const coherence = coherenceRaw
    ? JSON.parse(coherenceRaw)
    : { recovered: [], unlocked: false };
  const sovereign = localStorage.getItem(SOVEREIGN_KEY);
  const progress = readLessonProgress();

  const completedModules = Object.entries(MODULE_LESSON_IDS)
    .filter(
      ([, ids]) => ids.filter((id) => progress[id]?.attempted).length >= 3,
    )
    .map(([id]) => id);

  const lines = [
    "=== JackBear.ai Test State Summary ===",
    `Coherence keys recovered: [${coherence.recovered.join(", ")}]`,
    `Coherence unlocked: ${coherence.unlocked}`,
    `Sovereign mode: ${sovereign === "sovereign" ? "ACTIVE" : "inactive"}`,
    `Intelligence modules complete: [${completedModules.join(", ")}]`,
    `Total lessons attempted: ${Object.values(progress).filter((v) => v?.attempted).length}`,
    `Sovereign share seen: ${!!localStorage.getItem(SOVEREIGN_SHARE_SEEN_KEY)}`,
  ];

  return lines.join("\n");
}

// ─── Individual action functions ─────────────────────────────────────────────

function resetAllJbState() {
  const keys = Object.keys(localStorage).filter((k) => k.startsWith("jb_"));
  for (const k of keys) localStorage.removeItem(k);
  window.location.reload();
}

function resetCoherenceOnly() {
  localStorage.removeItem(COHERENCE_KEY);
  window.dispatchEvent(new StorageEvent("storage", { key: COHERENCE_KEY }));
}

function seedCoherenceComplete() {
  const state = {
    recovered: ["identity", "consensus", "compute"],
    unlocked: true,
  };
  localStorage.setItem(COHERENCE_KEY, JSON.stringify(state));
  window.dispatchEvent(new StorageEvent("storage", { key: COHERENCE_KEY }));
}

function seedSovereignMode() {
  localStorage.setItem(SOVEREIGN_KEY, "sovereign");
  // Also ensure mod-01..04 have enough lessons so sovereign detection confirms
  seedModuleCompletion(["mod-01", "mod-02", "mod-03", "mod-04"]);
  window.dispatchEvent(new Event("jb:lesson-progress-updated"));
  window.dispatchEvent(new StorageEvent("storage", { key: SOVEREIGN_KEY }));
}

function seedIntelligenceCertVisibility() {
  // Certificate becomes visible when modules 01–04 each have >= 3 attempts
  seedModuleCompletion(["mod-01", "mod-02", "mod-03", "mod-04"]);
}

function seedModuleCompletion(moduleIds: string[]) {
  const progress = readLessonProgress();
  for (const moduleId of moduleIds) {
    const ids = MODULE_LESSON_IDS[moduleId] ?? [];
    // Seed first 3 lessons as attempted (minimum threshold)
    for (const lessonId of ids.slice(0, 3)) {
      progress[lessonId] = { attempted: true, unlocked: true };
    }
  }
  writeLessonProgress(progress);
}

function seedAllModulesComplete() {
  seedModuleCompletion(["mod-01", "mod-02", "mod-03", "mod-04", "mod-05"]);
}

function clearModuleShareFlags() {
  for (const moduleId of Object.keys(MODULE_LESSON_IDS)) {
    localStorage.removeItem(moduleShareSeenKey(moduleId));
  }
  localStorage.removeItem(SOVEREIGN_SHARE_SEEN_KEY);
}

// ─── UI ───────────────────────────────────────────────────────────────────────

interface ActionRowProps {
  label: string;
  description: string;
  danger?: boolean;
  onAction: () => void;
  actionLabel?: string;
}

function ActionRow({
  label,
  description,
  danger,
  onAction,
  actionLabel = "Run",
}: ActionRowProps) {
  const [done, setDone] = useState(false);

  function handleClick() {
    onAction();
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }

  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-border/40 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <Button
        size="sm"
        variant={danger ? "destructive" : "outline"}
        onClick={handleClick}
        className={`shrink-0 text-xs h-7 px-3 ${done ? "opacity-70" : ""} ${
          !danger
            ? "border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
            : ""
        }`}
      >
        {done ? <Check className="h-3 w-3" /> : actionLabel}
      </Button>
    </div>
  );
}

export default function DevTestPanel() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Guard: never render on production (hooks must come first)
  if (!isDraftEnv()) return null;

  async function handleCopySummary() {
    const summary = getCurrentStateSummary();
    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = summary;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card
      className="border-amber-500/50 bg-amber-500/5 dark:bg-amber-500/[0.03]"
      data-ocid="dev.test.panel"
    >
      <CardHeader className="pb-0 pt-4 px-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-between w-full group"
        >
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-amber-500" />
            <CardTitle className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest font-mono">
              Dev Testing Panel
            </CardTitle>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase tracking-widest">
              DRAFT ONLY
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <span className="text-[10px] font-mono opacity-60">
              not visible in production
            </span>
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>
      </CardHeader>

      {open && (
        <CardContent className="px-5 pb-4 pt-3">
          {/* Warning banner */}
          <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-amber-500 text-base shrink-0 mt-0.5">⚠</span>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed font-mono">
              These controls modify <strong>localStorage only</strong>. No
              backend data is changed. Actions affect the current browser only.
              Reload after applying state changes.
            </p>
          </div>

          <div className="space-y-0">
            {/* Reset all */}
            <ActionRow
              label="Reset all jb_* state"
              description="Clears every jb_* key from localStorage, then reloads the page. Use to start from a clean slate."
              danger
              actionLabel="Reset & Reload"
              onAction={resetAllJbState}
            />

            {/* Reset coherence only */}
            <ActionRow
              label="Reset Coherence keys only"
              description="Removes jb_coherence_keys. Decode progress is cleared; all other state preserved."
              onAction={resetCoherenceOnly}
            />

            {/* Seed coherence complete */}
            <ActionRow
              label="Seed Coherence complete"
              description="Sets all three Coherence keys (IDENTITY, CONSENSUS, COMPUTE) as recovered and unlocked."
              onAction={seedCoherenceComplete}
            />

            {/* Seed sovereign mode */}
            <ActionRow
              label="Seed Sovereign Mode active"
              description="Sets jb_ui_mode=sovereign and seeds Modules 01–04 with 3 attempted lessons each. Triggers gold UI accents on /intelligence."
              onAction={seedSovereignMode}
            />

            {/* Seed intelligence cert visibility */}
            <ActionRow
              label="Seed Intelligence cert visibility"
              description="Seeds Modules 01–04 with enough progress (3+ lessons) to show the Intelligence certificate section."
              onAction={seedIntelligenceCertVisibility}
            />

            {/* Seed modules 01–04 complete */}
            <ActionRow
              label="Seed Modules 01–04 complete"
              description="Seeds the minimum 3 lesson attempts per module for Modules 01–04. Use to test certificate and sovereign state."
              onAction={() =>
                seedModuleCompletion(["mod-01", "mod-02", "mod-03", "mod-04"])
              }
            />

            {/* Seed all modules complete */}
            <ActionRow
              label="Seed all modules complete (01–05)"
              description="Seeds all 5 modules with 3 lesson attempts each. Tests full sovereign + certificate unlock paths."
              onAction={seedAllModulesComplete}
            />

            {/* Clear module share seen flags */}
            <ActionRow
              label="Clear module share seen flags"
              description="Removes jb_intel_share_seen_* and jb_sovereign_share_seen. Share modals will re-fire on next completion detection."
              onAction={clearModuleShareFlags}
            />

            {/* Copy state summary */}
            <div className="flex items-center justify-between gap-4 pt-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  Copy current test state
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Copies a summary of all relevant jb_* state to clipboard for
                  sharing or logging.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopySummary}
                className="shrink-0 text-xs h-7 px-3 border-primary/30 text-primary hover:bg-primary/10"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy State
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Quick reset row for individual modules */}
          <div className="mt-4 pt-3 border-t border-border/40">
            <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-2">
              Seed individual module
            </p>
            <div className="flex flex-wrap gap-2">
              {["mod-01", "mod-02", "mod-03", "mod-04", "mod-05"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => seedModuleCompletion([id])}
                  className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-border/60 bg-background hover:border-primary/40 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {id.replace("mod-0", "M")}
                </button>
              ))}
            </div>
          </div>

          {/* Action legend */}
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <RotateCcw className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                Reload may be needed after seeding
              </span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <CheckCheck className="h-3 w-3 text-amber-500" />
              <span className="text-[10px] text-amber-600 dark:text-amber-400">
                Backend data is never touched
              </span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
