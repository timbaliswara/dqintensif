"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { GalleryCategory, GalleryItem } from "@/lib/gallery";
import { galleryCategories, listGalleryItems } from "@/lib/gallery";
import { writeGalleryItems } from "@/lib/admin-store";
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

async function saveImageUpload(file: File, id: string) {
  return saveUploadedImage({ file, id, prefix: "galeri" });
}

function getCategory(value: string): GalleryCategory {
  if ((galleryCategories as readonly string[]).includes(value)) return value as GalleryCategory;
  return "Kampus";
}

function toUserMessage(err: unknown) {
  if (err instanceof Error) {
    const msg = err.message.trim();
    if (!msg) return "Terjadi kesalahan. Silakan coba lagi.";
    const lower = msg.toLowerCase();
    if (lower.includes("id sudah dipakai")) return "ID sudah dipakai.";
    if (lower.includes("tidak ditemukan")) return "Item galeri tidak ditemukan.";
    if (lower.includes("format gambar")) return msg;
    if (lower.includes("ukuran gambar")) return msg;
    if (lower.includes("cloudinary")) {
      return "Upload gagal. Periksa konfigurasi Cloudinary dan coba lagi.";
    }
    if (lower.includes("supabase")) {
      return "Penyimpanan gagal. Periksa konfigurasi Supabase dan coba lagi.";
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

export async function createGalleryItemAction(formData: FormData) {
  await requireAdmin("/admin/galeri");

  let redirectTo = "/admin/galeri";

  try {
    const title = requireField(formData.get("title"), "title");
    const id = slugify(requireField(formData.get("id") ?? title, "id"));
    const description = requireField(formData.get("description"), "description");
    const category = getCategory(requireField(formData.get("category"), "category"));
    const srcPath = String(formData.get("src") ?? "").trim();
    const file = formData.get("file");

    const src =
      file instanceof File && file.size > 0
        ? await saveImageUpload(file, id)
        : requireField(srcPath, "src");

    const item: GalleryItem = {
      id,
      src,
      title,
      description,
      category,
    };

    const list = await listGalleryItems();
    if (list.some((g) => g.id === item.id)) {
      throw new Error("ID sudah dipakai.");
    }

    await writeGalleryItems([item, ...list]);
    revalidatePath("/galeri");
    revalidatePath("/admin/galeri");
    revalidatePath("/");
    redirectTo = noticeUrl(`/admin/galeri/${item.id}`, { created: "1" });
  } catch (err) {
    redirectTo = noticeUrl("/admin/galeri/baru", {
      error: "1",
      msg: toUserMessage(err),
    });
  }

  redirect(redirectTo);
}

export async function updateGalleryItemAction(formData: FormData) {
  await requireAdmin("/admin/galeri");

  let redirectTo = "/admin/galeri";
  let currentId = "";

  try {
    currentId = requireField(formData.get("currentId"), "currentId");
    const title = requireField(formData.get("title"), "title");
    const id = slugify(requireField(formData.get("id") ?? currentId, "id"));
    const description = requireField(formData.get("description"), "description");
    const category = getCategory(requireField(formData.get("category"), "category"));
    const srcPath = String(formData.get("src") ?? "").trim();
    const file = formData.get("file");

    const list = await listGalleryItems();
    const idx = list.findIndex((g) => g.id === currentId);
    if (idx < 0) throw new Error("Item galeri tidak ditemukan.");

    const src =
      file instanceof File && file.size > 0
        ? await saveImageUpload(file, id)
        : requireField(srcPath, "src");

    const nextItem: GalleryItem = {
      id,
      src,
      title,
      description,
      category,
    };

    const nextList = [...list];
    nextList.splice(idx, 1);
    if (nextList.some((g) => g.id === nextItem.id)) {
      throw new Error("ID sudah dipakai.");
    }
    nextList.splice(idx, 0, nextItem);

    await writeGalleryItems(nextList);
    revalidatePath("/galeri");
    revalidatePath("/admin/galeri");
    revalidatePath("/");
    redirectTo = noticeUrl(`/admin/galeri/${nextItem.id}`, { updated: "1" });
  } catch (err) {
    redirectTo = currentId
      ? noticeUrl(`/admin/galeri/${currentId}`, { error: "1", msg: toUserMessage(err) })
      : noticeUrl("/admin/galeri", { error: "1", msg: toUserMessage(err) });
  }

  redirect(redirectTo);
}

export async function deleteGalleryItemAction(formData: FormData) {
  await requireAdmin("/admin/galeri");

  let redirectTo = "/admin/galeri";

  try {
    const id = requireField(formData.get("id"), "id");
    const list = await listGalleryItems();
    await writeGalleryItems(list.filter((g) => g.id !== id));
    revalidatePath("/galeri");
    revalidatePath("/admin/galeri");
    revalidatePath("/");
    redirectTo = noticeUrl("/admin/galeri", { deleted: "1" });
  } catch (err) {
    redirectTo = noticeUrl("/admin/galeri", { error: "1", msg: toUserMessage(err) });
  }

  redirect(redirectTo);
}
