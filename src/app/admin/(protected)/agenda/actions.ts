"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { AgendaEvent } from "@/lib/agenda";
import { listAgendaEvents } from "@/lib/agenda";
import { requireAdmin } from "@/lib/admin-auth";
import { writeAgendaEvents } from "@/lib/admin-store";

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

export async function createAgendaAction(formData: FormData) {
  await requireAdmin("/admin/agenda");
  const title = requireField(formData.get("title"), "title");
  const slug = slugify(requireField(formData.get("slug") ?? title, "slug"));

  const event: AgendaEvent = {
    slug,
    title,
    subtitle: requireField(formData.get("subtitle"), "subtitle"),
    description: requireField(formData.get("description"), "description"),
    start: requireField(formData.get("start"), "start"),
    end: String(formData.get("end") ?? "").trim() || undefined,
    venue: requireField(formData.get("venue"), "venue"),
    city: requireField(formData.get("city"), "city"),
    audience: requireField(formData.get("audience"), "audience") as AgendaEvent["audience"],
    category: requireField(formData.get("category"), "category") as AgendaEvent["category"],
    ctaLabel: requireField(formData.get("ctaLabel"), "ctaLabel"),
    ctaHref: requireField(formData.get("ctaHref"), "ctaHref"),
  };

  const events = await listAgendaEvents();
  if (events.some((e) => e.slug === event.slug)) {
    throw new Error("Slug sudah dipakai.");
  }

  await writeAgendaEvents([event, ...events]);
  revalidatePath("/agenda");
  revalidatePath("/admin/agenda");
  redirect(`/admin/agenda/${event.slug}?created=1`);
}

export async function updateAgendaAction(formData: FormData) {
  await requireAdmin("/admin/agenda");
  const currentSlug = requireField(formData.get("currentSlug"), "currentSlug");
  const title = requireField(formData.get("title"), "title");
  const slug = slugify(requireField(formData.get("slug") ?? currentSlug, "slug"));

  const events = await listAgendaEvents();
  const idx = events.findIndex((e) => e.slug === currentSlug);
  if (idx < 0) throw new Error("Agenda tidak ditemukan.");

  const updated: AgendaEvent = {
    slug,
    title,
    subtitle: requireField(formData.get("subtitle"), "subtitle"),
    description: requireField(formData.get("description"), "description"),
    start: requireField(formData.get("start"), "start"),
    end: String(formData.get("end") ?? "").trim() || undefined,
    venue: requireField(formData.get("venue"), "venue"),
    city: requireField(formData.get("city"), "city"),
    audience: requireField(formData.get("audience"), "audience") as AgendaEvent["audience"],
    category: requireField(formData.get("category"), "category") as AgendaEvent["category"],
    ctaLabel: requireField(formData.get("ctaLabel"), "ctaLabel"),
    ctaHref: requireField(formData.get("ctaHref"), "ctaHref"),
  };

  const nextEvents = [...events];
  nextEvents.splice(idx, 1);
  if (nextEvents.some((e) => e.slug === updated.slug)) {
    throw new Error("Slug sudah dipakai.");
  }
  nextEvents.splice(idx, 0, updated);

  await writeAgendaEvents(nextEvents);
  revalidatePath("/agenda");
  revalidatePath("/admin/agenda");
  redirect(`/admin/agenda/${updated.slug}?updated=1`);
}

export async function deleteAgendaAction(formData: FormData) {
  await requireAdmin("/admin/agenda");
  const slug = requireField(formData.get("slug"), "slug");
  const events = await listAgendaEvents();
  const nextEvents = events.filter((e) => e.slug !== slug);
  await writeAgendaEvents(nextEvents);
  revalidatePath("/agenda");
  revalidatePath("/admin/agenda");
  redirect("/admin/agenda?deleted=1");
}
