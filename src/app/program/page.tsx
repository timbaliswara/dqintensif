import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Languages,
  Layers,
  ListChecks,
  NotebookPen,
  ScrollText,
  TrendingUp,
} from "lucide-react";

import { pondok } from "@/lib/pondok-data";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { ProgramsTabs } from "@/components/landing/programs-tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Program",
};

export default function ProgramPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Program"
        title="Pembinaan tahfidz yang konsisten, terukur, dan beradab."
        description="Program tahfidz intensif DQS Cemani (Solo/Surakarta) berfokus pada tahsin, setoran, muroja’ah, evaluasi, pengkajian kitab turats (bersanad), serta pembinaan holistik agar santri siap menjaga, mengamalkan, dan mengajarkan Al-Qur’an."
        imageSrc="/images/activities/tahfizh.webp"
        imageAlt="Kegiatan tahfidz dan halaqah"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-4 lg:col-span-4">
            <div className="text-sm font-semibold text-primary">Ringkasan</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Jalur pembinaan yang jelas dari dasar hingga 30 juz.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Program disusun bertahap untuk tingkat SMP dan pasca SLTA, dengan
              target bacaan fasih sesuai kaidah tajwid (tartil) dan tahfidz 30
              juz. Metode tahfidz menggunakan <span className="font-medium text-foreground/85">Fami Bisyauqin</span>.
            </p>

            <div className="rounded-3xl border bg-muted/20 p-5">
              <div className="text-sm font-semibold">Di halaman ini</div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {[
                  { label: "Program Tahfidz", href: "#tahfidz" },
                  { label: "Jalur I’dad (6 bulan)", href: "#idad" },
                  { label: "Pendidikan Khusus (PK)", href: "#pk" },
                  { label: "Sanad & Syahadah", href: "#sanad" },
                  { label: "Program SMP", href: "#smp" },
                  { label: "Dirosah Islamiyah", href: "#dirosah" },
                  { label: "Program Bahasa Arab", href: "#arab" },
                ].map((it) => (
                  <a key={it.href} href={it.href} className="hover:text-foreground">
                    {it.label}
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full rounded-full">
                  <Link href="/kontak">Tanya admin program</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-primary">Inti Program</div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Tahfidz intensif dengan pendampingan halaqah.
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Santri dibina dari dasar: tahsin, setoran, muroja’ah, hingga evaluasi.
                Target disesuaikan kemampuan agar istiqamah terjaga.
              </p>
            </div>
            <div className="mt-6">
              <ProgramsTabs programs={pondok.programs} />
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Layers,
              title: "Tahsin",
              desc: "Makharij dan tajwid diperbaiki secara bertahap.",
            },
            {
              icon: TrendingUp,
              title: "Setoran",
              desc: "Ziyadah harian dengan monitoring musyrif.",
            },
            {
              icon: CheckCircle2,
              title: "Muroja’ah",
              desc: "Penguatan hafalan lama agar stabil dan rapi.",
            },
            {
              icon: Clock,
              title: "Evaluasi",
              desc: "Perbaikan kesalahan dan target pekanan yang jelas.",
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contoh ritme harian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-7 text-muted-foreground">
              {[
                "Tahsin/tajwid (penguatan bacaan)",
                "2× setoran ziyadah",
                "2× muroja’ah",
                "Baca bersama 5 juz (program tertentu)",
                "Evaluasi rutin dan juziyah",
              ].map((it) => (
                <div key={it}>• {it}</div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Target & capaian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-7 text-muted-foreground">
              {[
                "Bacaan fasih sesuai kaidah tajwid, tartil",
                "Hafal 30 juz dengan sistem juziyah dan evaluasi",
                "Tasmi’ kubro (30 juz sekali duduk) untuk sanad",
                "Bekal mengajar Al-Qur’an dan pengabdian di masyarakat",
              ].map((it) => (
                <div key={it}>• {it}</div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        <div id="tahfidz" className="scroll-mt-24">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-primary">Program Tahfidz</div>
              <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Intensif untuk SMP dan pasca SLTA.
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                DQS Cemani mempunyai program intensif Tahfidzul Quran untuk tingkat
                SMP dan pasca SLTA dengan target bacaan fasih sesuai kaidah tajwid
                (tartil) dan hafal 30 juz dengan metode Fami Bisyauqin, dalam
                peningkatan kuantitas dan kualitas bacaan serta hafalan Al-Qur’an.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="rounded-full">
                Tahfidz Intensif
              </Badge>
              <Badge variant="outline" className="rounded-full">
                Solo Raya
              </Badge>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: NotebookPen,
                title: "Baca & Tulis",
                desc: "Pembinaan metode membaca dan literasi Al-Qur’an (imla’).",
              },
              {
                icon: ListChecks,
                title: "Hafal & Juziyah",
                desc: "Ziyadah, muroja’ah, dan ujian bertahap per kelipatan juz.",
              },
              {
                icon: BadgeCheck,
                title: "Sanad & Syahadah",
                desc: "Sanad tahfidz bagi yang mengikuti tasmi’ kubro dan lulus.",
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

          <div className="mt-8 rounded-3xl border bg-muted/20 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary">
                  Daurah / Tahfidz Camp
                </div>
                <div className="text-xl font-semibold tracking-tight">
                  Setiap awal semester untuk pemetaan dan penguatan.
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  DQS Cemani mengadakan daurah/tahfidz camp setiap awal semester.
                  Setelah tahap kualifikasi, santri dibagi menjadi dua kelas:
                  <span className="font-medium text-foreground/85"> I’dad</span> dan{" "}
                  <span className="font-medium text-foreground/85">Pendidikan Khusus (PK)</span>.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/agenda">Lihat agenda terdekat</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-5">
            <div className="text-sm font-semibold text-primary">Jalur Tahfidz</div>
            <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              I’dad dan PK: sesuai kualifikasi bacaan & hafalan.
            </h3>
            <p className="text-sm leading-7 text-muted-foreground">
              Jalur ditentukan setelah kualifikasi awal. Setiap capaian diujikan
              dan dapat diberikan sertifikat.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Tabs defaultValue="idad" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="idad">I’dad</TabsTrigger>
                <TabsTrigger value="pk">PK</TabsTrigger>
              </TabsList>

              <TabsContent value="idad" className="mt-6">
                <Card className="bg-background">
                  <CardHeader className="space-y-1">
                    <CardTitle id="idad" className="scroll-mt-24 text-base">
                      Jalur I’dad (6 bulan)
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Kelas persiapan untuk penguatan bacaan dan fondasi hafalan.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">1.</span>
                      <span>Metode baca Al-Qur’an kaidah DaQu dan Ummi.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">2.</span>
                      <span>Khatam binnadzor.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">3.</span>
                      <span>
                        Surat pilihan: Al-Kahfi, As-Sajdah, Yasin, Ad-Dukhan,
                        At-Tabarak, serta target tambahan 2 juz.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">4.</span>
                      <span>Literasi Al-Qur’an / imla’.</span>
                    </div>
                    <Separator />
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="size-4 text-primary" />
                      Semua pencapaian diuji di akhir semester dan dapat diberikan sertifikat.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pk" className="mt-6">
                <Card className="bg-background">
                  <CardHeader className="space-y-1">
                    <CardTitle id="pk" className="scroll-mt-24 text-base">
                      Pendidikan Khusus (PK)
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Untuk santri yang memenuhi kualifikasi bacaan dan hafalan istimewa.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                    <div className="rounded-2xl border bg-muted/20 p-4">
                      <div className="text-sm font-semibold text-foreground/85">
                        Disiplin harian
                      </div>
                      <div className="mt-2 grid gap-2">
                        {[
                          "2× setoran ziyadah per hari",
                          "2× muroja’ah per hari",
                          "Baca bersama 5 juz per hari",
                        ].map((it) => (
                          <div key={it} className="flex items-start gap-2">
                            <span className="mt-0.5 text-primary">•</span>
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      {[
                        "Target minimal tambah hafalan 1 juz per bulan (di-juziyahkan).",
                        "Setiap 4 bulan: khomsiah.",
                        "Setiap tahun: target 15 juz.",
                        "Dengan sistem ini diharapkan 30 juz selesai ±2 tahun, dilanjut 6 bulan persiapan tasmi’ kubro (30 juz sekali duduk/gelondongan).",
                      ].map((it) => (
                        <div key={it} className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">•</span>
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Separator className="my-12" />

        <div id="sanad" className="scroll-mt-24">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary">Sanad & Sertifikasi</div>
            <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Sanad tahfidz, syahadah, dan standar pengajar.
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Sanad tahfidz diberikan kepada santri yang mengikuti tasmi’ kubro.
              Syahadah tahfidz diberikan kepada santri yang lulus ujian kelipatan
              10 juz. Bagi yang sudah punya hafalan dapat mengikuti tabarrukan
              (minimal setoran selama satu tahun).
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: "Sanad Tahfidz",
                desc: "Bagi santri yang mengikuti tasmi’ kubro (30 juz sekali duduk).",
              },
              {
                icon: ScrollText,
                title: "Syahadah Tahfidz",
                desc: "Untuk santri yang lulus ujian kelipatan 10 juz.",
              },
              {
                icon: GraduationCap,
                title: "Standar Pengajar",
                desc: "Muhafidzah yang ingin mengajar lulus tes baca tingkat wustho dan sertifikasi metode Ummi.",
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

          <div className="mt-8 rounded-3xl border bg-muted/20 p-6 sm:p-8">
            <div className="text-sm font-semibold text-primary">Pengabdian</div>
            <div className="mt-2 text-xl font-semibold tracking-tight">
              Training dakwah dan riyadhoh Al-Qur’an
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              Santri yang sudah menyelesaikan hafalan dan masih aktif di pondok dapat
              mengikuti training berdakwah: mengisi kajian tafsir, sima’an, mengajar
              Al-Qur’an di masyarakat sekitar ponpes, serta melaksanakan riyadhoh
              Al-Qur’an.
            </p>
          </div>
        </div>

        <Separator className="my-12" />

        <div id="smp" className="scroll-mt-24">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary">Program SMP</div>
            <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Sekolah formal + pondok fokus ilmu Al-Qur’an dan agama.
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Sekolah Al-Qur’an di SMP Daarul Quran Cemani menginduk ke sekolah
              SMP Sains DQS Colomadu terakreditasi A, mengacu kurikulum Diknas,
              sementara pondok pesantren konsen pada ilmu Al-Qur’an dan agama.
              Program ditempuh selama 3 tahun.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Kompetensi & capaian</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm leading-7 text-muted-foreground">
                {[
                  "Lulus ujian akhir/ujian nasional SMP dan mendapatkan ijazah formal.",
                  "Hafal Al-Qur’an 30 juz dan wisuda.",
                  "Kompeten ilmu agama, bahasa Arab, dan baca kitab; mendapatkan ijazah Diniyah Takmiliyah Wustho.",
                  "Hafal praktik shalat tingkat Ula (bersertifikat).",
                  "Lulus baca Al-Qur’an tingkat Sufla (bersertifikat).",
                  "Life skill: tata boga, desain grafis, menjahit, dan lainnya.",
                ].map((it) => (
                  <div key={it} className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">•</span>
                    <span>{it}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Catatan</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                Detail teknis (jadwal, mapping kurikulum, kuota, biaya) dapat
                berubah mengikuti kebijakan sekolah/pondok. Silakan hubungi admin
                untuk info terbaru.
                <div className="mt-4">
                  <Button asChild className="rounded-full">
                    <Link href="/kontak">Hubungi admin</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        <div id="dirosah" className="scroll-mt-24">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary">Dirosah Islamiyah</div>
            <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Diniyah wustho & tarbiyatul mu’allimat (pasca SLTA).
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Dirosah Islamiyah terbagi menjadi dua jalur, mengacu kurikulum
              pesantren salaf berbasis kitab kuning dan adab.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="bg-background">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <ScrollText className="size-5" />
                  </span>
                  <div>
                    <CardTitle className="text-base">Diniyah Takmiliyah (Wustho)</CardTitle>
                    <div className="text-sm text-muted-foreground">Untuk santri tingkat SMP/SMA</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                Materi: fiqih, aqidah, akhlaq, siroh, bahasa Arab, nahwu, sorof,
                balaghah, ushul fiqih, qawaid fiqh, mantiq, dan lainnya.
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="size-5" />
                  </span>
                  <div>
                    <CardTitle className="text-base">Tarbiyatul Mu’allimat</CardTitle>
                    <div className="text-sm text-muted-foreground">Dirosah pasca SLTA</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                Mengkaji kitab turats: tafsir Al-Qur’an, aqidah, fiqih, tasawuf,
                hadits, dan bahasa Arab. Santri yang sambil kuliah dapat mengikuti
                kajian dirosah pekanan.
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-3xl border bg-muted/20 p-6 sm:p-8">
            <div className="text-sm font-semibold text-primary">
              Daurah/Kursus Penguatan
            </div>
            <div className="mt-2 text-xl font-semibold tracking-tight">
              Program pendukung yang aplikatif.
            </div>
            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="a">
                  <AccordionTrigger>Daftar daurah/kursus (contoh)</AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-muted-foreground">
                    <div className="grid gap-2">
                      {[
                        "Metode baca kitab Al-Miftah",
                        "Kursus haid",
                        "Kursus tajhizul mayyit",
                        "Fiqih zakat",
                        "Manasik",
                        "Kursus faraidh, dan lain-lain",
                      ].map((it) => (
                        <div key={it} className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">•</span>
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div id="arab" className="scroll-mt-24">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary">Program Bahasa Arab</div>
            <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Kursus 3 semester, mengacu kurikulum Gontor & LPBA Sidogiri.
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Kursus dikelola oleh pengurus bagian bahasa Arab. Tahun pertama fokus
              mufrodat harian (af’al dan asma’) dan durusul lughah. Tahun kedua dan
              ketiga mempelajari kurikulum secara utuh.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Languages,
                title: "Aktif berbicara",
                desc: "Pembiasaan dialog dan penggunaan bahasa dalam keseharian.",
              },
              {
                icon: NotebookPen,
                title: "Baca & tulis",
                desc: "Latihan membaca, menulis, dan struktur dasar bahasa.",
              },
              {
                icon: GraduationCap,
                title: "Sertifikat mustawa",
                desc: "Santri yang lulus kursus mendapatkan sertifikat sesuai level.",
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

          <div className="mt-8 rounded-3xl border bg-muted/20 p-6 sm:p-8">
            <div className="text-sm font-semibold text-primary">Kelanjutan studi</div>
            <div className="mt-2 text-xl font-semibold tracking-tight">
              Persiapan beasiswa Sastra Arab
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              Bagi santri yang akan melanjutkan kuliah S1 Sastra Arab, dapat
              diarahkan untuk peluang beasiswa setelah semester 3 di Ma’had Ali
              Ta’mirul Islam (sesuai ketentuan yang berlaku).
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
