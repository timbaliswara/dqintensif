export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";
  const url = envUrl.trim();
  if (url) return url.replace(/\/+$/, "");
  return "http://localhost:3000";
}

