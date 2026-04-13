import Image from "next/image";
import Link from "next/link";
import { ImageIcon, Plus } from "lucide-react";

import { listGalleryItems } from "@/lib/gallery";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · Galeri",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryListPage() {
  const items = await listGalleryItems();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">Galeri</div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Kelola foto & caption.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Gunakan foto yang rapi dan sesuai adab (khusus muslimah). Tambahkan
            deskripsi singkat agar calon wali santri lebih percaya.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/galeri/baru">
            <Plus className="mr-2 size-4" />
            Tambah foto
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((g) => (
          <Card key={g.id} className="bg-background">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl">
              <Image
                src={g.src}
                alt={g.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 512px, 100vw"
              />
            </div>
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {g.category}
                </Badge>
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <ImageIcon className="size-3.5" />
                  <span className="font-mono text-[11px]">{g.id}</span>
                </div>
              </div>
              <CardTitle className="text-base">{g.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{g.description}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm leading-7 text-muted-foreground">
                Path: <span className="font-mono text-xs">{g.src}</span>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/admin/galeri/${g.id}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/galeri">Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

