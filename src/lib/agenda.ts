import "server-only";

import { readAgendaEvents } from "@/lib/admin-store";

export type AgendaEvent = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  start: string; // ISO string
  end?: string; // ISO string
  venue: string;
  city: string;
  audience: "Umum" | "Santri" | "Wali Santri" | "Calon Santri";
  category:
    | "PSB"
    | "Tahfidz"
    | "Kajian"
    | "Kampus"
    | "Kesantrian"
    | "Workshop";
  ctaLabel: string;
  ctaHref: string;
};

const defaultAgendaEvents: readonly AgendaEvent[] = [
  {
    slug: "dauroh-tahsin-intensif-april-2026",
    title: "Dauroh Tahsin Intensif",
    subtitle: "Makharij · Tajwid · Perbaikan bacaan bertahap",
    description:
      "Sesi intensif untuk penguatan tahsin dan tajwid. Cocok untuk calon santri, wali santri, dan umum yang ingin memperbaiki bacaan.",
    start: "2026-04-20T08:00:00+07:00",
    end: "2026-04-20T11:30:00+07:00",
    venue: "Aula DQS Cemani",
    city: "Sukoharjo (Solo Raya)",
    audience: "Umum",
    category: "Tahfidz",
    ctaLabel: "Daftar / Info",
    ctaHref: "/kontak",
  },
  {
    slug: "open-house-kunjungan-pondok",
    title: "Open House & Kunjungan Pondok",
    subtitle: "Tur fasilitas · Tanya jawab PSB · Suasana pembinaan",
    description:
      "Kunjungan terjadwal untuk melihat lingkungan pembinaan. Termasuk sesi tanya jawab PSB dan penjelasan program.",
    start: "2026-04-26T09:00:00+07:00",
    end: "2026-04-26T12:00:00+07:00",
    venue: "Komplek DQS Cemani",
    city: "Sukoharjo (Solo Raya)",
    audience: "Calon Santri",
    category: "Kampus",
    ctaLabel: "Reservasi kunjungan",
    ctaHref: "/kontak",
  },
  {
    slug: "tes-psb-gelombang-1",
    title: "Tes PSB Gelombang 1",
    subtitle: "Tes baca Al-Qur’an · Wawancara · Administrasi",
    description:
      "Seleksi awal mencakup tes baca Al-Qur’an, wawancara, dan verifikasi berkas. Jadwal dapat berubah sesuai kuota.",
    start: "2026-05-03T08:00:00+07:00",
    end: "2026-05-03T12:30:00+07:00",
    venue: "Ruang Seleksi DQS Cemani",
    city: "Sukoharjo (Solo Raya)",
    audience: "Calon Santri",
    category: "PSB",
    ctaLabel: "Tanya admin PSB",
    ctaHref: "/kontak",
  },
  {
    slug: "kajian-turats-bersanad",
    title: "Kajian Kitab Turats (Bersanad)",
    subtitle: "Adab majelis · Fiqh dasar · Tazkiyatun nafs",
    description:
      "Kajian turats untuk menguatkan adab dalam majelis ilmu dan menjaga kemuliaan Al-Qur’an dalam amal.",
    start: "2026-05-10T19:15:00+07:00",
    end: "2026-05-10T20:45:00+07:00",
    venue: "Masjid DQS Cemani",
    city: "Sukoharjo (Solo Raya)",
    audience: "Umum",
    category: "Kajian",
    ctaLabel: "Konfirmasi kehadiran",
    ctaHref: "/kontak",
  },
  {
    slug: "workshop-metode-murojaah",
    title: "Workshop Metode Muroja’ah",
    subtitle: "Rapi · Realistis · Istiqamah",
    description:
      "Workshop praktik menyusun jadwal muroja’ah, teknik penguatan hafalan, dan evaluasi mingguan yang terukur.",
    start: "2026-05-17T08:30:00+07:00",
    end: "2026-05-17T11:30:00+07:00",
    venue: "Aula DQS Cemani",
    city: "Sukoharjo (Solo Raya)",
    audience: "Santri",
    category: "Workshop",
    ctaLabel: "Lihat detail",
    ctaHref: "/kontak",
  },
] as const;

export async function listAgendaEvents() {
  return readAgendaEvents(defaultAgendaEvents);
}

export async function getUpcomingEvents(now = new Date()) {
  const agendaEvents = await listAgendaEvents();
  const current = now.getTime();
  return [...agendaEvents]
    .filter((e) => new Date(e.start).getTime() >= current)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}
