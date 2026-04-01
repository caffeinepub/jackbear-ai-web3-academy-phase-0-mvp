/**
 * Beta Banner — Additions Layer
 *
 * Dismissible platform-wide notice strip.
 * Shown once per session. Stores dismiss state in sessionStorage.
 * Additive-only: renders above main content, no existing layout changes.
 */

import React, { useState, useEffect } from "react";

const DISMISSED_KEY = "jb_beta_banner_dismissed";

export default function BetaBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(DISMISSED_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      className="w-full bg-purple-950/80 border-b border-purple-800/60 backdrop-blur-sm"
      role="banner"
      aria-label="Welcome notice"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-purple-200/90 min-w-0">
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-purple-600/60 text-purple-100 uppercase">
              New
            </span>
            <span className="leading-snug">
              JackBear.ai is live. Learn Web3, earn Bear Points, and climb the
              leaderboard. All progress is recorded on-chain.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://x.com/jackbearai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium px-2.5 py-1 rounded bg-purple-700/70 hover:bg-purple-600/80 text-purple-100 transition-colors border border-purple-600/50"
            >
              <i className="fa-brands fa-x-twitter mr-1" />
              @jackbearai
            </a>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss notice"
              className="text-purple-400 hover:text-purple-200 transition-colors p-0.5"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
