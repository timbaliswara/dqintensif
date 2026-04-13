import Link from "next/link";
import {
  Check,
  ClipboardList,
  FileText,
  MessagesSquare,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { getUpcomingEvents } from "@/lib/agenda";
import { getPsbConfig } from "@/lib/psb-config";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "PSB",
};

export default async function PsbPage() {
  const agenda = (await getUpcomingEvents(new Date()))
    .filter((e) => ["PSB", "Kampus"].includes(e.category))
    .slice(0, 3);
  const { admission } = await getPsbConfig();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Penerimaan Santri Baru"
        title="Alur PSB yang jelas, rapi, dan mudah diikuti."
        description="Ringkasan tahapan, persyaratan, dokumen, dan jadwal terdekat. Untuk rincian biaya dan kuota, silakan verifikasi ke admin resmi agar informasinya valid."
        imageSrc="/images/campus/asrama.webp"
        imageAlt="Lingkungan asrama"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tahapan PSB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {admission.steps.map((step, idx) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <div className="text-sm leading-7 text-foreground/85">{step}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Persyaratan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {admission.requirements.map((req) => (
                <div key={req} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-accent/30 text-foreground">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-foreground/85">{req}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <Button asChild className="w-full rounded-full">
                <Link href="/kontak">Tanya admin PSB</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 rounded-3xl border bg-muted/20 p-6">
          <div className="flex items-start gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold">Catatan verifikasi</div>
              <div className="text-sm leading-7 text-muted-foreground">
                Rincian biaya, kuota, dan jadwal resmi dapat berubah. Mohon
                pastikan hanya mengambil info dari admin resmi dan halaman{" "}
                <Link href="/pengumuman" className="font-medium text-foreground hover:underline">
                  Pengumuman
                </Link>
                .
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: ClipboardList, title: "Formulir", desc: "Isi data dan pilih program." },
            { icon: FileText, title: "Berkas", desc: "Unggah KK, akta, rapor, foto." },
            { icon: MessagesSquare, title: "Wawancara", desc: "Komunikasi dan kesiapan mengikuti tata tertib." },
            { icon: Stethoscope, title: "Kesehatan", desc: "Pemeriksaan dasar dan rujukan bila perlu." },
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

        {agenda.length ? (
          <>
            <Separator className="my-12" />
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">Jadwal</div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Agenda PSB terdekat.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Jadwal berikut diambil dari halaman Agenda dan bisa berubah
                  mengikuti kuota. Untuk memastikan, silakan konfirmasi ke admin.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="rounded-full">
                    <Link href="/agenda">Lihat semua agenda</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/kontak">Konfirmasi ke admin</Link>
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 lg:col-span-7 md:grid-cols-3">
                {agenda.map((e) => {
                  const d = new Date(e.start);
                  const day = new Intl.DateTimeFormat("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    timeZone: "Asia/Jakarta",
                  }).format(d);
                  const time = new Intl.DateTimeFormat("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Jakarta",
                  }).format(d);
                  return (
                    <Card key={e.slug} className="bg-background">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base leading-snug">
                          {e.title}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {day} · {time} WIB
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm leading-7 text-muted-foreground">
                        {e.subtitle}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </section>
    </SiteShell>
  );
}
