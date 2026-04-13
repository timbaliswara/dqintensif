import Link from "next/link";

import { createArticleAction } from "@/app/admin/(protected)/artikel/actions";
import { AdminNotice } from "@/components/admin/admin-notice";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Artikel Baru",
  robots: { index: false, follow: false },
};

function Input({
  name,
  placeholder,
  defaultValue,
}: {
  name: string;
  placeholder?: string;
  defaultValue?: string;
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

const defaultHtml = [
  "<p><strong>Bismillah.</strong> Tulis pembuka singkat yang relate dengan keseharian.</p>",
  "<h2>Poin utama</h2>",
  "<ul><li>Poin 1</li><li>Poin 2</li><li>Poin 3</li></ul>",
  "<blockquote><strong>Catatan</strong><br/>Jika ada hal yang perlu ditanyakan, silakan konfirmasi ke admin.</blockquote>",
].join("");

export default function AdminArtikelNewPage() {
  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">Artikel</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah artikel baru
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Gunakan bahasa yang ringan dan nyaman. Untuk “Ceramah Terverifikasi”,
          centang verifikasi dan isi catatannya.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form artikel</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createArticleAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input name="title" placeholder="Ceramah Terverifikasi: …" />
              </div>
              <div className="space-y-2">
                <Label>Slug (opsional)</Label>
                <Input name="slug" placeholder="ceramah-terverifikasi-..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ringkasan (excerpt)</Label>
              <textarea
                name="excerpt"
                rows={2}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Ringkasan 1–2 kalimat untuk kartu artikel."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tanggal tampil</Label>
                <Input name="date" placeholder="13 April 2026" />
              </div>
              <div className="space-y-2">
                <Label>Tanggal (ISO)</Label>
                <Input name="dateISO" placeholder="2026-04-13" />
              </div>
              <div className="space-y-2">
                <Label>Estimasi baca</Label>
                <Input name="readTime" placeholder="6 menit" defaultValue="6 menit" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Penulis</Label>
                <Input name="authorName" placeholder="Tim Humas Pesantren" defaultValue="Tim Humas Pesantren" />
              </div>
              <div className="space-y-2">
                <Label>Peran</Label>
                <Input name="authorRole" placeholder="Redaksi" defaultValue="Redaksi" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags (pisahkan dengan koma)</Label>
              <Input name="tags" placeholder="Kajian Umum, Istiqamah" />
            </div>

            <div className="rounded-3xl border bg-muted/10 p-4">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" name="verified" className="mt-1 size-4" />
                <span>
                  <span className="font-semibold">Ceramah terverifikasi</span>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Centang jika ini ringkasan ceramah/kajian yang sudah ditinjau.
                  </div>
                </span>
              </label>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Diverifikasi oleh</Label>
                  <Input name="verifiedBy" placeholder="Dewan Asatidz DQS Cemani" defaultValue="Dewan Asatidz DQS Cemani" />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal verifikasi</Label>
                  <Input name="verifiedDate" placeholder="13 April 2026" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Catatan (opsional)</Label>
                <Input name="verifiedNote" placeholder="Diringkas & ditinjau sebelum publikasi." />
              </div>
            </div>

            <ImageUploadField
              nameFile="coverFile"
              namePath="coverImage"
              defaultPath="/images/articles/ceramah-menata-hati.webp"
              label="Cover image"
              helperText="Upload cover baru, atau pakai path gambar yang sudah ada."
            />

            <div className="space-y-2">
              <Label>Konten</Label>
              <RichTextEditor
                name="contentHtml"
                defaultValue={defaultHtml}
                placeholder="Tulis artikel di sini…"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/artikel">Batal</Link>
              </Button>
              <SubmitButton className="rounded-full" pendingText="Sedang mengupload…">
                Simpan
              </SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
