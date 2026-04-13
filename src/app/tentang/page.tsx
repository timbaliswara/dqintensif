import { BookOpen, Landmark, ShieldCheck, Sparkles } from "lucide-react";

import { pondok } from "@/lib/pondok-data";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Tentang",
};

export default function TentangPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Tentang DQS Cemani"
        title="Tahfidzul Quran intensif, holistik, dan integral."
        description="DQS Cemani adalah pondok pesantren tahfidz di wilayah Solo Raya (Surakarta & sekitarnya) yang mengintegrasikan Pendidikan Tahfidzul Quran secara intensif di bawah naungan Yayasan Daarul Quran Surakarta bekerja sama dengan Yayasan Al Hadi Mustaqim."
        imageSrc="/images/campus/gerbang.webp"
        imageAlt="Gerbang dan lingkungan pesantren"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <div className="text-sm font-semibold text-primary">Profil</div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Menjaga kemuliaan Al-Qur’an dengan pembinaan yang tertata.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              Pembinaan tahfidz di DQS Cemani dilakukan secara holistik: dari
              metode membaca, menulis, menghafal, memahami, mengamalkan, riyadhoh,
              hingga mengajarkan Al-Qur’an. Pengkajian kitab turats dibina oleh
              ust dan ustadzah bersanad.
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
              <Card key={item.title} className="bg-background">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  {Array.isArray(item.desc) ? (
                    <ol className="grid list-decimal gap-1 pl-4">
                      {item.desc.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>{item.desc}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Sparkles,
              title: "Holistik",
              desc: "Menguatkan adab, ibadah, dan karakter bersama tahfidz.",
            },
            {
              icon: BookOpen,
              title: "Metode Terarah",
              desc: "Tahsin–setoran–muroja’ah–evaluasi berjalan rapi.",
            },
            {
              icon: Landmark,
              title: "Turats Bersanad",
              desc: "Kajian kitab sebagai penjaga adab dan pemahaman.",
            },
            {
              icon: ShieldCheck,
              title: "Lingkungan Aman",
              desc: "Kegiatan tertib, pengasuhan dekat, dan kontrol akses.",
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

        <div className="rounded-3xl border bg-muted/20 p-6 sm:p-8">
          <div className="text-sm font-semibold text-primary">Lokasi</div>
          <div className="mt-2 text-xl font-semibold tracking-tight">
            {pondok.contact.address}
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Hubungi admin untuk jadwal kunjungan, informasi PSB, atau permintaan
            brosur.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
