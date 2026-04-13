import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { GalleryGrid } from "@/components/landing/gallery-grid";
import { galleryCategories, listGalleryItems } from "@/lib/gallery";

export const metadata = {
  title: "Galeri",
  description:
    "Galeri foto kegiatan dan lingkungan DQS Cemani: tahfidz, kajian, ibadah, dan suasana kampus.",
};

export default async function GaleriPage() {
  const items = await listGalleryItems();
  return (
    <SiteShell>
      <PageHero
        eyebrow="Galeri"
        title="Modern, elegan, dan islami."
        description="Kumpulan foto suasana kegiatan, pembinaan tahfidz, kajian, dan lingkungan pesantren. Saat ini menggunakan foto demo berkualitas (bukan foto asli DQS Cemani) dan bisa diganti kapan saja."
        imageSrc="/images/campus/masjid.webp"
        imageAlt="Masjid dan lingkungan pesantren"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <GalleryGrid items={items} categories={galleryCategories} />
      </section>
    </SiteShell>
  );
}
