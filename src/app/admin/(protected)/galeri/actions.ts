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

function redirectBack(id?: string, flag?: "created" | "updated" | "deleted") {
  if (id && flag) redirect(`/admin/galeri/${id}?${flag}=1`);
  if (flag) redirect(`/admin/galeri?${flag}=1`);
  redirect("/admin/galeri");
}

export async function createGalleryItemAction(formData: FormData) {
  await requireAdmin("/admin/galeri");

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
  redirectBack(item.id, "created");
}

export async function updateGalleryItemAction(formData: FormData) {
  await requireAdmin("/admin/galeri");

  const currentId = requireField(formData.get("currentId"), "currentId");
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
  redirectBack(nextItem.id, "updated");
}

export async function deleteGalleryItemAction(formData: FormData) {
  await requireAdmin("/admin/galeri");

  const id = requireField(formData.get("id"), "id");
  const list = await listGalleryItems();
  await writeGalleryItems(list.filter((g) => g.id !== id));
  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
  revalidatePath("/");
  redirectBack(undefined, "deleted");
}
