import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { ContactForm } from "@/components/landing/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Kontak",
};

export default async function KontakPage() {
  const { profile, contact } = await getSiteConfig();
  const waNumber = contact.phone.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}`;
  const mapsHref =
    contact.mapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      contact.mapsQuery,
    )}`;
  const { lat, lon } = contact.coordinates;
  const bbox = {
    left: lon - 0.01,
    bottom: lat - 0.006,
    right: lon + 0.01,
    top: lat + 0.006,
  };
  const osmEmbedHref = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    `${bbox.left},${bbox.bottom},${bbox.right},${bbox.top}`,
  )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;

  return (
    <SiteShell>
      <PageHero
        eyebrow="Kontak"
        title="Konsultasi PSB, kunjungan, dan informasi pondok."
        description="Admin siap membantu pada jam layanan. Silakan kirim pesan lewat WhatsApp melalui form berikut, atau gunakan kanal resmi di halaman Legal."
        imageSrc="/images/campus/gerbang.webp"
        imageAlt="Gerbang pesantren"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="space-y-3 lg:col-span-5">
            <div className="rounded-3xl border bg-muted/20 p-6">
              <div className="text-sm font-semibold text-primary">
                {profile.shortName}
              </div>
              <div className="mt-2 text-sm leading-7 text-muted-foreground">
                {contact.address}
              </div>
              <div className="mt-4 grid gap-1 text-sm text-muted-foreground">
                <div>Telepon/WA: {contact.phone}</div>
                <div>Email: {contact.email}</div>
                <div>Jam: {contact.hours}</div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full">
                  <a href={waHref} target="_blank" rel="noreferrer">
                    WhatsApp Admin
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <a href={mapsHref} target="_blank" rel="noreferrer">
                    Buka Maps
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border bg-primary/5 p-4 text-xs leading-6 text-muted-foreground">
              <div className="font-semibold text-foreground">Kanal resmi</div>
              <div className="mt-1">
                {contact.officialNote}
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/legal">Legal & kanal resmi</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/pengumuman">Pengumuman resmi</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Kirim pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <Card className="mt-6 overflow-hidden bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Lokasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="overflow-hidden rounded-2xl border">
                  <div className="relative aspect-[16/10] w-full">
                    <iframe
                      title={contact.mapsLabel}
                      src={osmEmbedHref}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <a href={mapsHref} target="_blank" rel="noreferrer">
                    Buka Maps
                  </a>
                </Button>
                <div className="text-xs text-muted-foreground">
                  Preview menggunakan OpenStreetMap agar bisa tampil di website.
                  Tombol “Buka Maps” akan mengarah ke Google Maps.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
