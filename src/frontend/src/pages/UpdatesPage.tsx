import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export interface UpdateEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  category: "feature" | "fix" | "content" | "milestone";
}

const CATEGORY_COLORS: Record<UpdateEntry["category"], string> = {
  milestone: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  feature: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  content: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  fix: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

const CATEGORY_ICONS: Record<UpdateEntry["category"], string> = {
  milestone: "fa-solid fa-rocket",
  feature: "fa-solid fa-wand-magic-sparkles",
  content: "fa-solid fa-book-open",
  fix: "fa-solid fa-wrench",
};

export const CORE_UPDATES: UpdateEntry[] = [
  {
    version: "v371",
    date: "2026-03-26",
    title: "Relaunch Integrity Audit & System Hardening",
    description:
      "Full relaunch audit pass covering v264–v371: backend is now sole source of truth for all BP, XP, leaderboard, and progression data. Lesson unlock bug fixed (opening a lesson no longer unlocks the next). Lessons Done counter now reflects real backend completions. ICP feed relabeled as curated. Easter egg discoveries are now permanent per device. Monthly Prize remains Coming Soon. All stale localStorage reward paths removed.",
    category: "milestone",
  },
  {
    version: "v263",
    date: "2026-03-14",
    title: "ICPEDIA Glossary, World Streaks & Progress Certificate",
    description:
      "Expanded ICPEDIA Glossary now covers all 8 worlds with A–Z filter. World Completion Streaks tracker added to dashboard — complete consecutive worlds within 7 days for +150 BP. Progress Certificate unlocks after completing 70 lessons across Worlds 0–6.",
    category: "feature",
  },
  {
    version: "v261",
    date: "2026-03-12",
    title: "World 8.5, Social Share Cards & What's New Changelog",
    description:
      "World 8.5: Verifiable Intelligence Layer unlocks after all World 8 Coherence lessons are completed — 10 advanced lessons bridging Chain-Key, sovereign AI, and verifiable randomness. Social Share Cards added to every Boss Quiz result screen. What's New changelog now live at /updates.",
    category: "feature",
  },
  {
    version: "v260",
    date: "2026-03-11",
    title: "Notification Center",
    description:
      "In-app bell icon added to the header. Receive real-time notifications for Bear Points awards, world unlocks, and Easter Egg discoveries.",
    category: "feature",
  },
  {
    version: "v259",
    date: "2026-03-10",
    title: "Bear Points Leaderboard, Landing Page & Meta Tags",
    description:
      "Global Bear Points Leaderboard live at /leaderboard with weekly/all-time toggle. Landing page tightened and optimized. All SEO meta tags, OpenGraph, and Twitter card data finalized for jackbear.app.",
    category: "feature",
  },
  {
    version: "v258",
    date: "2026-03-09",
    title: "ICP News Feed",
    description:
      "Real-time ICP News Feed live at /news — aggregates DFINITY Medium, InternetComputer.org, Reddit, and YouTube R&D. Category filters: Protocol, DeFi, dApps, Governance, AI. Dashboard widget shows latest 3 headlines.",
    category: "feature",
  },
  {
    version: "v248",
    date: "2026-03-05",
    title: "Favicon, Logo & Mobile Icons Finalized",
    description:
      "All favicon and mobile icon assets correctly wired: favicon.ico (browser tab), apple-touch-icon (iOS home screen), and Android PWA icons (192x192, 512x512). Web manifest added for installable PWA support.",
    category: "fix",
  },
  {
    version: "v247",
    date: "2026-03-04",
    title: "Dashboard Easter Egg Hints & World 8 Social Hints",
    description:
      "Dashboard now shows progressive Easter Egg hints — silhouettes for undiscovered eggs, specific trigger instructions after 7 sessions. World 8 key panel displays platform hints: Key 1 (LinkedIn), Key 2 (X), Key 3 (Instagram).",
    category: "feature",
  },
  {
    version: "v246",
    date: "2026-03-03",
    title: "Dark/Light Mode Fixed & Missing Routes Restored",
    description:
      "Dark/light mode toggle now works platform-wide. /about-caffeine-ai and /chain-key-cryptography routes fully restored. ThemeProvider mounted correctly at the app root.",
    category: "fix",
  },
  {
    version: "v245",
    date: "2026-03-02",
    title: "Footer Easter Egg Fixed",
    description:
      "Footer Easter Egg trigger repaired — hotspot is now injected into the DOM before the click listener attaches, resolving the silent failure.",
    category: "fix",
  },
  {
    version: "v244",
    date: "2026-03-01",
    title: "World 7 Chain-Key Lessons Fully Restored",
    description:
      "All 10 Chain-Key Technology bonus lessons (IDs 61–70) are back under the Bonus World 7 unlock gate. The 'Advanced Content Coming Soon' placeholder has been removed.",
    category: "content",
  },
  {
    version: "v243",
    date: "2026-02-28",
    title: "World 8: Coherence Layer Added",
    description:
      "World 8 — Coherence: The Human Skill for the AI Era is live. Unlocks via 3-key code entry distributed across JackBear.ai social channels (LinkedIn, X, Instagram). 10 full lessons on AI, coherence, and human agency. World 8.5 Easter Egg wired in for graduates.",
    category: "milestone",
  },
  {
    version: "v242",
    date: "2026-02-24",
    title: "Easter Egg System Aligned & 30-Day Reset",
    description:
      "All 9 Easter Egg triggers audited and aligned. 30-day per-user reset cycle implemented — BP re-awarded each cycle. All-eggs-within-30-days bonus: fixed BP lump-sum + special badge + multiplier boost.",
    category: "fix",
  },
  {
    version: "v240",
    date: "2026-02-22",
    title: "Bonus World 7 Unlock Fixed",
    description:
      "Bonus World 7 now correctly reveals after submitting the World 6 Boss Quiz (pass or fail). Triggers the bonus-world-reveal Easter Egg (50 BP).",
    category: "fix",
  },
  {
    version: "v239",
    date: "2026-02-18",
    title: "Progression Logic Patch",
    description:
      "Lessons unlock permanently after first attempt (pass or fail) — never re-lock. Retry allowed at any time. Best score preserved. Boss Quiz only accessible after all lessons in a world are attempted. World unlock persists across sessions.",
    category: "fix",
  },
  {
    version: "v225",
    date: "2026-02-01",
    title: "Production Launch",
    description:
      "JackBear.ai is officially live on jackbear.app. All 6 core Worlds (60 lessons), Bear Points reward system, and Bonus World 7 (Chain-Key) are deployed to the Internet Computer.",
    category: "milestone",
  },
];

function UpdateCard({ entry, index }: { entry: UpdateEntry; index: number }) {
  const colorClass = CATEGORY_COLORS[entry.category];
  const iconClass = CATEGORY_ICONS[entry.category];

  return (
    <div className="flex gap-4 group" data-ocid={`updates.item.${index + 1}`}>
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
          <i className={`${iconClass} text-primary text-xs`} />
        </div>
        <div className="flex-1 w-px bg-border/40 mt-2" />
      </div>

      {/* Content */}
      <Card className="flex-1 mb-6 border-border/50 bg-card/60 hover:bg-card/80 transition-colors">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono text-muted-foreground">
              {entry.version}
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span className="text-xs text-muted-foreground">{entry.date}</span>
            <Badge
              variant="outline"
              className={`text-xs capitalize border ${colorClass}`}
            >
              {entry.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground mb-1">{entry.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {entry.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UpdatesPage() {
  const navigate = useNavigate();

  // Merge admin entries from localStorage on top
  const adminRaw = localStorage.getItem("jb_admin_updates");
  const adminEntries: UpdateEntry[] = adminRaw ? JSON.parse(adminRaw) : [];
  const allEntries = [...adminEntries, ...CORE_UPDATES];

  return (
    <div className="min-h-screen bg-background py-10" data-ocid="updates.page">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/dashboard" })}
            className="mb-4 text-muted-foreground hover:text-foreground"
            data-ocid="updates.back.button"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-clock-rotate-left text-primary text-xl" />
            <h1 className="text-3xl font-bold font-display">What's New</h1>
          </div>
          <p className="text-muted-foreground">
            Platform updates, new features, and content releases for
            JackBear.ai.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {allEntries.map((entry, i) => (
            <UpdateCard key={`${entry.version}-${i}`} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
