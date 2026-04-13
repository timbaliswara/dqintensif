"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getSiteConfig, type SiteConfig } from "@/lib/site-config";
import { writeSiteConfig } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/admin-auth";

function requireField(value: FormDataEntryValue | null, name: string) {
  const v = String(value ?? "").trim();
  if (!v) throw new Error(`Field '${name}' is required`);
  return v;
}

function splitLines(raw: string) {
  return raw
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parsePairLine(line: string) {
  const emDash = line.split("—");
  if (emDash.length >= 2) {
    const left = emDash[0]?.trim() ?? "";
    const right = emDash.slice(1).join("—").trim();
    if (left && right) return { left, right };
  }
  const pipe = line.split("|");
  if (pipe.length >= 2) {
    const left = pipe[0]?.trim() ?? "";
    const right = pipe.slice(1).join("|").trim();
    if (left && right) return { left, right };
  }
  return null;
}

function parsePhones(raw: string) {
  const list = splitLines(raw)
    .flatMap((line) => line.split(","))
    .map((v) => v.trim())
    .filter(Boolean);
  // de-dupe
  return Array.from(new Set(list));
}

export async function updateSiteConfigAction(formData: FormData) {
  await requireAdmin("/admin/profil");

  const current = await getSiteConfig();

  const profile: SiteConfig["profile"] = {
    ...current.profile,
    name: requireField(formData.get("profileName"), "profileName"),
    shortName: requireField(formData.get("profileShortName"), "profileShortName"),
    tagline: requireField(formData.get("profileTagline"), "profileTagline"),
    location: requireField(formData.get("profileLocation"), "profileLocation"),
  };

  const latStr = requireField(formData.get("contactLat"), "contactLat");
  const lonStr = requireField(formData.get("contactLon"), "contactLon");
  const lat = Number(latStr);
  const lon = Number(lonStr);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("Koordinat tidak valid.");
  }

  const contact: SiteConfig["contact"] = {
    ...current.contact,
    address: requireField(formData.get("contactAddress"), "contactAddress"),
    phone: requireField(formData.get("contactPhone"), "contactPhone"),
    whatsappNumbers: (() => {
      const raw = String(formData.get("contactWhatsapps") ?? "").trim();
      const nums = raw ? parsePhones(raw) : [];
      return nums.length ? nums : [requireField(formData.get("contactPhone"), "contactPhone")];
    })(),
    email: requireField(formData.get("contactEmail"), "contactEmail"),
    hours: requireField(formData.get("contactHours"), "contactHours"),
    mapsLabel: requireField(formData.get("contactMapsLabel"), "contactMapsLabel"),
    mapsQuery: requireField(formData.get("contactMapsQuery"), "contactMapsQuery"),
    mapsUrl: requireField(formData.get("contactMapsUrl"), "contactMapsUrl"),
    coordinates: { lat, lon },
    officialNote: requireField(formData.get("contactOfficialNote"), "contactOfficialNote"),
  };

  const foundationLines = splitLines(String(formData.get("legalFoundation") ?? ""));
  const documentsLines = splitLines(String(formData.get("legalDocuments") ?? ""));
  const channelsLines = splitLines(String(formData.get("legalChannels") ?? ""));

  const legal: SiteConfig["legal"] = {
    ...current.legal,
    headline: requireField(formData.get("legalHeadline"), "legalHeadline"),
    overview: requireField(formData.get("legalOverview"), "legalOverview"),
    foundation: foundationLines
      .map((line) => parsePairLine(line))
      .filter(Boolean)
      .map((p) => ({ name: p!.left, role: p!.right })),
    documents: documentsLines
      .map((line) => parsePairLine(line))
      .filter(Boolean)
      .map((p) => ({ title: p!.left, note: p!.right })),
    officialChannels: channelsLines
      .map((line) => parsePairLine(line))
      .filter(Boolean)
      .map((p) => ({ label: p!.left, value: p!.right })),
  };

  const next: SiteConfig = { profile, contact, legal };
  await writeSiteConfig(next);

  revalidatePath("/");
  revalidatePath("/kontak");
  revalidatePath("/legal");
  revalidatePath("/faq");
  revalidatePath("/admin/profil");
  redirect("/admin/profil?updated=1");
}
