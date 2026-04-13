import "server-only";

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { isCloudinaryConfigured, uploadImageToCloudinary } from "@/lib/cloudinary";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function getExtFromMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return null;
}

async function saveLocalUpload(file: File, slug: string, prefix: string) {
  const mime = file.type || "";
  const ext = getExtFromMime(mime);
  if (!ext) throw new Error("Format gambar tidak didukung (gunakan JPG/PNG/WebP).");

  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) throw new Error("Ukuran gambar terlalu besar (maks 5MB).");

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const rand = crypto.randomBytes(6).toString("hex");
  const fileName = `${prefix}-${slug}-${Date.now()}-${rand}.${ext}`;
  const outPath = path.join(UPLOAD_DIR, fileName);
  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(outPath, Buffer.from(arrayBuffer));
  return `/uploads/${fileName}`;
}

export async function saveUploadedImage(params: {
  file: File;
  id: string;
  prefix: string;
  folder?: string;
}) {
  if (isCloudinaryConfigured()) {
    return uploadImageToCloudinary({
      file: params.file,
      publicId: `${params.prefix}-${params.id}`,
      folder: params.folder,
    });
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Upload gambar membutuhkan Cloudinary saat deploy di Vercel. Set CLOUDINARY_* env vars.",
    );
  }

  return saveLocalUpload(params.file, params.id, params.prefix);
}

