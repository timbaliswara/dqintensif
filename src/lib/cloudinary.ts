import "server-only";

import { Readable } from "node:stream";

export function isCloudinaryConfigured() {
  if (process.env.CLOUDINARY_URL) return true;
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function getCloudinaryFolder() {
  return process.env.CLOUDINARY_FOLDER || "dqs-cemani";
}

function getCloudinaryConfigFromEnv() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (cloudinaryUrl) {
    if (!cloudinaryUrl.startsWith("cloudinary://")) {
      throw new Error(
        "Invalid CLOUDINARY_URL protocol. URL should begin with 'cloudinary://'.",
      );
    }
    // Supports CLOUDINARY_URL format: cloudinary://<api_key>:<api_secret>@<cloud_name>
    const u = new URL(cloudinaryUrl);
    const cloudName = u.hostname;
    const apiKey = decodeURIComponent(u.username);
    const apiSecret = decodeURIComponent(u.password);
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("CLOUDINARY_URL is invalid.");
    }
    return { cloudName, apiKey, apiSecret };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.",
    );
  }
  return { cloudName, apiKey, apiSecret };
}

export async function uploadImageToCloudinary(params: {
  file: File;
  publicId: string;
  folder?: string;
}) {
  // Dynamic import to avoid build-time failures if env vars are misconfigured.
  // (Cloudinary SDK validates CLOUDINARY_URL on import in some environments.)
  const { v2: cloudinary } = await import("cloudinary");

  const cfg = getCloudinaryConfigFromEnv();
  cloudinary.config({
    cloud_name: cfg.cloudName,
    api_key: cfg.apiKey,
    api_secret: cfg.apiSecret,
    secure: true,
  });

  const buffer = Buffer.from(await params.file.arrayBuffer());
  const folder = params.folder ?? getCloudinaryFolder();
  const publicId = `${folder}/${params.publicId}`;

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        format: "webp",
      },
      (err, res) => {
        if (err) return reject(err);
        if (!res?.secure_url) return reject(new Error("Cloudinary upload failed."));
        resolve({ secure_url: res.secure_url });
      },
    );

    Readable.from(buffer).pipe(stream);
  });

  return result.secure_url;
}
