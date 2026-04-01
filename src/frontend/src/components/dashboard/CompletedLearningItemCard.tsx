import type { Time } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";

interface CompletedLearningItemCardProps {
  lessonId: string;
  completionTime: Time;
}

export function CompletedLearningItemCard({
  lessonId,
  completionTime,
}: CompletedLearningItemCardProps) {
  const completionDate = new Date(Number(completionTime) / 1000000);
  const formattedDate = completionDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getLessonTitle = (id: string): string => {
    if (id.startsWith("0.")) {
      const lessonMap: Record<string, string> = {
        "0.00": "What is Web3?",
        "0.10": "What Is Blockchain?",
        "0.20": "Keys & Signatures",
        "0.30": "How to Use a Wallet",
        "0.40": "Consensus Basics",
        "0.50": "Fungible & Non-fungible Tokens",
        "0.60": "Bitcoin vs. ICP",
        "0.70": "Smart Contracts Explained",
        "0.80": "Case Study: Bitcoin Mining",
        "0.90": "First Steps in Web3",
      };
      return lessonMap[id] || `Lesson ${id}`;
    }
    return `Lesson ${id}`;
  };

  const getWorldBadge = (id: string): string => {
    if (id.startsWith("0.")) return "World 0";
    const lessonNum = Number.parseInt(id);
    if (lessonNum >= 1 && lessonNum <= 10) return "World 1";
    if (lessonNum >= 11 && lessonNum <= 20) return "World 2";
    if (lessonNum >= 21 && lessonNum <= 30) return "World 3";
    if (lessonNum >= 31 && lessonNum <= 40) return "World 4";
    if (lessonNum >= 41 && lessonNum <= 50) return "World 5";
    if (lessonNum >= 51 && lessonNum <= 60) return "World 6";
    return "Unknown";
  };

  return (
    <Card className="border-primary/30 bg-card/50 backdrop-blur-sm hover:shadow-glow-md transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent neon-glow flex-shrink-0" />
            <span>{getLessonTitle(lessonId)}</span>
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-primary/20 text-primary border-primary/30 flex-shrink-0"
          >
            {getWorldBadge(lessonId)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Completed {formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
