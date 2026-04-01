import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy } from "lucide-react";

// Mock mastery data for demonstration
const mockMasterySummary = [
  { worldId: 0, worldTitle: "Discovery", tier: "Gold" as const },
  { worldId: 1, worldTitle: "Sovereign Basics", tier: "Silver" as const },
  { worldId: 2, worldTitle: "ICP Deep Dive", tier: "Bronze" as const },
];

const MASTERY_BADGE_CONFIG = {
  Gold: {
    variant: "default" as const,
    className: "bg-yellow-500 hover:bg-yellow-600",
  },
  Silver: {
    variant: "secondary" as const,
    className: "bg-muted-foreground/40 hover:bg-muted-foreground/50",
  },
  Bronze: {
    variant: "outline" as const,
    className: "border-amber-600 text-amber-600",
  },
};

export default function MasterySummarySection() {
  return (
    <Card className="surface-elevated">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          <CardTitle>Mastery Summary</CardTitle>
        </div>
        <CardDescription>
          Your achievement tiers across all worlds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockMasterySummary.map((world) => {
            const config = MASTERY_BADGE_CONFIG[world.tier];
            return (
              <div
                key={world.worldId}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <span className="font-medium">
                  World {world.worldId}: {world.worldTitle}
                </span>
                <Badge variant={config.variant} className={config.className}>
                  {world.tier}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
