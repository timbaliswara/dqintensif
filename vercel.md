# Vercel deploy checklist

## 1) Import project

- Import repo ke Vercel
- Pastikan build command: `npm run build`

## 2) Environment Variables (Production)

Wajib:
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Opsional:
- `CLOUDINARY_FOLDER`

## 3) Supabase schema

Jalankan `supabase/schema.sql` di Supabase SQL editor.

## 4) Catatan upload

- Jika `CLOUDINARY_*` belum diset di Vercel, upload gambar dari admin akan error (karena Vercel tidak menyimpan file upload secara permanen).

