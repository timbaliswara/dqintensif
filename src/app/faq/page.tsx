import { listFaqItems } from "@/lib/faq";
import { getSiteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { FaqAccordion } from "@/components/landing/faq-accordion";
import { FaqJsonLd } from "@/components/seo/jsonld";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "FAQ",
};

export default async function FaqPage() {
  const base = await listFaqItems();
  const { contact } = await getSiteConfig();
  const items: readonly { question: string; answer: string }[] = [
    ...base,
    {
      question: "Apakah DQS Cemani bagian dari Daarul Qur’an Solo/Surakarta?",
      answer:
        "DQS Cemani berada di bawah naungan Yayasan Daarul Quran Surakarta dan bekerja sama dengan Yayasan Al Hadi Mustaqim dalam pembinaan tahfidz intensif secara holistik dan integral.",
    },
    {
      question:
        "Apakah ada program putri/wanita (pondok wanita/pondok santriwati) di Solo?",
      answer:
        "Ya. DQS Cemani adalah pondok pesantren khusus muslimah (santriwati) di area Solo Raya. Untuk detail jenjang, kuota, dan jadwal PSB, silakan konfirmasi ke admin resmi.",
    },
    {
      question: "Apakah menerima santri mahasiswa (pesantren mahasiswa Solo)?",
      answer:
        "Informasi program untuk mahasiswa mengikuti ketentuan PSB dan kebijakan pembinaan. Silakan hubungi admin untuk detail kuota, jadwal, dan persyaratan.",
    },
    {
      question: "Bagaimana memilih pesantren tahfidz terbaik di Surakarta?",
      answer:
        "Pertimbangkan manhaj pembinaan, kualitas tahsin/tajwid, pendampingan halaqah, kedisiplinan harian, keamanan, serta komunikasi dengan wali. Anda juga bisa jadwalkan kunjungan untuk melihat suasana pembinaan.",
    },
  ];

  return (
    <SiteShell>
      <FaqJsonLd title="FAQ DQS Cemani" items={items} />
      <PageHero
        eyebrow="FAQ"
        title="Pertanyaan yang sering ditanyakan."
        description="Jika pertanyaan Anda tidak ada di sini, silakan hubungi admin. Jawaban di halaman ini masih bisa Anda sesuaikan sesuai kebijakan DQS Cemani."
        imageSrc="/images/activities/halaqah-muslimah.webp"
        imageAlt="Kegiatan pembelajaran"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FaqAccordion items={items} />
          </div>
          <div className="lg:col-span-5">
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Butuh bantuan cepat?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                Hubungi admin melalui halaman Kontak untuk konsultasi PSB, jadwal
                kunjungan, dan permintaan brosur.
                <div className="mt-3 font-medium text-foreground/85">
                  {contact.phone}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
