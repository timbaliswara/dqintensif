import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck } from "lucide-react";

import { getArticle, listArticles } from "@/lib/articles";
import { getSiteUrl } from "@/lib/site";
import { SiteShell } from "@/components/landing/site-shell";
import { ArticleJsonLd } from "@/components/seo/jsonld";
import { ShareBar } from "@/components/article/share-bar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const articles = await listArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const siteUrl = getSiteUrl();
  const canonicalPath = `/artikel/${article.slug}`;
  const ogImage = `${siteUrl}${article.coverImage}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: canonicalPath,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

async function ArticleContent({ slug }: { slug: string }) {
  const article = await getArticle(slug);
  if (!article) notFound();
  const articles = await listArticles();
  const shareUrl = `${getSiteUrl()}/artikel/${article.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        datePublished={article.dateISO}
        authorName={article.author.name}
        image={article.coverImage}
        urlPath={`/artikel/${article.slug}`}
      />
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {article.verification ? (
            <Badge className="rounded-full">
              <BadgeCheck className="mr-1 size-3.5" />
              Terverifikasi
            </Badge>
          ) : null}
          {article.tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
          <span className="text-xs text-muted-foreground">
            {article.date} · {article.readTime}
          </span>
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {article.author.name} · {article.author.role}
        </p>
        {article.verification ? (
          <div className="rounded-2xl border bg-primary/5 p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              <BadgeCheck className="size-4 text-primary" />
              Ceramah terverifikasi
            </div>
            <div className="mt-1 text-xs leading-6 text-muted-foreground">
              Ditinjau oleh {article.verification.by} ·{" "}
              {article.verification.date}
              {article.verification.note ? ` · ${article.verification.note}` : ""}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
      </div>

      <ShareBar className="mt-6" title={article.title} url={shareUrl} />

      <div
        className="mt-8 rich-content"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <Separator className="my-10" />

      <div className="grid gap-4 sm:grid-cols-2">
        {articles
          .filter((a) => a.slug !== article.slug)
          .slice(0, 2)
          .map((a) => (
            <Card key={a.slug} className="bg-background">
              <CardContent className="p-5">
                <div className="text-xs text-muted-foreground">{a.date}</div>
                <div className="mt-1 text-base font-semibold leading-snug">
                  <Link href={`/artikel/${a.slug}`} className="hover:underline">
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

      <div className="mt-10">
        <Link href="/artikel" className="text-sm font-medium hover:underline">
          ← Kembali ke daftar artikel
        </Link>
      </div>
    </article>
  );
}

export default async function ArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <SiteShell>
      <ArticleContent slug={slug} />
    </SiteShell>
  );
}
