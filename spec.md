# JackBear.ai — Certificate Generation System

## Current State

CoursesPage.tsx renders all worlds (World 0–8, Bonus World 7) with lesson grids and Boss Quiz buttons. Each world tracks:
- `allLessonsAttempted`: all lessons in the world have `attempted === true` in backend progress
- `bossAttempted`: `progress.some(p => p.lessonId === 'boss-${world.id}' && p.attempted)`

No certificate or download feature exists. No PDF generation library is installed.

## Requested Changes (Diff)

### Add
- `src/frontend/src/lib/generateCertificate.ts` — pure canvas-based PDF generator utility (zero new deps)
- "Download Certificate" button in each world card's footer section, visible only when completion criteria is met

### Modify
- `src/frontend/src/pages/CoursesPage.tsx` — import and wire `downloadCertificate()` utility, add Download Certificate button inside the boss quiz section of each fully-completed world

### Remove
- Nothing

## Implementation Plan

1. Create `src/frontend/src/lib/generateCertificate.ts`:
   - Draw certificate on an offscreen Canvas (1200×850px)
   - Dark-neutral background with border accent
   - Title: "Certificate of Completion"
   - Subtitle: world name (passed as param)
   - Body: certifying copy
   - Footer: "JackBear.ai — Verifiable Intelligence Infrastructure"
   - Metadata: date, optional principal, random UUID
   - Convert canvas to PNG data URL
   - Wrap in a minimal hand-crafted PDF blob (single-page, image embedded)
   - Trigger browser download

2. Modify `CoursesPage.tsx`:
   - Import `downloadCertificate`
   - Derive `isWorldFullyComplete = allLessonsAttempted && bossAttempted` per world
   - In the boss quiz section, add a "Download Certificate" button below the boss quiz button, visible only when `isWorldFullyComplete`
   - Pass world title and user principal (from `identity`) to the generator

3. No backend changes. No routing changes. No new npm dependencies.
