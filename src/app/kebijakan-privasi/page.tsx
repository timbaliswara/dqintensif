import Link from "next/link";

import { pondok } from "@/lib/pondok-data";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi website DQS Cemani: data yang dikumpulkan, tujuan penggunaan, dan hak pengguna.",
};

export default function KebijakanPrivasiPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Kebijakan Privasi"
        title="Transparan tentang data, sederhana untuk dipahami."
        description="Halaman ini menjelaskan bagaimana kami menangani data saat Anda menghubungi admin atau mengisi form. Silakan sesuaikan jika sudah ada kebijakan resmi yayasan."
        imageSrc="/images/gallery/quran-on-shelf.webp"
        imageAlt="Ruang baca"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Data yang kami terima",
              items: [
                "Nama, nomor WhatsApp, dan pesan (saat Anda mengirim pertanyaan).",
                "Informasi teknis dasar (mis. jenis perangkat) untuk keamanan dan performa.",
              ],
            },
            {
              title: "Tujuan penggunaan",
              items: [
                "Menjawab pertanyaan PSB, kunjungan, dan info pondok.",
                "Mengirim pembaruan yang Anda minta (mis. jadwal tes/agenda).",
                "Mencegah spam/penyalahgunaan.",
              ],
            },
            {
              title: "Hak Anda",
              items: [
                "Meminta koreksi atau penghapusan data kontak Anda.",
                "Meminta klarifikasi kanal resmi dan verifikasi info.",
                "Meminta salinan percakapan yang relevan (jika diperlukan).",
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

        <div className="mt-10 rounded-3xl border bg-muted/20 p-6 text-sm leading-7 text-muted-foreground">
          <div className="font-semibold text-foreground">Kontak resmi</div>
          <div className="mt-1">
            Untuk permintaan terkait privasi, hubungi admin melalui{" "}
            <span className="font-medium text-foreground/85">
              {pondok.contact.phone}
            </span>{" "}
            atau email{" "}
            <span className="font-medium text-foreground/85">
              {pondok.contact.email}
            </span>
            .
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <Link href="/kontak">Hubungi admin</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/legal">Legal & kanal resmi</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

