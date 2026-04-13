import "server-only";

import sanitizeHtml from "sanitize-html";

import { readArticles } from "@/lib/admin-store";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; by?: string }
  | { type: "ul"; items: string[] };

export type ArticleVerification = {
  status: "terverifikasi";
  by: string;
  date: string;
  note?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  tags: string[];
  author: { name: string; role: string };
  verification?: ArticleVerification;
  coverImage: string;
  readTime: string;
  contentHtml: string;
  blocks?: ArticleBlock[]; // legacy fallback (migrated to contentHtml)
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function blocksToHtml(blocks: readonly ArticleBlock[]) {
  return blocks
    .map((b) => {
      if (b.type === "p") return `<p>${escapeHtml(b.text)}</p>`;
      if (b.type === "h2") return `<h2>${escapeHtml(b.text)}</h2>`;
      if (b.type === "ul")
        return `<ul>${b.items
          .map((it) => `<li>${escapeHtml(it)}</li>`)
          .join("")}</ul>`;
      const by = b.by ? `<br/><em>— ${escapeHtml(b.by)}</em>` : "";
      return `<blockquote>${escapeHtml(b.text)}${by}</blockquote>`;
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

function normalizeArticle(a: Article) {
  const html =
    a.contentHtml?.trim() ||
    (a.blocks?.length ? blocksToHtml(a.blocks) : "");
  return {
    ...a,
    contentHtml: sanitizeRichHtml(html),
  };
}

const defaultArticles: readonly Article[] = [
  {
    slug: "ceramah-terverifikasi-menata-hati-di-tengah-sibuk",
    title:
      "Ceramah Terverifikasi: Menata Hati di Tengah Sibuk — 7 Kebiasaan yang Meringankan",
    excerpt:
      "Ringkasan kajian yang relevan dengan keseharian: saat capek, banyak pikiran, dan hidup terasa cepat. Praktik kecil, tapi berdampak besar.",
    date: "13 April 2026",
    dateISO: "2026-04-13",
    tags: ["Ceramah Terverifikasi", "Kajian Umum", "Istiqamah"],
    author: { name: "Usth. Rahma Nabila", role: "Pemateri Kajian Muslimah" },
    verification: {
      status: "terverifikasi",
      by: "Dewan Asatidz DQS Cemani",
      date: "13 April 2026",
      note: "Ringkasan materi kajian yang ditinjau agar selaras dengan adab dan manhaj pembinaan.",
    },
    coverImage: "/images/articles/ceramah-menata-hati.webp",
    readTime: "7 menit",
    blocks: [
      {
        type: "p",
        text: "Kita sering merasa “dikejar-kejar”: pekerjaan menumpuk, chat tak habis-habis, keluarga butuh perhatian, dan kepala rasanya penuh. Di momen seperti itu, hati mudah lelah. Ringkasan kajian ini mengajak kita menata hati dengan kebiasaan sederhana—yang bisa dilakukan siapa pun, di rumah atau di jalan.",
      },
      { type: "h2", text: "Mulai dari yang paling realistis" },
      {
        type: "p",
        text: "Kebaikan tidak selalu dimulai dari target besar. Justru, yang paling kuat adalah kebiasaan kecil yang konsisten. Kalau hari ini Anda baru mampu satu hal, pilih satu hal yang paling mudah dijaga.",
      },
      { type: "h2", text: "7 kebiasaan yang meringankan" },
      {
        type: "ul",
        items: [
          "Jaga shalat tepat waktu semampunya, lalu rapikan satu-satu yang lain.",
          "Baca Al-Qur’an sedikit tapi rutin (misalnya 5–10 menit setelah Subuh atau Isya).",
          "Dzikir pendek saat transisi: sebelum mulai kerja, sebelum masuk rumah, sebelum tidur.",
          "Kurangi satu pemicu overthinking: notifikasi, doomscrolling, atau kebiasaan membandingkan diri.",
          "Biasakan doa “sebelum memulai” agar niat kembali lurus.",
          "Tutup hari dengan muhasabah singkat: apa yang perlu diperbaiki besok, tanpa menyalahkan diri berlebihan.",
          "Cari majelis ilmu yang menenangkan—bukan yang membuat kita merasa paling buruk.",
        ],
      },
      {
        type: "quote",
        text: "Istiqamah itu bukan selalu kuat. Kadang istiqamah berarti kembali lagi, meski berkali-kali jatuh.",
        by: "Catatan kajian",
      },
      { type: "h2", text: "Kalau sedang jatuh—apa yang dilakukan?" },
      {
        type: "p",
        text: "Pertama, jangan putus asa. Kedua, jangan menunda kembali sampai “mood bagus”. Mulai dari satu langkah: shalat, wudhu, atau baca satu halaman. Ketenangan sering datang setelah kita memulai, bukan sebelum memulai.",
      },
      { type: "h2", text: "Dalil ringkas (penguat motivasi)" },
      {
        type: "ul",
        items: [
          "Ajak diri kembali pada niat ibadah dan adab dalam amal.",
          "Jaga lisan dan hati dari prasangka, membandingkan, dan keluh-kesah yang tak perlu.",
          "Perbanyak amal kecil yang terus-menerus.",
        ],
      },
      {
        type: "p",
        text: "Semoga Allah memudahkan kita menata hati, menenangkan langkah, dan menjaga amal agar tetap hidup—meski di tengah kesibukan.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "ceramah-terverifikasi-adab-bermedia-sosial",
    title: "Ceramah Terverifikasi: Adab Bermedia Sosial — Menjaga Lisan dan Jempol",
    excerpt:
      "Bukan soal “aktif atau tidak aktif”. Yang lebih penting: bagaimana adab kita saat berkomentar, membagikan info, dan menjaga hati.",
    date: "10 April 2026",
    dateISO: "2026-04-10",
    tags: ["Ceramah Terverifikasi", "Adab", "Kehidupan Modern"],
    author: { name: "Ust. Fathur Rohman, Lc.", role: "Pembina Tarbiyah" },
    verification: {
      status: "terverifikasi",
      by: "Tim Kurasi Materi DQS Cemani",
      date: "10 April 2026",
      note: "Diringkas dari materi ceramah dan ditinjau ulang sebelum dipublikasikan.",
    },
    coverImage: "/images/articles/ceramah-adab-digital.webp",
    readTime: "6 menit",
    blocks: [
      {
        type: "p",
        text: "Hampir semua dari kita hidup berdampingan dengan media sosial. Kadang bermanfaat, kadang melelahkan. Masalahnya sering bukan di aplikasinya, tapi pada adab: apa yang kita ketik, apa yang kita sebarkan, dan bagaimana hati kita ketika melihat kehidupan orang lain.",
      },
      { type: "h2", text: "Tiga pertanyaan sebelum mengetik" },
      {
        type: "ul",
        items: [
          "Apakah ini benar? (atau hanya potongan informasi yang memancing emosi)",
          "Apakah ini perlu? (atau sekadar ingin menang debat)",
          "Apakah ini beradab? (cara, kata, dan niatnya)",
        ],
      },
      { type: "h2", text: "Empat adab yang paling sering diuji" },
      {
        type: "ul",
        items: [
          "Tidak ikut menyebarkan aib dan ghibah (termasuk “forward” tanpa pikir).",
          "Menahan diri dari komentar yang merendahkan dan menyakiti.",
          "Tidak menjadikan perbedaan sebagai alasan memutus silaturahmi.",
          "Menjaga waktu agar ibadah, keluarga, dan kerja tetap utama.",
        ],
      },
      {
        type: "quote",
        text: "Kalau kita tidak mampu menambah kebaikan di kolom komentar, minimal jangan menambah dosa.",
        by: "Ringkasan ceramah",
      },
      { type: "h2", text: "Langkah praktis: lebih ringan, lebih tenang" },
      {
        type: "p",
        text: "Coba terapkan “diet notifikasi” dan jadwal cek medsos. Pilih akun yang mendekatkan pada ilmu dan kebaikan. Sisanya, mute dengan tenang. Tidak semua hal harus kita respons—dan tidak semua perdebatan harus dimenangkan.",
      },
      {
        type: "p",
        text: "Semoga Allah menjaga lisan kita saat berbicara dan menjaga jempol kita saat mengetik.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "ceramah-terverifikasi-rumah-yang-dihidupkan-al-quran",
    title: "Ceramah Terverifikasi: Rumah yang Dihidupkan Al-Qur’an — Mulai dari Waktu yang Sedikit",
    excerpt:
      "Banyak keluarga ingin lebih dekat dengan Al-Qur’an, tapi bingung mulai dari mana. Kuncinya: buat jadwal kecil yang bisa dijaga bersama.",
    date: "02 April 2026",
    dateISO: "2026-04-02",
    tags: ["Ceramah Terverifikasi", "Keluarga", "Al-Qur’an"],
    author: { name: "Usth. Nur Aisyah, M.Pd.", role: "Koordinator Tahfizh" },
    verification: {
      status: "terverifikasi",
      by: "Dewan Asatidz DQS Cemani",
      date: "02 April 2026",
      note: "Materi kajian keluarga yang diringkas dan diverifikasi sebelum tayang.",
    },
    coverImage: "/images/articles/ceramah-rumah-quran.webp",
    readTime: "7 menit",
    blocks: [
      {
        type: "p",
        text: "Banyak orang tua punya keinginan yang sama: rumah lebih tenang, anak lebih mudah diarahkan, dan suasana lebih dekat dengan Al-Qur’an. Tantangannya juga sama: waktu sempit, energi terbatas, dan rutinitas sering berubah.",
      },
      { type: "h2", text: "Mulai dari target yang bisa dipertahankan" },
      {
        type: "p",
        text: "Daripada menunggu jadwal longgar, mulai dari “ritual” singkat yang konsisten. Di awal, 10 menit bersama sudah cukup: baca, dengar, atau muroja’ah ringan.",
      },
      { type: "h2", text: "Contoh rutinitas keluarga (pilih satu)" },
      {
        type: "ul",
        items: [
          "Sesudah Maghrib: 10 menit baca bersama (bergantian 3–5 ayat).",
          "Sebelum tidur: 5 menit muraja’ah surat pendek (anak menirukan).",
          "Di mobil: putar murottal satu surat yang sama selama sepekan.",
          "Akhir pekan: satu sesi lebih panjang + obrolan makna yang ringan.",
        ],
      },
      { type: "h2", text: "Yang membuat anak betah" },
      {
        type: "ul",
        items: [
          "Nada yang lembut: koreksi seperlunya, jangan mempermalukan.",
          "Pujian pada usaha, bukan hanya hasil.",
          "Suasana hangat: camilan, duduk dekat, dan tanpa gadget.",
        ],
      },
      {
        type: "quote",
        text: "Anak belajar dari apa yang sering ia lihat. Jika Al-Qur’an dekat dengan orang tuanya, ia pun akan merasa dekat.",
      },
      {
        type: "p",
        text: "Semoga Allah menjadikan rumah kita tempat yang hidup oleh Al-Qur’an—meski dimulai dari waktu yang sedikit.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "adab-sebelum-ilmu",
    title: "Menjaga Kemuliaan Al-Qur’an: Adab, Riyadhoh, dan Istiqamah",
    excerpt:
      "Di DQS Cemani, tahfidz dibina secara holistik: dari adab, metode, hingga riyadhoh—agar hafalan kuat dan akhlak terjaga.",
    date: "12 April 2026",
    dateISO: "2026-04-12",
    tags: ["Karakter", "Tarbiyah"],
    author: { name: "Tim Humas Pesantren", role: "Redaksi" },
    coverImage: "/images/articles/kemuliaan-quran.webp",
    readTime: "6 menit",
    blocks: [
      {
        type: "p",
        text: "DQS Cemani mengintegrasikan Pendidikan Tahfidzul Quran secara intensif di bawah naungan Yayasan Daarul Quran Surakarta bekerja sama dengan Yayasan Al Hadi Mustaqim. Fokus utama kami adalah menjaga kemuliaan Al-Qur’an dalam diri santri—bukan hanya banyaknya hafalan, tetapi juga adab dan istiqamah.",
      },
      {
        type: "h2",
        text: "Adab dan riyadhoh sebagai penjaga hafalan",
      },
      {
        type: "p",
        text: "Pembinaan tahfidz tidak lepas dari adab majelis, ketertiban, dan riyadhoh. Kebiasaan kecil yang dijaga setiap hari membentuk ketenangan hati, sehingga muroja’ah lebih stabil dan hafalan lebih kuat.",
      },
      {
        type: "h2",
        text: "Holistik dan integral: dari membaca sampai mengajarkan",
      },
      {
        type: "p",
        text: "DQS Cemani membina tahfidz secara holistik dan integral: metode membaca, menulis, menghafal, memahami, mengamalkan, riyadhoh, serta mengajarkan Al-Qur’an. Rangkaian ini dirancang agar santri memiliki fondasi yang utuh.",
      },
      {
        type: "quote",
        text: "Hafalan yang baik bukan hanya kuat di lisan, tetapi juga hidup dalam akhlak.",
        by: "Catatan pembinaan tahfidz",
      },
      {
        type: "ul",
        items: [
          "Pembiasaan shalat berjamaah dan adab harian",
          "Tahsin, setoran, dan muroja’ah terpantau",
          "Riyadhoh dan pembinaan karakter",
          "Latihan mengajarkan (tahsin/tahfizh) bertahap",
        ],
      },
      {
        type: "p",
        text: "Dengan izin Allah, pembinaan yang utuh akan melahirkan generasi ahli Al-Qur’an yang siap berkhidmat untuk ummat dan bangsa.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "halaqah-kecil-hafalan-terpantau",
    title: "Tahfidz Intensif: Setoran, Muroja’ah, dan Evaluasi yang Terarah",
    excerpt:
      "Pembinaan tahfidz intensif di DQS Cemani menekankan konsistensi: target realistis, evaluasi tajwid, dan pendampingan halaqah.",
    date: "23 Maret 2026",
    dateISO: "2026-03-23",
    tags: ["Tahfizh", "Metode"],
    author: { name: "Usth. Nur Aisyah, M.Pd.", role: "Koordinator Tahfizh" },
    coverImage: "/images/activities/tahfizh.webp",
    readTime: "5 menit",
    blocks: [
      {
        type: "p",
        text: "Salah satu tantangan tahfidz adalah konsistensi. Karena itu, DQS Cemani menguatkan pendampingan halaqah agar progres terjaga dan santri lebih fokus.",
      },
      { type: "h2", text: "Tiga pilar halaqah harian" },
      {
        type: "ul",
        items: [
          "Setoran (ziyadah): menambah hafalan baru",
          "Muroja’ah: menguatkan hafalan lama",
          "Evaluasi: perbaikan tajwid, makharij, dan kelancaran",
        ],
      },
      {
        type: "p",
        text: "Musyrif memantau progres dan menyesuaikan beban belajar agar santri tidak terbebani, namun tetap tertantang. Tujuannya: istiqamah dan kualitas bacaan yang semakin baik.",
      },
      {
        type: "quote",
        text: "Target terbaik adalah yang bisa dijaga. Istiqamah kecil lebih kuat daripada lonjakan sesaat.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "lingkungan-rapi-membentuk-disiplin",
    title: "Lingkungan Tertib Membentuk Disiplin dan Fokus Pembinaan",
    excerpt:
      "Keteraturan harian membantu santri menjaga ritme ibadah, belajar, dan muroja’ah—sehingga pembinaan berjalan lebih tenang.",
    date: "18 Februari 2026",
    dateISO: "2026-02-18",
    tags: ["Kedisiplinan", "Kehidupan Asrama"],
    author: { name: "Ust. Ridwan Hakim, S.Pd.", role: "Wali Asrama" },
    coverImage: "/images/campus/asrama.webp",
    readTime: "4 menit",
    blocks: [
      {
        type: "p",
        text: "Di lingkungan pesantren, santri belajar mengatur diri: bangun, kebersihan, belajar, ibadah, dan istirahat. Jadwal yang tertib meringankan, bukan membebani—karena semuanya jelas dan terarah.",
      },
      { type: "h2", text: "Kerapian melatih rasa aman" },
      {
        type: "p",
        text: "Lingkungan yang bersih dan rapi membuat santri lebih nyaman. Dari nyaman, lahir tenang. Dari tenang, muroja’ah dan belajar meningkat kualitasnya.",
      },
      { type: "h2", text: "Tanggung jawab itu bertahap" },
      {
        type: "p",
        text: "Kami membiasakan hal-hal kecil: merapikan perlengkapan, menjaga kebersihan, dan merawat fasilitas bersama. Nilai ini menjadi modal hidup ketika santri kembali ke masyarakat.",
      },
    ],
    contentHtml: "",
  },
  {
    slug: "bahasa-arab-dan-public-speaking",
    title: "Mengajarkan Al-Qur’an: Dari Tahsin hingga Adab Mengajar",
    excerpt:
      "Salah satu bagian dari pembinaan holistik adalah kesiapan santri mengajarkan Al-Qur’an: benar bacaan, terarah metode, dan terjaga adab.",
    date: "05 Februari 2026",
    dateISO: "2026-02-05",
    tags: ["Tarbiyah", "Tahfizh"],
    author: { name: "Tim Pembinaan Tahsin", role: "Pembina" },
    coverImage: "/images/activities/muhadharah.webp",
    readTime: "6 menit",
    blocks: [
      {
        type: "p",
        text: "Mengajarkan Al-Qur’an adalah amanah. Karena itu, pembinaan tidak berhenti pada hafalan, tetapi juga tahsin, metode penyampaian, dan adab ketika membimbing orang lain.",
      },
      { type: "h2", text: "Bekal yang disiapkan" },
      {
        type: "ul",
        items: [
          "Penguatan makharij dan tajwid (tahsin)",
          "Latihan membimbing setoran dan muroja’ah",
          "Umpan balik singkat, spesifik, dan beradab",
          "Adab menasihati dan menerima koreksi",
        ],
      },
      {
        type: "p",
        text: "Dengan pembinaan bertahap, santri diharapkan siap berkhidmat: menjaga kemuliaan Al-Qur’an dan mengajarkannya dengan kelembutan.",
      },
    ],
    contentHtml: "",
  },
] as const;

export async function listArticles() {
  const raw = await readArticles(defaultArticles);
  return raw.map(normalizeArticle);
}

export async function getArticle(slug: string) {
  const articles = await listArticles();
  return articles.find((a) => a.slug === slug);
}
