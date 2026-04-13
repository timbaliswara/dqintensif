import Link from "next/link";
import { notFound } from "next/navigation";

import {
  deleteAnnouncementAction,
  updateAnnouncementAction,
} from "@/app/admin/(protected)/pengumuman/actions";
import { listAnnouncements } from "@/lib/announcements";
import { AdminNotice } from "@/components/admin/admin-notice";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit Pengumuman",
  robots: { index: false, follow: false },
};

function Input({
  name,
  defaultValue,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    />
  );
}

export default async function AdminPengumumanEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await listAnnouncements();
  const item = items.find((a) => a.slug === slug);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">Pengumuman</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit pengumuman
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Pastikan tanggal publikasi (ISO) benar untuk SEO dan JSON-LD.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={updateAnnouncementAction} className="grid gap-5">
            <input type="hidden" name="currentSlug" value={item.slug} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input name="title" defaultValue={item.title} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input name="slug" defaultValue={item.slug} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ringkasan (excerpt)</Label>
              <textarea
                name="excerpt"
                rows={2}
                defaultValue={item.excerpt}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tanggal tampil</Label>
                <Input name="displayDate" defaultValue={item.displayDate} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Tanggal publish (ISO)</Label>
                <Input name="datePublishedISO" defaultValue={item.datePublishedISO} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tag</Label>
                <select
                  name="tag"
                  defaultValue={item.tag}
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {["PSB", "Kegiatan", "Pengumuman", "Prestasi"].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ImageUploadField
              nameFile="coverFile"
              namePath="coverImage"
              defaultPath={item.coverImage}
              label="Cover image"
              helperText="Jika upload file, cover akan otomatis diganti. Kalau tidak, pakai path yang ada."
            />

            <div className="space-y-2">
              <Label>Konten</Label>
              <RichTextEditor
                name="contentHtml"
                defaultValue={item.contentHtml}
                placeholder="Tulis pengumuman di sini…"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/pengumuman">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/pengumuman/${item.slug}`}>Preview publik</Link>
                </Button>
                <Button type="submit" className="rounded-full">
                  Simpan perubahan
                </Button>
              </div>
            </div>
          </form>

          <form action={deleteAnnouncementAction}>
            <input type="hidden" name="slug" value={item.slug} />
            <Button type="submit" variant="destructive" className="rounded-full">
              Hapus pengumuman
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
