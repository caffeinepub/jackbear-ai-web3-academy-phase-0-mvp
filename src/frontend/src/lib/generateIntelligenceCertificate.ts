/**
 * generateIntelligenceCertificate.ts
 *
 * Draws a premium "Verifiable Intelligence Certification" on an offscreen Canvas,
 * wraps it in a minimal hand-crafted single-page PDF blob, and triggers a download.
 *
 * Visual design: elite dark background, subtle gold accents, clean credential layout.
 * Distinct from world certificates — higher tier.
 *
 * Reuses certToken.ts (buildCertToken) for Phase 1 integrity-verification.
 * Sets certType = "intelligence" for VerifyPage differentiation.
 *
 * Zero external dependencies — browser Canvas API only.
 */

import { buildCertToken } from "./certToken";
import type { DownloadCertificateResult } from "./generateCertificate";

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatIssuedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Logo loader ──────────────────────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// ─── Rounded rect helper ──────────────────────────────────────────────────────

function roundedRect(
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

// ─── Canvas drawing ───────────────────────────────────────────────────────────

async function drawIntelligenceCertificate(
  canvas: HTMLCanvasElement,
  certId: string,
  dateStr: string,
  verifyUrl: string,
  principal: string | null,
): Promise<void> {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // ── Background — deep dark slate, elite feel ──────────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, "#0d0d14");
  bgGrad.addColorStop(0.5, "#111118");
  bgGrad.addColorStop(1, "#0a0a10");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── Subtle texture: very faint grid ──────────────────────────────────────
  ctx.strokeStyle = "rgba(180,160,255,0.025)";
  ctx.lineWidth = 0.5;
  const gridStep = 48;
  for (let gx = 0; gx <= W; gx += gridStep) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, H);
    ctx.stroke();
  }
  for (let gy = 0; gy <= H; gy += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(W, gy);
    ctx.stroke();
  }

  // ── Outer border — thin gold ───────────────────────────────────────────────
  const bp = 28;
  ctx.strokeStyle = "rgba(212,175,55,0.35)";
  ctx.lineWidth = 1.2;
  roundedRect(ctx, bp, bp, W - bp * 2, H - bp * 2, 10);
  ctx.stroke();

  // ── Inner border — very faint gold ────────────────────────────────────────
  const ip = 42;
  ctx.strokeStyle = "rgba(212,175,55,0.12)";
  ctx.lineWidth = 0.6;
  roundedRect(ctx, ip, ip, W - ip * 2, H - ip * 2, 6);
  ctx.stroke();

  // ── Corner ornaments — gold bracket ───────────────────────────────────────
  const cLen = 22;
  const corners: [number, number, number, number][] = [
    [bp, bp, 1, 1],
    [W - bp - cLen, bp, -1, 1],
    [bp, H - bp - cLen, 1, -1],
    [W - bp - cLen, H - bp - cLen, -1, -1],
  ];
  ctx.strokeStyle = "rgba(212,175,55,0.65)";
  ctx.lineWidth = 2;
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + cLen * dx, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + cLen * dy);
    ctx.stroke();
  }

  // ── Top center diamond ornament ────────────────────────────────────────────
  const diaX = W / 2;
  const diaY = bp + 4;
  const diaS = 6;
  ctx.fillStyle = "rgba(212,175,55,0.55)";
  ctx.beginPath();
  ctx.moveTo(diaX, diaY - diaS);
  ctx.lineTo(diaX + diaS, diaY);
  ctx.lineTo(diaX, diaY + diaS);
  ctx.lineTo(diaX - diaS, diaY);
  ctx.closePath();
  ctx.fill();

  // ── Logo ───────────────────────────────────────────────────────────────────
  const logo = await loadImage("/assets/jbailogo-5.png");
  const logoH = 38;
  const logoTopY = 72;
  if (logo) {
    const logoAspect = logo.naturalWidth / logo.naturalHeight;
    const logoW = Math.round(logoH * logoAspect);
    // Draw logo with slight gold tint overlay by compositing
    ctx.globalAlpha = 0.92;
    ctx.drawImage(logo, Math.round(W / 2 - logoW / 2), logoTopY, logoW, logoH);
    ctx.globalAlpha = 1;
  } else {
    ctx.textAlign = "center";
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "#d4af37";
    ctx.letterSpacing = "4px";
    ctx.fillText("JACKBEAR.AI", W / 2, logoTopY + logoH - 6);
    ctx.letterSpacing = "0px";
  }

  // ── Issuer label ───────────────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = "10.5px monospace";
  ctx.fillStyle = "rgba(212,175,55,0.55)";
  ctx.letterSpacing = "3px";
  ctx.fillText("JACKBEAR.AI ACADEMY", W / 2, logoTopY + logoH + 22);
  ctx.letterSpacing = "0px";

  // ── Gold rule ─────────────────────────────────────────────────────────────
  const rule1Y = logoTopY + logoH + 42;
  const goldGrad = ctx.createLinearGradient(120, rule1Y, W - 120, rule1Y);
  goldGrad.addColorStop(0, "transparent");
  goldGrad.addColorStop(0.2, "rgba(212,175,55,0.6)");
  goldGrad.addColorStop(0.8, "rgba(212,175,55,0.6)");
  goldGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(120, rule1Y);
  ctx.lineTo(W - 120, rule1Y);
  ctx.stroke();

  // ── ISSUED BY chip ─────────────────────────────────────────────────────────
  const chipY = rule1Y + 22;
  ctx.font = "9px monospace";
  ctx.fillStyle = "rgba(212,175,55,0.45)";
  ctx.letterSpacing = "2.5px";
  ctx.textAlign = "center";
  ctx.fillText("VERIFIABLE INTELLIGENCE LAYER", W / 2, chipY);
  ctx.letterSpacing = "0px";

  // ── Main title ─────────────────────────────────────────────────────────────
  ctx.font = "bold 46px Georgia, serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Verifiable Intelligence", W / 2, chipY + 62);
  ctx.fillText("Certification", W / 2, chipY + 116);

  // ── Subtitle: Sovereign Compute · Identity · Consensus ────────────────────
  ctx.font = "italic 15px Georgia, serif";
  ctx.fillStyle = "rgba(212,175,55,0.80)";
  ctx.fillText(
    "Sovereign Compute \u00B7 Identity \u00B7 Consensus",
    W / 2,
    chipY + 148,
  );

  // ── Gold rule 2 ───────────────────────────────────────────────────────────
  const rule2Y = chipY + 172;
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(120, rule2Y);
  ctx.lineTo(W - 120, rule2Y);
  ctx.stroke();

  // ── Completion statement ──────────────────────────────────────────────────
  ctx.font = "italic 15px Georgia, serif";
  ctx.fillStyle = "rgba(200,200,220,0.75)";
  ctx.textAlign = "center";
  ctx.fillText(
    "This certifies the completion of all five modules of the Verifiable Intelligence Layer:",
    W / 2,
    rule2Y + 32,
  );

  // ── Module list ───────────────────────────────────────────────────────────
  const modules = [
    "01 — Decentralized AI",
    "02 — Agent Systems",
    "03 — Autonomous Systems",
    "04 — Agent Economy",
    "05 — Sovereign Systems",
  ];
  ctx.font = "12px monospace";
  ctx.fillStyle = "rgba(180,160,255,0.70)";
  const modStartY = rule2Y + 60;
  const colW = 240;
  const leftColX = W / 2 - colW / 2 - 20;
  const rightColX = W / 2 + 20;
  const firstThree = modules.slice(0, 3);
  const lastTwo = modules.slice(3);
  firstThree.forEach((m, i) => {
    ctx.textAlign = "left";
    ctx.fillText(m, leftColX, modStartY + i * 22);
  });
  lastTwo.forEach((m, i) => {
    ctx.textAlign = "left";
    ctx.fillText(m, rightColX, modStartY + i * 22);
  });

  // ── Gold rule 3 ───────────────────────────────────────────────────────────
  const rule3Y = modStartY + 3 * 22 + 18;
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(120, rule3Y);
  ctx.lineTo(W - 120, rule3Y);
  ctx.stroke();

  // ── Signature block ───────────────────────────────────────────────────────
  const sigBaseY = rule3Y + 52;
  const sigColX = 260;
  const dateColX = W - 260;

  // Signature side
  ctx.strokeStyle = "rgba(212,175,55,0.30)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(sigColX - 90, sigBaseY - 4);
  ctx.lineTo(sigColX + 90, sigBaseY - 4);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.font = "bold 14px Georgia, serif";
  ctx.fillStyle = "#e0e0f0";
  ctx.fillText("Justin JackBear", sigColX, sigBaseY + 18);
  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(212,175,55,0.55)";
  ctx.letterSpacing = "0.5px";
  ctx.fillText("Founder, JackBear.ai", sigColX, sigBaseY + 36);
  ctx.letterSpacing = "0px";

  // Date side
  ctx.strokeStyle = "rgba(212,175,55,0.30)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(dateColX - 90, sigBaseY - 4);
  ctx.lineTo(dateColX + 90, sigBaseY - 4);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.font = "bold 14px Georgia, serif";
  ctx.fillStyle = "#e0e0f0";
  ctx.fillText(dateStr, dateColX, sigBaseY + 18);
  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(212,175,55,0.55)";
  ctx.letterSpacing = "0.5px";
  ctx.fillText("Date Issued", dateColX, sigBaseY + 36);
  ctx.letterSpacing = "0px";

  // ── Certificate ID ────────────────────────────────────────────────────────
  const certIdY = sigBaseY + 70;
  ctx.textAlign = "center";
  ctx.font = "9.5px monospace";
  ctx.fillStyle = "rgba(212,175,55,0.40)";
  ctx.letterSpacing = "1px";
  ctx.fillText(`Certificate ID: ${certId}`, W / 2, certIdY);
  ctx.letterSpacing = "0px";

  if (principal) {
    const shortPrincipal =
      principal.length > 24
        ? `${principal.slice(0, 12)}...${principal.slice(-6)}`
        : principal;
    ctx.font = "9px monospace";
    ctx.fillStyle = "rgba(180,160,255,0.45)";
    ctx.fillText(`Principal: ${shortPrincipal}`, W / 2, certIdY + 18);
  }

  // ── Bottom rule ───────────────────────────────────────────────────────────
  const footerRuleY = H - 72;
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(120, footerRuleY);
  ctx.lineTo(W - 120, footerRuleY);
  ctx.stroke();

  // ── Platform footer ────────────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = "10.5px monospace";
  ctx.fillStyle = "rgba(212,175,55,0.50)";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(
    "JackBear.ai \u2014 Verifiable Intelligence Infrastructure",
    W / 2,
    footerRuleY + 20,
  );
  ctx.letterSpacing = "0px";

  // ── Verify URL ─────────────────────────────────────────────────────────────
  const displayUrl =
    verifyUrl.length > 90 ? `${verifyUrl.slice(0, 87)}...` : verifyUrl;
  ctx.textAlign = "center";
  ctx.font = "8px monospace";
  ctx.fillStyle = "rgba(140,120,200,0.45)";
  ctx.fillText(`Verify: ${displayUrl}`, W / 2, footerRuleY + 38);
  ctx.fillText(
    "Phase 1 \u2014 integrity verification only. Not backend-issued authentication.",
    W / 2,
    footerRuleY + 52,
  );
}

// ─── Minimal PDF builder (same as generateCertificate.ts) ─────────────────────

function buildPdfBlob(jpegDataUrl: string): Blob {
  const base64Data = jpegDataUrl.split(",")[1];
  const imageBytes = atob(base64Data);
  const imageLength = imageBytes.length;

  const pageWidthPt = 1200;
  const pageHeightPt = 850;

  const enc = new TextEncoder();

  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidthPt} ${pageHeightPt}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n`;

  const contentStream = `q\n${pageWidthPt} 0 0 ${pageHeightPt} 0 0 cm\n/Im1 Do\nQ\n`;
  const contentStreamBytes = enc.encode(contentStream);
  const obj4 = `4 0 obj\n<< /Length ${contentStreamBytes.length} >>\nstream\n${contentStream}endstream\nendobj\n`;

  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pageWidthPt} /Height ${pageHeightPt} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageLength} >>\nstream\n`;
  const obj5Footer = "\nendstream\nendobj\n";

  const offsets: number[] = [];
  let offset = 0;

  const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const headerBytes = enc.encode(header);
  offset += headerBytes.length;

  offsets.push(offset);
  const obj1Bytes = enc.encode(obj1);
  offset += obj1Bytes.length;

  offsets.push(offset);
  const obj2Bytes = enc.encode(obj2);
  offset += obj2Bytes.length;

  offsets.push(offset);
  const obj3Bytes = enc.encode(obj3);
  offset += obj3Bytes.length;

  offsets.push(offset);
  const obj4Bytes = enc.encode(obj4);
  offset += obj4Bytes.length;

  offsets.push(offset);
  const obj5HeaderBytes = enc.encode(obj5Header);
  const obj5FooterBytes = enc.encode(obj5Footer);

  const xrefOffset =
    offset + obj5HeaderBytes.length + imageLength + obj5FooterBytes.length;

  function padOffset(n: number): string {
    return n.toString().padStart(10, "0");
  }
  const xref = [
    "xref\n",
    "0 6\n",
    "0000000000 65535 f \n",
    `${padOffset(offsets[0])} 00000 n \n`,
    `${padOffset(offsets[1])} 00000 n \n`,
    `${padOffset(offsets[2])} 00000 n \n`,
    `${padOffset(offsets[3])} 00000 n \n`,
    `${padOffset(offsets[4])} 00000 n \n`,
  ].join("");

  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const xrefBytes = enc.encode(xref);
  const trailerBytes = enc.encode(trailer);

  const imageUint8 = new Uint8Array(imageLength);
  for (let i = 0; i < imageLength; i++) {
    imageUint8[i] = imageBytes.charCodeAt(i);
  }

  const parts: Uint8Array[] = [
    headerBytes,
    obj1Bytes,
    obj2Bytes,
    obj3Bytes,
    obj4Bytes,
    obj5HeaderBytes,
    imageUint8,
    obj5FooterBytes,
    xrefBytes,
    trailerBytes,
  ];

  const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const part of parts) {
    result.set(part, pos);
    pos += part.length;
  }

  return new Blob([result], { type: "application/pdf" });
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generates and downloads the Verifiable Intelligence Certification PDF.
 * Uses certType="intelligence" in the token for VerifyPage differentiation.
 * Returns { verifyUrl, certificateId } for share actions.
 */
export async function downloadIntelligenceCertificate(
  principal: string | null,
): Promise<DownloadCertificateResult> {
  const dateStr = formatIssuedDate();

  const { certificateId, verifyUrl } = await buildCertToken({
    worldId: "verifiable-intelligence-layer",
    worldTitle: "Verifiable Intelligence Certification",
    worldSubtitle: "Sovereign Compute \u00B7 Identity \u00B7 Consensus",
    principal,
    certType: "intelligence",
  });

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 850;
  await drawIntelligenceCertificate(
    canvas,
    certificateId,
    dateStr,
    verifyUrl,
    principal,
  );

  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.95);
  const pdfBlob = buildPdfBlob(jpegDataUrl);

  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "jackbear-verifiable-intelligence-certification.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { verifyUrl, certificateId };
}
