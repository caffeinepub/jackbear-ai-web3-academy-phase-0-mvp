import DfinityXEmbed from "@/components/news/DfinityXEmbed";
import NewsTicker from "@/components/news/NewsTicker";
import { Skeleton } from "@/components/ui/skeleton";
import { useICPNews } from "@/hooks/useICPNews";
import { Newspaper } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const FILTER_ALL = "All";

export default function NewsPage() {
  const { items, loading, error } = useICPNews();
  const [readingStreak, setReadingStreak] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_ALL);

  useEffect(() => {
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem("jb_news_read_dates");
      const dates: string[] = raw ? JSON.parse(raw) : [];
      if (!dates.includes(todayStr)) {
        dates.push(todayStr);
        localStorage.setItem("jb_news_read_dates", JSON.stringify(dates));
      }
      const sorted = [...new Set(dates)].sort().reverse();
      let streak = 0;
      const cursor = new Date();
      cursor.setHours(0, 0, 0, 0);
      for (const d of sorted) {
        const cursorStr = cursor.toISOString().slice(0, 10);
        if (d === cursorStr) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
        } else {
          break;
        }
      }
      setReadingStreak(streak);
    } catch {}
  }, []);

  // Derive available source filters from live data only
  const availableSources = useMemo(() => {
    const seen = new Set<string>();
    for (const item of items) {
      if (item.source) seen.add(item.source);
    }
    // Ordered: DFINITY first, then others alphabetically
    const sources = Array.from(seen).sort((a, b) => {
      if (a === "DFINITY") return -1;
      if (b === "DFINITY") return 1;
      return a.localeCompare(b);
    });
    return sources;
  }, [items]);

  // Client-side filter — no refetch, top-10 cap applied after filter
  const displayItems = useMemo(() => {
    const filtered =
      activeFilter === FILTER_ALL
        ? items
        : items.filter((item) => item.source === activeFilter);
    return filtered.slice(0, 10);
  }, [items, activeFilter]);

  const tickerItems = displayItems
    .slice(0, 5)
    .map((item) => ({ text: item.title }));

  return (
    <div className="min-h-screen bg-background">
      <NewsTicker
        items={
          loading || tickerItems.length === 0
            ? [{ text: "Loading latest ICP news..." }]
            : tickerItems
        }
      />

      <div className="container mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              style={{
                padding: "8px",
                borderRadius: "10px",
                background: "oklch(0.22 0.1 290)",
                border: "1px solid oklch(0.35 0.15 290)",
              }}
            >
              <Newspaper size={22} style={{ color: "oklch(0.72 0.22 290)" }} />
            </div>
            <h1
              className="text-3xl font-bold font-display"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.82 0.14 290), oklch(0.72 0.24 300))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ICP News Feed
            </h1>
          </div>
          <p style={{ color: "oklch(0.6 0.08 290)", fontSize: "14px" }}>
            Latest from DFINITY &amp; the Internet Computer ecosystem
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* Streak */}
            {readingStreak >= 2 && (
              <div
                className="flex items-center gap-3 mb-4"
                style={{ fontSize: "12px", color: "oklch(0.62 0.1 290)" }}
              >
                <span>Reading streak: {readingStreak} days</span>
              </div>
            )}

            {/* Source filter pills */}
            {!loading && !error && availableSources.length > 1 && (
              <div
                className="flex flex-wrap gap-2 mb-5"
                data-ocid="news.source_filters"
              >
                {[FILTER_ALL, ...availableSources].map((source) => {
                  const isActive = activeFilter === source;
                  return (
                    <button
                      type="button"
                      key={source}
                      onClick={() => setActiveFilter(source)}
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: "999px",
                        border: isActive
                          ? "1px solid oklch(0.55 0.2 290)"
                          : "1px solid hsl(var(--border))",
                        background: isActive
                          ? "oklch(0.28 0.12 290)"
                          : "hsl(var(--card))",
                        color: isActive
                          ? "oklch(0.82 0.18 290)"
                          : "hsl(var(--muted-foreground))",
                        cursor: "pointer",
                        transition:
                          "border-color 0.15s, background 0.15s, color 0.15s",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {source}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Loading skeleton */}
            {loading && (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-ocid="news.loading_state"
              >
                {["a", "b", "c", "d", "e", "f"].map((sk) => (
                  <div
                    key={sk}
                    style={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      padding: "16px",
                    }}
                  >
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5 mb-3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div
                data-ocid="news.error_state"
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  color: "oklch(0.55 0.08 290)",
                }}
              >
                {error}
              </div>
            )}

            {/* News grid */}
            {!loading && !error && displayItems.length === 0 && (
              <div
                data-ocid="news.empty_state"
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  color: "oklch(0.55 0.08 290)",
                }}
              >
                {activeFilter === FILTER_ALL
                  ? "No news items found."
                  : `No ${activeFilter} items found.`}
              </div>
            )}

            {!loading && !error && displayItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayItems.map((item, idx) => (
                  <a
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "block" }}
                    data-ocid={`news.item.${idx + 1}`}
                  >
                    <div
                      style={{
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                        padding: "16px",
                        height: "100%",
                        transition: "border-color 0.15s, background 0.15s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = "oklch(0.5 0.18 290)";
                        el.style.background = "hsl(var(--muted))";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = "hsl(var(--border))";
                        el.style.background = "hsl(var(--card))";
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "oklch(0.65 0.18 290)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: "8px",
                        }}
                      >
                        {item.source}
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "hsl(var(--foreground))",
                          lineHeight: 1.45,
                          marginBottom: "10px",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        {formatDate(item.pubDate)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-4">
              <DfinityXEmbed />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
