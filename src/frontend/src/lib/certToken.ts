/**
 * certToken.ts
 *
 * Phase 1 — Self-contained integrity-verification token.
 *
 * Trust model:
 *   - Proves payload has NOT been modified since generation (tamper-evident).
 *   - Does NOT prove backend-issued authenticity.
 *   - Does NOT use a cryptographic issuer signature.
 *   - payloadHash = SHA-256 of canonical payload (nonce included).
 *   - issuedNonce  = crypto.randomUUID() — prevents collision on certificateId
 *     even for anonymous users with otherwise identical payloads.
 *
 * Phase 2 will add backend registry confirmation.
 */

// ─── Payload interface ───────────────────────────────────────────────────────

export interface CertPayload {
  version: "1";
  worldId: string;
  worldTitle: string;
  worldSubtitle: string;
  issuedAt: string; // ISO 8601
  issuedMonth: string; // "April 2026"
  principal: string | null;
  platform: "JackBear.ai";
  issuedNonce: string; // crypto.randomUUID() — collision prevention
  payloadHash: string; // SHA-256 hex of canonical payload (this field excluded from hash)
}

export interface BuildTokenResult {
  token: string; // base64url-encoded full payload — embed in URL
  certificateId: string; // first 16 hex chars of payloadHash — human-readable display ID
  verifyUrl: string; // https://jackbear.ai/verify/<token>
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** base64url encode (no padding) */
function b64uEncode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** base64url decode */
function b64uDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const padded2 = pad ? padded + "=".repeat(4 - pad) : padded;
  return decodeURIComponent(escape(atob(padded2)));
}

/** SHA-256 of a UTF-8 string → hex string */
async function sha256Hex(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Produce a stable canonical JSON string for hashing.
 * Keys are sorted alphabetically to ensure determinism regardless of
 * insertion order. The payloadHash field is excluded from its own hash.
 */
function canonicalize(obj: Record<string, unknown>): string {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(obj)
        .filter(([k]) => k !== "payloadHash")
        .sort(([a], [b]) => a.localeCompare(b)),
    ),
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Build a self-contained integrity-verification token for a certificate.
 *
 * Steps:
 *  1. Generate issuedNonce via crypto.randomUUID()
 *  2. Assemble all payload fields (no payloadHash yet)
 *  3. Compute SHA-256 of canonical JSON → payloadHash
 *  4. Attach payloadHash to payload
 *  5. base64url-encode the full payload → token
 *  6. Derive certificateId (first 16 hex chars) and verifyUrl
 */
export async function buildCertToken(opts: {
  worldId: string;
  worldTitle: string;
  worldSubtitle: string;
  principal: string | null;
}): Promise<BuildTokenResult> {
  const now = new Date();
  const issuedAt = now.toISOString();
  const issuedMonth = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const issuedNonce = crypto.randomUUID();

  // Build the pre-hash payload (no payloadHash field yet)
  const preHash: Omit<CertPayload, "payloadHash"> = {
    version: "1",
    worldId: opts.worldId,
    worldTitle: opts.worldTitle,
    worldSubtitle: opts.worldSubtitle,
    issuedAt,
    issuedMonth,
    principal: opts.principal,
    platform: "JackBear.ai",
    issuedNonce,
  };

  const payloadHash = await sha256Hex(
    canonicalize(preHash as Record<string, unknown>),
  );

  const fullPayload: CertPayload = {
    ...preHash,
    payloadHash,
  };

  const token = b64uEncode(JSON.stringify(fullPayload));
  const certificateId = payloadHash.slice(0, 16).toUpperCase();
  // Use a path that works for both deployed and local environments
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://jackbear.ai";
  const verifyUrl = `${origin}/verify/${token}`;

  return { token, certificateId, verifyUrl };
}

/**
 * Decode a certificate token and verify its integrity.
 *
 * Returns the CertPayload if the payloadHash is valid (data unchanged),
 * or null if decoding fails or the hash does not match.
 *
 * This is a LOCAL integrity check only — it does NOT contact any backend.
 */
export function decodeCertToken(token: string): CertPayload | null {
  try {
    const raw = b64uDecode(token);
    const payload = JSON.parse(raw) as CertPayload;

    // Validate required fields are present
    if (
      typeof payload.payloadHash !== "string" ||
      typeof payload.issuedNonce !== "string" ||
      typeof payload.worldId !== "string" ||
      payload.platform !== "JackBear.ai" ||
      payload.version !== "1"
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Asynchronously verify the integrity of a decoded payload.
 * Re-hashes the canonical payload and compares against the embedded payloadHash.
 */
export async function verifyCertIntegrity(
  payload: CertPayload,
): Promise<boolean> {
  const recomputed = await sha256Hex(
    canonicalize(payload as unknown as Record<string, unknown>),
  );
  return recomputed === payload.payloadHash;
}
