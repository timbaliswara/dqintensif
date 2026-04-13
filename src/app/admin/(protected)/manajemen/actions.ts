"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { ManagementMember, ManagementUnit } from "@/lib/management";
import { listManagementMembers, managementUnits } from "@/lib/management";
import { writeManagementMembers } from "@/lib/admin-store";
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

function toBool(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function getUnit(value: string): ManagementUnit {
  if ((managementUnits as readonly string[]).includes(value)) return value as ManagementUnit;
  return "Pimpinan";
}

async function savePhotoUpload(file: File, id: string) {
  return saveUploadedImage({ file, id, prefix: "manajemen" });
}

function redirectBack(id?: string, flag?: "created" | "updated" | "deleted") {
  if (id && flag) redirect(`/admin/manajemen/${id}?${flag}=1`);
  if (flag) redirect(`/admin/manajemen?${flag}=1`);
  redirect("/admin/manajemen");
}

export async function createManagementMemberAction(formData: FormData) {
  await requireAdmin("/admin/manajemen");

  const name = requireField(formData.get("name"), "name");
  const id = slugify(requireField(formData.get("id") ?? name, "id"));
  const photoPath = String(formData.get("photo") ?? "").trim();
  const photoFile = formData.get("photoFile");

  const photo =
    photoFile instanceof File && photoFile.size > 0
      ? await savePhotoUpload(photoFile, id)
      : requireField(photoPath, "photo");

  const item: ManagementMember = {
    id,
    name,
    role: requireField(formData.get("role"), "role"),
    unit: getUnit(requireField(formData.get("unit"), "unit")),
    termStart: requireField(formData.get("termStart"), "termStart"),
    termEnd: String(formData.get("termEnd") ?? "").trim() || undefined,
    photo,
    bio: requireField(formData.get("bio"), "bio"),
    order: Number(String(formData.get("order") ?? "0").trim() || "0") || 0,
    published: toBool(formData.get("published")),
  };

  const list = await listManagementMembers({ includeDraft: true });
  if (list.some((m) => m.id === item.id)) {
    throw new Error("ID sudah dipakai.");
  }

  await writeManagementMembers([item, ...list]);
  revalidatePath("/manajemen");
  revalidatePath("/admin/manajemen");
  revalidatePath("/");
  redirectBack(item.id, "created");
}

export async function updateManagementMemberAction(formData: FormData) {
  await requireAdmin("/admin/manajemen");

  const currentId = requireField(formData.get("currentId"), "currentId");
  const name = requireField(formData.get("name"), "name");
  const id = slugify(requireField(formData.get("id") ?? currentId, "id"));
  const photoPath = String(formData.get("photo") ?? "").trim();
  const photoFile = formData.get("photoFile");

  const list = await listManagementMembers({ includeDraft: true });
  const idx = list.findIndex((m) => m.id === currentId);
  if (idx < 0) throw new Error("Data tidak ditemukan.");

  const photo =
    photoFile instanceof File && photoFile.size > 0
      ? await savePhotoUpload(photoFile, id)
      : requireField(photoPath, "photo");

  const nextItem: ManagementMember = {
    id,
    name,
    role: requireField(formData.get("role"), "role"),
    unit: getUnit(requireField(formData.get("unit"), "unit")),
    termStart: requireField(formData.get("termStart"), "termStart"),
    termEnd: String(formData.get("termEnd") ?? "").trim() || undefined,
    photo,
    bio: requireField(formData.get("bio"), "bio"),
    order: Number(String(formData.get("order") ?? "0").trim() || "0") || 0,
    published: toBool(formData.get("published")),
  };

  const nextList = [...list];
  nextList.splice(idx, 1);
  if (nextList.some((m) => m.id === nextItem.id)) {
    throw new Error("ID sudah dipakai.");
  }
  nextList.splice(idx, 0, nextItem);

  await writeManagementMembers(nextList);
  revalidatePath("/manajemen");
  revalidatePath("/admin/manajemen");
  revalidatePath("/");
  redirectBack(nextItem.id, "updated");
}

export async function deleteManagementMemberAction(formData: FormData) {
  await requireAdmin("/admin/manajemen");

  const id = requireField(formData.get("id"), "id");
  const list = await listManagementMembers({ includeDraft: true });
  await writeManagementMembers(list.filter((m) => m.id !== id));
  revalidatePath("/manajemen");
  revalidatePath("/admin/manajemen");
  revalidatePath("/");
  redirectBack(undefined, "deleted");
}
