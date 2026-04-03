/**
 * generateCertificate.ts
 *
 * Draws a completion certificate on an offscreen Canvas,
 * wraps it in a minimal hand-crafted single-page PDF blob,
 * and triggers a browser download.
 *
 * Phase 1: embeds a self-contained integrity-verification URL in the footer.
 * The certificateId and verifyUrl are derived from certToken.ts.
 *
 * Zero external dependencies — uses only the browser Canvas API.
 */

import { buildCertToken } from "./certToken";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CertificateOptions {
  worldId?: string;
  worldTitle: string;
  worldSubtitle?: string;
  principal?: string;
}

export interface DownloadCertificateResult {
  verifyUrl: string;
  certificateId: string;
}

// ─── Date formatter ──────────────────────────────────────────────────────────────────

function formatIssuedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Logo loader ───────────────────────────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// ─── Canvas drawing ─────────────────────────────────────────────────────────────────

async function drawCertificate(
  canvas: HTMLCanvasElement,
  opts: CertificateOptions,
  certId: string,
  dateStr: string,
  verifyUrl: string,
): Promise<void> {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // ── Background — clean white / off-white for premium academic feel ─────────────
  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, W, H);

  // ── Outer border ─────────────────────────────────────────────────────────
  const borderPad = 28;
  ctx.strokeStyle = "#c8c8d8";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(borderPad, borderPad, W - borderPad * 2, H - borderPad * 2);

  // ── Inner thin border ─────────────────────────────────────────────────────
  const innerPad = 38;
  ctx.strokeStyle = "#e0dff0";
  ctx.lineWidth = 0.75;
  ctx.strokeRect(innerPad, innerPad, W - innerPad * 2, H - innerPad * 2);

  // ── Corner accents ──────────────────────────────────────────────────────────
  const cornerLen = 18;
  const corners: [number, number][] = [
    [borderPad, borderPad],
    [W - borderPad - cornerLen, borderPad],
    [borderPad, H - borderPad - cornerLen],
    [W - borderPad - cornerLen, H - borderPad - cornerLen],
  ];
  ctx.strokeStyle = "#7c3aed";
  ctx.lineWidth = 2;
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + cornerLen, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + cornerLen);
    ctx.stroke();
  }

  // ── Logo ─────────────────────────────────────────────────────────────────────
  const logo = await loadImage("/assets/jbailogo-5.png");
  const logoH = 40;
  const logoTopY = 72;
  if (logo) {
    const logoAspect = logo.naturalWidth / logo.naturalHeight;
    const logoW = Math.round(logoH * logoAspect);
    ctx.drawImage(logo, Math.round(W / 2 - logoW / 2), logoTopY, logoW, logoH);
  } else {
    ctx.textAlign = "center";
    ctx.font = "bold 15px monospace";
    ctx.fillStyle = "#7c3aed";
    ctx.letterSpacing = "3px";
    ctx.fillText("JACKBEAR.AI", W / 2, logoTopY + logoH - 6);
    ctx.letterSpacing = "0px";
  }

  // ── Issuer label under logo ─────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "#9090a8";
  ctx.letterSpacing = "2px";
  ctx.fillText("JACKBEAR.AI ACADEMY", W / 2, logoTopY + logoH + 22);
  ctx.letterSpacing = "0px";

  // ── Top rule ─────────────────────────────────────────────────────────────────
  const rule1Y = logoTopY + logoH + 38;
  const ruleGrad = ctx.createLinearGradient(140, rule1Y, W - 140, rule1Y);
  ruleGrad.addColorStop(0, "transparent");
  ruleGrad.addColorStop(0.25, "#c8c8d8");
  ruleGrad.addColorStop(0.75, "#c8c8d8");
  ruleGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = ruleGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, rule1Y);
  ctx.lineTo(W - 140, rule1Y);
  ctx.stroke();

  // ── Certificate of Completion heading ─────────────────────────────────────
  ctx.font = "bold 48px Georgia, serif";
  ctx.fillStyle = "#1a1a2e";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Completion", W / 2, rule1Y + 68);

  // ── Body copy ───────────────────────────────────────────────────────────────
  ctx.font = "italic 16px Georgia, serif";
  ctx.fillStyle = "#5a5a72";
  ctx.fillText(
    "This certifies that the user has successfully completed all lessons and assessments in",
    W / 2,
    rule1Y + 106,
  );

  // ── World title ──────────────────────────────────────────────────────────────
  const maxTitleWidth = W - 180;
  ctx.font = "bold 30px Georgia, serif";
  ctx.fillStyle = "#2d1b69";
  const titleText = opts.worldTitle;
  let titleBottomY: number;
  if (ctx.measureText(titleText).width > maxTitleWidth) {
    const splitIdx = titleText.indexOf(": ");
    const splitIdx2 = titleText.indexOf(" — ");
    const splitAt =
      splitIdx !== -1 ? splitIdx : splitIdx2 !== -1 ? splitIdx2 : -1;
    if (splitAt !== -1) {
      const sep = splitIdx !== -1 ? ": " : " — ";
      ctx.fillText(
        titleText.slice(0, splitAt + (sep === ": " ? 1 : 0)),
        W / 2,
        rule1Y + 152,
      );
      ctx.fillText(titleText.slice(splitAt + sep.length), W / 2, rule1Y + 190);
      titleBottomY = rule1Y + 190;
    } else {
      ctx.font = "bold 24px Georgia, serif";
      ctx.fillText(titleText, W / 2, rule1Y + 166);
      titleBottomY = rule1Y + 166;
    }
  } else {
    ctx.fillText(titleText, W / 2, rule1Y + 166);
    titleBottomY = rule1Y + 166;
  }

  // ── World subtitle ────────────────────────────────────────────────────────────
  if (opts.worldSubtitle) {
    ctx.font = "italic 15px Georgia, serif";
    ctx.fillStyle = "#7c3aed";
    ctx.fillText(opts.worldSubtitle, W / 2, titleBottomY + 32);
    titleBottomY = titleBottomY + 32;
  }

  // ── Mid rule ─────────────────────────────────────────────────────────────────
  const rule2Y = titleBottomY + 52;
  ctx.strokeStyle = ruleGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, rule2Y);
  ctx.lineTo(W - 140, rule2Y);
  ctx.stroke();

  // ── Signature block ────────────────────────────────────────────────────────────
  const sigColX = 240;
  const sigBaseY = rule2Y + 52;

  ctx.strokeStyle = "#c8c8d8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sigColX - 80, sigBaseY - 4);
  ctx.lineTo(sigColX + 80, sigBaseY - 4);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.font = "bold 14px Georgia, serif";
  ctx.fillStyle = "#1a1a2e";
  ctx.fillText("Justin JackBear", sigColX, sigBaseY + 18);
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#9090a8";
  ctx.fillText("Founder, JackBear.ai", sigColX, sigBaseY + 36);

  const dateColX = W - 240;
  ctx.strokeStyle = "#c8c8d8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(dateColX - 80, sigBaseY - 4);
  ctx.lineTo(dateColX + 80, sigBaseY - 4);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.font = "bold 14px Georgia, serif";
  ctx.fillStyle = "#1a1a2e";
  ctx.fillText(dateStr, dateColX, sigBaseY + 18);
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#9090a8";
  ctx.fillText("Date Issued", dateColX, sigBaseY + 36);

  // ── Certificate ID ────────────────────────────────────────────────────────────
  const certIdY = sigBaseY + 72;
  ctx.textAlign = "center";
  ctx.font = "10px monospace";
  ctx.fillStyle = "#b0b0c8";
  ctx.letterSpacing = "1px";
  ctx.fillText(`Certificate ID: ${certId}`, W / 2, certIdY);
  ctx.letterSpacing = "0px";

  if (opts.principal) {
    const shortPrincipal =
      opts.principal.length > 24
        ? `${opts.principal.slice(0, 12)}...${opts.principal.slice(-6)}`
        : opts.principal;
    ctx.font = "9px monospace";
    ctx.fillStyle = "#c0c0d0";
    ctx.fillText(`Principal: ${shortPrincipal}`, W / 2, certIdY + 18);
  }

  // ── Bottom rule ──────────────────────────────────────────────────────────────
  const footerRuleY = H - 74;
  ctx.strokeStyle = ruleGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, footerRuleY);
  ctx.lineTo(W - 140, footerRuleY);
  ctx.stroke();

  // ── Platform footer line ─────────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = "11px monospace";
  ctx.fillStyle = "#7c3aed";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(
    "JackBear.ai — Verifiable Intelligence Infrastructure",
    W / 2,
    footerRuleY + 20,
  );
  ctx.letterSpacing = "0px";

  // ── Verification URL (Phase 1 integrity check) ──────────────────────────
  // Truncate token in URL to keep it legible on the PDF canvas.
  // The full token is what matters; readers can follow the URL from the PDF.
  const displayUrl =
    verifyUrl.length > 90 ? `${verifyUrl.slice(0, 87)}...` : verifyUrl;

  ctx.textAlign = "center";
  ctx.font = "8.5px monospace";
  ctx.fillStyle = "#a0a0bc";
  ctx.fillText(`Verify: ${displayUrl}`, W / 2, footerRuleY + 38);
  ctx.fillText(
    "Phase 1 — integrity verification only. Not backend-issued authentication.",
    W / 2,
    footerRuleY + 52,
  );
}

// ─── Minimal PDF builder ─────────────────────────────────────────────────────────

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

// ─── Public API ──────────────────────────────────────────────────────────────────

/**
 * Generates and downloads a certificate PDF for the given world.
 * Phase 1: embeds an integrity-verification URL derived from payloadHash + issuedNonce.
 * Returns { verifyUrl, certificateId } so callers can surface the share URL.
 */
export async function downloadCertificate(
  opts: CertificateOptions,
): Promise<DownloadCertificateResult> {
  const dateStr = formatIssuedDate();

  // Build integrity token (async — uses Web Crypto SHA-256)
  const { certificateId, verifyUrl } = await buildCertToken({
    worldId:
      opts.worldId ?? opts.worldTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    worldTitle: opts.worldTitle,
    worldSubtitle: opts.worldSubtitle ?? "",
    principal: opts.principal ?? null,
  });

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 850;
  await drawCertificate(canvas, opts, certificateId, dateStr, verifyUrl);

  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.95);
  const pdfBlob = buildPdfBlob(jpegDataUrl);

  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  const safeTitle = opts.worldTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  link.href = url;
  link.download = `jackbear-certificate-${safeTitle}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { verifyUrl, certificateId };
}
