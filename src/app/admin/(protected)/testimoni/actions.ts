"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Testimonial } from "@/lib/testimonials";
import { listTestimonials } from "@/lib/testimonials";
import { writeTestimonials } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/admin-auth";

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

function redirectBack(id?: string, flag?: "created" | "updated" | "deleted") {
  if (id && flag) redirect(`/admin/testimoni/${id}?${flag}=1`);
  if (flag) redirect(`/admin/testimoni?${flag}=1`);
  redirect("/admin/testimoni");
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin("/admin/testimoni");

  const name = requireField(formData.get("name"), "name");
  const year = requireField(formData.get("year"), "year");
  const id = slugify(requireField(formData.get("id") ?? `${name}-${year}`, "id"));

  const item: Testimonial = {
    id,
    name,
    relation: requireField(formData.get("relation"), "relation"),
    quote: requireField(formData.get("quote"), "quote"),
    initials: requireField(formData.get("initials"), "initials"),
    verifiedBy: requireField(formData.get("verifiedBy"), "verifiedBy"),
    year,
    context: requireField(formData.get("context"), "context"),
    consentNote: requireField(formData.get("consentNote"), "consentNote"),
    published: toBool(formData.get("published")),
  };

  const list = await listTestimonials({ includeDraft: true });
  if (list.some((t) => t.id === item.id)) {
    throw new Error("ID sudah dipakai.");
  }

  await writeTestimonials([item, ...list]);
  revalidatePath("/testimoni");
  revalidatePath("/admin/testimoni");
  revalidatePath("/");
  redirectBack(item.id, "created");
}

export async function updateTestimonialAction(formData: FormData) {
  await requireAdmin("/admin/testimoni");

  const currentId = requireField(formData.get("currentId"), "currentId");
  const name = requireField(formData.get("name"), "name");
  const year = requireField(formData.get("year"), "year");
  const id = slugify(requireField(formData.get("id") ?? currentId, "id"));

  const list = await listTestimonials({ includeDraft: true });
  const idx = list.findIndex((t) => t.id === currentId);
  if (idx < 0) throw new Error("Testimoni tidak ditemukan.");

  const nextItem: Testimonial = {
    id,
    name,
    relation: requireField(formData.get("relation"), "relation"),
    quote: requireField(formData.get("quote"), "quote"),
    initials: requireField(formData.get("initials"), "initials"),
    verifiedBy: requireField(formData.get("verifiedBy"), "verifiedBy"),
    year,
    context: requireField(formData.get("context"), "context"),
    consentNote: requireField(formData.get("consentNote"), "consentNote"),
    published: toBool(formData.get("published")),
  };

  const nextList = [...list];
  nextList.splice(idx, 1);
  if (nextList.some((t) => t.id === nextItem.id)) {
    throw new Error("ID sudah dipakai.");
  }
  nextList.splice(idx, 0, nextItem);

  await writeTestimonials(nextList);
  revalidatePath("/testimoni");
  revalidatePath("/admin/testimoni");
  revalidatePath("/");
  redirectBack(nextItem.id, "updated");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin("/admin/testimoni");

  const id = requireField(formData.get("id"), "id");
  const list = await listTestimonials({ includeDraft: true });
  await writeTestimonials(list.filter((t) => t.id !== id));
  revalidatePath("/testimoni");
  revalidatePath("/admin/testimoni");
  revalidatePath("/");
  redirectBack(undefined, "deleted");
}

