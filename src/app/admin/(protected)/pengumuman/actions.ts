"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Announcement } from "@/lib/announcements";
import { listAnnouncements, sanitizeRichHtml } from "@/lib/announcements";
import { writeAnnouncements } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/admin-auth";
import { saveUploadedImage } from "@/lib/upload-image";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function requireField(value: FormDataEntryValue | null, name: string) {
  const v = String(value ?? "").trim();
  if (!v) throw new Error(`Field '${name}' is required`);
  return v;
}

function toUserMessage(err: unknown) {
  if (err instanceof Error) {
    const msg = err.message.trim();
    if (!msg) return "Terjadi kesalahan. Silakan coba lagi.";
    const lower = msg.toLowerCase();
    if (lower.includes("slug sudah dipakai")) return "Slug sudah dipakai.";
    if (lower.includes("pengumuman tidak ditemukan")) return "Pengumuman tidak ditemukan.";
    if (lower.includes("format gambar")) return msg;
    if (lower.includes("ukuran gambar")) return msg;
    if (lower.includes("cloudinary")) {
      return "Upload cover gagal. Periksa konfigurasi Cloudinary dan coba lagi.";
    }
    if (lower.includes("supabase")) {
      return "Penyimpanan gagal. Periksa konfigurasi Supabase dan coba lagi.";
    }
    if (lower.includes("field '")) {
      return "Lengkapi semua field yang wajib diisi.";
    }
    return "Terjadi kesalahan. Silakan coba lagi.";
  }
  return "Terjadi kesalahan. Silakan coba lagi.";
}

function noticeUrl(path: string, params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (!v) continue;
    sp.set(k, v);
  }
  const qs = sp.toString();
  return qs ? `${path}?${qs}` : path;
}

export async function createAnnouncementAction(formData: FormData) {
  await requireAdmin("/admin/pengumuman");
  let redirectTo = "/admin/pengumuman";

  try {
    const title = requireField(formData.get("title"), "title");
    const slug = slugify(requireField(formData.get("slug") ?? title, "slug"));
    const contentHtmlRaw = requireField(formData.get("contentHtml"), "contentHtml");
    const coverPath = String(formData.get("coverImage") ?? "").trim();
    const coverFile = formData.get("coverFile");

    const coverImage =
      coverFile instanceof File && coverFile.size > 0
        ? await saveUploadedImage({ file: coverFile, id: slug, prefix: "pengumuman" })
        : requireField(coverPath, "coverImage");

    const item: Announcement = {
      slug,
      title,
      excerpt: requireField(formData.get("excerpt"), "excerpt"),
      displayDate: requireField(formData.get("displayDate"), "displayDate"),
      datePublishedISO: requireField(
        formData.get("datePublishedISO"),
        "datePublishedISO",
      ),
      tag: requireField(formData.get("tag"), "tag") as Announcement["tag"],
      coverImage,
      contentHtml: sanitizeRichHtml(contentHtmlRaw),
    };

    const list = await listAnnouncements();
    if (list.some((a) => a.slug === item.slug)) {
      throw new Error("Slug sudah dipakai.");
    }

    await writeAnnouncements([item, ...list]);
    revalidatePath("/pengumuman");
    revalidatePath("/admin/pengumuman");
    redirectTo = noticeUrl(`/admin/pengumuman/${item.slug}`, { created: "1" });
  } catch (err) {
    redirectTo = noticeUrl("/admin/pengumuman/baru", {
      error: "1",
      msg: toUserMessage(err),
    });
  }

  redirect(redirectTo);
}

export async function updateAnnouncementAction(formData: FormData) {
  await requireAdmin("/admin/pengumuman");
  let redirectTo = "/admin/pengumuman";
  let currentSlug = "";

  try {
    currentSlug = requireField(formData.get("currentSlug"), "currentSlug");
    const title = requireField(formData.get("title"), "title");
    const slug = slugify(requireField(formData.get("slug") ?? currentSlug, "slug"));
    const contentHtmlRaw = requireField(formData.get("contentHtml"), "contentHtml");
    const coverPath = String(formData.get("coverImage") ?? "").trim();
    const coverFile = formData.get("coverFile");

    const list = await listAnnouncements();
    const idx = list.findIndex((a) => a.slug === currentSlug);
    if (idx < 0) throw new Error("Pengumuman tidak ditemukan.");

    const coverImage =
      coverFile instanceof File && coverFile.size > 0
        ? await saveUploadedImage({ file: coverFile, id: slug, prefix: "pengumuman" })
        : requireField(coverPath, "coverImage");

    const nextItem: Announcement = {
      slug,
      title,
      excerpt: requireField(formData.get("excerpt"), "excerpt"),
      displayDate: requireField(formData.get("displayDate"), "displayDate"),
      datePublishedISO: requireField(
        formData.get("datePublishedISO"),
        "datePublishedISO",
      ),
      tag: requireField(formData.get("tag"), "tag") as Announcement["tag"],
      coverImage,
      contentHtml: sanitizeRichHtml(contentHtmlRaw),
    };

    const nextList = [...list];
    nextList.splice(idx, 1);
    if (nextList.some((a) => a.slug === nextItem.slug)) {
      throw new Error("Slug sudah dipakai.");
    }
    nextList.splice(idx, 0, nextItem);

    await writeAnnouncements(nextList);
    revalidatePath("/pengumuman");
    revalidatePath("/admin/pengumuman");
    redirectTo = noticeUrl(`/admin/pengumuman/${nextItem.slug}`, { updated: "1" });
  } catch (err) {
    redirectTo = currentSlug
      ? noticeUrl(`/admin/pengumuman/${currentSlug}`, { error: "1", msg: toUserMessage(err) })
      : noticeUrl("/admin/pengumuman", { error: "1", msg: toUserMessage(err) });
  }

  redirect(redirectTo);
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireAdmin("/admin/pengumuman");
  let redirectTo = "/admin/pengumuman";
  try {
    const slug = requireField(formData.get("slug"), "slug");
    const list = await listAnnouncements();
    await writeAnnouncements(list.filter((a) => a.slug !== slug));
    revalidatePath("/pengumuman");
    revalidatePath("/admin/pengumuman");
    redirectTo = noticeUrl("/admin/pengumuman", { deleted: "1" });
  } catch (err) {
    redirectTo = noticeUrl("/admin/pengumuman", { error: "1", msg: toUserMessage(err) });
  }

  redirect(redirectTo);
}
