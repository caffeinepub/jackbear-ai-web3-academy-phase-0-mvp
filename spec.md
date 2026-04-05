# JackBear.ai — Sponsor Media Kit System

## Current State

- `/admin/stats` route exists, gated to admin allowlist, powered by `getAdminAnalytics()` backend query returning `AdminAnalytics` (totalRegisteredUsers, dailyActiveUsers, monthlyActiveUsers, totalLessonCompletions, totalQuizPasses, totalBPAwarded, usersWithBP)
- `getPublicMetrics()` backend method also exists returning `{ activeLearnersToday, mostCompletedLessonWeekly, averageProgress }` — available to anonymous callers
- `getGlobalLeaderboard()` and `getMonthlyLeaderboard()` return `BPLeaderboardEntry[]`
- App uses React + TanStack Router + Tailwind OKLCH design system, dark-mode premium aesthetic
- No `/sponsors` route exists yet

## Requested Changes (Diff)

### Add
- `src/frontend/src/pages/SponsorsPage.tsx` — full sponsors media kit page at `/sponsors`
- Route registered in `App.tsx` at path `/sponsors`
- Page pulls live data from `getPublicMetrics()` (anonymous, no login needed) for public stats strip
- Auto-polls every 30 seconds with animated counter transitions
- 9 sections: Hero, Live Metrics Strip, Engagement Depth, Viral Engine, Performance Visuals (charts using recharts already available), Sponsor Value Block, Sponsor Packages (3 tiers), Trust Layer, Final CTA
- Sponsor tier cards with "Request Access" CTAs linking to mailto or external form
- No login required — page is fully public
- "Live" pulsing indicator on metrics

### Modify
- `src/frontend/src/App.tsx` — add sponsorsRoute import and route registration

### Remove
- Nothing

## Implementation Plan

1. Create `SponsorsPage.tsx` with all 9 sections using existing OKLCH design tokens and card primitives
2. Use `useActor()` to call `getPublicMetrics()` for the live metrics strip (anonymous-safe)
3. Auto-refresh via `setInterval` every 30s with animated number transitions using framer-motion (already imported via `motion/react`)
4. Charts: simple inline SVG/CSS bar charts and line sketches — no new chart lib needed, keeping bundle lean
5. Sponsor tiers: 3 cards (Starter / Growth / Dominance) with feature lists and estimated reach derived from live user count
6. Register route in App.tsx
7. Validate and deploy
