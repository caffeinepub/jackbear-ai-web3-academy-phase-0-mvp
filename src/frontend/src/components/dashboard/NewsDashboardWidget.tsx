import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useICPNews } from "@/hooks/useICPNews";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Dot } from "lucide-react";

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}

export default function NewsDashboardWidget() {
  const navigate = useNavigate();
  const { items, loading, error } = useICPNews();
  const latest = items.slice(0, 3);

  return (
    <DashboardSection
      title="ICP News"
      description="Latest from the Internet Computer ecosystem"
    >
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--card))",
        }}
      >
        {loading && (
          <div style={{ padding: "14px 16px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-start gap-2"
                style={{
                  paddingBottom: i < 2 ? "14px" : 0,
                  marginBottom: i < 2 ? "14px" : 0,
                  borderBottom: i < 2 ? "1px solid hsl(var(--border))" : "none",
                }}
              >
                <Skeleton
                  className="rounded-full"
                  style={{ width: 6, height: 6, marginTop: 6, flexShrink: 0 }}
                />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-2.5 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              padding: "20px 16px",
              fontSize: "13px",
              color: "hsl(var(--muted-foreground))",
              textAlign: "center",
            }}
            data-ocid="news.error_state"
          >
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          latest.map((item, idx) => (
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
                  padding: "14px 16px",
                  borderBottom:
                    idx < latest.length - 1
                      ? "1px solid hsl(var(--border))"
                      : "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "hsl(var(--muted))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "hsl(var(--card))";
                }}
              >
                <div className="flex items-start gap-2">
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "hsl(var(--primary))",
                      marginTop: "6px",
                      flexShrink: 0,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "hsl(var(--foreground))",
                        lineHeight: 1.4,
                        marginBottom: "4px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.title}
                    </p>
                    <div className="flex items-center" style={{ gap: "2px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "hsl(var(--primary))",
                          fontWeight: 500,
                        }}
                      >
                        {item.source}
                      </span>
                      <Dot
                        size={12}
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          color: "hsl(var(--muted-foreground))",
                        }}
                      >
                        {formatRelativeTime(item.pubDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}

        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs hover:bg-primary/10 hover:text-primary"
            onClick={() => navigate({ to: "/news" })}
            data-ocid="news.primary_button"
          >
            View All News <ArrowRight size={13} className="ml-1" />
          </Button>
        </div>
      </div>
    </DashboardSection>
  );
}
