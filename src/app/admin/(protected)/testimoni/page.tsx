import Link from "next/link";
import { BadgeCheck, Plus, ShieldAlert } from "lucide-react";

import { listTestimonials } from "@/lib/testimonials";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · Testimoni",
  robots: { index: false, follow: false },
};

export default async function AdminTestimonialsListPage() {
  const items = await listTestimonials({ includeDraft: true });

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">Testimoni</div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Testimoni terverifikasi & berizin.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Tambahkan konteks, tahun, dan catatan izin. Gunakan inisial jika narasumber
            ingin disamarkan.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/testimoni/baru">
            <Plus className="mr-2 size-4" />
            Tambah testimoni
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <Card key={t.id} className="bg-background">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full">
                    <BadgeCheck className="mr-1 size-3.5" />
                    Terverifikasi
                  </Badge>
                  {t.published ? (
                    <Badge variant="secondary" className="rounded-full">
                      Tayang
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full">
                      Draft
                    </Badge>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldAlert className="size-3.5" />
                  <span className="font-mono text-[11px]">{t.id}</span>
                </div>
              </div>
              <CardTitle className="text-base">{t.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {t.year} · {t.context}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm leading-7 text-foreground/85">
                “{t.quote}”
              </div>
              <div className="text-xs text-muted-foreground">
                {t.relation} · Diverifikasi oleh {t.verifiedBy}
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/admin/testimoni/${t.id}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/testimoni">Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

