"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { FaqItem } from "@/lib/faq";
import { listFaqItems } from "@/lib/faq";
import { writeFaqItems } from "@/lib/admin-store";
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
  if (id && flag) redirect(`/admin/faq/${id}?${flag}=1`);
  if (flag) redirect(`/admin/faq?${flag}=1`);
  redirect("/admin/faq");
}

export async function createFaqItemAction(formData: FormData) {
  await requireAdmin("/admin/faq");

  const question = requireField(formData.get("question"), "question");
  const id = slugify(requireField(formData.get("id") ?? question, "id"));

  const item: FaqItem = {
    id,
    question,
    answer: requireField(formData.get("answer"), "answer"),
    published: toBool(formData.get("published")),
  };

  const list = await listFaqItems({ includeDraft: true });
  if (list.some((f) => f.id === item.id)) {
    throw new Error("ID sudah dipakai.");
  }

  await writeFaqItems([item, ...list]);
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirectBack(item.id, "created");
}

export async function updateFaqItemAction(formData: FormData) {
  await requireAdmin("/admin/faq");

  const currentId = requireField(formData.get("currentId"), "currentId");
  const question = requireField(formData.get("question"), "question");
  const id = slugify(requireField(formData.get("id") ?? currentId, "id"));

  const list = await listFaqItems({ includeDraft: true });
  const idx = list.findIndex((f) => f.id === currentId);
  if (idx < 0) throw new Error("FAQ tidak ditemukan.");

  const nextItem: FaqItem = {
    id,
    question,
    answer: requireField(formData.get("answer"), "answer"),
    published: toBool(formData.get("published")),
  };

  const nextList = [...list];
  nextList.splice(idx, 1);
  if (nextList.some((f) => f.id === nextItem.id)) {
    throw new Error("ID sudah dipakai.");
  }
  nextList.splice(idx, 0, nextItem);

  await writeFaqItems(nextList);
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirectBack(nextItem.id, "updated");
}

export async function deleteFaqItemAction(formData: FormData) {
  await requireAdmin("/admin/faq");

  const id = requireField(formData.get("id"), "id");
  const list = await listFaqItems({ includeDraft: true });
  await writeFaqItems(list.filter((f) => f.id !== id));
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirectBack(undefined, "deleted");
}

