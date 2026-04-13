import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteGalleryItemAction, updateGalleryItemAction } from "@/app/admin/(protected)/galeri/actions";
import { galleryCategories, listGalleryItems } from "@/lib/gallery";
import { AdminNotice } from "@/components/admin/admin-notice";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit Galeri",
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

export default async function AdminGalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const items = await listGalleryItems();
  const item = items.find((g) => g.id === id);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">Galeri</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit foto galeri
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Pastikan caption jelas dan fotonya sesuai adab (khusus muslimah).
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={updateGalleryItemAction} className="grid gap-5">
            <input type="hidden" name="currentId" value={item.id} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul / Caption</Label>
                <Input name="title" defaultValue={item.title} />
              </div>
              <div className="space-y-2">
                <Label>ID</Label>
                <Input name="id" defaultValue={item.id} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Deskripsi singkat</Label>
              <textarea
                name="description"
                rows={4}
                defaultValue={item.description}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <select
                name="category"
                defaultValue={item.category}
                className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {galleryCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <ImageUploadField
              nameFile="file"
              namePath="src"
              defaultPath={item.src}
              label="Foto galeri"
              helperText="Upload untuk mengganti gambar, atau pakai path untuk mengambil dari /public/images."
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/galeri">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/galeri">Preview publik</Link>
                </Button>
                <Button type="submit" className="rounded-full">
                  Simpan perubahan
                </Button>
              </div>
            </div>
          </form>

          <form action={deleteGalleryItemAction}>
            <input type="hidden" name="id" value={item.id} />
            <Button type="submit" variant="destructive" className="rounded-full">
              Hapus foto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

