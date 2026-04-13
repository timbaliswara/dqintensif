import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

function svgTemplate({
  title,
  subtitle,
  hue = 160,
  accentHue = 85,
  glyph = "✦",
}) {
  const bg1 = `oklch(0.22 0.05 ${hue})`;
  const bg2 = `oklch(0.16 0.04 ${hue})`;
  const acc = `oklch(0.85 0.13 ${accentHue})`;
  const fg = `oklch(0.98 0.01 95)`;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <radialGradient id="r" cx="25%" cy="20%" r="75%">
      <stop offset="0" stop-color="${acc}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${acc}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="${fg}" stroke-opacity="0.06"/>
      <path d="M24 12 L36 24 L24 36 L12 24 Z" fill="none" stroke="${fg}" stroke-opacity="0.06"/>
      <circle cx="24" cy="24" r="1.5" fill="${fg}" opacity="0.09"/>
    </pattern>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#g)"/>
  <rect width="1600" height="900" fill="url(#p)"/>
  <rect width="1600" height="900" fill="url(#r)"/>

  <g opacity="0.18" filter="url(#soft)">
    <circle cx="1240" cy="140" r="180" fill="${acc}"/>
    <circle cx="1420" cy="280" r="120" fill="${acc}"/>
  </g>

  <g opacity="0.12">
    <path d="M210 720 C360 560, 520 520, 680 560 C820 596, 980 590, 1120 520 C1280 450, 1400 430, 1540 480 L1540 900 L210 900 Z" fill="${fg}"/>
  </g>

  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" fill="${fg}">
    <text x="96" y="120" font-size="34" opacity="0.75">${glyph}  Pondok Pesantren</text>
    <text x="96" y="190" font-size="62" font-weight="700">${escapeXml(title)}</text>
    <text x="96" y="250" font-size="28" opacity="0.78">${escapeXml(subtitle)}</text>
  </g>

  <g fill="${fg}" opacity="0.18" font-family="ui-sans-serif, system-ui">
    <text x="96" y="820" font-size="16">Placeholder visual — ganti dengan foto asli kegiatan &amp; bangunan.</text>
  </g>
</svg>`;
}

function escapeXml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function writeWebp(outFile, svg, quality = 82) {
  const buffer = Buffer.from(svg);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await sharp(buffer).webp({ quality }).toFile(outFile);
}

const tasks = [
  {
    out: "public/images/activities/halaqah.webp",
    title: "Halaqah Qur’an",
    subtitle: "Setoran · Muroja’ah · Evaluasi Tajwid",
    hue: 162,
    accentHue: 85,
    glyph: "✦",
  },
  {
    out: "public/images/activities/tahfizh.webp",
    title: "Tahfizh Harian",
    subtitle: "Pendampingan dekat dalam halaqah kecil",
    hue: 158,
    accentHue: 90,
    glyph: "۞",
  },
  {
    out: "public/images/activities/muhadharah.webp",
    title: "Muhadharah",
    subtitle: "Public speaking yang santun dan terarah",
    hue: 165,
    accentHue: 80,
    glyph: "✧",
  },
  {
    out: "public/images/campus/masjid.webp",
    title: "Masjid Pesantren",
    subtitle: "Pusat ibadah dan majelis ilmu",
    hue: 168,
    accentHue: 85,
    glyph: "☾",
  },
  {
    out: "public/images/campus/asrama.webp",
    title: "Asrama Santri",
    subtitle: "Rapi · Bersih · Tertib",
    hue: 160,
    accentHue: 92,
    glyph: "✦",
  },
  {
    out: "public/images/campus/gerbang.webp",
    title: "Gerbang Pesantren",
    subtitle: "Selamat datang di lingkungan yang aman",
    hue: 155,
    accentHue: 88,
    glyph: "✶",
  },
];

await Promise.all(
  tasks.map((t) =>
    writeWebp(
      path.join(root, t.out),
      svgTemplate({
        title: t.title,
        subtitle: t.subtitle,
        hue: t.hue,
        accentHue: t.accentHue,
        glyph: t.glyph,
      }),
    ),
  ),
);

console.log("Generated placeholders:");
for (const t of tasks) console.log("-", t.out);
