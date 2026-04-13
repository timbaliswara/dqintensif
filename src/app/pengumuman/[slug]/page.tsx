import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAnnouncement, listAnnouncements } from "@/lib/announcements";
import { SiteShell } from "@/components/landing/site-shell";
import { ArticleJsonLd } from "@/components/seo/jsonld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const announcements = await listAnnouncements();
  return announcements.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getAnnouncement(slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

async function PengumumanContent({ slug }: { slug: string }) {
  const item = await getAnnouncement(slug);
  if (!item) notFound();
  const announcements = await listAnnouncements();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <ArticleJsonLd
        title={item.title}
        description={item.excerpt}
        datePublished={item.datePublishedISO}
        authorName="DQS Cemani"
        image={item.coverImage}
        urlPath={`/pengumuman/${item.slug}`}
      />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-full">
            {item.tag}
          </Badge>
          <span className="text-xs text-muted-foreground">{item.displayDate}</span>
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {item.title}
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">{item.excerpt}</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
      </div>

      <div
        className="mt-8 rich-content"
        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
      />

      <Separator className="my-10" />

      <div className="grid gap-4 sm:grid-cols-2">
        {announcements
          .filter((a) => a.slug !== item.slug)
          .slice(0, 2)
          .map((a) => (
            <Card key={a.slug} className="bg-background">
              <CardContent className="p-5">
                <div className="text-xs text-muted-foreground">{a.displayDate}</div>
                <div className="mt-1 text-base font-semibold leading-snug">
                  <Link href={`/pengumuman/${a.slug}`} className="hover:underline">
                    {a.title}
                  </Link>
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {a.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/pengumuman" className="text-sm font-medium hover:underline">
          ← Kembali ke daftar pengumuman
        </Link>
        <Link href="/agenda" className="text-sm font-medium hover:underline">
          Lihat agenda terdekat →
        </Link>
      </div>
    </article>
  );
}

export default async function PengumumanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <SiteShell>
      <PengumumanContent slug={slug} />
    </SiteShell>
  );
}
