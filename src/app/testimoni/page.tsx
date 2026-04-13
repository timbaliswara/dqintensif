import Link from "next/link";
import { BadgeCheck, Quote } from "lucide-react";

import { listTestimonials } from "@/lib/testimonials";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Testimoni",
  description: "Testimoni wali santri dan alumni DQS Cemani (dummy) dengan catatan verifikasi dan izin publikasi.",
};

export default async function TestimoniPage() {
  const testimonials = await listTestimonials();
  return (
    <SiteShell>
      <PageHero
        eyebrow="Testimoni"
        title="Cerita yang bisa diverifikasi, ditulis dengan adab."
        description="Kami menampilkan testimoni secara bertanggung jawab: ada konteks, ada catatan verifikasi, dan ada izin publikasi. Data di halaman ini masih contoh dan bisa diganti dengan testimoni asli."
        imageSrc="/images/articles/ceramah-menata-hati.webp"
        imageAlt="Ilustrasi kajian"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Terverifikasi",
              desc: "Setiap testimoni dicatat siapa yang memverifikasi (admin/pembina) dan tahun publikasi.",
            },
            {
              title: "Berizin",
              desc: "Nama bisa ditulis inisial sesuai permintaan. Detail pribadi dapat disamarkan.",
            },
            {
              title: "Ber-konteks",
              desc: "Kami tidak menjanjikan hasil seragam. Perkembangan bergantung pada usaha dan izin Allah.",
            },
          ].map((b) => (
            <Card key={b.title} className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {b.desc}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.id} className="bg-background">
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full">
                    <BadgeCheck className="mr-1 size-3.5" />
                    Terverifikasi
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {t.year} · {t.context}
                  </span>
                </div>
                <CardTitle className="text-base">{t.name}</CardTitle>
                <div className="text-sm text-muted-foreground">{t.relation}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm leading-7 text-foreground/85">
                  <Quote className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>“{t.quote}”</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Diverifikasi oleh {t.verifiedBy} · {t.consentNote}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link href="/psb">Lihat alur PSB</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/kontak">Tanya admin</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
