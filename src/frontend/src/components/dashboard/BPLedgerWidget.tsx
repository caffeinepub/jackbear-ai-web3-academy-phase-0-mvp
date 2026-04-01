import { getNotifications } from "@/additions/notificationStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";

function getHistory() {
  return getNotifications()
    .filter((n) => n.type === "bp_award")
    .slice(0, 5);
}

export default function BPLedgerWidget() {
  const navigate = useNavigate();
  const history = getHistory();

  return (
    <Card
      className="border-primary/20 bg-primary/5"
      data-ocid="bp_ledger_widget.card"
    >
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Bear Points History
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-5">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No history yet — complete a lesson or quiz to earn Bear Points!
          </p>
        ) : (
          <div className="space-y-2 mb-3">
            {history.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground/90 truncate max-w-[180px]">
                  {n.source ? `${n.source} completed` : n.message}
                </span>
                <span className="text-muted-foreground text-xs shrink-0 ml-2">
                  {new Date(n.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => navigate({ to: "/bp-history" })}
          className="text-xs text-primary hover:underline font-medium mt-1"
          data-ocid="bp_ledger_widget.link"
        >
          View Full History →
        </button>
      </CardContent>
    </Card>
  );
}
