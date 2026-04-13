import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";

const root = process.cwd();

const images = [
  {
    out: "public/images/campus/masjid.webp",
    id: "L7J4ytEFRCg",
    title: "Mosque (exterior)",
    author: "Alim",
    handle: "alim_hamzah",
    page: "https://unsplash.com/photos/L7J4ytEFRCg",
  },
  {
    out: "public/images/campus/asrama.webp",
    id: "J5pSplcWR2g",
    title: "Building corridor (campus)",
    author: "Alim",
    handle: "alim_hamzah",
    page: "https://unsplash.com/photos/J5pSplcWR2g",
  },
  {
    out: "public/images/campus/gerbang.webp",
    id: "LYMrG-pOn9g",
    title: "Pesantren sign/building (gate)",
    author: "Haidan",
    handle: "hydngallery",
    page: "https://unsplash.com/photos/LYMrG-pOn9g",
  },
  {
    out: "public/images/activities/halaqah-muslimah.webp",
    id: "TDWgUTXmGVI",
    title: "2 women studying together (hijab)",
    author: "Andri Helmansyah",
    handle: "andri_helmansyah",
    page: "https://unsplash.com/photos/TDWgUTXmGVI",
  },
  {
    out: "public/images/articles/kemuliaan-quran.webp",
    id: "ZsNm8es4g-U",
    title: "2 girls reading Al-Quran in the mosque",
    author: "Ed Us",
    handle: "isengrapher",
    page: "https://unsplash.com/photos/ZsNm8es4g-U",
  },
  {
    out: "public/images/gallery/istiqlal-twilight.webp",
    id: "PbKQCYxKZug",
    title: "Istiqlal Mosque (twilight)",
    author: "mosquegrapher",
    handle: "mosquegrapher",
    page: "https://unsplash.com/photos/PbKQCYxKZug",
  },
  {
    out: "public/images/gallery/mosque-arches.webp",
    id: "Ll6xnrK_KAc",
    title: "Mosque interior arches",
    author: "Mohd Zulkiflee",
    handle: "mohdzulkiflee",
    page: "https://unsplash.com/photos/Ll6xnrK_KAc",
  },
  {
    out: "public/images/gallery/quran-in-hand.webp",
    id: "dWFyYh-G02g",
    title: "Reading Al-Quran",
    author: "Masjid MABA",
    handle: "masjidmaba",
    page: "https://unsplash.com/photos/dWFyYh-G02g",
  },
  {
    out: "public/images/gallery/quran-on-shelf.webp",
    id: "vxsQvW5t-RQ",
    title: "Quran on shelf",
    author: "Masjid MABA",
    handle: "masjidmaba",
    page: "https://unsplash.com/photos/vxsQvW5t-RQ",
  },
  {
    out: "public/images/gallery/kitab-turats.webp",
    id: "L14MxwGoG-s",
    title: "Kitab (Arabic text)",
    author: "Madrosah Sunnah",
    handle: "26_ms",
    page: "https://unsplash.com/photos/L14MxwGoG-s",
  },
  {
    out: "public/images/gallery/catatan-belajar.webp",
    id: "_Nz0XNMtgv0",
    title: "Notebook with arabic script",
    author: "Leo_Visions",
    handle: "leo_visions_",
    page: "https://unsplash.com/photos/_Nz0XNMtgv0",
  },
  {
    out: "public/images/activities/tahfizh.webp",
    id: "8mXQ2z2snO0",
    title: "Qur'an reading (interior)",
    author: "Masjid Pogung Dalangan",
    handle: "masjidpogung",
    page: "https://unsplash.com/photos/8mXQ2z2snO0",
  },
  {
    out: "public/images/activities/muhadharah.webp",
    id: "oeCG86T6-7c",
    title: "Public speaking (lecture)",
    author: "imam hassan",
    handle: "imamhassan",
    page: "https://unsplash.com/photos/oeCG86T6-7c",
  },
  {
    out: "public/images/articles/ceramah-adab-digital.webp",
    id: "UUZ2HmFODzU",
    title: "Islamic calligraphy and wooden podium in mosque",
    author: "Alim",
    handle: "apyfz",
    page: "https://unsplash.com/photos/UUZ2HmFODzU",
  },
  {
    out: "public/images/articles/ceramah-menata-hati.webp",
    id: "wfStoJnoogw",
    title: "Person holding Qur'an",
    author: "Masjid Pogung Dalangan",
    handle: "masjidmpd",
    page: "https://unsplash.com/photos/wfStoJnoogw",
  },
  {
    out: "public/images/articles/ceramah-rumah-quran.webp",
    id: "TDWgUTXmGVI",
    title: "Two women studying together",
    author: "Ed Us",
    handle: "isengrapher",
    page: "https://unsplash.com/photos/TDWgUTXmGVI",
  },
  {
    out: "public/images/activities/ustadzah-menyampaikan-materi.webp",
    id: "MAX5ElEPDak",
    title: "A woman using a microphone",
    author: "Jeffrey Alvares",
    handle: "jralvares",
    page: "https://unsplash.com/photos/MAX5ElEPDak",
  },
  {
    out: "public/images/activities/ustadz-menyampaikan-materi.webp",
    id: "62LVKnnv-8s",
    title: "A man holding a microphone",
    author: "Bahrom Muhajir",
    handle: "bahrommuhajir",
    page: "https://unsplash.com/photos/62LVKnnv-8s",
  },
];

async function downloadBuffer(url) {
  const headers = {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
    accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  };

  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const res = await fetch(url, { redirect: "follow", headers });
      if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err) {
      lastError = err;
      const waitMs = 400 * attempt * attempt;
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }

  throw new Error(`Fetch failed after retries: ${url}\n${String(lastError)}`);
}

function run(cmd, args, { quiet = true } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: quiet ? "ignore" : "inherit",
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

async function readPixels(imageFile) {
  const { stdout } = await new Promise((resolve, reject) => {
    const child = spawn("sips", ["-g", "pixelWidth", "-g", "pixelHeight", "-1", imageFile], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    let err = "";
    child.stdout.on("data", (d) => (out += d.toString("utf8")));
    child.stderr.on("data", (d) => (err += d.toString("utf8")));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) reject(new Error(`sips query failed: ${err || out}`));
      else resolve({ stdout: out });
    });
  });

  // Format: /path|pixelWidth: 1600|pixelHeight: 1000|
  const widthMatch = stdout.match(/pixelWidth:\s*(\d+)/);
  const heightMatch = stdout.match(/pixelHeight:\s*(\d+)/);
  if (!widthMatch || !heightMatch) {
    throw new Error(`Could not parse sips output: ${stdout}`);
  }
  return { width: Number(widthMatch[1]), height: Number(heightMatch[1]) };
}

async function writeWebpCover(outFile, inputBuffer) {
  await fs.mkdir(path.dirname(outFile), { recursive: true });

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "dqs-img-"));
  const inFile = path.join(tmpDir, "in.jpg");
  const resizedFile = path.join(tmpDir, "resized.jpg");
  const croppedFile = path.join(tmpDir, "cropped.jpg");
  const outTmpWebp = path.join(tmpDir, "out.webp");

  await fs.writeFile(inFile, inputBuffer);

  const targetW = 1600;
  const targetH = 1000;
  const { width, height } = await readPixels(inFile);

  const scale = Math.max(targetW / width, targetH / height);
  const newW = Math.max(targetW, Math.round(width * scale));
  const newH = Math.max(targetH, Math.round(height * scale));

  await run("sips", ["-z", String(newH), String(newW), inFile, "-o", resizedFile]);

  const offsetY = Math.max(0, Math.floor((newH - targetH) / 2));
  const offsetX = Math.max(0, Math.floor((newW - targetW) / 2));
  await run("sips", [
    "-c",
    String(targetH),
    String(targetW),
    "--cropOffset",
    String(offsetY),
    String(offsetX),
    resizedFile,
    "-o",
    croppedFile,
  ]);

  await run("cwebp", ["-quiet", "-q", "82", croppedFile, "-o", outTmpWebp]);
  await fs.copyFile(outTmpWebp, outFile);

  await fs.rm(tmpDir, { recursive: true, force: true });
}

const creditsLines = [
  "# Image Credits",
  "",
  "Gambar-gambar di folder ini digunakan untuk demo/placeholder yang lebih realistis.",
  "Sumber: Unsplash (Free to use under the Unsplash License).",
  "",
];

for (const img of images) {
  const url = `https://unsplash.com/photos/${img.id}/download?force=true`;
  const outAbs = path.join(root, img.out);
  const buffer = await downloadBuffer(url);
  await writeWebpCover(outAbs, buffer);
  creditsLines.push(
    `- ${img.out} — "${img.title}" by ${img.author} (@${img.handle}) · ${img.page}`,
  );
  // Be kind to rate limits.
  await new Promise((r) => setTimeout(r, 250));
}

await fs.writeFile(
  path.join(root, "public/images/CREDITS.md"),
  creditsLines.join("\n") + "\n",
  "utf8",
);

console.log("Downloaded and processed:");
for (const img of images) console.log("-", img.out);
console.log("Wrote: public/images/CREDITS.md");
