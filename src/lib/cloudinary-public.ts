import "server-only";

export function getCloudinaryCloudName() {
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    if (!url.startsWith("cloudinary://")) return null;
    try {
      const u = new URL(url);
      return u.hostname || null;
    } catch {
      return null;
    }
  }

  return process.env.CLOUDINARY_CLOUD_NAME || null;
}

export function buildCloudinaryFetchUrl(params: {
  cloudName: string;
  sourceUrl: string;
  width?: number;
}) {
  const width = params.width ?? 1400;
  const encoded = encodeURIComponent(params.sourceUrl);
  return `https://res.cloudinary.com/${params.cloudName}/image/fetch/f_auto,q_auto,w_${width}/${encoded}`;
}

