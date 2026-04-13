This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deployment (Vercel + Supabase + Cloudinary)

Catatan:
- Vercel bersifat serverless, jadi **file system tidak persisten** untuk fitur admin CRUD.
- Repo ini mendukung penyimpanan konten admin di **Supabase** (1 tabel KV JSONB).
- Upload gambar admin disarankan via **Cloudinary**.

### Env vars

Lihat `.env.example` untuk daftar lengkap.

### Supabase (database)

- Jalankan SQL: `supabase/schema.sql`
- Set env: `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY`

### Cloudinary (images)

- Set env: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Opsional: `CLOUDINARY_FOLDER`

### Admin (production)

Wajib set:
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
