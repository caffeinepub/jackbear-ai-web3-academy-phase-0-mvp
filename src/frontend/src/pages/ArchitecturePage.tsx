import {
  ArrowRight,
  Award,
  Database,
  MessageSquare,
  Shield,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function ArchitecturePage() {
  const { theme } = useTheme();

  const modules = [
    {
      id: "profiles",
      name: "Profiles Canister",
      icon: User,
      color: "oklch(0.65 0.28 285)",
      description: "Identity and avatar management",
      details:
        "Stores user display names, avatar selections, and manages user authentication via Internet Identity integration.",
      position: { x: 100, y: 100 },
    },
    {
      id: "progress",
      name: "Progress Canister",
      icon: TrendingUp,
      color: "oklch(0.60 0.25 220)",
      description: "Lessons, XP, levels, streaks",
      details:
        "Tracks lesson completion, world progress, XP earning events with timestamps, and daily activity logs for streak calculation.",
      position: { x: 400, y: 100 },
    },
    {
      id: "rewards",
      name: "Rewards Canister",
      icon: Award,
      color: "oklch(0.70 0.20 195)",
      description: "BEAR Credits simulation and XP logic",
      details:
        "Manages BEAR Credits distribution, XP reward calculations, and quest completion rewards. Coordinates with Progress Canister for XP updates.",
      position: { x: 700, y: 100 },
    },
    {
      id: "storage",
      name: "Storage Canister",
      icon: Database,
      color: "oklch(0.68 0.24 310)",
      description: "Lesson and lab submissions",
      details:
        "Handles lesson content storage and user-generated lab submissions. Provides data persistence for educational content.",
      position: { x: 250, y: 300 },
    },
    {
      id: "chat",
      name: "Chat/OpenChat Integration",
      icon: MessageSquare,
      color: "oklch(0.62 0.22 170)",
      description: "Embedded community widget",
      details:
        "Provides real-time community support and learner interaction through an integrated chat interface.",
      position: { x: 550, y: 300 },
    },
    {
      id: "admin",
      name: "Admin Module",
      icon: Shield,
      color: "oklch(0.58 0.28 15)",
      description: "Content, moderation, analysis control",
      details:
        "Future placeholder for administrative functions including content management, user moderation, and analytics dashboard.",
      position: { x: 400, y: 500 },
    },
  ];

  const connections = [
    { from: "profiles", to: "progress", label: "User Principal" },
    { from: "progress", to: "rewards", label: "XP Events" },
    { from: "rewards", to: "progress", label: "Credit Updates" },
    { from: "profiles", to: "storage", label: "User ID" },
    { from: "progress", to: "storage", label: "Submissions" },
    { from: "profiles", to: "chat", label: "Identity" },
    { from: "admin", to: "profiles", label: "User Management" },
    { from: "admin", to: "progress", label: "Content Control" },
    { from: "admin", to: "storage", label: "Data Access" },
  ];

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                System Architecture
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold glow-text">
              Phase 0 Architecture
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modular, scalable architecture built on the Internet Computer
              Protocol, designed for gamified Web3 education.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 glow-card">
              <h2 className="text-2xl font-display font-bold mb-8 text-center">
                System Components
              </h2>

              {/* SVG Diagram */}
              <div className="relative w-full aspect-[4/3] mb-12">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full"
                  aria-labelledby="architecture-diagram-title"
                  style={{
                    filter:
                      theme === "dark"
                        ? "drop-shadow(0 0 20px oklch(var(--primary) / 0.3))"
                        : "drop-shadow(0 0 10px oklch(var(--primary) / 0.2))",
                  }}
                >
                  <title id="architecture-diagram-title">
                    ICP Architecture Diagram
                  </title>
                  {/* Connection Lines */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3, 0 6"
                        fill="oklch(var(--primary))"
                        opacity="0.6"
                      />
                    </marker>
                  </defs>

                  {connections.map((conn, idx) => {
                    const fromModule = modules.find((m) => m.id === conn.from);
                    const toModule = modules.find((m) => m.id === conn.to);
                    if (!fromModule || !toModule) return null;

                    const x1 = fromModule.position.x + 50;
                    const y1 = fromModule.position.y + 50;
                    const x2 = toModule.position.x + 50;
                    const y2 = toModule.position.y + 50;

                    return (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static list
                      <g key={idx}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="oklch(var(--primary))"
                          strokeWidth="2"
                          strokeOpacity="0.3"
                          strokeDasharray="5,5"
                          markerEnd="url(#arrowhead)"
                        />
                      </g>
                    );
                  })}

                  {/* Module Nodes */}
                  {modules.map((module) => {
                    const Icon = module.icon;
                    return (
                      <g key={module.id}>
                        {/* Glow effect */}
                        <circle
                          cx={module.position.x + 50}
                          cy={module.position.y + 50}
                          r="45"
                          fill={module.color}
                          opacity="0.1"
                        />
                        {/* Main circle */}
                        <circle
                          cx={module.position.x + 50}
                          cy={module.position.y + 50}
                          r="35"
                          fill="oklch(var(--card))"
                          stroke={module.color}
                          strokeWidth="2"
                          opacity="0.9"
                        />
                        {/* Icon placeholder - using foreignObject for React icons */}
                        <foreignObject
                          x={module.position.x + 35}
                          y={module.position.y + 35}
                          width="30"
                          height="30"
                        >
                          <div className="flex items-center justify-center w-full h-full">
                            <Icon
                              className="w-5 h-5"
                              style={{ color: module.color }}
                            />
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Module Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <div
                      key={module.id}
                      className="bg-card/80 backdrop-blur-sm rounded-xl border border-primary/20 p-6 hover:border-primary/40 transition-all duration-300 hover:glow-border"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="p-3 rounded-lg"
                          style={{
                            backgroundColor: `${module.color}20`,
                            border: `1px solid ${module.color}40`,
                          }}
                        >
                          <Icon
                            className="h-6 w-6"
                            style={{ color: module.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-lg mb-1">
                            {module.name}
                          </h3>
                          <p className="text-sm text-primary/80 font-medium">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.details}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Flow Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 glow-card">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                System Interactions
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      User Principal Connections
                    </h3>
                    <p className="text-muted-foreground">
                      All canisters use the user's Internet Identity principal
                      as the primary key for data association. This ensures
                      secure, decentralized identity management across the
                      entire platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      XP → Rewards → Leaderboard Loop
                    </h3>
                    <p className="text-muted-foreground">
                      When users complete lessons or quests, the Progress
                      Canister emits XP events. The Rewards Canister processes
                      these events to calculate BEAR Credits and update the
                      user's profile. Profile updates automatically refresh the
                      leaderboard rankings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Event Signals & State Management
                    </h3>
                    <p className="text-muted-foreground">
                      Canisters communicate through event-driven signals. Lesson
                      completions trigger XP awards, which cascade through the
                      rewards system. Daily check-ins update streak counters and
                      award bonus XP. All state changes are atomic and
                      immediately reflected across the platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/20 border border-destructive/40 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Admin Control Layer (Future)
                    </h3>
                    <p className="text-muted-foreground">
                      The Admin Module will provide centralized control for
                      content management, user moderation, and analytics. It
                      will have elevated permissions to access and modify data
                      across all canisters while maintaining audit trails for
                      compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 pb-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 glow-card">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                Technical Foundation
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-primary">
                    Internet Computer Protocol
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Built on ICP for true decentralization, scalability, and
                    web-speed performance. Smart contracts (canisters) run
                    entirely on-chain.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-accent">Motoko Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    Type-safe, actor-based programming model designed
                    specifically for the Internet Computer. Ensures data
                    integrity and secure state management.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-secondary">
                    React Frontend
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Modern, responsive UI built with React, TypeScript, and
                    Tailwind CSS. Seamless integration with backend canisters
                    via agent-js.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-chart-5">
                    Internet Identity
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Passwordless authentication using WebAuthn. Users control
                    their identity with biometrics or hardware keys—no
                    passwords, no tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
