import { allGlossaryTerms } from "@/lib/glossaryData";
import { NEWS_ITEMS } from "@/lib/newsData";
import { CORE_UPDATES } from "@/pages/UpdatesPage";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, CalendarDays } from "lucide-react";

const SOURCE_LABELS: Record<string, string> = {
  "dfinity-medium": "DFINITY",
  "internetcomputer-news": "IC.org",
  "youtube-rd": "YouTube",
  "icp-reddit": "Reddit",
};

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function TodayOnICPWidget() {
  const navigate = useNavigate();
  const now = new Date();

  // --- Data derivation (all wrapped safely) ---

  const topNews = (() => {
    try {
      return [...NEWS_ITEMS]
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
        .slice(0, 3);
    } catch {
      return [];
    }
  })();

  const glossaryTerm = (() => {
    try {
      const idx =
        (now.getFullYear() * 366 + getDayOfYear(now)) % allGlossaryTerms.length;
      return allGlossaryTerms[idx] ?? null;
    } catch {
      return null;
    }
  })();

  const latestUpdate = (() => {
    try {
      return CORE_UPDATES[0] ?? null;
    } catch {
      return null;
    }
  })();

  const hasAnyContent =
    topNews.length > 0 || glossaryTerm !== null || latestUpdate !== null;

  if (!hasAnyContent) return null;

  return (
    <div
      className="border border-border/50 rounded-xl bg-card/60 p-4 space-y-3"
      data-ocid="today_on_icp.card"
    >
      {/* Header row */}
      <div className="flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Today on ICP
        </span>
      </div>

      {/* Top ICP News */}
      {topNews.length > 0 && (
        <div className="space-y-1.5">
          {topNews.map((item) => (
            <a
              key={item.id}
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
              data-ocid="today_on_icp.link"
            >
              <span
                className="shrink-0 rounded-full bg-primary"
                style={{ width: 5, height: 5 }}
              />
              <span className="text-[13px] font-medium text-foreground truncate leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </span>
              <span className="shrink-0 text-[11px] text-muted-foreground">
                · {SOURCE_LABELS[item.source] ?? item.source}
              </span>
            </a>
          ))}
          <Link
            to="/feed"
            className="inline-block text-[11px] font-medium text-primary hover:text-primary/80 transition-colors mt-0.5"
            data-ocid="today_on_icp.feed.link"
          >
            View all →
          </Link>
        </div>
      )}

      {/* Divider */}
      {topNews.length > 0 && (glossaryTerm || latestUpdate) && (
        <div className="border-t border-border/40" />
      )}

      {/* Glossary of the Day */}
      {glossaryTerm && (
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <BookOpen className="h-3 w-3 text-primary shrink-0 mt-0.5" />
            <span className="text-[13px] font-semibold text-foreground">
              {glossaryTerm.term}:
            </span>
            <span className="text-[12px] text-muted-foreground line-clamp-1">
              {glossaryTerm.definition.length > 60
                ? `${glossaryTerm.definition.slice(0, 60)}…`
                : glossaryTerm.definition}
            </span>
          </div>
          <Link
            to="/glossary"
            className="inline-block text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
            data-ocid="today_on_icp.glossary.link"
          >
            Browse glossary →
          </Link>
        </div>
      )}

      {/* What's New */}
      {latestUpdate && (
        <button
          type="button"
          onClick={() => navigate({ to: "/updates" })}
          className="w-full text-left flex items-center gap-2 group"
          data-ocid="today_on_icp.updates.button"
        >
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground border border-border/60 rounded px-1 py-0.5">
            {latestUpdate.version}
          </span>
          <span className="text-[13px] text-foreground group-hover:text-primary transition-colors truncate">
            {latestUpdate.title}
          </span>
        </button>
      )}

      {/* Continue Learning */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={() => navigate({ to: "/courses" })}
          className="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
          data-ocid="today_on_icp.continue.button"
        >
          → Continue where you left off
        </button>
      </div>
    </div>
  );
}
