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


export async function createAnnouncementAction(formData: FormData) {
  await requireAdmin("/admin/pengumuman");
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
    datePublishedISO: requireField(formData.get("datePublishedISO"), "datePublishedISO"),
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
  redirect(`/admin/pengumuman/${item.slug}?created=1`);
}

export async function updateAnnouncementAction(formData: FormData) {
  await requireAdmin("/admin/pengumuman");
  const currentSlug = requireField(formData.get("currentSlug"), "currentSlug");
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
    datePublishedISO: requireField(formData.get("datePublishedISO"), "datePublishedISO"),
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
  redirect(`/admin/pengumuman/${nextItem.slug}?updated=1`);
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireAdmin("/admin/pengumuman");
  const slug = requireField(formData.get("slug"), "slug");
  const list = await listAnnouncements();
  await writeAnnouncements(list.filter((a) => a.slug !== slug));
  revalidatePath("/pengumuman");
  revalidatePath("/admin/pengumuman");
  redirect("/admin/pengumuman?deleted=1");
}
