import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

const root = process.cwd();
const DATA_DIR = path.join(root, "data", "content");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("kv_content")
        .select("value")
        .eq("key", fileName)
        .maybeSingle();
      if (error) throw error;
      if (!data?.value) return fallback;
      return data.value as T;
    } catch {
      return fallback;
    }
  }
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(fileName: string, value: T) {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("kv_content")
      .upsert(
        {
          key: fileName,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" },
      );
    if (error) throw error;
    return;
  }
  await ensureDir();
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

export async function readAgendaEvents<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("agenda.json", [...fallback]);
}

export async function writeAgendaEvents<T>(value: readonly T[]) {
  return writeJsonFile("agenda.json", value);
}

export async function readAnnouncements<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("announcements.json", [...fallback]);
}

export async function writeAnnouncements<T>(value: readonly T[]) {
  return writeJsonFile("announcements.json", value);
}

export async function readArticles<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("articles.json", [...fallback]);
}

export async function writeArticles<T>(value: readonly T[]) {
  return writeJsonFile("articles.json", value);
}

export async function readGalleryItems<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("gallery.json", [...fallback]);
}

export async function writeGalleryItems<T>(value: readonly T[]) {
  return writeJsonFile("gallery.json", value);
}

export async function readTestimonials<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("testimonials.json", [...fallback]);
}

export async function writeTestimonials<T>(value: readonly T[]) {
  return writeJsonFile("testimonials.json", value);
}

export async function readFaqItems<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("faq.json", [...fallback]);
}

export async function writeFaqItems<T>(value: readonly T[]) {
  return writeJsonFile("faq.json", value);
}

export async function readSiteConfig<T>(fallback: T) {
  return readJsonFile<T>("site.json", fallback);
}

export async function writeSiteConfig<T>(value: T) {
  return writeJsonFile("site.json", value);
}

export async function readPsbConfig<T>(fallback: T) {
  return readJsonFile<T>("psb.json", fallback);
}

export async function writePsbConfig<T>(value: T) {
  return writeJsonFile("psb.json", value);
}

export async function readManagementMembers<T>(fallback: readonly T[]) {
  return readJsonFile<T[]>("management.json", [...fallback]);
}

export async function writeManagementMembers<T>(value: readonly T[]) {
  return writeJsonFile("management.json", value);
}
