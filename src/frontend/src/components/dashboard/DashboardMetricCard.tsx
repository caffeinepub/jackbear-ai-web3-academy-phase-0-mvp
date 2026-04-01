import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DashboardMetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string | ReactNode;
}

export function DashboardMetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: DashboardMetricCardProps) {
  return (
    <Card className="border-primary/30 bg-card/50 backdrop-blur-sm hover:shadow-glow-sm transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary neon-glow" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-display font-bold mb-2">{value}</div>
        {typeof subtitle === "string" ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : (
          <div className="mt-2">{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
}
