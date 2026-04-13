import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteArticleAction, updateArticleAction } from "@/app/admin/(protected)/artikel/actions";
import { listArticles } from "@/lib/articles";
import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminFormDraft } from "@/components/admin/form-draft";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit Artikel",
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

export default async function AdminArtikelEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await listArticles();
  const item = items.find((a) => a.slug === slug);
  if (!item) notFound();

  const tags = item.tags.join(", ");
  const verified = Boolean(item.verification);
  const draftKey = `admin-artikel:${item.slug}`;

  return (
    <div className="space-y-6">
      <AdminNotice />
      <AdminFormDraft draftKey={draftKey} />
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">Artikel</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit artikel
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Perubahan akan tampil di halaman publik setelah disimpan.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            action={updateArticleAction}
            className="grid gap-5"
            data-draft-key={draftKey}
          >
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
                <Input name="date" defaultValue={item.date} />
              </div>
              <div className="space-y-2">
                <Label>Tanggal (ISO)</Label>
                <Input name="dateISO" defaultValue={item.dateISO} />
              </div>
              <div className="space-y-2">
                <Label>Estimasi baca</Label>
                <Input name="readTime" defaultValue={item.readTime} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Penulis</Label>
                <Input name="authorName" defaultValue={item.author.name} />
              </div>
              <div className="space-y-2">
                <Label>Peran</Label>
                <Input name="authorRole" defaultValue={item.author.role} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags (pisahkan dengan koma)</Label>
              <Input name="tags" defaultValue={tags} />
            </div>

            <div className="rounded-3xl border bg-muted/10 p-4">
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="verified"
                  defaultChecked={verified}
                  className="mt-1 size-4"
                />
                <span>
                  <span className="font-semibold">Ceramah terverifikasi</span>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Aktifkan jika ini ringkasan ceramah/kajian yang sudah ditinjau.
                  </div>
                </span>
              </label>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Diverifikasi oleh</Label>
                  <Input
                    name="verifiedBy"
                    defaultValue={item.verification?.by ?? "Dewan Asatidz DQS Cemani"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal verifikasi</Label>
                  <Input name="verifiedDate" defaultValue={item.verification?.date} />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Catatan (opsional)</Label>
                <Input name="verifiedNote" defaultValue={item.verification?.note} />
              </div>
            </div>

            <ImageUploadField
              nameFile="coverFile"
              namePath="coverImage"
              defaultPath={item.coverImage}
              label="Cover image"
              helperText="Jika upload file, cover akan otomatis diganti. Kalau tidak, pakai path yang ada."
              draftKey={draftKey}
            />

            <div className="space-y-2">
              <Label>Konten</Label>
              <RichTextEditor
                name="contentHtml"
                defaultValue={item.contentHtml}
                placeholder="Tulis artikel di sini…"
                draftKey={draftKey}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/artikel">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/artikel/${item.slug}`}>Preview publik</Link>
                </Button>
                <SubmitButton className="rounded-full" pendingText="Sedang mengupload…">
                  Simpan perubahan
                </SubmitButton>
              </div>
            </div>
          </form>

          <form action={deleteArticleAction}>
            <input type="hidden" name="slug" value={item.slug} />
            <SubmitButton
              variant="destructive"
              className="rounded-full"
              pendingText="Menghapus…"
            >
              Hapus artikel
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
