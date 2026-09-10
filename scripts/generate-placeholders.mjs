/**
 * Generates every placeholder image under `public/images/`.
 *
 * Each file is a real PNG at the exact intrinsic size the layout expects, so a
 * licensed photograph can replace it byte-for-byte without shifting anything.
 * The generated art is deliberately plain and labelled "ПЛЕЈСХОЛДЕР" plus its
 * pixel size, so missing artwork is obvious at a glance.
 *
 * Run with: npm run placeholders
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");

/* ------------------------------------------------------------------ *
 * A 5x7 bitmap font — enough for the Latin labels stamped on the art. *
 * ------------------------------------------------------------------ */
const GLYPHS = {
  A: "01110 10001 10001 11111 10001 10001 10001",
  B: "11110 10001 10001 11110 10001 10001 11110",
  C: "01110 10001 10000 10000 10000 10001 01110",
  D: "11110 10001 10001 10001 10001 10001 11110",
  E: "11111 10000 10000 11110 10000 10000 11111",
  F: "11111 10000 10000 11110 10000 10000 10000",
  G: "01110 10001 10000 10111 10001 10001 01111",
  H: "10001 10001 10001 11111 10001 10001 10001",
  I: "11111 00100 00100 00100 00100 00100 11111",
  J: "00111 00010 00010 00010 00010 10010 01100",
  K: "10001 10010 10100 11000 10100 10010 10001",
  L: "10000 10000 10000 10000 10000 10000 11111",
  M: "10001 11011 10101 10101 10001 10001 10001",
  N: "10001 11001 10101 10011 10001 10001 10001",
  O: "01110 10001 10001 10001 10001 10001 01110",
  P: "11110 10001 10001 11110 10000 10000 10000",
  Q: "01110 10001 10001 10001 10101 10010 01101",
  R: "11110 10001 10001 11110 10100 10010 10001",
  S: "01111 10000 10000 01110 00001 00001 11110",
  T: "11111 00100 00100 00100 00100 00100 00100",
  U: "10001 10001 10001 10001 10001 10001 01110",
  V: "10001 10001 10001 10001 10001 01010 00100",
  W: "10001 10001 10001 10101 10101 11011 10001",
  X: "10001 10001 01010 00100 01010 10001 10001",
  Y: "10001 10001 01010 00100 00100 00100 00100",
  Z: "11111 00001 00010 00100 01000 10000 11111",
  0: "01110 10001 10011 10101 11001 10001 01110",
  1: "00100 01100 00100 00100 00100 00100 01110",
  2: "01110 10001 00001 00010 00100 01000 11111",
  3: "11111 00010 00100 00010 00001 10001 01110",
  4: "00010 00110 01010 10010 11111 00010 00010",
  5: "11111 10000 11110 00001 00001 10001 01110",
  6: "00110 01000 10000 11110 10001 10001 01110",
  7: "11111 00001 00010 00100 01000 01000 01000",
  8: "01110 10001 10001 01110 10001 10001 01110",
  9: "01110 10001 10001 01111 00001 00010 01100",
  "×": "00000 10001 01010 00100 01010 10001 00000",
  "-": "00000 00000 00000 11111 00000 00000 00000",
  "/": "00001 00010 00010 00100 01000 01000 10000",
  ".": "00000 00000 00000 00000 00000 01100 01100",
  " ": "00000 00000 00000 00000 00000 00000 00000",
};

const GLYPH_W = 5;
const GLYPH_H = 7;

/** Minimal RGB PNG encoder. */
function encodePng(width, height, rgb) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 3 + 1);
    raw[rowStart] = 0; // filter: none
    rgb.copy(raw, rowStart + 1, y * width * 3, (y + 1) * width * 3);
  }

  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

/** Tiny drawing surface over a flat RGB buffer. */
function createCanvas(width, height, background) {
  const data = Buffer.alloc(width * 3 * height);
  for (let i = 0; i < width * height; i++) {
    data[i * 3] = background[0];
    data[i * 3 + 1] = background[1];
    data[i * 3 + 2] = background[2];
  }

  const setPixel = (x, y, [r, g, b]) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = (y * width + x) * 3;
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  };

  const fillRect = (x0, y0, w, h, colour) => {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) setPixel(x, y, colour);
    }
  };

  const strokeRect = (x0, y0, w, h, thickness, colour) => {
    fillRect(x0, y0, w, thickness, colour);
    fillRect(x0, y0 + h - thickness, w, thickness, colour);
    fillRect(x0, y0, thickness, h, colour);
    fillRect(x0 + w - thickness, y0, thickness, h, colour);
  };

  const drawText = (text, cx, cy, scale, colour) => {
    const chars = [...text.toUpperCase()];
    const advance = (GLYPH_W + 1) * scale;
    const totalWidth = chars.length * advance - scale;
    let penX = Math.round(cx - totalWidth / 2);
    const penY = Math.round(cy - (GLYPH_H * scale) / 2);
    for (const ch of chars) {
      const rows = (GLYPHS[ch] ?? GLYPHS[" "]).split(" ");
      rows.forEach((row, ry) => {
        [...row].forEach((bit, rx) => {
          if (bit === "1") {
            fillRect(penX + rx * scale, penY + ry * scale, scale, scale, colour);
          }
        });
      });
      penX += advance;
    }
  };

  return { data, width, height, fillRect, strokeRect, drawText };
}

const INK = [255, 255, 255];

/**
 * Builds one placeholder: flat tinted ground, diagonal hatching, a framed
 * centre, and a label naming the file's role and pixel size.
 */
function makePlaceholder({ width, height, label, tint }) {
  const canvas = createCanvas(width, height, tint.base);

  // Diagonal hatching keeps flat placeholders from reading as a design choice.
  const step = Math.max(18, Math.round(Math.min(width, height) / 22));
  for (let d = -height; d < width; d += step) {
    for (let y = 0; y < height; y++) {
      const x = d + y;
      for (let t = 0; t < Math.max(1, Math.round(step / 12)); t++) {
        const px = x + t;
        if (px >= 0 && px < width) {
          const i = (y * width + px) * 3;
          canvas.data[i] = tint.hatch[0];
          canvas.data[i + 1] = tint.hatch[1];
          canvas.data[i + 2] = tint.hatch[2];
        }
      }
    }
  }

  const inset = Math.round(Math.min(width, height) * 0.08);
  const frameThickness = Math.max(2, Math.round(Math.min(width, height) / 160));
  canvas.strokeRect(
    inset,
    inset,
    width - inset * 2,
    height - inset * 2,
    frameThickness,
    tint.frame,
  );

  const scale = Math.max(1, Math.round(Math.min(width, height) / 90));
  const labelScale = Math.max(1, Math.round(scale * 0.8));
  canvas.drawText(label, width / 2, height / 2 - scale * 6, scale, INK);
  canvas.drawText(
    `${width} × ${height}`,
    width / 2,
    height / 2 + scale * 6,
    labelScale,
    tint.frame,
  );
  canvas.drawText(
    "PLACEHOLDER",
    width / 2,
    height / 2 + scale * 16,
    Math.max(1, Math.round(labelScale * 0.7)),
    tint.frame,
  );

  return encodePng(width, height, canvas.data);
}

const TINTS = {
  crimson: { base: [92, 24, 33], hatch: [104, 30, 40], frame: [222, 158, 166] },
  slate: { base: [42, 46, 54], hatch: [50, 55, 64], frame: [166, 176, 192] },
  stone: { base: [214, 212, 208], hatch: [204, 202, 197], frame: [116, 112, 106] },
  sand: { base: [176, 152, 122], hatch: [168, 144, 114], frame: [72, 60, 46] },
};

const FILES = [
  // Homepage hero slides
  { path: "hero/hero-01-placeholder.png", width: 1920, height: 1080, label: "HERO 01", tint: "slate" },
  { path: "hero/hero-02-placeholder.png", width: 1920, height: 1080, label: "HERO 02", tint: "sand" },
  { path: "hero/hero-03-placeholder.png", width: 1920, height: 1080, label: "HERO 03", tint: "crimson" },

  // Team collage (rendered with object-contain)
  { path: "team/team-collage-placeholder.png", width: 1136, height: 1270, label: "TEAM COLLAGE", tint: "stone" },

  // Inner page heroes
  { path: "page/uslugi-hero-placeholder.png", width: 1920, height: 720, label: "USLUGI HERO", tint: "sand" },
  { path: "page/programi-hero-placeholder.png", width: 1920, height: 720, label: "PROGRAMI HERO", tint: "crimson" },
  { path: "page/za-nas-hero-placeholder.png", width: 1920, height: 720, label: "ZA NAS HERO", tint: "slate" },
  { path: "page/kontakt-hero-placeholder.png", width: 1920, height: 720, label: "KONTAKT HERO", tint: "sand" },
  { path: "page/blog-hero-placeholder.png", width: 1920, height: 720, label: "BLOG HERO", tint: "slate" },

  // Service rows on /mk/uslugi
  ...Array.from({ length: 7 }, (_, i) => ({
    path: `services/service-0${i + 1}-placeholder.png`,
    width: 800,
    height: 600,
    label: `SERVICE 0${i + 1}`,
    tint: i % 2 === 0 ? "stone" : "slate",
  })),

  // Article thumbnails / hero images
  ...Array.from({ length: 11 }, (_, i) => ({
    path: `blog/blog-${String(i + 1).padStart(2, "0")}-placeholder.png`,
    width: 1040,
    height: 416,
    label: `BLOG ${String(i + 1).padStart(2, "0")}`,
    tint: ["slate", "sand", "stone", "crimson"][i % 4],
  })),

  // Footer background and social card
  { path: "footer/footer-bg-placeholder.png", width: 1920, height: 970, label: "FOOTER BG", tint: "slate" },
  { path: "og/og-image-placeholder.png", width: 1200, height: 630, label: "WVP PLUS CONSULTING", tint: "crimson" },

  // Map still used on the contact page
  { path: "page/kontakt-map-placeholder.png", width: 1040, height: 800, label: "MAPA SKOPJE", tint: "stone" },
];

let written = 0;
for (const file of FILES) {
  const target = join(OUT, file.path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(
    target,
    makePlaceholder({
      width: file.width,
      height: file.height,
      label: file.label,
      tint: TINTS[file.tint],
    }),
  );
  written++;
}

console.log(`Wrote ${written} placeholder images to public/images/`);
