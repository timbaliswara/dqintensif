"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  getAdminCookieName,
  signAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const nextPath = String(formData.get("next") || "/admin");

  const ok = verifyAdminPassword(password);
  if (!ok) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(nextPath)}`);
  }

  const token = signAdminSession({ sub: "admin", iat: Date.now() });
  const jar = await cookies();
  jar.set(getAdminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12,
  });

  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(getAdminCookieName());
  redirect("/admin/login");
}

