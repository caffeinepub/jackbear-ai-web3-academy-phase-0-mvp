interface TickerItem {
  text: string;
}

interface NewsTickerProps {
  items: TickerItem[];
}

export default function NewsTicker({ items }: NewsTickerProps) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, oklch(0.18 0.06 290) 0%, oklch(0.15 0.08 300) 50%, oklch(0.18 0.06 290) 100%)",
        boxShadow: "0 0 20px oklch(0.55 0.25 290 / 0.3)",
        overflow: "hidden",
        height: "36px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 40s linear infinite;
          display: flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track">
        {doubled.map((item, i) => {
          const half = items.length;
          const originalIdx = i % half;
          const copy = i >= half ? "-copy" : "";
          return (
            <span
              key={`ticker-${originalIdx}${copy}`}
              style={{
                fontFamily: "'JetBrains Mono', 'Geist Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "oklch(0.82 0.12 290)",
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
              }}
            >
              <span
                style={{
                  color: "oklch(0.65 0.22 300)",
                  marginRight: "0.75rem",
                  fontWeight: 700,
                }}
              >
                ◆
              </span>
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
