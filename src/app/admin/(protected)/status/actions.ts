"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";
import { listAgendaEvents } from "@/lib/agenda";
import { listAnnouncements } from "@/lib/announcements";
import { listArticles } from "@/lib/articles";
import { listGalleryItems } from "@/lib/gallery";
import { listTestimonials } from "@/lib/testimonials";
import { listFaqItems } from "@/lib/faq";
import { listManagementMembers } from "@/lib/management";
import { getPsbConfig } from "@/lib/psb-config";
import { getSiteConfig } from "@/lib/site-config";
import {
  writeAgendaEvents,
  writeAnnouncements,
  writeArticles,
  writeFaqItems,
  writeGalleryItems,
  writeManagementMembers,
  writePsbConfig,
  writeSiteConfig,
  writeTestimonials,
} from "@/lib/admin-store";

const keys = [
  "agenda.json",
  "announcements.json",
  "articles.json",
  "gallery.json",
  "testimonials.json",
  "faq.json",
  "site.json",
  "psb.json",
  "management.json",
] as const;

function noticeUrl(path: string, params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (!v) continue;
    sp.set(k, v);
  }
  const qs = sp.toString();
  return qs ? `${path}?${qs}` : path;
}

export async function seedSupabaseContentAction() {
  await requireAdmin("/admin/status");

  if (!isSupabaseConfigured()) {
    redirect(
      noticeUrl("/admin/status", {
        error: "1",
        msg: "Supabase belum terkonfigurasi di environment ini.",
      }),
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("kv_content")
    .select("key")
    .in("key", [...keys]);

  if (error) {
    redirect(
      noticeUrl("/admin/status", {
        error: "1",
        msg: `Query Supabase gagal: ${error.message}`,
      }),
    );
  }

  const existing = new Set((data ?? []).map((row) => row.key));
  const missing = keys.filter((k) => !existing.has(k));

  // Only seed missing keys so we don't overwrite real content.
  if (missing.includes("agenda.json")) {
    await writeAgendaEvents(await listAgendaEvents());
  }
  if (missing.includes("announcements.json")) {
    await writeAnnouncements(await listAnnouncements());
  }
  if (missing.includes("articles.json")) {
    await writeArticles(await listArticles());
  }
  if (missing.includes("gallery.json")) {
    await writeGalleryItems(await listGalleryItems());
  }
  if (missing.includes("testimonials.json")) {
    await writeTestimonials(await listTestimonials());
  }
  if (missing.includes("faq.json")) {
    await writeFaqItems(await listFaqItems());
  }
  if (missing.includes("site.json")) {
    await writeSiteConfig(await getSiteConfig());
  }
  if (missing.includes("psb.json")) {
    await writePsbConfig(await getPsbConfig());
  }
  if (missing.includes("management.json")) {
    await writeManagementMembers(await listManagementMembers());
  }

  redirect(
    noticeUrl("/admin/status", {
      seeded: "1",
      count: missing.length ? String(missing.length) : "0",
    }),
  );
}

