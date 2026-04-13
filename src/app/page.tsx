import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Quote } from "lucide-react";

import { listArticles } from "@/lib/articles";
import { getUpcomingEvents } from "@/lib/agenda";
import { pondok } from "@/lib/pondok-data";
import { listTestimonials } from "@/lib/testimonials";
import { listFaqItems } from "@/lib/faq";
import { getSiteConfig } from "@/lib/site-config";
import { getPsbConfig } from "@/lib/psb-config";
import { buildCloudinaryFetchUrl, getCloudinaryCloudName } from "@/lib/cloudinary-public";
import { getSiteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/landing/site-header";
import { ProgramsTabs } from "@/components/landing/programs-tabs";
import { FacilityIcon } from "@/components/landing/lucide-icon";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { ContactForm } from "@/components/landing/contact-form";
import { SiteFooter } from "@/components/landing/site-footer";
import { Gallery } from "@/components/landing/gallery";
import { AgendaPreview } from "@/components/landing/agenda-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const agenda = (await getUpcomingEvents(new Date())).slice(0, 3);
  const articles = await listArticles();
  const testimonials = await listTestimonials();
  const faqItems = await listFaqItems();
  const { profile, contact } = await getSiteConfig();
  const { admission } = await getPsbConfig();
  const siteUrl = getSiteUrl();
  const isLocal = siteUrl.includes("localhost");
  const heroLocalPath = "/images/campus/gerbang.webp";
  const heroAlt =
    "Gerbang Pondok Pesantren Tahfizh Daarul Qur’an Takhassus Putri Surakarta";
  const cloudName = getCloudinaryCloudName();
  const heroSrc =
    !isLocal && cloudName
      ? buildCloudinaryFetchUrl({
          cloudName,
          sourceUrl: `${siteUrl}${heroLocalPath}`,
          width: 1200,
        })
      : heroLocalPath;
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader profile={profile} />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-islamic-pattern mask-fade-y opacity-70" />
          <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="space-y-6 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {admission.headline}
                  </Badge>
                  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    Update: {pondok.news[0].date}
                  </span>
                </div>

                <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Menyiapkan generasi ahli Al-Qur’an yang berdedikasi untuk
                  ummat dan bangsa.
                </h1>
                <p className="max-w-2xl text-pretty text-base leading-7 text-foreground/80 sm:text-lg">
                  {profile.name} mengintegrasikan pendidikan Tahfidzul
                  Quran secara intensif di bawah naungan Yayasan Daarul Quran
                  Surakarta (Solo) bekerja sama dengan Yayasan Al Hadi Mustaqim.
                  Jika Anda mencari pesantren tahfidz intensif di Surakarta/Solo
                  Raya, halaman ini merangkum program, fasilitas, dan info PSB.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/psb">
                      Daftar PSB
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <Link href="/kontak">Tanya Admin</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                  {pondok.stats.map((s) => (
                    <Card key={s.label} className="bg-background/60">
                      <CardContent className="p-4">
                        <div className="text-2xl font-semibold tracking-tight">
                          {s.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {s.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <Card className="overflow-hidden">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-base">
                      Pembinaan Tahfidz Intensif
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Holistik dan integral dalam menjaga kemuliaan Al-Qur’an.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="overflow-hidden rounded-2xl border bg-muted/20">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={heroSrc}
                          alt={heroAlt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 420px, 100vw"
                          priority
                          unoptimized={!isLocal}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0" />
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="secondary" className="rounded-full">
                            Solo Raya · Surakarta
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {[
                        "Metode membaca, menulis, dan menghafal yang terarah",
                        "Memahami, mengamalkan, dan riyadhoh yang terjaga",
                        "Mengajarkan Al-Qur’an dengan pembinaan berkelanjutan",
                        "Kajian kitab turats dibina ust/ustadzah bersanad",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-primary/10 text-primary">
                            <Check className="size-3.5" />
                          </span>
                          <span className="text-foreground/85">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl border bg-muted/30 p-4">
                      <div className="text-xs font-semibold text-muted-foreground">
                        Lokasi
                      </div>
                      <div className="text-sm font-medium">
                        {profile.location}
                      </div>
                      {profile.established ? (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Berdiri sejak {profile.established}
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="tentang" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">
                  Tentang Pesantren
                </div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tahfidzul Quran intensif yang holistik dan integral.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  DQS Cemani adalah pondok pesantren yang mengintegrasikan
                  pendidikan Tahfidzul Quran secara intensif di bawah naungan
                  Yayasan Daarul Quran Surakarta bekerja sama dengan Yayasan Al
                  Hadi Mustaqim dalam menyiapkan generasi ahli Al-Qur’an yang
                  dapat berdedikasi untuk ummat dan bangsa.
                </p>
              </div>

              <div className="grid items-start gap-4 lg:col-span-7 sm:grid-cols-3">
                {[
                  {
                    title: "Visi",
                    desc: "Mencetak Hamba Allah sholihah ahli Al-Qur’an berdedikasi tinggi.",
                  },
                  {
                    title: "Misi",
                    desc: [
                      "Mewujudkan pesantren yang solid dan kompetitif dalam pendidikan Al-Qur’an, Tahfidz, dan Dirosah Islamiyah berlandaskan aqidah Ahlussunnah wal Jama’ah.",
                      "Menyelenggarakan pendidikan formal dan non formal.",
                      "Menyelenggarakan kursus bahasa Arab dan baca kitab.",
                      "Membangun jaringan stakeholder dalam maupun luar negeri.",
                      "Mendorong prestasi santri dalam ilmu agama dan umum.",
                      "Menyelenggarakan kursus kemasyarakatan.",
                      "Mencintai NKRI dan dakwah rahmatan lil ‘alamin.",
                    ],
                  },
                  {
                    title: "Motto",
                    desc: "Jadikan Al-Qur’an ruh dalam segala aktivitasmu, maka kemudahan dan keberkahan menyertaimu.",
                  },
                ].map((item) => (
                  <Card key={item.title} className="bg-background self-start">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-7 text-muted-foreground">
                      {Array.isArray(item.desc) ? (
                        <>
                          <div className="max-h-64 overflow-auto pr-2 leading-6">
                            <ol className="grid list-decimal gap-1 pl-4">
                              {item.desc.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ol>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Scroll untuk melihat semua poin misi.
                          </div>
                        </>
                      ) : (
                        <p>{item.desc}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">
                  Kepercayaan
                </div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Transparan, rapi, dan mudah diverifikasi.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Agar calon santri dan wali santri lebih yakin, kami siapkan
                  halaman khusus: legal & kanal resmi, pengumuman, alur PSB, dan
                  testimoni berizin.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="rounded-full">
                    <Link href="/legal">Legal & kanal resmi</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/pengumuman">Pengumuman resmi</Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
                {[
                  {
                    title: "Legal & Profil Yayasan",
                    desc: "Ringkasan naungan yayasan, dokumen kebijakan, dan kanal resmi.",
                    href: "/legal",
                  },
                  {
                    title: "PSB Transparan",
                    desc: "Tahapan seleksi, dokumen, dan agenda PSB terdekat yang mudah diikuti.",
                    href: "/psb",
                  },
                  {
                    title: "Testimoni Terverifikasi",
                    desc: "Cerita wali santri/alumni dengan catatan verifikasi & izin publikasi.",
                    href: "/testimoni",
                  },
                  {
                    title: "Kontak Resmi",
                    desc: "Satu pintu informasi agar terhindar dari info yang tidak valid.",
                    href: "/kontak",
                  },
                ].map((item) => (
                  <Card key={item.title} className="bg-background">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm leading-7 text-muted-foreground">
                        {item.desc}
                      </div>
                      <Button asChild variant="outline" className="rounded-full">
                        <Link href={item.href}>
                          Buka
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">Program</div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Program pembinaan yang fokus dan terarah.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Tahfidz intensif, kajian kitab turats (bersanad), serta
                  pembinaan holistik agar santri siap menjaga, mengamalkan, dan
                  mengajarkan Al-Qur’an.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ProgramsTabs programs={pondok.programs} />
              </div>
            </div>
          </div>
        </section>

        <section id="fasilitas" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-primary">Fasilitas</div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Lingkungan rapi, aman, dan mendukung belajar.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Fasilitas kami dirancang untuk membuat santri nyaman beribadah,
                belajar, dan tumbuh mandiri.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pondok.facilities.map((f) => (
                <Card key={f.title} className="bg-background">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <FacilityIcon name={f.icon} />
                      </span>
                      <CardTitle className="text-base">{f.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-muted-foreground">
                    {f.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-primary">Galeri</div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Suasana kegiatan dan lingkungan pesantren.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Saat ini galeri menggunakan foto demo berkualitas (bukan foto
                asli DQS Cemani). Kami bisa ganti dengan foto asli kapan saja.
              </p>
            </div>

            <Gallery />

            <div className="mt-6 flex justify-end">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/galeri">Lihat galeri lengkap</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary">
                  Agenda Terdekat
                </div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Kegiatan islami yang modern dan terarah.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Dauroh tahsin, kajian turats, open house, dan jadwal PSB. Silakan
                  konfirmasi detail ke admin.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/agenda">Lihat semua agenda</Link>
              </Button>
            </div>

            <AgendaPreview events={agenda} />
          </div>
        </section>

        <section id="asatidz" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">Asatidz</div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Pengasuhan dekat, keteladanan nyata.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Tim pembina dan asatidz mendampingi santri dalam belajar,
                  ibadah, adab, dan keseharian di asrama.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="rounded-full">
                    <Link href="/asatidz">Lihat profil asatidz</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/legal">Legal & kanal resmi</Link>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
                {pondok.teachers.slice(0, 2).map((t) => (
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
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-base">{t.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </CardHeader>
                    <CardContent className="text-sm leading-7 text-muted-foreground">
                      {t.bio}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="testimoni" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-primary">Testimoni</div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Kepercayaan orang tua dan alumni.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Sebagian pengalaman yang sering kami dengar dari wali santri dan
                alumni.
              </p>
              <div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/testimoni">Baca testimoni terverifikasi</Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.id} className="bg-background">
                  <CardHeader className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Quote className="size-4 text-primary" />
                      {t.name}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {t.relation}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm leading-7 text-foreground/80">
                      “{t.quote}”
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Diverifikasi {t.year} · {t.verifiedBy}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="psb" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">PSB</div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Alur pendaftaran yang jelas dan rapi.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Kuota terbatas. Pastikan berkas lengkap dan ikuti jadwal tes.
                  Admin akan membantu jika ada kendala.
                </p>
              </div>

              <div className="grid gap-4 lg:col-span-7 md:grid-cols-2">
                <Card className="bg-background">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Tahapan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {admission.steps.map((step, idx) => (
                      <div key={step} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                          {idx + 1}
                        </span>
                        <div className="text-sm leading-7 text-foreground/85">
                          {step}
                        </div>
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
                      <Link href="/kontak">Minta panduan PSB</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-primary">
                  Pengumuman Terbaru
                </div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Informasi resmi dan update penting DQS Cemani.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Bagian ini khusus pengumuman/berita. Untuk jadwal kegiatan yang
                  akan datang (dauroh, open house, workshop, tes PSB), silakan lihat
                  halaman Agenda.
                </p>
              </div>
              <div className="hidden gap-2 sm:flex">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/agenda">Lihat agenda</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/artikel">Baca artikel</Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {pondok.news.map((n) => (
                <Card key={n.title} className="bg-background">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        {n.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {n.date}
                      </span>
                    </div>
                    <CardTitle className="text-base">{n.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-7 text-muted-foreground">
                    {n.excerpt}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Lihat pengumuman lengkap beserta detailnya.
              </p>
              <Button asChild className="rounded-full">
                <Link href="/pengumuman">Lihat semua pengumuman</Link>
              </Button>
            </div>

            <div className="mt-10 rounded-3xl border bg-muted/20 p-6 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-primary">
                    Artikel
                  </div>
                  <div className="text-xl font-semibold tracking-tight">
                    Baca tulisan tarbiyah dan catatan pesantren.
                  </div>
                </div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/artikel">Lihat semua artikel</Link>
                </Button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {articles.slice(0, 3).map((a) => (
                  <Card key={a.slug} className="overflow-hidden bg-background">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={a.coverImage}
                        alt={a.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                    <CardHeader className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant="secondary"
                          className="rounded-full"
                        >
                          {a.tags[0]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {a.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-base leading-snug">
                        <Link
                          href={`/artikel/${a.slug}`}
                          className="hover:underline"
                        >
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
            </div>
          </div>
        </section>

        <section id="faq" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">FAQ</div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Pertanyaan yang sering ditanyakan.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Jika pertanyaan Anda tidak ada di sini, silakan hubungi admin.
                </p>
              </div>
              <div className="lg:col-span-7">
                      <FaqAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </section>

        <section id="kontak" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="space-y-3 lg:col-span-5">
                <div className="text-sm font-semibold text-primary">Kontak</div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Konsultasi PSB, kunjungan, dan informasi pondok.
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Admin siap membantu pada jam layanan. Anda juga bisa kirim
                  pesan lewat WhatsApp via form di samping.
                </p>

                <div className="rounded-2xl border bg-muted/30 p-5 text-sm">
                  <div className="font-semibold">{profile.shortName}</div>
                  <div className="mt-2 text-muted-foreground">
                    {contact.address}
                  </div>
                  <div className="mt-3 grid gap-1 text-muted-foreground">
                    <div>
                      Telepon/WA:{" "}
                      {(contact.whatsappNumbers?.length
                        ? contact.whatsappNumbers
                        : [contact.phone]
                      ).join(" · ")}
                    </div>
                    <div>Email: {contact.email}</div>
                    <div>Jam: {contact.hours}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="bg-background">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Kirim pesan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactForm
                      whatsappNumbers={
                        contact.whatsappNumbers?.length
                          ? contact.whatsappNumbers
                          : [contact.phone]
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
