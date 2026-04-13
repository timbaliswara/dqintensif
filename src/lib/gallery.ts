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
    id: "istiqlal",
    src: "/images/gallery/istiqlal-twilight.webp",
    title: "Arsitektur Masjid (Indonesia)",
    description:
      "Keindahan arsitektur islam Nusantara—simbol keteduhan, ketertiban, dan kemuliaan ibadah.",
    category: "Ibadah",
  },
  {
    id: "mosque-arches",
    src: "/images/gallery/mosque-arches.webp",
    title: "Ruang Shalat",
    description:
      "Ruang yang lapang membantu khusyuk; tempat terbaik untuk menguatkan hubungan dengan Al-Qur’an.",
    category: "Ibadah",
  },
  {
    id: "quran-hand",
    src: "/images/gallery/quran-in-hand.webp",
    title: "Tilawah",
    description:
      "Kebiasaan tilawah harian—membentuk kedekatan dengan Al-Qur’an dan menguatkan tartil.",
    category: "Tahfidz",
  },
  {
    id: "quran-on-shelf",
    src: "/images/gallery/quran-on-shelf.webp",
    title: "Ruang Baca",
    description:
      "Budaya literasi: menguatkan ilmu, adab majelis, dan konsistensi muroja’ah.",
    category: "Kajian",
  },
  {
    id: "kitab",
    src: "/images/gallery/kitab-turats.webp",
    title: "Kitab Turats",
    description:
      "Kajian kitab kuning sebagai penjaga adab, manhaj, dan pemahaman yang bertanggung jawab.",
    category: "Kajian",
  },
  {
    id: "notes",
    src: "/images/gallery/catatan-belajar.webp",
    title: "Catatan Pembinaan",
    description:
      "Belajar yang rapi: target, evaluasi, dan tindak lanjut yang jelas untuk menjaga kualitas.",
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
  return readGalleryItems(defaultGalleryItems);
}
