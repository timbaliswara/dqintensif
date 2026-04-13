"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Article } from "@/lib/articles";
import { listArticles, sanitizeRichHtml } from "@/lib/articles";
import { writeArticles } from "@/lib/admin-store";
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

async function saveCoverUpload(file: File, slug: string) {
  return saveUploadedImage({ file, id: slug, prefix: "artikel" });
}

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function toUserMessage(err: unknown) {
  if (err instanceof Error) {
    const msg = err.message.trim();
    if (!msg) return "Terjadi kesalahan. Silakan coba lagi.";
    const lower = msg.toLowerCase();
    if (lower.includes("slug sudah dipakai")) return "Slug sudah dipakai.";
    if (lower.includes("artikel tidak ditemukan")) return "Artikel tidak ditemukan.";
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

export async function createArticleAction(formData: FormData) {
  await requireAdmin("/admin/artikel");
  let redirectTo = "/admin/artikel";

  try {
    const title = requireField(formData.get("title"), "title");
    const slug = slugify(requireField(formData.get("slug") ?? title, "slug"));
    const contentHtmlRaw = requireField(formData.get("contentHtml"), "contentHtml");
    const coverPath = String(formData.get("coverImage") ?? "").trim();
    const coverFile = formData.get("coverFile");

    const coverImage =
      coverFile instanceof File && coverFile.size > 0
        ? await saveCoverUpload(coverFile, slug)
        : requireField(coverPath, "coverImage");

    const verified = String(formData.get("verified") ?? "") === "on";
    const verification = verified
      ? {
          status: "terverifikasi" as const,
          by: requireField(formData.get("verifiedBy"), "verifiedBy"),
          date: requireField(formData.get("verifiedDate"), "verifiedDate"),
          note: String(formData.get("verifiedNote") ?? "").trim() || undefined,
        }
      : undefined;

    const article: Article = {
      slug,
      title,
      excerpt: requireField(formData.get("excerpt"), "excerpt"),
      date: requireField(formData.get("date"), "date"),
      dateISO: requireField(formData.get("dateISO"), "dateISO"),
      tags: parseTags(String(formData.get("tags") ?? "")),
      author: {
        name: requireField(formData.get("authorName"), "authorName"),
        role: requireField(formData.get("authorRole"), "authorRole"),
      },
      verification,
      coverImage,
      readTime: requireField(formData.get("readTime"), "readTime"),
      contentHtml: sanitizeRichHtml(contentHtmlRaw),
    };

    const list = await listArticles();
    if (list.some((a) => a.slug === article.slug)) {
      throw new Error("Slug sudah dipakai.");
    }

    await writeArticles([article, ...list]);
    revalidatePath("/artikel");
    revalidatePath(`/artikel/${article.slug}`);
    revalidatePath("/admin/artikel");
    redirectTo = noticeUrl(`/admin/artikel/${article.slug}`, { created: "1" });
  } catch (err) {
    redirectTo = noticeUrl("/admin/artikel/baru", {
      error: "1",
      msg: toUserMessage(err),
    });
  }

  redirect(redirectTo);
}

export async function updateArticleAction(formData: FormData) {
  await requireAdmin("/admin/artikel");
  let redirectTo = "/admin/artikel";
  let currentSlug = "";

  try {
    currentSlug = requireField(formData.get("currentSlug"), "currentSlug");
    const title = requireField(formData.get("title"), "title");
    const slug = slugify(requireField(formData.get("slug") ?? currentSlug, "slug"));
    const contentHtmlRaw = requireField(formData.get("contentHtml"), "contentHtml");
    const coverPath = String(formData.get("coverImage") ?? "").trim();
    const coverFile = formData.get("coverFile");

    const list = await listArticles();
    const idx = list.findIndex((a) => a.slug === currentSlug);
    if (idx < 0) throw new Error("Artikel tidak ditemukan.");

    const coverImage =
      coverFile instanceof File && coverFile.size > 0
        ? await saveCoverUpload(coverFile, slug)
        : requireField(coverPath, "coverImage");

    const verified = String(formData.get("verified") ?? "") === "on";
    const verification = verified
      ? {
          status: "terverifikasi" as const,
          by: requireField(formData.get("verifiedBy"), "verifiedBy"),
          date: requireField(formData.get("verifiedDate"), "verifiedDate"),
          note: String(formData.get("verifiedNote") ?? "").trim() || undefined,
        }
      : undefined;

    const updated: Article = {
      slug,
      title,
      excerpt: requireField(formData.get("excerpt"), "excerpt"),
      date: requireField(formData.get("date"), "date"),
      dateISO: requireField(formData.get("dateISO"), "dateISO"),
      tags: parseTags(String(formData.get("tags") ?? "")),
      author: {
        name: requireField(formData.get("authorName"), "authorName"),
        role: requireField(formData.get("authorRole"), "authorRole"),
      },
      verification,
      coverImage,
      readTime: requireField(formData.get("readTime"), "readTime"),
      contentHtml: sanitizeRichHtml(contentHtmlRaw),
    };

    const next = [...list];
    next.splice(idx, 1);
    if (next.some((a) => a.slug === updated.slug)) {
      throw new Error("Slug sudah dipakai.");
    }
    next.splice(idx, 0, updated);

    await writeArticles(next);
    revalidatePath("/artikel");
    revalidatePath(`/artikel/${updated.slug}`);
    revalidatePath("/admin/artikel");
    redirectTo = noticeUrl(`/admin/artikel/${updated.slug}`, { updated: "1" });
  } catch (err) {
    redirectTo = currentSlug
      ? noticeUrl(`/admin/artikel/${currentSlug}`, { error: "1", msg: toUserMessage(err) })
      : noticeUrl("/admin/artikel", { error: "1", msg: toUserMessage(err) });
  }

  redirect(redirectTo);
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin("/admin/artikel");
  let redirectTo = "/admin/artikel";

  try {
    const slug = requireField(formData.get("slug"), "slug");
    const list = await listArticles();
    await writeArticles(list.filter((a) => a.slug !== slug));
    revalidatePath("/artikel");
    revalidatePath("/admin/artikel");
    redirectTo = noticeUrl("/admin/artikel", { deleted: "1" });
  } catch (err) {
    redirectTo = noticeUrl("/admin/artikel", { error: "1", msg: toUserMessage(err) });
  }

  redirect(redirectTo);
}
