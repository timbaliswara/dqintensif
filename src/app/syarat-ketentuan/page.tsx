import Link from "next/link";

import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat & ketentuan penggunaan website DQS Cemani dan rambu-rambu informasi PSB/pengumuman.",
};

export default function SyaratKetentuanPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Syarat & Ketentuan"
        title="Aturan singkat agar informasi tetap rapi dan aman."
        description="Syarat ini membantu mencegah miskomunikasi: apa yang resmi, apa yang bisa berubah, dan bagaimana cara verifikasi info."
        imageSrc="/images/gallery/catatan-belajar.webp"
        imageAlt="Catatan pembinaan"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Sumber informasi",
              items: [
                "Pengumuman resmi hanya dipublikasikan di halaman Pengumuman dan kanal admin resmi.",
                "Jadwal/kuota/biaya dapat berubah; pastikan konfirmasi ke admin.",
              ],
            },
            {
              title: "Penggunaan konten",
              items: [
                "Tulisan artikel bersifat edukasi umum, bukan fatwa personal.",
                "Materi boleh dibagikan dengan mencantumkan sumber dan tidak mengubah makna.",
              ],
            },
            {
              title: "Keamanan",
              items: [
                "Jangan membagikan data sensitif (NIK/KK/akta) lewat kanal yang tidak resmi.",
                "Jika menerima info meragukan, verifikasi melalui admin.",
              ],
            },
          ].map((b) => (
            <Card key={b.title} className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm leading-7 text-muted-foreground">
                {b.items.map((it) => (
                  <div key={it}>• {it}</div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link href="/pengumuman">Lihat pengumuman resmi</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/kontak">Verifikasi ke admin</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
