import Link from "next/link";
import { Plus } from "lucide-react";

import { listAnnouncements } from "@/lib/announcements";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · Pengumuman",
  robots: { index: false, follow: false },
};

export default async function AdminPengumumanListPage() {
  const items = await listAnnouncements();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">Pengumuman</div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Kanal resmi & update penting.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Gunakan judul yang jelas, tanggal publikasi yang benar, dan catatan
            konfirmasi ke admin bila ada perubahan.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/pengumuman/baru">
            <Plus className="mr-2 size-4" />
            Tambah pengumuman
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {items.map((a) => (
          <Card key={a.slug} className="bg-background">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {a.tag}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {a.displayDate}
                </div>
              </div>
              <CardTitle className="text-base">{a.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{a.excerpt}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm leading-7 text-muted-foreground">
                Slug: <span className="font-mono text-xs">{a.slug}</span>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/admin/pengumuman/${a.slug}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/pengumuman/${a.slug}`}>Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
