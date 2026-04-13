import Link from "next/link";
import { CalendarDays, FileText, HelpCircle, Images, ShieldCheck, Stamp, Tickets } from "lucide-react";

import { listAgendaEvents } from "@/lib/agenda";
import { listAnnouncements } from "@/lib/announcements";
import { listGalleryItems } from "@/lib/gallery";
import { isAdminEnvConfigured } from "@/lib/admin-auth";
import { listTestimonials } from "@/lib/testimonials";
import { listFaqItems } from "@/lib/faq";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const agenda = await listAgendaEvents();
  const announcements = await listAnnouncements();
  const gallery = await listGalleryItems();
  const testimonials = await listTestimonials({ includeDraft: true });
  const faq = await listFaqItems({ includeDraft: true });
  const configured = isAdminEnvConfigured();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-muted/20 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-primary">Dashboard</div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Kelola konten resmi dengan rapi.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Update agenda, pengumuman, dan info penting. Prioritaskan kejelasan,
              tanggal, dan sumber agar wali santri lebih percaya.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              {agenda.length} agenda
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {announcements.length} pengumuman
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {gallery.length} galeri
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {testimonials.length} testimoni
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {faq.length} FAQ
            </Badge>
            {!configured ? (
              <Badge className="rounded-full">Mode dev</Badge>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="size-5" />
            </div>
            <CardTitle className="text-base">Agenda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Kelola event mendatang: dauroh, open house, tes PSB, workshop.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/admin/agenda">Kelola agenda</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>
            <CardTitle className="text-base">Pengumuman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Kanal resmi untuk PSB, update penting, dan informasi layanan.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/admin/pengumuman">Kelola pengumuman</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-base">Keamanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Set env untuk admin: <span className="font-medium text-foreground/85">ADMIN_PASSWORD</span>{" "}
              dan <span className="font-medium text-foreground/85">ADMIN_SECRET</span>.
            </p>
            <Button asChild variant="outline" className="w-full rounded-full">
              <Link href="/legal">Lihat legal & kanal resmi</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Images className="size-5" />
            </div>
            <CardTitle className="text-base">Galeri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Upload foto kampus/kegiatan (khusus muslimah) beserta caption dan kategori.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/admin/galeri">Kelola galeri</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Stamp className="size-5" />
            </div>
            <CardTitle className="text-base">Testimoni</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Catat izin publikasi, verifikasi, dan konteks agar lebih high trust.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/admin/testimoni">Kelola testimoni</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <HelpCircle className="size-5" />
            </div>
            <CardTitle className="text-base">FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Jawaban ringkas dan ramah calon wali santri—hindari info belum final.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/admin/faq">Kelola FAQ</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardHeader className="space-y-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Tickets className="size-5" />
            </div>
            <CardTitle className="text-base">PSB</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-7 text-muted-foreground">
              Update alur dan syarat PSB agar konsisten dengan pengumuman resmi.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/admin/psb">Kelola PSB</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
