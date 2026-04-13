import fs from "node:fs";
import path from "node:path";

const A4 = { w: 595.28, h: 841.89 };
const margin = 54; // ~0.75in

function escapePdfString(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/g).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    // handle very long word
    if (word.length > maxChars) {
      lines.push(word.slice(0, maxChars));
      current = word.slice(maxChars);
    } else {
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function nowIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

class PdfBuilder {
  constructor() {
    this.objects = [];
  }

  addObject(content) {
    const id = this.objects.length + 1;
    this.objects.push({ id, content });
    return id;
  }

  build() {
    let out = "%PDF-1.4\n%âãÏÓ\n";
    const offsets = [0];
    for (const obj of this.objects) {
      offsets.push(out.length);
      out += `${obj.id} 0 obj\n${obj.content}\nendobj\n`;
    }
    const xrefPos = out.length;
    out += `xref\n0 ${this.objects.length + 1}\n`;
    out += "0000000000 65535 f \n";
    for (let i = 1; i < offsets.length; i++) {
      out += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    }
    out += `trailer\n<< /Size ${this.objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
    return out;
  }
}

function makeContentStream(ops) {
  const data = ops.join("\n") + "\n";
  return `<< /Length ${Buffer.byteLength(data, "utf8")} >>\nstream\n${data}endstream`;
}

function buildPdf(pages) {
  const pdf = new PdfBuilder();

  // 1) Catalog (root)
  // 2) Pages
  // 3.. page objects + content streams + fonts

  const pagesObjId = 2;
  pdf.addObject(`<< /Type /Catalog /Pages ${pagesObjId} 0 R >>`);

  // Fonts (Base14)
  const fontRegular = pdf.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  const fontBold = pdf.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);
  const fontMono = pdf.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>`);

  const pageIds = [];

  for (const p of pages) {
    const contentId = pdf.addObject(makeContentStream(p.ops));
    const pageId = pdf.addObject(
      `<< /Type /Page /Parent ${pagesObjId} 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R /F3 ${fontMono} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  }

  pdf.addObject(`<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`);

  return pdf.build();
}

function buildPagesFromDoc(doc) {
  const pages = [];
  let ops = [];

  let x = margin;
  let y = A4.h - margin;

  const baseFont = 11;
  const leading = 15;
  const maxChars = 86; // approx for 11pt within margins

  function newPage() {
    if (ops.length) pages.push({ ops });
    ops = [];
    y = A4.h - margin;
    // header line
  }

  function ensureSpace(lines = 1, extra = 0) {
    const needed = lines * leading + extra;
    if (y - needed < margin) newPage();
  }

  function textLine(font, size, text) {
    ops.push("BT");
    ops.push(`/${font} ${size} Tf`);
    ops.push(`${leading} TL`);
    ops.push(`1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm`);
    ops.push(`(${escapePdfString(text)}) Tj`);
    ops.push("ET");
    y -= leading;
  }

  function spacer(px = 8) {
    y -= px;
  }

  function heading(text, level = 1) {
    const size = level === 1 ? 18 : level === 2 ? 14 : 12;
    ensureSpace(2, 8);
    textLine("F2", size, text);
    spacer(level === 1 ? 8 : 4);
  }

  function paragraph(text) {
    const lines = wrapText(text, maxChars);
    ensureSpace(lines.length + 1, 4);
    for (const line of lines) textLine("F1", baseFont, line);
    spacer(6);
  }

  function note(text) {
    const lines = wrapText(text, maxChars - 2);
    ensureSpace(lines.length + 2, 6);
    textLine("F2", 11, "Catatan:");
    for (const line of lines) textLine("F1", baseFont, `- ${line}`);
    spacer(6);
  }

  function bulletList(items) {
    for (const item of items) {
      const lines = wrapText(item, maxChars - 4);
      ensureSpace(lines.length + 1, 2);
      const [first, ...rest] = lines;
      textLine("F1", baseFont, `• ${first}`);
      for (const line of rest) textLine("F1", baseFont, `  ${line}`);
    }
    spacer(6);
  }

  function orderedList(items) {
    let idx = 1;
    for (const item of items) {
      const prefix = `${idx}. `;
      const lines = wrapText(item, maxChars - prefix.length - 1);
      ensureSpace(lines.length + 1, 2);
      const [first, ...rest] = lines;
      textLine("F1", baseFont, `${prefix}${first}`);
      for (const line of rest) textLine("F1", baseFont, `   ${line}`);
      idx++;
    }
    spacer(6);
  }

  function codeBlock(lines) {
    ensureSpace(lines.length + 2, 6);
    for (const line of lines) textLine("F3", 10, line);
    spacer(6);
  }

  // Title
  heading(doc.title, 1);
  paragraph(`Tanggal: ${doc.date}`);
  paragraph(doc.subtitle);

  for (const section of doc.sections) {
    heading(section.title, 2);
    for (const block of section.blocks) {
      if (block.type === "p") paragraph(block.text);
      if (block.type === "note") note(block.text);
      if (block.type === "ul") bulletList(block.items);
      if (block.type === "ol") orderedList(block.items);
      if (block.type === "code") codeBlock(block.lines);
    }
  }

  if (ops.length) pages.push({ ops });
  return pages;
}

const doc = {
  title: "Panduan Akses & Operasional (PIC) — DQS Cemani (Intensif)",
  date: nowIsoDate(),
  subtitle:
    "Dokumen singkat untuk PIC pengelola konten: login admin, update PSB, upload foto, publikasi artikel/pengumuman, dan troubleshooting.",
  sections: [
    {
      title: "Link Penting",
      blocks: [
        {
          type: "ul",
          items: [
            "Website (publik): https://dqsintensif.com",
            "Admin panel: https://dqsintensif.com/admin",
            "Login admin: https://dqsintensif.com/admin/login",
            "Status konfigurasi: https://dqsintensif.com/admin/status",
          ],
        },
        {
          type: "note",
          text: "Jika domain utama belum aktif, gunakan domain Vercel yang diinformasikan oleh tim (contoh: https://dqintensif.vercel.app).",
        },
      ],
    },
    {
      title: "WhatsApp Pendaftaran / Informasi",
      blocks: [
        {
          type: "ul",
          items: ["Admin 1: +62 857-2808-3638", "Admin 2: +62 896-8257-2939"],
        },
        {
          type: "note",
          text: "Untuk info sensitif (kuota, jadwal tes, biaya), tetap arahkan ke kanal resmi/admin. Hindari menyebar info di luar pengumuman resmi.",
        },
      ],
    },
    {
      title: "Cara Login Admin",
      blocks: [
        {
          type: "ol",
          items: [
            "Buka halaman login admin.",
            "Masukkan password admin.",
            "Jika berhasil, Anda akan masuk dashboard admin.",
          ],
        },
        {
          type: "note",
          text: "Login memakai cookie di browser. Untuk keluar, gunakan tombol “Keluar” di sidebar admin.",
        },
      ],
    },
    {
      title: "Menu Admin & Fungsinya",
      blocks: [
        {
          type: "ul",
          items: [
            "Agenda: event yang akan datang (dauroh, open house, workshop, jadwal PSB).",
            "Pengumuman: update resmi (PSB, jadwal layanan, informasi penting, prestasi).",
            "Artikel: tulisan edukatif (ceramah ringkas, adab, parenting, tahfidz).",
            "Galeri: upload foto + caption + kategori.",
            "Testimoni: kutipan wali/alumni (pastikan izin).",
            "FAQ: pertanyaan yang sering ditanyakan calon wali santri.",
            "PSB: alur & syarat PSB (sensitif, update satu pintu).",
            "Profil & Legal: kontak, alamat, jam layanan, maps, kanal resmi.",
            "Manajemen & Pengasuhan: profil pengasuh/pengelola (nama, peran, foto).",
            "Status: cek Supabase/Cloudinary, seed konten, update cover demo.",
          ],
        },
      ],
    },
    {
      title: "Cara Edit Konten (Pola Umum)",
      blocks: [
        {
          type: "ol",
          items: [
            "Masuk menu yang ingin diubah (mis. Artikel / Pengumuman / Agenda / Galeri).",
            "Klik tombol Tambah untuk membuat konten baru, atau tombol Edit untuk mengubah konten yang sudah ada.",
            "Lengkapi judul, ringkasan, isi (editor), dan gambar cover/foto jika diperlukan.",
            "Klik Simpan dan tunggu notifikasi berhasil.",
          ],
        },
        {
          type: "note",
          text: "Jika terjadi error, form tidak akan hilang/reset karena ada draft otomatis. Cukup perbaiki bagian yang salah dan simpan lagi.",
        },
      ],
    },
    {
      title: "Upload Gambar (Cloudinary)",
      blocks: [
        {
          type: "ol",
          items: [
            "Pilih file (JPG/PNG/WebP; maks 5MB).",
            "Klik Simpan. Jika sukses, URL gambar otomatis tersimpan.",
            "Pastikan foto sesuai adab (khusus muslimah) dan kualitas jelas.",
          ],
        },
        {
          type: "note",
          text: "Rasio yang nyaman untuk kartu/hero: 16:9 atau 16:10. Hindari foto blur/gelap.",
        },
      ],
    },
    {
      title: "Draft Otomatis (Tidak Perlu Input Ulang)",
      blocks: [
        {
          type: "p",
          text: "Form admin menyimpan draft otomatis di browser. Jika gagal upload/ada error, data teks tetap kembali saat halaman terbuka lagi.",
        },
        {
          type: "note",
          text: "File upload (pilih file) tidak bisa dipulihkan otomatis oleh browser. Namun judul, caption, dan isi tulisan tetap tersimpan.",
        },
      ],
    },
    {
      title: "Alur Kerja PIC (Disarankan)",
      blocks: [
        {
          type: "ul",
          items: [
            "Update PSB: pastikan alur/syarat konsisten, lalu buat pengumuman jika ada perubahan penting.",
            "Update Agenda: judul jelas, tanggal ISO benar, lokasi jelas, dan CTA mengarah ke kontak/admin.",
            "Dokumentasi kegiatan: upload ke Galeri dengan caption + deskripsi singkat yang informatif.",
          ],
        },
      ],
    },
    {
      title: "Troubleshooting Cepat",
      blocks: [
        {
          type: "ul",
          items: [
            "Jika muncul error saat simpan: cek Admin → Status (Supabase & Cloudinary harus OK).",
            "Jika konten belum berubah di publik: tunggu 5–30 detik, lalu hard refresh (Cmd+Shift+R).",
            "Jika Supabase kv_content kosong: Admin → Status → “Salin konten awal ke Supabase”.",
          ],
        },
      ],
    },
    {
      title: "Melihat Data di Supabase (Opsional)",
      blocks: [
        {
          type: "ol",
          items: [
            "Buka dashboard Supabase proyek “websitedq”.",
            "Masuk menu Table Editor → pilih tabel kv_content.",
            "Cari key sesuai menu (articles.json, announcements.json, agenda.json, gallery.json, testimonials.json, faq.json, psb.json, site.json, management.json).",
          ],
        },
        {
          type: "note",
          text: "Kolom value berupa JSON. PIC tidak perlu mengedit JSON langsung; update dilakukan lewat admin panel.",
        },
      ],
    },
    {
      title: "Standar Konten (High Trust)",
      blocks: [
        {
          type: "ul",
          items: [
            "Foto sesuai adab (muslimah berhijab), terang, rapi, tidak blur.",
            "Judul jelas, tidak clickbait, dan relevan untuk masyarakat umum.",
            "Cantumkan tanggal dan konteks kegiatan (mis. dauroh awal semester, agenda PSB).",
            "Untuk testimoni: pastikan izin publikasi (boleh inisial), hindari data sensitif.",
          ],
        },
      ],
    },
    {
      title: "Catatan Keamanan",
      blocks: [
        {
          type: "ul",
          items: [
            "Password admin & secret jangan dibagikan.",
            "Batasi akses admin hanya untuk PIC yang dipercaya.",
            "Jika ada indikasi bocor, segera ganti env admin di Vercel.",
          ],
        },
      ],
    },
    {
      title: "Jika Butuh Bantuan Cepat",
      blocks: [
        {
          type: "ul",
          items: [
            "Cek Admin → Status dulu (sering paling cepat menyelesaikan masalah).",
            "Jika masih error: catat menu yang gagal + pesan error + perangkat (HP/desktop) + browser (Chrome/Safari).",
          ],
        },
      ],
    },
  ],
};

const pages = buildPagesFromDoc(doc);
const pdfData = buildPdf(pages);

const outDir = path.join(process.cwd(), "public", "docs");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "Panduan-PIC-DQS-Intensif.pdf");
fs.writeFileSync(outPath, pdfData, "binary");

console.log(`OK: ${outPath}`);
