import { Button } from "@/components/ui/button";
import { updatePageMetadata } from "@/lib/seo";
import { useNavigate } from "@tanstack/react-router";

updatePageMetadata({
  title: "Monthly Prize | JackBear.ai",
  description:
    "The Monthly Prize is not currently running. Leaderboards and rewards will return after final testing and relaunch.",
});

const HOW_TO_WIN = [
  {
    icon: "fa-user-plus",
    title: "Create Account",
    desc: "Sign up with Internet Identity — the most secure login on Web3.",
  },
  {
    icon: "fa-star",
    title: "Earn Bear Points",
    desc: "Complete lessons, ace quizzes, discover hidden fragments, and keep your streak.",
  },
  {
    icon: "fa-trophy",
    title: "Top the Leaderboard",
    desc: "Accumulate the most BP in the calendar month to claim the top spot.",
  },
  {
    icon: "fa-coins",
    title: "Claim Your Prize",
    desc: "Submit your USDC wallet address. Prize dispatched within 48 hours.",
  },
];

const RULES = [
  "Leaderboard resets at the start of each calendar month (UTC).",
  "The user with the most Bear Points at month end wins automatically.",
  "Winner must submit a USDC receive address on the leaderboard page.",
  "Prize dispatched manually within 48 hours of valid claim submission.",
  "USDC accepted on any EVM-compatible chain (ETH, Base, Polygon, etc.).",
  "One winner per month. Prize amount may change with 7 days notice.",
  "Fraudulent or bot-generated BP is disqualified at admin discretion.",
];

export default function MonthlyPrizePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background" data-ocid="monthly_prize.page">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--muted) / 0.4) 0%, hsl(var(--background)) 60%, hsl(var(--muted) / 0.3) 100%)",
          borderBottom: "1px solid hsl(var(--border))",
          padding: "64px 16px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, hsl(var(--muted-foreground) / 0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          {/* Coming Soon pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 999,
              padding: "4px 14px",
              marginBottom: 24,
            }}
          >
            <i
              className="fas fa-medal"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Coming Soon
            </span>
          </div>

          {/* Medal icon */}
          <div
            style={{
              fontSize: 48,
              marginBottom: 20,
              color: "hsl(var(--muted-foreground))",
            }}
          >
            <i className="fas fa-medal" />
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "hsl(var(--foreground))",
              marginBottom: 16,
            }}
          >
            Monthly Prize
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 12,
              lineHeight: 1.5,
            }}
          >
            Monthly Prize is not currently running.
          </p>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground) / 0.7)",
              marginBottom: 36,
              lineHeight: 1.5,
            }}
          >
            Leaderboards and rewards will return after final testing and
            relaunch.
          </p>

          <Button
            onClick={() => void navigate({ to: "/leaderboard" })}
            data-ocid="monthly_prize.primary_button"
            variant="outline"
            style={{
              fontWeight: 700,
              padding: "10px 28px",
              fontSize: 14,
            }}
          >
            <i className="fas fa-trophy mr-2" />
            View Leaderboard
          </Button>
        </div>
      </section>

      {/* ── How to Win (dimmed — for future reference) ───────────────── */}
      <section
        style={{
          padding: "48px 16px",
          maxWidth: 640,
          margin: "0 auto",
          opacity: 0.6,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "hsl(var(--muted-foreground))",
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 999,
              padding: "3px 12px",
              marginBottom: 16,
            }}
          >
            Available when the prize relaunches
          </span>
        </div>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "hsl(var(--foreground))",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          <i
            className="fas fa-circle-question"
            style={{ color: "hsl(var(--muted-foreground))", marginRight: 8 }}
          />
          How to Win
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {HOW_TO_WIN.map((step, i) => (
            <div
              key={step.title}
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 10,
                padding: "16px 18px",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "hsl(var(--muted))",
                  border: "1px solid hsl(var(--border))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className={`fas ${step.icon}`}
                  style={{
                    color: "hsl(var(--muted-foreground))",
                    fontSize: 13,
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                    marginBottom: 4,
                  }}
                >
                  {i + 1}. {step.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Prize Rules (dimmed — for future reference) ─────────────── */}
      <section
        style={{
          padding: "0 16px 64px",
          maxWidth: 640,
          margin: "0 auto",
          opacity: 0.6,
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "hsl(var(--foreground))",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <i
            className="fas fa-scale-balanced"
            style={{ color: "hsl(var(--muted-foreground))", marginRight: 8 }}
          />
          Prize Rules
        </h2>
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            padding: "20px 24px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {RULES.map((rule, idx) => (
              <li
                key={rule}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "6px 0",
                  borderBottom:
                    idx < RULES.length - 1
                      ? "1px solid hsl(var(--border))"
                      : "none",
                }}
              >
                <i
                  className="fas fa-check"
                  style={{
                    color: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                    marginTop: 3,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.5,
                  }}
                >
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
