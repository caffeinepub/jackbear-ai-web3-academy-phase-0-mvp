import { Button } from "@/components/ui/button";
import { updatePageMetadata } from "@/lib/seo";
import { useNavigate } from "@tanstack/react-router";

updatePageMetadata({
  title: "Monthly Leaderboard Rewards | JackBear.ai",
  description:
    "Top 5 players each month earn USDC rewards. Play daily, earn Bear Points, and climb the leaderboard. Next cycle begins May 1.",
});

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
          {/* Active pill */}
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
              className="fas fa-trophy"
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
              ⏳ Starts May 1
            </span>
          </div>

          {/* Trophy icon */}
          <div
            style={{
              fontSize: 48,
              marginBottom: 20,
              color: "hsl(var(--muted-foreground))",
            }}
          >
            <i className="fas fa-trophy" />
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
            Monthly Leaderboard Rewards
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 12,
              lineHeight: 1.5,
            }}
          >
            Top 5 earn monthly rewards.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "hsl(var(--muted-foreground))",
              marginBottom: 36,
              lineHeight: 1.5,
            }}
          >
            🥇 $30 • 🥈 $20 • 🥉 $15 • 4th $10 • 5th $5
          </p>

          <Button
            onClick={() => void navigate({ to: "/leaderboard" })}
            data-ocid="monthly_prize.primary_button"
            style={{
              fontWeight: 700,
              padding: "10px 28px",
              fontSize: 14,
            }}
          >
            <i className="fas fa-arrow-up mr-2" />
            Start Climbing the Leaderboard
          </Button>
        </div>
      </section>

      {/* ── Prizes ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "48px 16px 0",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
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
            className="fas fa-medal"
            style={{ color: "hsl(var(--muted-foreground))", marginRight: 8 }}
          />
          Top 5 each month earn:
        </h2>
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 32,
          }}
        >
          {[
            { rank: "🥇 1st", amount: "$30 USDC" },
            { rank: "🥈 2nd", amount: "$20 USDC" },
            { rank: "🥉 3rd", amount: "$15 USDC" },
            { rank: "4th", amount: "$10 USDC" },
            { rank: "5th", amount: "$5 USDC" },
          ].map((row, idx, arr) => (
            <div
              key={row.rank}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom:
                  idx < arr.length - 1
                    ? "1px solid hsl(var(--border))"
                    : "none",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "hsl(var(--foreground))",
                }}
              >
                {row.rank}
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "hsl(var(--foreground))",
                }}
              >
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 32px",
          maxWidth: 640,
          margin: "0 auto",
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
            className="fas fa-circle-question"
            style={{ color: "hsl(var(--muted-foreground))", marginRight: 8 }}
          />
          How It Works
        </h2>
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.7,
              marginBottom: 12,
            }}
          >
            Your position is based on activity and progression across:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 12px",
            }}
          >
            {[
              "Daily Crossword",
              "ICP Decode",
              "Coherence Layer",
              "Intelligence Layer",
            ].map((item) => (
              <li
                key={item}
                style={{
                  fontSize: 14,
                  color: "hsl(var(--muted-foreground))",
                  padding: "3px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <i
                  className="fas fa-check"
                  style={{ fontSize: 11, flexShrink: 0 }}
                />
                {item}
              </li>
            ))}
          </ul>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            More progress = more points.
          </p>
        </div>
      </section>

      {/* ── Reset Rule ─────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 32px",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "hsl(var(--muted-foreground))",
              marginBottom: 8,
            }}
          >
            Reset Rule
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--foreground))",
              lineHeight: 1.65,
              marginBottom: 4,
            }}
          >
            Leaderboard resets on the 1st of every month.
          </p>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            New cycle. New winners.
          </p>
        </div>
      </section>

      {/* ── Start Timing ───────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 32px",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "hsl(var(--muted-foreground))",
              marginBottom: 8,
            }}
          >
            Start Timing
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--foreground))",
              lineHeight: 1.65,
              marginBottom: 4,
            }}
          >
            Next cycle begins: May 1
          </p>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            All progress from that point forward counts.
          </p>
        </div>
      </section>

      {/* ── Strategy Hint ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 32px",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "hsl(var(--muted-foreground))",
              marginBottom: 8,
            }}
          >
            Strategy
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Users who unlock deeper layers earn faster.
          </p>
        </div>
      </section>

      {/* ── Reality Check ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 32px",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "hsl(var(--muted-foreground))",
              marginBottom: 8,
            }}
          >
            Reality Check
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.65,
              marginBottom: 4,
            }}
          >
            Most players will stay at the surface.
          </p>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Only a few will reach the top 5.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 48px",
          maxWidth: 640,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Button
          onClick={() => void navigate({ to: "/leaderboard" })}
          data-ocid="monthly_prize.cta_button"
          style={{
            fontWeight: 700,
            padding: "12px 32px",
            fontSize: 15,
          }}
        >
          <i className="fas fa-arrow-up mr-2" />
          Start Climbing the Leaderboard
        </Button>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 16px 64px",
          maxWidth: 640,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.6,
            lineHeight: 1.6,
            marginBottom: 4,
          }}
        >
          Rewards are distributed after each monthly cycle ends.
        </p>
        <p
          style={{
            fontSize: 12,
            color: "hsl(var(--muted-foreground))",
            opacity: 0.45,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          This is not a giveaway. It&#39;s a ranking.
        </p>
      </section>
    </div>
  );
}
