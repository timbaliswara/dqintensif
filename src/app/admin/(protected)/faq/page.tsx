import Link from "next/link";
import { HelpCircle, Plus } from "lucide-react";

import { listFaqItems } from "@/lib/faq";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · FAQ",
  robots: { index: false, follow: false },
};

export default async function AdminFaqListPage() {
  const items = await listFaqItems({ includeDraft: true });

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">FAQ</div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Pertanyaan yang sering ditanya.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Jawab ringkas, jelas, dan ramah calon wali santri. Hindari detail biaya/kuota
            jika belum final—arahkan ke Pengumuman resmi.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/faq/baru">
            <Plus className="mr-2 size-4" />
            Tambah FAQ
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {items.map((f) => (
          <Card key={f.id} className="bg-background">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    <HelpCircle className="mr-1 size-3.5" />
                    FAQ
                  </Badge>
                  {f.published ? (
                    <Badge variant="secondary" className="rounded-full">
                      Tayang
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full">
                      Draft
                    </Badge>
                  )}
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {f.id}
                </span>
              </div>
              <CardTitle className="text-base">{f.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm leading-7 text-muted-foreground">
                {f.answer}
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/admin/faq/${f.id}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/faq">Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

