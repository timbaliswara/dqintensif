import Link from "next/link";

import { createGalleryItemAction } from "@/app/admin/(protected)/galeri/actions";
import { galleryCategories } from "@/lib/gallery";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Galeri Baru",
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

export default function AdminGalleryNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">Galeri</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah foto galeri
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Utamakan foto yang rapi dan sesuai adab (khusus muslimah/santriwati).
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form galeri</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createGalleryItemAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul / Caption</Label>
                <Input name="title" placeholder="Halaqah Tahfidz Santriwati" />
              </div>
              <div className="space-y-2">
                <Label>ID (opsional)</Label>
                <Input name="id" placeholder="halaqah-tahfidz-santriwati" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Deskripsi singkat</Label>
              <textarea
                name="description"
                rows={4}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Satu-dua kalimat yang menjelaskan konteks kegiatan / tempat."
              />
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <select
                name="category"
                defaultValue="Kampus"
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
              label="Foto galeri"
              helperText="Jika upload, file akan disimpan ke /public/uploads."
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/galeri">Batal</Link>
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

