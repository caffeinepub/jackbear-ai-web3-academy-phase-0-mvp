# JackBear.ai — Verifiable Certificate Layer (Phase 1)

## Current State

- `src/frontend/src/lib/generateCertificate.ts` — Canvas-based PDF generator. Produces a certificate with logo, world title/subtitle, signature block, certificate ID (`JB-WORLD-<timestamp>-<suffix>`), and optional principal. Zero external dependencies.
- `src/frontend/src/pages/CoursesPage.tsx` — Calls `downloadCertificate()` when a world is fully complete. Passes `worldTitle`, `worldSubtitle`, and `principal`.
- `src/frontend/src/components/dashboard/ProgressCertificateSection.tsx` — Alternative certificate surface for 70-lesson global completion. Uses browser `window.print()`, not the canvas PDF path.
- No `/verify` route exists. No verification token is embedded in the PDF.

## Requested Changes (Diff)

### Add
- `src/frontend/src/lib/certToken.ts` — New utility. Builds the integrity-verification token using Web Crypto SHA-256. Contains:
  - `CertPayload` interface (all certificate fields including `issuedNonce`, `payloadHash`, `version`)
  - `buildCertToken(payload)` → async → `{ token: string, certificateId: string, verifyUrl: string }`
  - `decodeCertToken(token)` → `CertPayload | null` — decodes and validates integrity (re-hashes payload sans `payloadHash`, compares)
  - `issuedNonce` is a `crypto.randomUUID()` generated at certificate creation time, ensuring no two certificates collide on ID even for anonymous users with identical payloads
  - `payloadHash` is `SHA-256` of the canonical JSON of all other fields (nonce included), hex-encoded
  - `certificateId` is the first 16 hex chars of `payloadHash` — used as the display ID
  - Token format: `base64url(JSON.stringify(fullPayload))` — self-contained, no server needed
  - Trust model: tamper-evident integrity only. Language never claims issuer or backend proof.
- `src/frontend/src/pages/VerifyPage.tsx` — New page at `/verify` and `/verify/$token`.
  - If no token in URL: shows a manual entry field to paste a verify URL or token
  - If token present: decodes, re-hashes, displays result
  - Success state: green "Verified for integrity" badge + certificate fields
  - Failure state: red "Integrity check failed" — data may have been modified
  - Language: "Verified for integrity" — never "Verified by issuer" or "Verified by JackBear.ai backend"
  - Disclaimer: "Phase 1 integrity verification confirms this certificate has not been modified since generation. Backend-issued authenticity verification is reserved for a future registry upgrade."
- Two new routes in `App.tsx`: `/verify` and `/verify/$token`

### Modify
- `src/frontend/src/lib/generateCertificate.ts`:
  - `downloadCertificate()` becomes async and calls `buildCertToken()` before drawing
  - `CertificateOptions` gains optional `worldId` field
  - Canvas draws a verification URL in the footer area (below footer rule) — monospace, small, readable
  - Certificate ID on canvas now uses the first 16 chars of `payloadHash` (from token), not the old `JB-WORLD-<timestamp>` format
  - Verification URL format: `https://jackbear.ai/verify/<token>` — printed on PDF
  - No QR code (avoids adding a QR library dependency — URL in text form is sufficient for MVP)

### Remove
- `generateCertId()` private function inside `generateCertificate.ts` — replaced by token-derived ID

## Implementation Plan

1. Create `src/frontend/src/lib/certToken.ts`:
   - Define `CertPayload` interface
   - `buildCertToken`: generate nonce → assemble payload sans hash → canonical JSON → SHA-256 → payloadHash → assemble full payload → base64url encode → return `{ token, certificateId, verifyUrl }`
   - `decodeCertToken`: base64url decode → parse JSON → extract payloadHash → re-compute hash of payload-minus-payloadHash → compare → return payload or null

2. Create `src/frontend/src/pages/VerifyPage.tsx`:
   - Read `$token` param from URL (TanStack Router `useParams`)
   - On mount: if token, decode and set result state
   - Render: no-token landing with paste field, or verified/failed card
   - Language: "Verified for integrity" / "Integrity check failed"
   - Show: worldTitle, worldSubtitle, issuedAt (formatted), certificateId, principal (if present), platform, version
   - Disclaimer block at bottom

3. Update `src/frontend/src/lib/generateCertificate.ts`:
   - Import `buildCertToken`
   - `downloadCertificate` becomes `async`
   - Call `buildCertToken` at the top, pass `certId` and `verifyUrl` into `drawCertificate`
   - `drawCertificate` signature gains `verifyUrl: string` param
   - Render verify URL text on canvas below footer rule in small monospace

4. Add routes to `App.tsx`:
   - `verifyRoute` at `/verify`
   - `verifyTokenRoute` at `/verify/$token`
   - Both render `VerifyPage`
   - Register in `routeTree`

5. Validate: lint → typecheck → build
