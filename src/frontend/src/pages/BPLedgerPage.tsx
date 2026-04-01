import { getNotifications } from "@/additions/notificationStore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Zap } from "lucide-react";

function getHistory() {
  return getNotifications()
    .filter((n) => n.type === "bp_award")
    .sort((a, b) => b.timestamp - a.timestamp);
}

export default function BPLedgerPage() {
  const navigate = useNavigate();
  const history = getHistory();

  return (
    <div className="min-h-screen bg-background py-8" data-ocid="bp_ledger.page">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/dashboard" })}
            className="gap-1.5"
            data-ocid="bp_ledger.button"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Bear Points History
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Your complete BP earning record
            </p>
          </div>
        </div>

        {history.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="bp_ledger.empty_state"
          >
            <Zap className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium">
              No Bear Points earned yet. Start exploring!
            </p>
            <p className="text-sm mt-1">
              Complete lessons, find hidden fragments, and keep your streak
              going.
            </p>
          </div>
        ) : (
          <div
            className="rounded-lg border border-border overflow-hidden"
            data-ocid="bp_ledger.table"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Bear Points</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((n, index) => (
                  <TableRow
                    key={n.id}
                    data-ocid={`bp_ledger.row.${index + 1}`}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="font-medium text-sm">
                      {n.source ? `${n.source} Completed` : n.message}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                        <Zap className="h-3 w-3" />
                        {n.message.match(/\+(\d+)/)?.[1] ?? "?"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(n.timestamp).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {n.source ?? "Reward"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
