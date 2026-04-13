import Link from "next/link";

import { createAnnouncementAction } from "@/app/admin/(protected)/pengumuman/actions";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Pengumuman Baru",
  robots: { index: false, follow: false },
};

const defaultHtml = [
  "<p><strong>Bismillah.</strong> Tulis pembuka singkat dan jelas di sini.</p>",
  "<h2>Poin penting</h2>",
  "<ul><li>Poin 1</li><li>Poin 2</li><li>Poin 3</li></ul>",
  "<blockquote><strong>Konfirmasi admin</strong><br/>Jika ada perubahan jadwal/kuota, mohon konfirmasi ke admin resmi.</blockquote>",
].join("");

function Input({ name, placeholder, defaultValue }: { name: string; placeholder?: string; defaultValue?: string }) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    />
  );
}

export default function AdminPengumumanNewPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">Pengumuman</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah pengumuman baru
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Konten disimpan sebagai JSON blocks (terstruktur). Fokus pada informasi
          resmi dan mudah dipahami.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form pengumuman</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAnnouncementAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input name="title" placeholder="PSB 2026/2027 Dibuka (Kuota Terbatas)" />
              </div>
              <div className="space-y-2">
                <Label>Slug (opsional)</Label>
                <Input name="slug" placeholder="psb-2026-2027-dibuka" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ringkasan (excerpt)</Label>
              <textarea
                name="excerpt"
                rows={2}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Ringkasan 1–2 kalimat untuk kartu pengumuman."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tanggal tampil</Label>
                <Input name="displayDate" placeholder="13 April 2026" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Tanggal publish (ISO)</Label>
                <Input
                  name="datePublishedISO"
                  placeholder="2026-04-13T08:00:00+07:00"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tag</Label>
                <select
                  name="tag"
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  defaultValue="Pengumuman"
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
              defaultPath="/images/campus/gerbang.webp"
              label="Cover image"
              helperText="Anda bisa upload gambar baru, atau pakai path gambar yang sudah ada di folder public."
            />

            <div className="space-y-2">
              <Label>Konten</Label>
              <RichTextEditor
                name="contentHtml"
                defaultValue={defaultHtml}
                placeholder="Tulis pengumuman di sini…"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/pengumuman">Batal</Link>
              </Button>
              <Button type="submit" className="rounded-full">
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
