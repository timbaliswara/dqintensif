import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

import { getSiteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function SiteFooter() {
  const { profile, contact, legal } = await getSiteConfig();
  const waNumber = contact.phone.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}`;
  const mapsHref =
    contact.mapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      contact.mapsQuery,
    )}`;
  const foundationLine = legal.foundation.length
    ? legal.foundation.map((f) => f.name).join(" · ")
    : "Di bawah naungan yayasan terkait";

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative size-10">
                <Image
                  src="/brand/logo-dq-mark.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight">
                  {profile.shortName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {profile.location}
                </div>
              </div>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              {profile.tagline}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild className="rounded-full">
                <a href={waHref} target="_blank" rel="noreferrer">
                  WhatsApp Admin
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/psb">Info PSB</Link>
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              {foundationLine}
            </div>
          </div>

          <div className="grid gap-8 md:col-span-4 md:grid-cols-2">
            <div className="grid gap-2 text-sm">
              <div className="font-semibold">Menu</div>
              <div className="grid gap-2 text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                  Beranda
                </Link>
                <Link href="/program" className="hover:text-foreground">
                  Program
                </Link>
                <Link href="/agenda" className="hover:text-foreground">
                  Agenda
                </Link>
                <Link href="/pengumuman" className="hover:text-foreground">
                  Pengumuman
                </Link>
                <Link href="/galeri" className="hover:text-foreground">
                  Galeri
                </Link>
                <Link href="/psb" className="hover:text-foreground">
                  PSB
                </Link>
                <Link href="/kontak" className="hover:text-foreground">
                  Kontak
                </Link>
              </div>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="font-semibold">Informasi</div>
              <div className="grid gap-2 text-muted-foreground">
                <Link href="/tentang" className="hover:text-foreground">
                  Tentang
                </Link>
                <Link href="/fasilitas" className="hover:text-foreground">
                  Fasilitas
                </Link>
                <Link href="/asatidz" className="hover:text-foreground">
                  Asatidz
                </Link>
                <Link href="/manajemen" className="hover:text-foreground">
                  Manajemen & Pengasuhan
                </Link>
                <Link href="/testimoni" className="hover:text-foreground">
                  Testimoni
                </Link>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
                <Link href="/artikel" className="hover:text-foreground">
                  Artikel
                </Link>
                <Link href="/legal" className="hover:text-foreground">
                  Legal & Kanal Resmi
                </Link>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Buka Maps
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 text-sm md:col-span-3">
            <div className="font-semibold">Kontak</div>
            <div className="grid gap-3 text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-foreground/70" />
                <span className="leading-6">{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-foreground/70" />
                <a href={`tel:${waNumber}`} className="hover:text-foreground">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-foreground/70" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-foreground"
                >
                  {contact.email}
                </a>
              </div>
              <div className="text-xs">Jam layanan: {contact.hours}</div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {profile.shortName}. All rights
            reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/kebijakan-privasi" className="hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-foreground">
              Syarat & Ketentuan
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-foreground">
              Robots
            </Link>
            <Link href="/pengumuman" className="hover:text-foreground">
              Pengumuman
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
