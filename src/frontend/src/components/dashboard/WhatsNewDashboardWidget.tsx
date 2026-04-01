import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CORE_UPDATES } from "@/pages/UpdatesPage";
import { useNavigate } from "@tanstack/react-router";

export default function WhatsNewDashboardWidget() {
  const navigate = useNavigate();

  // Merge admin entries
  const adminRaw = localStorage.getItem("jb_admin_updates");
  const adminEntries = adminRaw ? JSON.parse(adminRaw) : [];
  const latest = [...adminEntries, ...CORE_UPDATES].slice(0, 3);

  return (
    <Card className="border-border/50 bg-card/60" data-ocid="updates.card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-primary" />
          What's New
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {latest.map(
          (
            entry: { version: string; title: string; category: string },
            i: number,
          ) => (
            <div
              key={`${entry.version}-${i}`}
              className="flex items-start gap-3"
              data-ocid={`updates.item.${i + 1}`}
            >
              <Badge
                variant="outline"
                className="text-xs font-mono text-muted-foreground border-border/50 flex-shrink-0 mt-0.5"
              >
                {entry.version}
              </Badge>
              <span className="text-sm text-foreground/80 leading-snug">
                {entry.title}
              </span>
            </div>
          ),
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 text-primary border-primary/30 hover:bg-primary/10"
          onClick={() => navigate({ to: "/updates" })}
          data-ocid="updates.view_all.button"
        >
          <i className="fa-solid fa-list mr-2" />
          View All Updates
        </Button>
      </CardContent>
    </Card>
  );
}
