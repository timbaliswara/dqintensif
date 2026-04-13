import Link from "next/link";
import { CalendarDays, Plus } from "lucide-react";

import { listAgendaEvents } from "@/lib/agenda";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · Agenda",
  robots: { index: false, follow: false },
};

export default async function AdminAgendaListPage() {
  const events = await listAgendaEvents();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">Agenda</div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Kelola agenda terdekat.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Pastikan judul jelas, tanggal benar, dan CTA mengarah ke admin/kontak.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/agenda/baru">
            <Plus className="mr-2 size-4" />
            Tambah agenda
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {events.map((e) => (
          <Card key={e.slug} className="bg-background">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {e.category}
                  </Badge>
                  <Badge variant="outline" className="rounded-full">
                    {e.audience}
                  </Badge>
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {e.start}
                </div>
              </div>
              <CardTitle className="text-base">{e.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{e.subtitle}</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm leading-7 text-muted-foreground">
                Slug: <span className="font-mono text-xs">{e.slug}</span>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/admin/agenda/${e.slug}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/agenda">Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
