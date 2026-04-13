import "server-only";

import { readManagementMembers } from "@/lib/admin-store";

export type ManagementUnit =
  | "Pengasuh"
  | "Pimpinan"
  | "Pengasuhan"
  | "Tahfidz"
  | "Diniyah"
  | "Akademik"
  | "Humas/PSB";

export type ManagementMember = {
  id: string;
  name: string;
  role: string;
  unit: ManagementUnit;
  termStart: string; // e.g. "2026"
  termEnd?: string; // e.g. "2028"
  photo: string;
  bio: string;
  order: number;
  published: boolean;
};

export const managementUnits: readonly ManagementUnit[] = [
  "Pengasuh",
  "Pimpinan",
  "Pengasuhan",
  "Tahfidz",
  "Diniyah",
  "Akademik",
  "Humas/PSB",
] as const;

const fallbackManagement: readonly ManagementMember[] = [
  {
    id: "pengasuh-putri",
    name: "Usth. (Nama Pengasuh)",
    role: "Pengasuh Pesantren Putri",
    unit: "Pengasuh",
    termStart: "2026",
    photo: "/images/placeholders/ustadzah.svg",
    bio: "Mengarahkan visi pembinaan santriwati: adab, riyadhoh, ritme ibadah, serta ketenangan belajar. Profil ini masih contoh dan dapat diganti dengan data resmi.",
    order: 1,
    published: true,
  },
  {
    id: "mudir-tahfidz",
    name: "Usth. (Nama Mudir)",
    role: "Mudir Tahfidz",
    unit: "Tahfidz",
    termStart: "2026",
    photo: "/images/activities/halaqah-muslimah.webp",
    bio: "Mengawal sistem halaqah tahfidz: tahsin, setoran, muroja’ah, evaluasi, dan target bertahap yang realistis agar santriwati istiqamah.",
    order: 2,
    published: true,
  },
  {
    id: "wali-asrama",
    name: "Usth. (Nama Wali Asrama)",
    role: "Wali Asrama",
    unit: "Pengasuhan",
    termStart: "2026",
    photo: "/images/campus/asrama.webp",
    bio: "Mengawal pengasuhan harian: kebersihan, ketertiban, keamanan, dan komunikasi wali santri melalui kanal resmi.",
    order: 3,
    published: true,
  },
  {
    id: "kepala-diniyah",
    name: "Ust. (Nama Kepala Diniyah)",
    role: "Kepala Bagian Diniyah",
    unit: "Diniyah",
    termStart: "2026",
    photo: "/images/placeholders/ustadz.svg",
    bio: "Mengelola kurikulum dirosah dan kajian turats (bersanad) agar pemahaman santri tertib, bertahap, dan beradab.",
    order: 4,
    published: true,
  },
  {
    id: "humas-psb",
    name: "Admin Resmi DQS Cemani",
    role: "Humas & PSB",
    unit: "Humas/PSB",
    termStart: "2026",
    photo: "/images/campus/gerbang.webp",
    bio: "Satu pintu informasi resmi: jadwal kunjungan, PSB, dan pengumuman. Hindari sumber tidak resmi.",
    order: 5,
    published: true,
  },
] as const;

export async function listManagementMembers(opts?: { includeDraft?: boolean }) {
  const list = await readManagementMembers<ManagementMember>(fallbackManagement);
  const visible = opts?.includeDraft ? list : list.filter((m) => m.published);
  return [...visible].sort((a, b) => a.order - b.order);
}
