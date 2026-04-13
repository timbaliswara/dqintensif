import { pondok } from "@/lib/pondok-data";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { FacilityIcon } from "@/components/landing/lucide-icon";
import { Gallery } from "@/components/landing/gallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Fasilitas",
};

export default function FasilitasPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Fasilitas"
        title="Lingkungan yang rapi, aman, dan mendukung pembinaan."
        description="Fasilitas dirancang untuk menunjang ibadah, belajar, dan pembinaan harian. Galeri di bawah menggunakan foto demo (bukan foto asli DQS Cemani) dan bisa diganti kapan saja."
        imageSrc="/images/campus/masjid.webp"
        imageAlt="Bangunan masjid"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <Separator className="my-12" />

        <div className="text-sm font-semibold text-primary">Galeri</div>
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Suasana kegiatan dan lingkungan.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          Anda bisa ganti seluruh gambar di folder `public/images/*` dengan foto
          asli DQS Cemani.
        </p>
        <Gallery />
      </section>
    </SiteShell>
  );
}

