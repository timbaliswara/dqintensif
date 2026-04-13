import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { listArticles } from "@/lib/articles";
import { pondok } from "@/lib/pondok-data";
import { SiteShell } from "@/components/landing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ArtikelPage() {
  const articles = await listArticles();
  return (
    <SiteShell>
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-primary">
                Artikel Pesantren
              </div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Catatan tarbiyah, tahfizh, dan kehidupan pesantren.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Tulisan ringkas untuk wali santri, calon santri, dan siapa pun
                yang ingin mengenal {pondok.profile.shortName} lebih dekat.
                Cocok untuk Anda yang mencari informasi pesantren tahfidz
                Surakarta/Solo dan program tahfidz intensif. Termasuk seri{" "}
                <span className="font-medium text-foreground">
                  Ceramah Terverifikasi
                </span>{" "}
                yang diringkas agar mudah dipahami masyarakat umum.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2">
            {articles.map((a) => (
              <Card key={a.slug} className="overflow-hidden bg-background">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={a.coverImage}
                    alt={a.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={a.slug === articles[0]?.slug}
                  />
                </div>
                <CardHeader className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {a.verification ? (
                      <Badge className="rounded-full">
                        <BadgeCheck className="mr-1 size-3.5" />
                        Terverifikasi
                      </Badge>
                    ) : null}
                    {a.tags.slice(0, 2).map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">
                        {t}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">
                      {a.date} · {a.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    <Link
                      href={`/artikel/${a.slug}`}
                      className="hover:underline"
                    >
                      {a.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-muted-foreground">
                  {a.excerpt}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
    </SiteShell>
  );
}
