import Link from "next/link";
import { CalendarDays, Clock, MapPin, Tag } from "lucide-react";

import { getUpcomingEvents } from "@/lib/agenda";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { EventsJsonLd } from "@/components/seo/jsonld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Agenda",
  description:
    "Agenda terdekat DQS Cemani (Solo Raya/Surakarta): dauroh tahsin, kajian turats, open house, dan jadwal PSB.",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(d);
  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(d);
  return { day, time };
}

export default async function AgendaPage() {
  const upcoming = await getUpcomingEvents(new Date());

  return (
    <SiteShell>
      <EventsJsonLd
        title="Agenda Terdekat DQS Cemani"
        events={upcoming.slice(0, 10).map((e) => ({
          title: e.title,
          description: e.description,
          start: e.start,
          end: e.end,
          venue: e.venue,
          city: e.city,
          urlPath: "/agenda",
        }))}
      />
      <PageHero
        eyebrow="Agenda Terdekat"
        title="Kegiatan islami yang rapi, modern, dan terarah."
        description="Berikut agenda terdekat DQS Cemani: dauroh tahsin, kajian turats (bersanad), open house, workshop, dan jadwal PSB. Jadwal bersifat informatif—silakan konfirmasi ke admin."
        imageSrc="/images/activities/halaqah-muslimah.webp"
        imageAlt="Halaqah santriwati (muslimah)"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary">Daftar agenda</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Pilih kegiatan, catat tanggalnya.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Cocok untuk Anda yang mencari program tahfidz intensif Solo/Surakarta,
              pesantren putri/wanita (jika tersedia), maupun informasi PSB.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/kontak">Tanya admin</Link>
          </Button>
        </div>

        <Separator className="my-10" />

        <div className="grid gap-4">
          {upcoming.map((e) => {
            const start = formatDateTime(e.start);
            const end = e.end ? formatDateTime(e.end) : null;
            return (
              <Card key={e.slug} className="bg-background">
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {e.category}
                    </Badge>
                    <Badge className="rounded-full" variant="outline">
                      {e.audience}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{e.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">{e.subtitle}</div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-8">
                    <p className="text-sm leading-7 text-muted-foreground">
                      {e.description}
                    </p>
                    <div className="mt-4 flex flex-col gap-2 text-sm text-foreground/80 sm:flex-row sm:flex-wrap">
                      <div className="inline-flex items-center gap-2">
                        <CalendarDays className="size-4 text-primary" />
                        <span>{start.day}</span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Clock className="size-4 text-primary" />
                        <span>
                          {start.time}
                          {end ? `–${end.time}` : ""} WIB
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <MapPin className="size-4 text-primary" />
                        <span>
                          {e.venue} · {e.city}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Tag className="size-4 text-primary" />
                        <span>{e.slug}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 md:justify-self-end">
                    <Button asChild className="w-full rounded-full">
                      <Link href={e.ctaHref}>{e.ctaLabel}</Link>
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Catatan: detail (kuota, dress code, jadwal) via admin.
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
