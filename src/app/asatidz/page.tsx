import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, HandHeart, Users, Waves } from "lucide-react";

import { pondok } from "@/lib/pondok-data";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Asatidz",
};

export default function AsatidzPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Asatidz & Pengasuhan"
        title="Pembina hadir dekat: menuntun, mencontohkan, dan menjaga adab."
        description="Pembinaan berjalan melalui halaqah, pengasuhan asrama, dan kajian turats yang dibina ust dan ustadzah bersanad. Fokusnya bukan hanya hasil, tetapi juga adab, ketenangan, dan istiqamah."
        imageSrc={[
          "/images/placeholders/ustadzah.svg",
          "/images/activities/halaqah-muslimah.webp",
        ]}
        imageAlt={[
          "Placeholder foto ustadzah",
          "Halaqah santriwati",
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Halaqah kecil",
              desc: "Pendampingan lebih fokus untuk setoran, muroja’ah, dan evaluasi.",
            },
            {
              icon: HandHeart,
              title: "Pengasuhan asrama",
              desc: "Rutinitas harian tertib: ibadah, kebersihan, belajar, dan istirahat.",
            },
            {
              icon: Waves,
              title: "Keteladanan",
              desc: "Pembina berupaya hadir sebagai teladan adab dalam majelis ilmu dan keseharian.",
            },
          ].map((f) => (
            <Card key={f.title} className="bg-background">
              <CardHeader className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <div className="text-sm font-semibold text-primary">Daftar Pembina</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Tim asatidz dan pembina.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Profil singkat pembina untuk membantu wali santri mengenal pola
              pendampingan: halaqah, pengasuhan asrama, tahsin, dan kajian.
            </p>
            <div className="mt-4 rounded-2xl border bg-muted/20 p-4 text-xs leading-6 text-muted-foreground">
              Catatan: foto pada kartu pembina di halaman demo ini merupakan
              ilustrasi suasana pembinaan (bukan foto asli personal). Anda bisa
              mengganti dengan foto resmi pembina saat siap dipublikasikan.
            </div>
          </div>
          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            {pondok.teachers.map((t) => (
              <Card key={t.name} className="bg-background">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={t.photo}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full">
                      <BadgeCheck className="mr-1 size-3.5" />
                      Pembina
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {t.focus}
                    </span>
                  </div>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {t.bio}
                  </p>
                  {t.credentials?.length ? (
                    <ul className="grid gap-1 text-sm leading-7 text-muted-foreground">
                      {t.credentials.slice(0, 3).map((c) => (
                        <li key={c}>• {c}</li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link href="/legal">Legal & kanal resmi</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/kontak">Tanya admin</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
