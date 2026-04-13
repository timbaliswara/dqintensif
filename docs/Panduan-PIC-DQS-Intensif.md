# Panduan Akses & Operasional (PIC)
**Website:** DQS Cemani (Program Intensif)  
**Tujuan dokumen:** membantu PIC mengelola konten website (admin panel), termasuk upload foto, artikel, pengumuman, agenda, dan info PSB.

---

## 1) Link penting
- **Website (publik):** `https://dqsintensif.com`
- **Admin panel:** `https://dqsintensif.com/admin`
- **Login admin:** `https://dqsintensif.com/admin/login`
- **Status konfigurasi:** `https://dqsintensif.com/admin/status`

## 2) Kontak WhatsApp (Pendaftaran/Informasi)
- **Admin 1:** `+62 857-2808-3638`
- **Admin 2:** `+62 896-8257-2939`

> Disarankan: semua informasi sensitif (kuota, biaya, jadwal tes) tetap dirujuk ke kanal resmi dan/atau admin.

---

## 3) Cara login admin
1. Buka `.../admin/login`
2. Masukkan password admin
3. Setelah berhasil, Anda masuk ke dashboard admin

Catatan:
- Login admin memakai cookie (otomatis tersimpan di browser).
- Jika logout: buka menu admin lalu klik **Keluar**.

---

## 4) Menu admin & fungsinya (ringkas)
### Dashboard
Ringkasan jumlah konten dan akses cepat.

### Agenda
Untuk event yang **akan datang** (upcoming): dauroh, open house, workshop, jadwal PSB, dll.
- Buat agenda baru → `Agenda` → **Tambah**
- Pastikan tanggal format ISO (ada contoh di form).

### Pengumuman
Untuk update resmi: PSB, jadwal layanan, pengumuman penting, prestasi, perubahan kebijakan.
- Cocok untuk konten yang perlu “satu pintu”

### Artikel
Tulisan panjang/edukatif untuk umum: ceramah ringkas, adab, parenting, tahfidz, dll.
- Ada opsi **Ceramah Terverifikasi** (centang) + info verifikasi

### Galeri
Upload foto + caption + kategori.
- Pastikan foto sesuai adab (khusus muslimah).

### Testimoni
Testimoni wali/calon wali (high-trust).
- Pastikan ada izin publikasi (boleh pakai inisial).

### FAQ
Pertanyaan paling sering dari calon wali santri.

### PSB
Halaman sensitif untuk alur & syarat PSB.
- Update hanya dari admin agar konsisten.

### Profil & Legal
Kontak, alamat, maps, jam layanan, kanal resmi.
- Dipakai di footer, halaman Kontak, Legal, dan schema SEO.

### Manajemen & Pengasuhan
Profil pengasuh/pengelola (nama, peran, foto, masa tugas).

### Status
Checklist kesiapan production (Env, Supabase, Cloudinary) + tombol bantu.
- **Seed konten**: mengisi Supabase pertama kali (tanpa menimpa data yang sudah ada).
- **Update cover demo**: mengganti cover demo lama ke foto kegiatan terbaru (tanpa mengubah isi).

---

## 5) Upload gambar (Cloudinary)
Di form yang ada upload:
1. Klik **Choose file** (JPG/PNG/WebP; maks 5MB).
2. Klik **Simpan**.
3. Jika sukses, URL gambar tersimpan dan tampil di publik.

Tips:
- Usahakan foto terang, rapi, dan tidak blur.
- Rasio yang enak: 16:9 atau 16:10.

Jika gagal upload:
- Sekarang form **tidak hilang/reset** (ada draft otomatis).
- Periksa pesan error (notifikasi merah).

---

## 6) Draft otomatis (anti hilang)
Semua form admin menyimpan draft otomatis di browser (localStorage) supaya:
- jika error upload,
- atau tab tidak sengaja tertutup,

Anda tidak perlu input ulang dari awal.

Catatan:
- File upload (pilih file) tidak bisa dipulihkan otomatis oleh browser, tapi teks/isi form akan kembali.

---

## 7) Alur kerja yang disarankan (PIC)
### A) Update PSB
1. Cek pengumuman terbaru (bila ada perubahan kebijakan).
2. Update `Admin → PSB` (alur/syarat).
3. Jika perlu, buat `Pengumuman` terkait.

### B) Update agenda terdekat
1. Buat event di `Admin → Agenda`
2. Pastikan judul jelas, tanggal benar, lokasi jelas.
3. CTA mengarah ke `/kontak` atau info admin.

### C) Upload dokumentasi kegiatan
1. `Admin → Galeri` → Tambah foto
2. Isi caption + deskripsi singkat
3. Pilih kategori yang tepat

---

## 8) Troubleshooting cepat
### “An error occurred…” saat simpan
- Biasanya karena upload/validasi/konfigurasi.
- Buka `Admin → Status`:
  - Supabase harus OK (tabel `kv_content` bisa diakses)
  - Cloudinary harus OK (upload bisa jalan di Vercel)

### Konten tidak berubah di publik
- Tunggu 5–30 detik (revalidate).
- Hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`).

### Supabase `kv_content` kosong
- Buka `Admin → Status` → klik **Salin konten awal ke Supabase**.

---

## 9) Catatan keamanan (penting)
- Password admin dan secret jangan dibagikan sembarangan.
- Jika ada indikasi bocor, segera ganti env admin di Vercel.
- Pastikan hanya PIC yang dipercaya punya akses admin.

---

## 10) Cara melihat data di Supabase (opsional untuk PIC)
Jika PIC perlu mengecek apakah konten benar-benar tersimpan:
1. Buka dashboard Supabase proyek `websitedq`.
2. Masuk menu **Table Editor** → pilih tabel `kv_content`.
3. Tiap menu admin tersimpan sebagai **key**:
   - `articles.json` (Artikel)
   - `announcements.json` (Pengumuman)
   - `agenda.json` (Agenda)
   - `gallery.json` (Galeri)
   - `testimonials.json` (Testimoni)
   - `faq.json` (FAQ)
   - `psb.json` (PSB)
   - `site.json` (Profil & Legal / Kanal resmi / Kontak)
   - `management.json` (Manajemen & Pengasuhan)

Catatan:
- Kolom `value` berisi data JSON. **PIC tidak perlu mengedit JSON** langsung, cukup melalui admin panel.

---

## 11) Standar konten (supaya “high trust”)
Ringkas checklist sebelum publish:
- Gunakan foto yang **sesuai adab** (muslimah berhijab, tidak menampakkan aurat, tidak blur).
- Judul jelas, tidak clickbait, dan relevan untuk masyarakat umum.
- Cantumkan tanggal dan konteks (mis. “Daurah awal semester”, “Agenda PSB”).
- Untuk testimoni: gunakan izin wali/alumni (boleh inisial) dan jangan tampilkan data sensitif.

---

## 12) Jika butuh bantuan cepat
- Cek `Admin → Status` dulu (paling sering menyelesaikan masalah).
- Jika masih bermasalah, catat:
  - Menu apa yang gagal (Artikel/Pengumuman/Galeri/PSB)
  - Pesan error yang muncul
  - Perangkat (HP/desktop) + browser (Chrome/Safari)
