import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  Flame,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function FeaturesPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: t.xpSystem,
      description: t.xpSystemDescription,
      details: [
        "Complete lessons to earn XP",
        "Bonus XP for daily check-ins",
        "Special XP rewards for achievements",
        "Track your progress in real-time",
      ],
      color: "text-primary",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: t.levelProgression,
      description: t.levelProgressionDescription,
      details: [
        "Level up every 1000 XP",
        "Unlock advanced worlds",
        "Showcase your expertise",
        "Earn special badges",
      ],
      color: "text-accent",
    },
    {
      icon: <Flame className="h-10 w-10" />,
      title: t.dailyStreaks,
      description: t.dailyStreaksDescription,
      details: [
        "Check in daily to maintain streak",
        "50 XP bonus per check-in",
        "100 XP bonus at 7-day streak",
        "250 XP bonus at 14-day streak",
      ],
      color: "text-primary",
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: t.questSystem,
      description: t.questSystemDescription,
      details: [
        "Daily quest challenges",
        "Special event quests",
        "Earn XP and credits",
        "Track quest progress",
      ],
      color: "text-accent",
    },
    {
      icon: <Trophy className="h-10 w-10" />,
      title: t.leaderboardFeature,
      description: t.leaderboardFeatureDescription,
      details: [
        "Real-time XP rankings",
        "See your global position",
        "Compare with top learners",
        "Earn recognition",
      ],
      color: "text-primary",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: t.bearCreditsFeature,
      description: t.bearCreditsFeatureDescription,
      details: [
        "Earn credits from quests",
        "Track total earnings",
        "View credit balance",
        "Future utility coming soon",
      ],
      color: "text-accent",
    },
    {
      icon: <Star className="h-10 w-10" />,
      title: t.learningWorlds,
      description: t.learningWorldsDescription,
      details: [
        "World 1: Web3 Foundations",
        "World 2: ICP & Canisters",
        "Track world progress",
        "More worlds coming soon",
      ],
      color: "text-primary",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: t.community,
      description: t.communityDescription,
      details: [
        "Community chat widget",
        "Connect with learners",
        "Share achievements",
        "Get help and support",
      ],
      color: "text-accent",
    },
  ];

  return (
    <div className="py-20 relative cyber-grid">
      <div className="absolute inset-0 gradient-overlay-accent" />
      <div className="container relative">
        <div className="text-center mb-12">
          <h1 className="heading-hero mb-4 glow-text">
            {t.gamificationFeatures}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.gamificationFeaturesDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
              key={index}
              className="surface-elevated card-hover group"
            >
              <CardHeader>
                <div
                  className={`h-16 w-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform neon-glow`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="heading-card">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
