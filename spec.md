# JackBear.ai — Missions Phases + Approval + Reward Display Patch

## Current State

`MissionsPage.tsx` is a self-contained, frontend-only MVP at `/missions`. It uses local React state with seed data. The `Mission` type has:
- `status: "Open" | "Closing Soon" | "Closed"`
- No phase field
- No reward structure field
- No payout status field
- Post form creates missions as `status: "Open"` immediately — no approval gate
- Submission form has fixed fields (name, link, explanation) — not phase-aware
- No admin approval toggle
- No trust copy about selection process

## Requested Changes (Diff)

### Add
- `MissionPhase` type: `"entry" | "shortlist" | "finalist" | "winner_selected"`
- `MissionStatus` expanded: `"draft" | "pending_approval" | "open" | "closed"` (replacing old `"Open" | "Closing Soon" | "Closed"`)
- `PayoutStatus` type: `"pending" | "awarded" | "paid"`
- `rewardStructure: string` field on `Mission` — flexible text description of reward split
- `payoutStatus: PayoutStatus` field on `Mission`
- `phase: MissionPhase` field on `Mission`
- Phase badge component showing current phase with color
- Payout status badge component
- Mission card: show phase badge + reward summary + payout status if closed
- Mission detail modal: phase + reward structure + payout status + "How this mission works" phase stepper (Entry → Shortlist → Finalist → Winner)
- Phase explanation block in detail modal
- Phase-aware submission form (different fields for entry vs shortlist/finalist)
- Post mission form creates missions as `status: "pending_approval"`, not visible in public feed
- Post success message: "Mission submitted for review. It will go live once approved."
- Admin approval toggle (missions-only, isolated): admin can flip `pending_approval` → `open`
- Business trust copy block: "Businesses do not choose blindly. They review shortlisted and finalist solutions before selecting a winner."
- Seed missions updated with `phase`, `rewardStructure`, `payoutStatus` fields
- Public feed filter: only show `status === "open" || status === "closed"` missions

### Modify
- `Mission` interface: extend with new fields
- `MissionStatus` type: expand from 3-value to 4-value
- `StatusBadge`: handle `pending_approval` and `draft` (show nothing or internal badge)
- `MissionCard`: add phase + reward summary + payout status display
- Mission detail modal: add new sections (phase stepper, reward structure, payout, trust copy)
- Submit form: conditional fields based on mission phase
- Post form: change created status from `"Open"` to `"pending_approval"`
- Stats bar: count only `open`/`closed` missions for public display
- Seed missions: add new required fields

### Remove
- Old `MissionStatus` values `"Closing Soon"` as a separate type — replace with `open` + a time-based check for display
- Mission feed showing `pending_approval` or `draft` missions

## Implementation Plan

1. Expand `Mission` interface with `phase`, `rewardStructure`, `payoutStatus`, expanded `status`
2. Update seed data with new fields — map existing Open/Closed to new `open`/`closed`, set phases and reward structures
3. Update `StatusBadge` and add `PhaseBadge`, `PayoutBadge` components
4. Update `MissionCard` to display phase + reward summary + payout if closed
5. Update public feed filter: only `open` or `closed` missions visible
6. Update post form: new missions created as `pending_approval`; show approval-pending success message
7. Add missions-only admin approval toggle (isolated state, gated by admin principal constant)
8. Update mission detail modal: add phase stepper, reward structure section, payout status, phase explanation, trust copy
9. Update submission form: conditional fields based on current mission phase (entry vs shortlist/finalist)
10. Validate build
