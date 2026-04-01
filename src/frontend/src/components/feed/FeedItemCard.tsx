import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FEED_SOURCE_LABELS } from "@/lib/icpFeed/constants";
import { formatRelativeTime, normalizeExcerpt } from "@/lib/icpFeed/format";
import type { FeedItem } from "@/lib/icpFeed/types";
import { getCtaLabel, getSafeUrl } from "@/lib/icpFeed/url";
import { AlertCircle, ExternalLink } from "lucide-react";

interface FeedItemCardProps {
  item: FeedItem;
}

export default function FeedItemCard({ item }: FeedItemCardProps) {
  const sourceLabel = FEED_SOURCE_LABELS[item.source];
  const sourceBadgeVariant =
    item.source === "dfinity-medium"
      ? "default"
      : item.source === "internetcomputer-news"
        ? "secondary"
        : "outline";

  const { url, isFallback } = getSafeUrl(item.externalUrl, item.source);
  const ctaLabel = getCtaLabel(isFallback, item.source);

  return (
    <Card className="surface-elevated hover:shadow-glow-sm transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <Badge variant={sourceBadgeVariant} className="shrink-0">
            {sourceLabel}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(item.publishedAt)}
          </span>
        </div>
        <CardTitle className="text-lg md:text-xl mt-2 leading-tight">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {normalizeExcerpt(item.excerpt, 180)}
        </p>

        {isFallback && (
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
            <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
            <span>Direct link unavailable. Opening source page instead.</span>
          </div>
        )}

        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            {ctaLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
