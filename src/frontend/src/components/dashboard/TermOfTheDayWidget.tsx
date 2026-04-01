import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { allGlossaryTerms } from "@/lib/glossaryData";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function TermOfTheDayWidget() {
  const now = new Date();
  const idx =
    (now.getFullYear() * 366 + getDayOfYear(now)) % allGlossaryTerms.length;
  const term = allGlossaryTerms[idx];

  if (!term) return null;

  return (
    <Card
      data-ocid="term_of_day.card"
      className="surface-elevated border-primary/20 overflow-hidden"
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />
      <CardContent className="pt-5 pb-5 space-y-3">
        {/* Compact label row — no separate CardHeader */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Term of the Day
            </span>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {term.category}
          </Badge>
        </div>

        {/* Term name — dominant, no competing header above it */}
        <h3 className="text-2xl font-display font-bold gradient-text-primary leading-tight">
          {term.term}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {term.definition}
        </p>

        <Link
          to="/glossary"
          data-ocid="term_of_day.link"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View full glossary
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
