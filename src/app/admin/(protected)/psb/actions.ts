"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getPsbConfig, type PsbConfig } from "@/lib/psb-config";
import { writePsbConfig } from "@/lib/admin-store";
import { requireAdmin } from "@/lib/admin-auth";

function requireField(value: FormDataEntryValue | null, name: string) {
  const v = String(value ?? "").trim();
  if (!v) throw new Error(`Field '${name}' is required`);
  return v;
}

function splitList(raw: string) {
  return raw
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updatePsbConfigAction(formData: FormData) {
  await requireAdmin("/admin/psb");

  const current = await getPsbConfig();
  const admission: PsbConfig["admission"] = {
    ...current.admission,
    headline: requireField(formData.get("headline"), "headline"),
    steps: splitList(requireField(formData.get("steps"), "steps")),
    requirements: splitList(requireField(formData.get("requirements"), "requirements")),
  };

  await writePsbConfig({ admission });
  revalidatePath("/psb");
  revalidatePath("/admin/psb");
  revalidatePath("/");
  redirect("/admin/psb?updated=1");
}

