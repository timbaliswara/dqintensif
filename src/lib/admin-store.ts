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

function ensureArray<T>(value: unknown, fallback: readonly T[]) {
  return Array.isArray(value) ? (value as T[]) : [...fallback];
}

function ensureObject<T>(value: unknown, fallback: T) {
  if (!value || typeof value !== "object") return fallback;
  return value as T;
}

export async function readAgendaEvents<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("agenda.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeAgendaEvents<T>(value: readonly T[]) {
  return writeJsonFile("agenda.json", value);
}

export async function readAnnouncements<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("announcements.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeAnnouncements<T>(value: readonly T[]) {
  return writeJsonFile("announcements.json", value);
}

export async function readArticles<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("articles.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeArticles<T>(value: readonly T[]) {
  return writeJsonFile("articles.json", value);
}

export async function readGalleryItems<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("gallery.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeGalleryItems<T>(value: readonly T[]) {
  return writeJsonFile("gallery.json", value);
}

export async function readTestimonials<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("testimonials.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeTestimonials<T>(value: readonly T[]) {
  return writeJsonFile("testimonials.json", value);
}

export async function readFaqItems<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("faq.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeFaqItems<T>(value: readonly T[]) {
  return writeJsonFile("faq.json", value);
}

export async function readSiteConfig<T>(fallback: T) {
  const value = await readJsonFile<unknown>("site.json", fallback);
  return ensureObject<T>(value, fallback);
}

export async function writeSiteConfig<T>(value: T) {
  return writeJsonFile("site.json", value);
}

export async function readPsbConfig<T>(fallback: T) {
  const value = await readJsonFile<unknown>("psb.json", fallback);
  return ensureObject<T>(value, fallback);
}

export async function writePsbConfig<T>(value: T) {
  return writeJsonFile("psb.json", value);
}

export async function readManagementMembers<T>(fallback: readonly T[]) {
  const value = await readJsonFile<unknown>("management.json", [...fallback]);
  return ensureArray<T>(value, fallback);
}

export async function writeManagementMembers<T>(value: readonly T[]) {
  return writeJsonFile("management.json", value);
}
