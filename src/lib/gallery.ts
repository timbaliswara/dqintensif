import "server-only";

import { readGalleryItems } from "@/lib/admin-store";

export type GalleryCategory =
  | "Kampus"
  | "Ibadah"
  | "Tahfidz"
  | "Kajian"
  | "Kesantrian";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  description: string;
  category: GalleryCategory;
};

const defaultGalleryItems: readonly GalleryItem[] = [
  {
    id: "gate",
    src: "/images/campus/gerbang.webp",
    title: "Gerbang Pesantren",
    description:
      "Kesan pertama yang rapi dan tertib—mencerminkan budaya disiplin dan keamanan lingkungan.",
    category: "Kampus",
  },
  {
    id: "mosque-exterior",
    src: "/images/campus/masjid.webp",
    title: "Masjid Pesantren",
    description:
      "Pusat ibadah, halaqah, dan majelis ilmu; suasana yang menenangkan untuk menjaga adab dan fokus.",
    category: "Ibadah",
  },
  {
    id: "dorm",
    src: "/images/campus/asrama.webp",
    title: "Asrama",
    description:
      "Kerapian asrama mendukung ritme harian: ibadah, belajar, muroja’ah, dan istirahat yang terukur.",
    category: "Kampus",
  },
  {
    id: "halaqah",
    src: "/images/activities/halaqah-muslimah.webp",
    title: "Halaqah Belajar",
    description:
      "Pendampingan dekat dalam kelompok kecil untuk menjaga kualitas bacaan dan adab majelis.",
    category: "Kesantrian",
  },
  {
    id: "tahfizh",
    src: "/images/activities/tahfizh.webp",
    title: "Tahfidz Intensif",
    description:
      "Setoran dan muroja’ah berjalan rapi, disertai evaluasi agar hafalan kuat dan bacaan tartil.",
    category: "Tahfidz",
  },
  {
    id: "muhadharah",
    src: "/images/activities/muhadharah.webp",
    title: "Muhadharah",
    description:
      "Latihan menyampaikan kebaikan dengan santun—melatih keberanian, adab, dan tanggung jawab.",
    category: "Kesantrian",
  },
  {
    id: "kemuliaan-quran",
    src: "/images/articles/kemuliaan-quran.webp",
    title: "Muroja’ah di Masjid",
    description:
      "Menguatkan hafalan dengan ketenangan: tartil, adab, dan istiqamah yang dijaga bersama.",
    category: "Tahfidz",
  },
  {
    id: "kajian-rutin",
    src: "/images/activities/kajian-rutin.webp",
    title: "Kajian Rutin Santriwati",
    description:
      "Majelis ilmu yang tertib: adab, catatan, dan pendampingan pembina yang konsisten.",
    category: "Kajian",
  },
  {
    id: "kajian-umum-rutin",
    src: "/images/activities/kajian-umum-rutin.webp",
    title: "Kajian Umum",
    description:
      "Kajian terbuka dengan suasana yang rapi dan nyaman untuk belajar bersama dan memperkuat amal.",
    category: "Kajian",
  },
  {
    id: "pengajian-umum",
    src: "/images/activities/pengajian-umum.webp",
    title: "Pengajian Umum",
    description:
      "Agenda pembinaan keummatan—menjaga semangat belajar, memperbaiki niat, dan memperkuat ukhuwah.",
    category: "Kajian",
  },
  {
    id: "majelis-tasmi",
    src: "/images/activities/majelis-tasmi.webp",
    title: "Majelis Tasmi’ Al-Qur’an",
    description:
      "Tasmi’ dan evaluasi bacaan: menjaga kualitas tahfidz, tajwid, serta ketenangan dalam majelis.",
    category: "Tahfidz",
  },
  {
    id: "penyerahan-tahfidz-1",
    src: "/images/activities/penyerahan-tahfidz-1.webp",
    title: "Apresiasi Tahfidz",
    description:
      "Momen apresiasi untuk memotivasi santriwati—diringi doa dan nasihat agar tetap istiqamah.",
    category: "Tahfidz",
  },
  {
    id: "penyerahan-tahfidz-2",
    src: "/images/activities/penyerahan-tahfidz-2.webp",
    title: "Penyerahan Tahfidz",
    description:
      "Penguatan semangat: target terukur, adab yang dijaga, dan dukungan pembina dalam proses.",
    category: "Tahfidz",
  },
  {
    id: "penyerahan-sertifikat",
    src: "/images/activities/penyerahan-sertifikat.webp",
    title: "Penyerahan Sertifikat",
    description:
      "Dokumentasi kegiatan dan pencapaian—bagian dari pembinaan yang tertib dan mudah diverifikasi.",
    category: "Kesantrian",
  },
  {
    id: "persiapan-acara",
    src: "/images/activities/persiapan-acara.webp",
    title: "Persiapan Acara",
    description:
      "Keterlibatan santriwati dalam kegiatan: kerja sama, disiplin, dan tanggung jawab yang dilatih.",
    category: "Kesantrian",
  },
  {
    id: "kunjungan-silaturahmi",
    src: "/images/activities/kunjungan-silaturahmi.webp",
    title: "Kunjungan & Silaturahmi",
    description:
      "Membangun hubungan baik dengan wali dan tamu—dengan adab, tertib, dan komunikasi yang jelas.",
    category: "Kesantrian",
  },
  {
    id: "silaturahmi",
    src: "/images/activities/silaturahmi.webp",
    title: "Silaturahmi",
    description:
      "Menjaga ukhuwah dan kebersamaan dalam kegiatan pondok dengan suasana yang hangat dan terarah.",
    category: "Kesantrian",
  },
  {
    id: "silaturahmi-jamaah",
    src: "/images/activities/silaturahmi-jamaah.webp",
    title: "Silaturahmi Jamaah",
    description:
      "Kegiatan jamaah yang menumbuhkan kebersamaan—dengan adab, kerapian, dan suasana yang teduh.",
    category: "Kesantrian",
  },
] as const;

export const galleryCategories: readonly GalleryCategory[] = [
  "Kampus",
  "Ibadah",
  "Tahfidz",
  "Kajian",
  "Kesantrian",
] as const;

export async function listGalleryItems() {
  const stored = await readGalleryItems<GalleryItem>([]);
  const seen = new Set(stored.map((it) => it.id));
  const merged = [...stored];
  for (const item of defaultGalleryItems) {
    if (!seen.has(item.id)) merged.push(item);
  }
  return merged;
}
