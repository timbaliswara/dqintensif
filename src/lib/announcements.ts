import "server-only";

import { readAnnouncements } from "@/lib/admin-store";
import sanitizeHtml from "sanitize-html";

export type AnnouncementBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; title: string; text: string };

export type Announcement = {
  slug: string;
  title: string;
  excerpt: string;
  displayDate: string;
  datePublishedISO: string;
  tag: "PSB" | "Kegiatan" | "Pengumuman" | "Prestasi";
  coverImage: string;
  contentHtml: string;
  blocks?: AnnouncementBlock[]; // legacy fallback (migrated to contentHtml)
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function blocksToHtml(blocks: readonly AnnouncementBlock[]) {
  return blocks
    .map((b) => {
      if (b.type === "p") return `<p>${escapeHtml(b.text)}</p>`;
      if (b.type === "h2") return `<h2>${escapeHtml(b.text)}</h2>`;
      if (b.type === "ul")
        return `<ul>${b.items
          .map((it) => `<li>${escapeHtml(it)}</li>`)
          .join("")}</ul>`;
      return `<blockquote><strong>${escapeHtml(
        b.title,
      )}</strong><br/>${escapeHtml(b.text)}</blockquote>`;
    })
    .join("");
}

export function sanitizeRichHtml(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noreferrer noopener",
        },
      }),
    },
  });
}

function normalizeAnnouncement(a: Announcement) {
  const html =
    a.contentHtml?.trim() ||
    (a.blocks?.length ? blocksToHtml(a.blocks) : "");
  return {
    ...a,
    contentHtml: sanitizeRichHtml(html),
  };
}

const defaultAnnouncements: readonly Announcement[] = [
  {
    slug: "psb-2026-2027-dibuka",
    title: "PSB 2026/2027 Dibuka (Kuota Terbatas)",
    excerpt:
      "Pendaftaran santri baru dibuka. Seleksi mencakup tes baca Al-Qur’an, wawancara, dan verifikasi berkas.",
    displayDate: "12 April 2026",
    datePublishedISO: "2026-04-12T08:00:00+07:00",
    tag: "PSB",
    coverImage: "/images/campus/gerbang.webp",
    blocks: [
      {
        type: "p",
        text: "Bismillah. DQS Cemani membuka Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027. Kuota terbatas dan proses seleksi dilakukan bertahap agar pembinaan tetap optimal.",
      },
      { type: "h2", text: "Tahapan seleksi" },
      {
        type: "ul",
        items: [
          "Pengisian data pendaftar",
          "Verifikasi berkas",
          "Tes baca Al-Qur’an (tahsin/tajwid dasar)",
          "Wawancara calon santri dan wali",
          "Pengumuman hasil dan daftar ulang",
        ],
      },
      { type: "h2", text: "Berkas yang disiapkan" },
      {
        type: "ul",
        items: [
          "Kartu Keluarga, Akta Kelahiran",
          "Rapor/ijazah (sesuai jenjang)",
          "Pas foto",
          "Dokumen pendukung lain (jika ada)",
        ],
      },
      {
        type: "note",
        title: "Konfirmasi admin",
        text: "Silakan hubungi admin untuk info kuota, jadwal, dan link pendaftaran terbaru.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "open-house-kunjungan-pondok",
    title: "Open House & Kunjungan Pondok (Reservasi)",
    excerpt:
      "Kunjungan terjadwal untuk melihat lingkungan pembinaan, tur fasilitas, dan sesi tanya-jawab PSB.",
    displayDate: "26 April 2026",
    datePublishedISO: "2026-04-15T09:00:00+07:00",
    tag: "Pengumuman",
    coverImage: "/images/campus/masjid.webp",
    blocks: [
      {
        type: "p",
        text: "Kami membuka sesi open house/kunjungan pondok untuk calon santri dan wali santri. Tujuannya agar mendapatkan gambaran suasana pembinaan secara langsung.",
      },
      { type: "h2", text: "Agenda kunjungan" },
      {
        type: "ul",
        items: [
          "Pemaparan singkat program (tahfidz, diniyah, dan pembinaan)",
          "Tur fasilitas utama",
          "Tanya jawab PSB",
          "Penutupan dan arahan administrasi",
        ],
      },
      {
        type: "note",
        title: "Wajib reservasi",
        text: "Karena keterbatasan kapasitas, kunjungan dilakukan dengan reservasi melalui admin.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "dauroh-tahsin-awal-semester",
    title: "Dauroh Tahsin Awal Semester",
    excerpt:
      "Sesi penguatan tahsin/tajwid sebagai pemetaan dan peningkatan kualitas bacaan santri.",
    displayDate: "20 April 2026",
    datePublishedISO: "2026-04-10T10:00:00+07:00",
    tag: "Kegiatan",
    coverImage: "/images/activities/tahfizh.webp",
    blocks: [
      {
        type: "p",
        text: "DQS Cemani mengadakan dauroh tahsin di awal semester untuk pemetaan kemampuan bacaan, perbaikan tajwid, dan penyelarasan metode pembinaan.",
      },
      { type: "h2", text: "Fokus materi" },
      {
        type: "ul",
        items: [
          "Makharijul huruf dan sifat huruf",
          "Hukum bacaan penting (mad, nun mati/tanwin, mim mati)",
          "Penerapan tartil dalam bacaan",
          "Adab majelis Al-Qur’an",
        ],
      },
    ],
    contentHtml: "",
  },
  {
    slug: "jadwal-layanan-admin",
    title: "Jadwal Layanan Admin dan Konfirmasi Informasi",
    excerpt:
      "Untuk menjaga respon yang rapi, layanan admin mengikuti jam kerja. Di luar jam kerja tetap bisa kirim pesan.",
    displayDate: "12 April 2026",
    datePublishedISO: "2026-04-12T12:00:00+07:00",
    tag: "Pengumuman",
    coverImage: "/images/campus/asrama.webp",
    blocks: [
      {
        type: "p",
        text: "Agar komunikasi lebih terarah, layanan admin mengikuti jam layanan. Pesan yang masuk di luar jam kerja akan dibalas pada jam berikutnya.",
      },
      { type: "h2", text: "Jam layanan" },
      {
        type: "ul",
        items: [
          "Senin–Sabtu: 08.00–16.00 WIB",
          "Ahad/libur nasional: menyesuaikan",
        ],
      },
      {
        type: "note",
        title: "Info PSB",
        text: "Untuk informasi PSB terbaru (kuota/jadwal/link), mohon konfirmasi langsung ke admin.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "tasmi-kubro-dan-syahadah",
    title: "Tasmi’ Kubro, Sanad, dan Syahadah Tahfidz",
    excerpt:
      "Sanad tahfidz diberikan kepada santri yang mengikuti tasmi’ kubro. Syahadah tahfidz untuk yang lulus ujian kelipatan 10 juz.",
    displayDate: "18 Februari 2026",
    datePublishedISO: "2026-02-18T09:00:00+07:00",
    tag: "Prestasi",
    coverImage: "/images/activities/muhadharah.webp",
    blocks: [
      {
        type: "p",
        text: "Tasmi’ kubro adalah ujian besar: 30 juz sekali duduk/gelondongan. Pada momen ini, pembinaan bukan hanya menguji hafalan, tetapi juga adab, ketenangan, dan ketahanan fokus.",
      },
      { type: "h2", text: "Ketentuan umum" },
      {
        type: "ul",
        items: [
          "Sanad tahfidz: untuk santri yang mengikuti tasmi’ kubro",
          "Syahadah tahfidz: untuk santri yang lulus ujian kelipatan 10 juz",
          "Tabarrukan: bagi yang sudah memiliki hafalan, minimal setoran satu tahun",
        ],
      },
      {
        type: "note",
        title: "Sesuai kebijakan pembinaan",
        text: "Rincian teknis pelaksanaan ujian menyesuaikan kebijakan pembinaan dan jadwal yang berlaku.",
      },
    ],
    contentHtml: "",
  },
] as const;

export async function listAnnouncements() {
  const raw = await readAnnouncements(defaultAnnouncements);
  return raw.map(normalizeAnnouncement);
}

export async function getAnnouncement(slug: string) {
  const announcements = await listAnnouncements();
  return announcements.find((a) => a.slug === slug);
}
