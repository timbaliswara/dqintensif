import Link from "next/link";
import { BadgeCheck, Building2, FileBadge, ShieldCheck } from "lucide-react";

import { getSiteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Legal & Profil Yayasan",
  description: "Informasi resmi DQS Cemani: naungan yayasan, kanal resmi, dan ringkasan dokumen kebijakan.",
};

export default async function LegalPage() {
  const { legal } = await getSiteConfig();
  return (
    <SiteShell>
      <PageHero
        eyebrow={legal.headline}
        title="Informasi resmi yang membuat calon santri dan wali santri lebih tenang."
        description={legal.overview}
        imageSrc="/images/campus/gerbang.webp"
        imageAlt="Gerbang pesantren"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: Building2,
              title: "Naungan & mitra",
              desc: "Keterangan yayasan yang menaungi dan mitra kerja sama pembinaan.",
            },
            {
              icon: FileBadge,
              title: "Ringkasan dokumen",
              desc: "Profil lembaga, kebijakan pengasuhan, keamanan, serta standar kesehatan.",
            },
            {
              icon: ShieldCheck,
              title: "Kanal resmi",
              desc: "Satu pintu informasi: admin resmi, email, dan halaman pengumuman.",
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
            <div className="text-sm font-semibold text-primary">Yayasan</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Naungan lembaga dan kerja sama.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Ini ringkasan yang bisa Anda lengkapi dengan data resmi (akta, SK,
              dan detail struktur) saat siap dipublikasikan.
            </p>
          </div>
          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            {legal.foundation.map((f) => (
              <Card key={f.name} className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{f.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  Peran:{" "}
                  <span className="font-medium text-foreground/85">
                    {f.role}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <div className="text-sm font-semibold text-primary">
              Dokumen ringkas
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Apa saja yang bisa diminta wali santri.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Untuk menjaga kerapian publikasi, dokumen lengkap bisa ditunjukkan
              saat kunjungan atau diminta via admin resmi.
            </p>
          </div>
          <div className="grid gap-4 lg:col-span-7">
            {legal.documents.map((d) => (
              <Card key={d.title} className="bg-background">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{d.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  {d.note}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-3 lg:col-span-5">
            <div className="text-sm font-semibold text-primary">Kanal resmi</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Satu pintu informasi.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Agar calon santri dan wali santri terhindar dari informasi yang
              tidak valid, mohon rujuk kanal di bawah ini.
            </p>
          </div>
          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            {legal.officialChannels.map((c) => (
              <Card key={c.label} className="bg-background">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{c.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck className="size-4 text-primary" />
                    <span className="font-medium text-foreground/85">
                      {c.value}
                    </span>
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link href="/kontak">Hubungi admin resmi</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/pengumuman">Lihat pengumuman</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
