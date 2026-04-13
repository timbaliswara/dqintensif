import Link from "next/link";
import { Plus } from "lucide-react";

import { listArticles } from "@/lib/articles";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Admin · Artikel",
  robots: { index: false, follow: false },
};

export default async function AdminArtikelListPage() {
  const items = await listArticles();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">Artikel</div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Kelola artikel & ceramah.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Artikel untuk masyarakat umum: ringkas, relate, dan mudah dibaca.
            Untuk “Ceramah Terverifikasi”, aktifkan tanda verifikasi.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/artikel/baru">
            <Plus className="mr-2 size-4" />
            Tambah artikel
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {items.map((a) => (
          <Card key={a.slug} className="bg-background">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {a.verification ? (
                    <Badge className="rounded-full">Terverifikasi</Badge>
                  ) : null}
                  {a.tags.slice(0, 2).map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {a.date} · {a.readTime}
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
                  <Link href={`/admin/artikel/${a.slug}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/artikel/${a.slug}`}>Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

