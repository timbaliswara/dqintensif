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

export async function createArticleAction(formData: FormData) {
  await requireAdmin("/admin/artikel");
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
  redirect(`/admin/artikel/${article.slug}?created=1`);
}

export async function updateArticleAction(formData: FormData) {
  await requireAdmin("/admin/artikel");
  const currentSlug = requireField(formData.get("currentSlug"), "currentSlug");
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
  redirect(`/admin/artikel/${updated.slug}?updated=1`);
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin("/admin/artikel");
  const slug = requireField(formData.get("slug"), "slug");
  const list = await listArticles();
  await writeArticles(list.filter((a) => a.slug !== slug));
  revalidatePath("/artikel");
  revalidatePath("/admin/artikel");
  redirect("/admin/artikel?deleted=1");
}
