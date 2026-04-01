import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DfinityXEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 8000);

    const existingScript = document.getElementById("twitter-widgets-js");
    if (existingScript) {
      const w = window as unknown as Record<string, unknown>;
      if (
        w.twttr &&
        typeof (w.twttr as Record<string, unknown>).widgets === "object"
      ) {
        const widgets = (w.twttr as Record<string, unknown>).widgets as Record<
          string,
          unknown
        >;
        if (typeof widgets.load === "function") {
          (widgets.load as (el: HTMLElement) => void)(containerRef.current!);
          setLoaded(true);
        }
      }
      clearTimeout(timeoutId);
      return;
    }

    const script = document.createElement("script");
    script.id = "twitter-widgets-js";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => {
      setLoaded(true);
      clearTimeout(timeoutId);
    };
    script.onerror = () => {
      setFailed(true);
      clearTimeout(timeoutId);
    };
    document.body.appendChild(script);

    return () => clearTimeout(timeoutId);
  }, [loaded]);

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "oklch(0.14 0.04 290)",
        border: "1px solid oklch(0.28 0.08 290)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid oklch(0.28 0.08 290)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "oklch(0.16 0.06 290)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          role="img"
          aria-label="X (Twitter)"
          style={{ color: "oklch(0.75 0.18 290)", flexShrink: 0 }}
        >
          <title>X (Twitter)</title>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span
          style={{
            fontWeight: 600,
            fontSize: "14px",
            color: "oklch(0.88 0.1 290)",
          }}
        >
          From @dfinity on X
        </span>
        <a
          href="https://twitter.com/dfinity"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: "auto",
            color: "oklch(0.65 0.18 290)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            textDecoration: "none",
          }}
        >
          View all <ExternalLink size={12} />
        </a>
      </div>

      {/* Embed container */}
      <div
        ref={containerRef}
        style={{ padding: "8px", minHeight: failed ? "auto" : "500px" }}
      >
        {!failed ? (
          <>
            <a
              className="twitter-timeline"
              href="https://twitter.com/dfinity"
              data-theme="dark"
              data-height="480"
              data-chrome="nofooter noborders transparent"
              data-tweet-limit="5"
            >
              Tweets by @dfinity
            </a>
            {!loaded && (
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: "oklch(0.65 0.1 290)",
            }}
          >
            <p style={{ marginBottom: "12px", fontSize: "14px" }}>
              Unable to load the Twitter/X feed. This may be due to browser
              privacy settings.
            </p>
            <a
              href="https://twitter.com/dfinity"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "oklch(0.4 0.2 290)",
                color: "white",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              <ExternalLink size={14} /> View @dfinity on X
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
