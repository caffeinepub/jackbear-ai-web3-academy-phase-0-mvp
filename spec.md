# JackBear.ai — Dashboard App-Shell Cardification + Certificate Loading Resilience

## Current State

DashboardPage.tsx uses a mix of section labels, loose spacing, and some cards — but several widgets render as wide open blocks or loose content without a clear card container. MyCertificatesSection returns `null` immediately when `allProgress` is empty (loading state), causing the section to flicker out prematurely when backend progress is slow to resolve.

## Requested Changes (Diff)

### Add
- Loading skeleton / "checking credentials..." placeholder in MyCertificatesSection when `allProgress` is undefined/empty and loading
- isLoading prop pass-through from DashboardPage to MyCertificatesSection
- Stronger card wrappers around: ICP News, Term of the Day, Bear Points History, What's New, Tip the Dev, Today on ICP, Utility/Support zone
- Top actions zone reinforced with clearer card-style grouping

### Modify
- MyCertificatesSection: accept `isProgressLoading` prop; show skeleton card instead of null during loading; only return null once progress has loaded and confirmed no completed worlds
- DashboardPage: pass `isProgressLoading` to MyCertificatesSection; wrap Today/News/Utility sections in explicit Card containers where missing; tighten top action group visual treatment

### Remove
- Nothing removed — all existing content and function preserved

## Implementation Plan

1. Add `isProgressLoading` prop to MyCertificatesSection, show skeleton placeholder while loading, collapse to null only after data resolves with 0 earned worlds
2. Pass `isProgressLoading` from DashboardPage via `useGetLessonProgress` isLoading state
3. Wrap NewsDashboardWidget, TermOfTheDayWidget, TodayOnICPWidget, BPLedgerWidget, WhatsNewDashboardWidget, TipTheDev in explicit section card containers in DashboardPage where needed
4. Strengthen top action zone visually — tighter grouping, clearer card-like container around the action buttons
5. Validate: lint, typecheck, build
