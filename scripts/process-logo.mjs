import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/process-logo.mjs <input.png>");
  process.exit(1);
}

const root = process.cwd();
const outDir = path.join(root, "public/brand");
await fs.mkdir(outDir, { recursive: true });

const base = sharp(input).ensureAlpha();
const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });

// Convert near-black background to transparency (with soft edges).
// Background in the provided logo is solid black; this preserves anti-aliasing.
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // If it's grayscale-ish and very dark, fade to transparent.
  const isNearGray = max - min < 14;
  if (isNearGray && max < 70) {
    // Soft ramp: 0..70 -> alpha 0..255
    const a = Math.max(0, Math.min(255, Math.round((max / 70) * 255)));
    data[i + 3] = Math.min(data[i + 3], a);
  }
}

const transparent = sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
}).png();

const fullPath = path.join(outDir, "logo-dq.png");
await transparent.toFile(fullPath);

// Create square mark (left emblem area). Extract a best-effort square crop.
const markSize = Math.min(info.height, 256);
const markPath = path.join(outDir, "logo-dq-mark.png");
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .extract({ left: 0, top: 0, width: info.height, height: info.height })
  .resize(markSize, markSize, { fit: "contain" })
  .png()
  .toFile(markPath);

// Optional: a white-on-transparent variant for dark backgrounds.
const whitePath = path.join(outDir, "logo-dq-white.png");
await sharp(fullPath)
  .ensureAlpha()
  .linear(1, 0)
  .tint({ r: 255, g: 255, b: 255 })
  .png()
  .toFile(whitePath);

console.log("Wrote:");
console.log("-", path.relative(root, fullPath));
console.log("-", path.relative(root, markPath));
console.log("-", path.relative(root, whitePath));

