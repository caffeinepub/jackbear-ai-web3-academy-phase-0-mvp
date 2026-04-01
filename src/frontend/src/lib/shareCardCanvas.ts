/**
 * shareCardCanvas.ts
 * Client-side PNG share card generation via Canvas 2D API.
 * No external dependencies. No backend calls.
 */

export function saveLeaderboardShareCard(opts: {
  rank: number | null;
  displayName: string;
  bp: number;
}): void {
  const { rank, displayName, bp } = opts;
  const W = 1200;
  const H = 630;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // ── BACKGROUND ────────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0d0820");
  bg.addColorStop(0.5, "#12082e");
  bg.addColorStop(1, "#070518");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Radial glow — top-right (purple)
  const glowTR = ctx.createRadialGradient(
    W * 0.82,
    H * 0.18,
    0,
    W * 0.82,
    H * 0.18,
    380,
  );
  glowTR.addColorStop(0, "rgba(130, 60, 240, 0.22)");
  glowTR.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowTR;
  ctx.fillRect(0, 0, W, H);

  // Radial glow — bottom-left (blue)
  const glowBL = ctx.createRadialGradient(
    W * 0.12,
    H * 0.82,
    0,
    W * 0.12,
    H * 0.82,
    300,
  );
  glowBL.addColorStop(0, "rgba(50, 90, 210, 0.18)");
  glowBL.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowBL;
  ctx.fillRect(0, 0, W, H);

  // ── BORDER ────────────────────────────────────────────────────────────────
  const PAD = 12;
  const RADIUS = 28;
  ctx.save();
  ctx.strokeStyle = "rgba(150, 90, 255, 0.35)";
  ctx.lineWidth = 2;
  roundRect(ctx, PAD, PAD, W - PAD * 2, H - PAD * 2, RADIUS);
  ctx.stroke();
  ctx.restore();

  // ── BRANDING ─────────────────────────────────────────────────────────────
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(190, 140, 255, 0.80)";
  ctx.font = "bold 22px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("JACKBEAR.AI", 68, 75);

  // Small accent line below brand
  ctx.fillStyle = "rgba(150, 90, 255, 0.30)";
  ctx.fillRect(68, 84, 90, 1.5);

  // ── RANK LABEL ───────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(200, 170, 255, 0.38)";
  ctx.font = "600 18px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("LEADERBOARD RANK", 68, 205);

  // ── LARGE RANK NUMBER ────────────────────────────────────────────────────
  const rankDisplay = rank !== null ? `#${rank}` : "UNRANKED";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 120px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText(rankDisplay, 68, 338);

  // ── DISPLAY NAME ─────────────────────────────────────────────────────────
  const safeName = displayName || "Anonymous";
  ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
  ctx.font = "600 36px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText(safeName, 68, 395);

  // ── BP TOTAL ─────────────────────────────────────────────────────────────
  const bpFormatted = bp.toLocaleString();
  ctx.fillStyle = "rgba(190, 140, 255, 0.85)";
  ctx.font = "500 28px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText(`${bpFormatted} Bear Points`, 68, 440);

  // ── BOTTOM-RIGHT: TAGLINE + URL ──────────────────────────────────────────
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(180, 130, 255, 0.48)";
  ctx.font = "500 20px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("Learn Web3. Earn. Climb.", W - 68, H - 58);

  ctx.fillStyle = "rgba(210, 180, 255, 0.68)";
  ctx.font = "bold 24px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("jackbear.app", W - 68, H - 28);

  ctx.textAlign = "left"; // reset

  // ── DOWNLOAD ─────────────────────────────────────────────────────────────
  const rankSlug = rank !== null ? String(rank) : "unranked";
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jackbear-rank-${rankSlug}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, "image/png");
}

export function saveFragmentShareCard(opts: { fragmentName: string }): void {
  const { fragmentName } = opts;
  const W = 1200;
  const H = 630;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // ── BACKGROUND ────────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#060312");
  bg.addColorStop(0.5, "#0a0820");
  bg.addColorStop(1, "#030210");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Central radial glow (purple/cyan blend)
  const glowCenter = ctx.createRadialGradient(
    W * 0.5,
    H * 0.5,
    0,
    W * 0.5,
    H * 0.5,
    420,
  );
  glowCenter.addColorStop(0, "rgba(110, 40, 240, 0.24)");
  glowCenter.addColorStop(0.5, "rgba(0, 200, 255, 0.10)");
  glowCenter.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowCenter;
  ctx.fillRect(0, 0, W, H);

  // Secondary glow — top area
  const glowTop = ctx.createRadialGradient(W * 0.5, 0, 0, W * 0.5, 0, 350);
  glowTop.addColorStop(0, "rgba(80, 20, 200, 0.20)");
  glowTop.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowTop;
  ctx.fillRect(0, 0, W, H);

  // ── GRADIENT BORDER (purple → cyan) ──────────────────────────────────────
  const PAD = 12;
  const RADIUS = 28;
  const borderGrad = ctx.createLinearGradient(0, 0, W, H);
  borderGrad.addColorStop(0, "rgba(160, 80, 255, 0.60)");
  borderGrad.addColorStop(0.5, "rgba(100, 200, 255, 0.45)");
  borderGrad.addColorStop(1, "rgba(0, 220, 255, 0.55)");
  ctx.save();
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2;
  roundRect(ctx, PAD, PAD, W - PAD * 2, H - PAD * 2, RADIUS);
  ctx.stroke();
  ctx.restore();

  // ── BRANDING ─────────────────────────────────────────────────────────────
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(180, 120, 255, 0.80)";
  ctx.font = "bold 22px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("JACKBEAR.AI", 68, 75);

  ctx.fillStyle = "rgba(140, 80, 255, 0.28)";
  ctx.fillRect(68, 84, 90, 1.5);

  // ── "HIDDEN FRAGMENT" LABEL ───────────────────────────────────────────────
  ctx.fillStyle = "rgba(0, 220, 255, 0.75)";
  ctx.font = "600 20px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("HIDDEN FRAGMENT", 68, 215);

  // ── "DISCOVERED" ─────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(220, 200, 255, 0.50)";
  ctx.font = "600 28px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("DISCOVERED", 68, 255);

  // ── FRAGMENT NAME ────────────────────────────────────────────────────────
  const safeName = fragmentName || "Hidden Fragment";
  const nameFontSize =
    safeName.length > 20 ? 58 : safeName.length > 14 ? 68 : 80;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${nameFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
  ctx.fillText(safeName, 68, 362);

  // ── FLAVOR LINE ──────────────────────────────────────────────────────────
  ctx.fillStyle = "rgba(160, 110, 255, 0.55)";
  ctx.font = "italic 500 26px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("One of the few who found it.", 68, 420);

  // ── BOTTOM-RIGHT: URL ─────────────────────────────────────────────────────
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(0, 220, 255, 0.55)";
  ctx.font = "500 20px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("Learn Web3. Earn. Climb.", W - 68, H - 58);

  ctx.fillStyle = "rgba(0, 230, 255, 0.70)";
  ctx.font = "bold 24px 'Helvetica Neue', Helvetica, Arial, sans-serif";
  ctx.fillText("jackbear.app", W - 68, H - 28);

  ctx.textAlign = "left"; // reset

  // ── DOWNLOAD ─────────────────────────────────────────────────────────────
  const slug =
    safeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "fragment";
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jackbear-fragment-${slug}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, "image/png");
}

// ── Helpers ────────────────────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
