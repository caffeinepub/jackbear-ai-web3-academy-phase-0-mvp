/**
 * generateCertificate.ts
 *
 * Draws a completion certificate on an offscreen Canvas,
 * wraps it in a minimal hand-crafted single-page PDF blob,
 * and triggers a browser download.
 *
 * Zero external dependencies — uses only the browser Canvas API.
 */

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CertificateOptions {
  worldTitle: string;
  principal?: string;
}

// ─── UUID helper ────────────────────────────────────────────────────────────

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── Canvas drawing ─────────────────────────────────────────────────────────

function drawCertificate(
  canvas: HTMLCanvasElement,
  opts: CertificateOptions,
  certId: string,
  dateStr: string,
): void {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // ── Background ────────────────────────────────────────────────────────────
  ctx.fillStyle = "#0f1117";
  ctx.fillRect(0, 0, W, H);

  // ── Outer border ─────────────────────────────────────────────────────────
  const borderPad = 24;
  ctx.strokeStyle = "#4f4f6a";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(borderPad, borderPad, W - borderPad * 2, H - borderPad * 2);

  // ── Inner accent border ───────────────────────────────────────────────────
  const innerPad = 34;
  ctx.strokeStyle = "#7c3aed40";
  ctx.lineWidth = 1;
  ctx.strokeRect(innerPad, innerPad, W - innerPad * 2, H - innerPad * 2);

  // ── Corner accents ────────────────────────────────────────────────────────
  const cornerSize = 20;
  const corners = [
    [borderPad, borderPad],
    [W - borderPad - cornerSize, borderPad],
    [borderPad, H - borderPad - cornerSize],
    [W - borderPad - cornerSize, H - borderPad - cornerSize],
  ] as [number, number][];
  ctx.strokeStyle = "#7c3aed";
  ctx.lineWidth = 2;
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + cornerSize, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + cornerSize);
    ctx.stroke();
  }

  // ── Top label ─────────────────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = "#7c3aed";
  ctx.letterSpacing = "6px";
  ctx.fillText("VERIFIABLE INTELLIGENCE INFRASTRUCTURE", W / 2, 90);
  ctx.letterSpacing = "0px";

  // ── Divider ───────────────────────────────────────────────────────────────
  const divY = 105;
  const divGrad = ctx.createLinearGradient(120, divY, W - 120, divY);
  divGrad.addColorStop(0, "transparent");
  divGrad.addColorStop(0.3, "#7c3aed");
  divGrad.addColorStop(0.7, "#7c3aed");
  divGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, divY);
  ctx.lineTo(W - 120, divY);
  ctx.stroke();

  // ── Title ─────────────────────────────────────────────────────────────────
  ctx.font = "bold 52px serif";
  ctx.fillStyle = "#f8f8ff";
  ctx.fillText("Certificate of Completion", W / 2, 195);

  // ── Body copy ─────────────────────────────────────────────────────────────
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#a0a0b8";
  ctx.fillText(
    "This certifies that the user has successfully completed",
    W / 2,
    250,
  );
  ctx.fillText("all lessons and assessments in", W / 2, 276);

  // ── World subtitle ────────────────────────────────────────────────────────
  // Wrap long world titles gracefully
  const maxTitleWidth = W - 160;
  ctx.font = "bold 30px serif";
  ctx.fillStyle = "#c4b5fd";
  const titleText = opts.worldTitle;
  if (ctx.measureText(titleText).width > maxTitleWidth) {
    // Simple split on " — " or ":" if present
    const splitIdx = titleText.indexOf(": ");
    if (splitIdx !== -1) {
      ctx.fillText(titleText.slice(0, splitIdx + 1), W / 2, 330);
      ctx.fillText(titleText.slice(splitIdx + 2), W / 2, 368);
    } else {
      ctx.font = "bold 24px serif";
      ctx.fillText(titleText, W / 2, 348);
    }
  } else {
    ctx.fillText(titleText, W / 2, 348);
  }

  // ── Divider 2 ─────────────────────────────────────────────────────────────
  const div2Y = 415;
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, div2Y);
  ctx.lineTo(W - 120, div2Y);
  ctx.stroke();

  // ── Metadata block ────────────────────────────────────────────────────────
  const metaBaseY = 455;
  const metaLineHeight = 26;
  ctx.font = "13px monospace";
  ctx.textAlign = "center";

  ctx.fillStyle = "#6b6b84";
  ctx.fillText("DATE ISSUED", W / 2 - 240, metaBaseY);
  ctx.fillStyle = "#c8c8d8";
  ctx.fillText(dateStr, W / 2 - 240, metaBaseY + metaLineHeight);

  ctx.fillStyle = "#6b6b84";
  ctx.fillText("CERTIFICATE ID", W / 2, metaBaseY);
  ctx.fillStyle = "#c8c8d8";
  ctx.font = "11px monospace";
  ctx.fillText(certId, W / 2, metaBaseY + metaLineHeight);

  if (opts.principal) {
    ctx.font = "13px monospace";
    ctx.fillStyle = "#6b6b84";
    ctx.fillText("PRINCIPAL", W / 2 + 240, metaBaseY);
    ctx.fillStyle = "#c8c8d8";
    ctx.font = "9px monospace";
    // Truncate principal for display
    const shortPrincipal =
      opts.principal.length > 20
        ? `${opts.principal.slice(0, 10)}...${opts.principal.slice(-5)}`
        : opts.principal;
    ctx.fillText(shortPrincipal, W / 2 + 240, metaBaseY + metaLineHeight);
  }

  // ── Footer divider ────────────────────────────────────────────────────────
  const footerDivY = H - 90;
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, footerDivY);
  ctx.lineTo(W - 120, footerDivY);
  ctx.stroke();

  // ── Footer ────────────────────────────────────────────────────────────────
  ctx.font = "bold 14px monospace";
  ctx.fillStyle = "#7c3aed";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2px";
  ctx.fillText("JackBear.ai", W / 2, H - 60);
  ctx.letterSpacing = "0px";
  ctx.font = "11px monospace";
  ctx.fillStyle = "#4f4f6a";
  ctx.fillText("Verifiable Intelligence Infrastructure", W / 2, H - 40);
}

// ─── Minimal PDF builder ─────────────────────────────────────────────────────

/**
 * Builds a minimal valid PDF containing a single full-page JPEG image.
 * Does not require any external PDF library.
 */
function buildPdfBlob(jpegDataUrl: string): Blob {
  // Strip the data URL prefix to get the raw base64 string
  const base64Data = jpegDataUrl.split(",")[1];
  const imageBytes = atob(base64Data);
  const imageLength = imageBytes.length;

  // PDF dimensions in points (1pt = 1/72 inch)
  // Canvas is 1200x850px; use 72dpi equivalent → 1200x850pt for full bleed
  const pageWidthPt = 1200;
  const pageHeightPt = 850;

  // Build PDF objects as text + binary
  const enc = new TextEncoder();

  // Object 1: catalog
  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";

  // Object 2: pages
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";

  // Object 3: page
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidthPt} ${pageHeightPt}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n`;

  // Object 4: content stream — draw image filling the page
  const contentStream = `q\n${pageWidthPt} 0 0 ${pageHeightPt} 0 0 cm\n/Im1 Do\nQ\n`;
  const contentStreamBytes = enc.encode(contentStream);
  const obj4 = `4 0 obj\n<< /Length ${contentStreamBytes.length} >>\nstream\n${contentStream}endstream\nendobj\n`;

  // Object 5: image XObject (JPEG)
  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pageWidthPt} /Height ${pageHeightPt} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageLength} >>\nstream\n`;
  const obj5Footer = "\nendstream\nendobj\n";

  // Calculate byte offsets for xref table
  const offsets: number[] = [];
  let offset = 0;

  const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const headerBytes = enc.encode(header);
  offset += headerBytes.length;

  offsets.push(offset); // obj1
  const obj1Bytes = enc.encode(obj1);
  offset += obj1Bytes.length;

  offsets.push(offset); // obj2
  const obj2Bytes = enc.encode(obj2);
  offset += obj2Bytes.length;

  offsets.push(offset); // obj3
  const obj3Bytes = enc.encode(obj3);
  offset += obj3Bytes.length;

  offsets.push(offset); // obj4
  const obj4Bytes = enc.encode(obj4);
  offset += obj4Bytes.length;

  offsets.push(offset); // obj5
  const obj5HeaderBytes = enc.encode(obj5Header);
  const obj5FooterBytes = enc.encode(obj5Footer);

  const xrefOffset =
    offset + obj5HeaderBytes.length + imageLength + obj5FooterBytes.length;

  // Build xref table
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

  // Assemble all parts into a single Uint8Array
  const xrefBytes = enc.encode(xref);
  const trailerBytes = enc.encode(trailer);

  // Convert image string to Uint8Array
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

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Generates and downloads a certificate PDF for the given world.
 */
export function downloadCertificate(opts: CertificateOptions): void {
  const certId = generateUUID();
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Draw on an offscreen canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 850;
  drawCertificate(canvas, opts, certId, dateStr);

  // Export as JPEG (smaller than PNG, good enough for certificate)
  const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.95);

  // Build PDF blob
  const pdfBlob = buildPdfBlob(jpegDataUrl);

  // Trigger download
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
}
