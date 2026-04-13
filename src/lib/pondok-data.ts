export type NavItem = { label: string; href: string };

export type Stat = {
  label: string;
  value: string;
  note?: string;
};

export type Program = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export type Facility = {
  title: string;
  description: string;
  icon:
    | "book-open"
    | "moon-star"
    | "shield-check"
    | "graduation-cap"
    | "utensils"
    | "bed"
    | "heart-handshake"
    | "wifi";
};

export type Teacher = {
  name: string;
  role: string;
  focus: string;
  initials: string;
  bio: string;
  photo: string;
  credentials?: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  relation: string;
  quote: string;
  initials: string;
  verifiedBy: string;
  year: string;
  context: string;
  consentNote: string;
  published: boolean;
};

export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  tag: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  published: boolean;
};

export const pondok = {
  profile: {
    name: "DQS Cemani",
    shortName: "DQS Cemani",
    tagline:
      "Pesantren khusus muslimah dengan pembinaan Tahfidz Intensif yang holistik: membaca, menulis, menghafal, memahami, mengamalkan, riyadhoh, hingga mengajarkan Al-Qur’an.",
    location: "Cemani, Grogol, Sukoharjo — Jawa Tengah",
    established: 0,
  },
  legal: {
    headline: "Legal & Profil Yayasan",
    overview:
      "DQS Cemani berada di bawah naungan Yayasan Daarul Quran Surakarta dan bekerja sama dengan Yayasan Al Hadi Mustaqim. Informasi legalitas, kanal resmi, dan kebijakan publikasi kami rangkum agar wali santri dan calon santri lebih tenang.",
    foundation: [
      {
        name: "Yayasan Daarul Quran Surakarta",
        role: "Naungan & pembinaan",
      },
      {
        name: "Yayasan Al Hadi Mustaqim",
        role: "Mitra kerja sama",
      },
    ],
    documents: [
      {
        title: "Profil lembaga & struktur pengelola",
        note: "Ringkasan visi, program, dan penanggung jawab unit pembinaan.",
      },
      {
        title: "Legalitas yayasan (akta/izin)",
        note: "Dapat ditunjukkan saat kunjungan atau atas permintaan melalui admin resmi.",
      },
      {
        title: "Kebijakan pengasuhan & keamanan",
        note: "Aturan kunjungan, komunikasi wali santri, barang bawaan, dan disiplin harian.",
      },
      {
        title: "Standar kesehatan & rujukan",
        note: "Prosedur penanganan awal dan rujukan jika diperlukan.",
      },
    ],
    officialChannels: [
      { label: "Website resmi", value: "dqsintensif.com" },
      { label: "WhatsApp PSB 1", value: "+62 857-2808-3638" },
      { label: "WhatsApp PSB 2", value: "+62 896-8257-2939" },
      { label: "Email", value: "info@dqscemani.id" },
      { label: "Pengumuman resmi", value: "/pengumuman" },
    ],
  },
  nav: [
    { label: "Tentang", href: "/tentang" },
    { label: "Program", href: "/program" },
    { label: "Agenda", href: "/agenda" },
    { label: "Pengumuman", href: "/pengumuman" },
    { label: "Fasilitas", href: "/fasilitas" },
    { label: "Galeri", href: "/galeri" },
    { label: "Asatidz", href: "/asatidz" },
    { label: "Manajemen", href: "/manajemen" },
    { label: "PSB", href: "/psb" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/kontak" },
  ] satisfies NavItem[],
  stats: [
    { label: "Santri aktif & alumni", value: "1.200+" },
    { label: "Hafizah lulusan", value: "Ribuan" },
    { label: "Asatidz & pembina", value: "20+" },
    { label: "Target tahfidz", value: "30 Juz" },
  ] satisfies Stat[],
  programs: [
    {
      title: "Tahfidz Intensif",
      subtitle: "Membaca · Menulis · Menghafal · Muroja’ah terpantau",
      description:
        "Pembinaan tahfidz yang terstruktur dan intensif dengan pendampingan halaqah agar progres terjaga dan santri lebih tenang.",
      highlights: [
        "Tahsin & tajwid terarah",
        "Setoran dan muroja’ah harian",
        "Target bertahap sesuai kemampuan",
        "Evaluasi berkala musyrif",
      ],
    },
    {
      title: "Kitab Turats (Bersanad)",
      subtitle: "Menjaga kemuliaan Al-Qur’an dengan ilmu yang bertanggung jawab",
      description:
        "Pengkajian kitab turats yang dibina oleh ust dan ustadzah bersanad untuk menguatkan pemahaman dan adab dalam berilmu.",
      highlights: [
        "Kajian terjadwal dan bertahap",
        "Adab majelis dan kedisiplinan belajar",
        "Pembinaan fiqh & akhlak",
        "Pendampingan tanya-jawab",
      ],
    },
    {
      title: "Holistik & Integral",
      subtitle: "Memahami · Mengamalkan · Riyadhoh · Mengajarkan",
      description:
        "Pembinaan yang menyatu dari aspek ibadah, adab, riyadhoh, hingga keterampilan mengajarkan Al-Qur’an agar santri siap berkhidmat.",
      highlights: [
        "Pembiasaan ibadah berjamaah",
        "Riyadhoh dan pembinaan karakter",
        "Latihan mengajar (tahsin/tahfizh)",
        "Kegiatan dakwah dan sosial",
      ],
    },
  ] satisfies Program[],
  facilities: [
    {
      title: "Masjid & Aula Utama",
      description:
        "Pusat ibadah, kajian, dan kegiatan besar pesantren dengan suasana khusyuk.",
      icon: "moon-star",
    },
    {
      title: "Perpustakaan & Kitab",
      description:
        "Koleksi kitab turats dan literatur modern untuk mendukung pembelajaran.",
      icon: "book-open",
    },
    {
      title: "Asrama Nyaman",
      description:
        "Ruang asrama tertata, pengawasan pembina, dan program kebersihan harian.",
      icon: "bed",
    },
    {
      title: "Dapur & Gizi",
      description:
        "Pola makan teratur, menu bergizi, dan standar kebersihan yang ketat.",
      icon: "utensils",
    },
    {
      title: "Klinik & Kesehatan",
      description:
        "Layanan pertolongan pertama, pemeriksaan rutin, dan rujukan cepat.",
      icon: "heart-handshake",
    },
    {
      title: "Keamanan 24/7",
      description:
        "Sistem keamanan berlapis dengan akses terkontrol dan pengawasan lingkungan.",
      icon: "shield-check",
    },
    {
      title: "Ruang Kelas Modern",
      description:
        "Kelas terang dan rapi untuk belajar efektif, didukung perangkat presentasi.",
      icon: "graduation-cap",
    },
    {
      title: "Internet Terkelola",
      description:
        "Akses edukasi dengan filter konten dan jadwal penggunaan yang bijak.",
      icon: "wifi",
    },
  ] satisfies Facility[],
  teachers: [
    {
      name: "Ust. Ahmad Fauzi, Lc.",
      role: "Mudir Diniyah",
      focus: "Fiqh & Usul Fiqh",
      initials: "AF",
      bio: "Membina kajian dasar diniyah, adab majelis, dan penguatan pemahaman fiqh harian santri secara bertahap.",
      photo: "/images/gallery/kitab-turats.webp",
      credentials: ["Kajian turats bertahap", "Pembinaan adab majelis"],
    },
    {
      name: "Usth. Nur Aisyah, M.Pd.",
      role: "Koordinator Tahfizh",
      focus: "Tahsin & Manajemen Halaqah",
      initials: "NA",
      bio: "Mengawal halaqah tahfidz: tahsin, setoran, muroja’ah, evaluasi, dan pola target yang realistis agar santri istiqamah.",
      photo: "/images/articles/kemuliaan-quran.webp",
      credentials: ["Tahsin & tajwid", "Manajemen halaqah", "Pembinaan muslimah"],
    },
    {
      name: "Ust. Ridwan Hakim, S.Pd.",
      role: "Wali Asrama",
      focus: "Adab, Disiplin, dan Pembinaan Harian",
      initials: "RH",
      bio: "Mendampingi ritme harian asrama: kebersihan, ketertiban, ibadah berjamaah, dan pembiasaan adab yang konsisten.",
      photo: "/images/campus/asrama.webp",
      credentials: ["Pengasuhan asrama", "Pembinaan karakter"],
    },
    {
      name: "Usth. Salsabila Zahra, M.Hum.",
      role: "Pembina Bahasa",
      focus: "Bahasa Arab & Public Speaking",
      initials: "SZ",
      bio: "Menguatkan bahasa Arab aktif dan kemampuan menyampaikan ilmu dengan santun melalui latihan bertahap dan pendampingan.",
      photo: "/images/gallery/catatan-belajar.webp",
      credentials: ["Bahasa Arab", "Muhadharah", "Public speaking"],
    },
  ] satisfies Teacher[],
  testimonials: [
    {
      id: "wali-adab-2026",
      name: "Ibu Siti Rahmah",
      relation: "Wali santri kelas X",
      quote:
        "Perubahan paling terasa itu adab. Anak jadi lebih tertib shalat, lebih sopan bicara, dan semangat mengaji.",
      initials: "SR",
      verifiedBy: "Admin Humas DQS Cemani",
      year: "2026",
      context: "Wali santri program SMP",
      consentNote:
        "Testimoni ditayangkan atas izin narasumber; nama dapat ditulis inisial sesuai permintaan.",
      published: true,
    },
    {
      id: "wali-halaqah-2026",
      name: "Bapak H. Anwar",
      relation: "Wali santri program tahfizh",
      quote:
        "Program halaqah kecil membuat perkembangan hafalan terpantau. Setiap pekan ada laporan dan evaluasi.",
      initials: "HA",
      verifiedBy: "Admin PSB DQS Cemani",
      year: "2026",
      context: "Wali santri tahfidz intensif",
      consentNote:
        "Testimoni ditayangkan atas izin narasumber; detail pribadi dapat disamarkan.",
      published: true,
    },
    {
      id: "alumni-istiqamah-2025",
      name: "Alumni · Farhan N.",
      relation: "Mahasiswa (beasiswa)",
      quote:
        "Bekal bahasa dan disiplin dari pondok sangat membantu ketika kuliah. Yang paling saya syukuri: adab dan istiqamah.",
      initials: "FN",
      verifiedBy: "Pembina Asrama",
      year: "2025",
      context: "Alumni (kuliah sambil dakwah)",
      consentNote:
        "Testimoni alumni bersifat ringkas; hasil tiap santri bisa berbeda sesuai usaha dan izin Allah.",
      published: true,
    },
  ] satisfies Testimonial[],
  news: [
    {
      title: "Pembukaan PSB 2026/2027",
      date: "12 April 2026",
      excerpt:
        "Pendaftaran santri baru dibuka dengan kuota terbatas. Seleksi mencakup baca Qur’an, wawancara, dan kesehatan.",
      tag: "PSB",
    },
    {
      title: "Dauroh Tahsin Ramadhan",
      date: "23 Maret 2026",
      excerpt:
        "Program intensif tahsin selama Ramadhan bersama musyrif bersanad, fokus makharij dan gharib.",
      tag: "Kegiatan",
    },
    {
      title: "Khataman 30 Juz & Wisuda Tahfizh",
      date: "18 Februari 2026",
      excerpt:
        "Syukuran khataman dan wisuda tahfizh untuk santri yang mencapai target hafalan dengan sanad penguji.",
      tag: "Prestasi",
    },
  ] satisfies NewsItem[],
  admission: {
    headline: "Penerimaan Santri Baru (PSB) 2026/2027",
    steps: [
      "Isi formulir & pilih program",
      "Unggah berkas (KK, akta, rapor, foto)",
      "Tes baca Al-Qur’an & wawancara",
      "Pengumuman hasil & daftar ulang",
    ],
    requirements: [
      "Mampu membaca Al-Qur’an (dasar)",
      "Sehat jasmani dan rohani",
      "Bersedia mengikuti tata tertib pondok",
    ],
  },
  faq: [
    {
      id: "khusus-putri",
      question: "Apakah DQS Cemani khusus putri (muslimah/santriwati)?",
      answer:
        "Ya. DQS Cemani adalah pondok pesantren khusus muslimah (santriwati). Pembinaan, asrama, dan kegiatan dirancang untuk kebutuhan santriwati.",
      published: true,
    },
    {
      id: "sistem-tahfizh",
      question: "Bagaimana sistem pembelajaran tahfizh?",
      answer:
        "Santri mengikuti halaqah harian (setoran, muroja’ah, evaluasi). Target disesuaikan kemampuan dengan monitoring musyrif.",
      published: true,
    },
    {
      id: "kunjungan-wali",
      question: "Apakah tersedia kunjungan wali santri?",
      answer:
        "Tersedia jadwal kunjungan berkala dan komunikasi terpantau melalui admin pesantren serta wali asrama.",
      published: true,
    },
    {
      id: "beasiswa",
      question: "Apakah ada beasiswa?",
      answer:
        "Ada beasiswa terbatas berdasarkan seleksi prestasi dan kondisi ekonomi. Informasi lengkap mengikuti pengumuman PSB.",
      published: true,
    },
  ] satisfies FaqItem[],
  contact: {
    address:
      "Jl. Semen Romo Cemani, Ngruki, Cemani, Kec. Grogol, Kabupaten Sukoharjo, Jawa Tengah 57552",
    phone: "+62 857-2808-3638",
    whatsappNumbers: ["+62 857-2808-3638", "+62 896-8257-2939"],
    email: "info@dqscemani.id",
    hours: "Senin–Sabtu · 08.00–16.00 WIB",
    coordinates: { lat: -7.585105, lon: 110.810785 },
    mapsLabel: "DQS Cemani (Cemani, Grogol, Sukoharjo)",
    mapsQuery:
      "DQS Cemani, Jl. Semen Romo Cemani, Ngruki, Cemani, Grogol, Sukoharjo",
    mapsUrl:
      "https://www.google.com/maps?ll=-7.585105,110.810785&z=16&t=m&hl=id&gl=ID&mapclient=embed&cid=5004909959358174063",
    officialNote:
      "Pastikan Anda menghubungi kanal resmi. Informasi jadwal, biaya, dan kuota hanya diumumkan lewat admin dan halaman Pengumuman.",
  },
} as const;
