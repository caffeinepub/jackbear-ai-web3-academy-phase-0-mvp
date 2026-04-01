import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { NewsItem } from "@/lib/newsData";
import { ExternalLink, Share2 } from "lucide-react";

const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Protocol: {
    bg: "oklch(0.22 0.08 240)",
    text: "oklch(0.75 0.18 230)",
    border: "oklch(0.35 0.12 240)",
  },
  DeFi: {
    bg: "oklch(0.2 0.07 160)",
    text: "oklch(0.72 0.18 155)",
    border: "oklch(0.32 0.12 160)",
  },
  dApps: {
    bg: "oklch(0.22 0.08 50)",
    text: "oklch(0.78 0.18 55)",
    border: "oklch(0.35 0.12 50)",
  },
  Governance: {
    bg: "oklch(0.22 0.08 80)",
    text: "oklch(0.82 0.16 80)",
    border: "oklch(0.35 0.12 80)",
  },
  AI: {
    bg: "oklch(0.2 0.08 300)",
    text: "oklch(0.75 0.22 295)",
    border: "oklch(0.35 0.14 300)",
  },
};

const SOURCE_LABELS: Record<string, string> = {
  "dfinity-medium": "DFINITY Blog",
  "internetcomputer-news": "IC.org",
  "youtube-rd": "YouTube R&D",
  "icp-reddit": "Reddit",
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

interface NewsItemCardProps {
  item: NewsItem;
}

export default function NewsItemCard({ item }: NewsItemCardProps) {
  const catStyle = CATEGORY_STYLES[item.category] ?? CATEGORY_STYLES.Protocol;
  const sourceLabel = SOURCE_LABELS[item.source] ?? item.source;
  const excerpt =
    item.excerpt.length > 160
      ? `${item.excerpt.slice(0, 157)}...`
      : item.excerpt;

  return (
    <Card
      className="surface-elevated transition-all duration-200 hover:border-primary/40 group"
      style={{ borderColor: "oklch(0.28 0.08 290)" }}
    >
      <CardContent className="p-4 space-y-3">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            style={{
              background: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "2px 8px",
            }}
          >
            {item.category}
          </Badge>
          <span
            style={{
              fontSize: "11px",
              color: "oklch(0.55 0.1 290)",
              fontFamily: "monospace",
            }}
          >
            {sourceLabel}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "oklch(0.5 0.08 290)",
              marginLeft: "auto",
            }}
          >
            {formatRelativeTime(item.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-semibold leading-snug group-hover:text-primary transition-colors"
          style={{ fontSize: "14px", lineHeight: 1.4 }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "13px",
            color: "oklch(0.62 0.07 290)",
            lineHeight: 1.6,
          }}
        >
          {excerpt}
        </p>

        {/* Related lesson */}
        {item.relatedLesson && (
          <a
            href={item.relatedLesson.path}
            style={{
              display: "inline-block",
              fontSize: "11px",
              color: "oklch(0.78 0.18 65)",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Learn more → {item.relatedLesson.title}
          </a>
        )}

        {/* Actions row */}
        <div className="flex items-center gap-1">
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary"
              data-ocid="news.link"
            >
              Read more <ExternalLink size={11} className="ml-1" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary"
            data-ocid="news.button"
            onClick={() => {
              const shareUrl = "https://jackbear.ai";
              const shareText = `${item.title} — ${shareUrl}`;
              if (navigator.share) {
                navigator
                  .share({ title: item.title, url: shareUrl })
                  .catch(() => {});
              } else {
                navigator.clipboard.writeText(shareText).catch(() => {});
              }
            }}
          >
            <Share2 size={11} className="mr-1" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
