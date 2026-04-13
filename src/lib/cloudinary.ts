import "server-only";

import { v2 as cloudinary } from "cloudinary";
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

function configureCloudinary() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (cloudinaryUrl) {
    // Supports CLOUDINARY_URL format: cloudinary://<api_key>:<api_secret>@<cloud_name>
    const u = new URL(cloudinaryUrl);
    const cloudName = u.hostname;
    const apiKey = decodeURIComponent(u.username);
    const apiSecret = decodeURIComponent(u.password);
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("CLOUDINARY_URL is invalid.");
    }
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    return;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.",
    );
  }
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function uploadImageToCloudinary(params: {
  file: File;
  publicId: string;
  folder?: string;
}) {
  configureCloudinary();

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
