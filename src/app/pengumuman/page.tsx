import Image from "next/image";
import Link from "next/link";

import { listAnnouncements } from "@/lib/announcements";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Pengumuman",
  description: "Informasi resmi dan update penting DQS Cemani.",
};

export default async function PengumumanPage() {
  const announcements = await listAnnouncements();
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pengumuman"
        title="Informasi resmi dan update penting DQS Cemani."
        description="Halaman ini berisi pengumuman PSB, jadwal layanan, kegiatan utama, dan informasi resmi lainnya. Untuk jadwal kegiatan yang akan datang, silakan lihat halaman Agenda."
        imageSrc="/images/activities/penyerahan-tahfidz-2.webp"
        imageAlt="Penyerahan tahfidz santriwati"
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-4 md:grid-cols-2">
            {announcements.map((a) => (
              <Card key={a.slug} className="overflow-hidden bg-background">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={a.coverImage}
                    alt={a.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={a.slug === announcements[0]?.slug}
                  />
                </div>
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {a.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {a.displayDate}
                  </span>
                </div>
                <CardTitle className="text-lg leading-snug">
                  <Link href={`/pengumuman/${a.slug}`} className="hover:underline">
                    {a.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {a.excerpt}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
