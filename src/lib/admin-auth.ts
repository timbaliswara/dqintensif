import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "dqs_admin";

function getSecret() {
  return (
    process.env.ADMIN_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-secret-change-me"
  );
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function signAdminSession(payload: { sub: string; iat: number }) {
  const secret = getSecret();
  const json = JSON.stringify(payload);
  const data = Buffer.from(json, "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyAdminSession(token: string | undefined | null) {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const secret = getSecret();
  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  if (sig.length !== expected.length) return null;
  const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!ok) return null;
  try {
    const json = Buffer.from(data, "base64url").toString("utf8");
    const payload = JSON.parse(json) as { sub: string; iat: number };
    if (!payload?.sub || !payload?.iat) return null;
    return payload;
  } catch {
    return null;
  }
}

export function isAdminEnvConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    // Dev fallback so the UI works locally.
    return password === "admin";
  }
  return password === expected;
}

export async function requireAdmin(nextPath = "/admin") {
  const jar = await cookies();
  const token = jar.get(getAdminCookieName())?.value;
  const session = verifyAdminSession(token);
  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}
