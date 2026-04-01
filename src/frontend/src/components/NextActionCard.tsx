import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetCallerUserProfile,
  useGetLessonProgress,
} from "@/hooks/useQueries";
import { findNextAction } from "@/lib/worldProgress";
import { WORLDS } from "@/pages/CoursesPage";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Sparkles, Trophy } from "lucide-react";

export default function NextActionCard() {
  const navigate = useNavigate();
  const { data: _userProfile } = useGetCallerUserProfile();
  const { data: allProgress = [] } = useGetLessonProgress("all");

  // Build worlds array compatible with findNextAction (WorldMeta shape)
  // WORLDS now uses .lessons array directly (no lessonRange)
  const worldsForAction = WORLDS.map((w) => ({
    id: w.id,
    title: w.title,
    lessons: w.lessons.map((l) => ({ id: l.id, title: l.title })),
  }));

  const nextAction = findNextAction(worldsForAction, allProgress);

  if (!nextAction || nextAction.type === "world_complete") {
    return (
      <Card className="surface-elevated border-accent/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>All Complete!</CardTitle>
              <CardDescription>
                You&apos;ve mastered all available content
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Congratulations on completing your learning journey! Check back for
            new content.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isBoss = nextAction.type === "boss";

  const getActionIcon = () => {
    if (isBoss) return <Trophy className="h-6 w-6 text-white" />;
    return <BookOpen className="h-6 w-6 text-white" />;
  };

  const getActionGradient = () => {
    if (isBoss) return "from-amber-500 to-orange-500";
    return "from-primary to-purple-600";
  };

  const getActionTitle = () => {
    if (isBoss) return "Boss Quiz Ready";
    return "Continue Learning";
  };

  const getActionDescription = () => {
    if (nextAction.type === "lesson") return nextAction.lessonTitle;
    if (nextAction.type === "boss") return nextAction.lessonTitle;
    return "Continue your learning journey";
  };

  const handleActionClick = () => {
    navigate({ to: "/courses" });
  };

  return (
    <Card className="surface-elevated border-primary/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-lg bg-gradient-to-br ${getActionGradient()}`}
          >
            {getActionIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle>{getActionTitle()}</CardTitle>
              {isBoss && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Sparkles className="h-3 w-3" />
                  Boss
                </span>
              )}
            </div>
            <CardDescription>{getActionDescription()}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleActionClick}
          className={`w-full bg-gradient-to-r ${getActionGradient()}`}
          size="lg"
        >
          {getActionIcon()}
          <span className="ml-2">
            {isBoss ? "Start Boss Quiz" : "Continue"}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
