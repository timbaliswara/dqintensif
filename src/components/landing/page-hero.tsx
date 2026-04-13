import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string | string[];
  imageAlt?: string | string[];
}) {
  const images = Array.isArray(imageSrc) ? imageSrc : imageSrc ? [imageSrc] : [];
  const alts = Array.isArray(imageAlt) ? imageAlt : imageAlt ? [imageAlt] : [];

  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-islamic-pattern mask-fade-y opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-7">
            <Badge variant="secondary" className="rounded-full">
              {eyebrow}
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-foreground/80 sm:text-base">
              {description}
            </p>
          </div>

          {images.length ? (
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border bg-background/60 p-2">
                <div
                  className={[
                    "grid gap-2",
                    images.length > 1 ? "sm:grid-cols-2" : "",
                  ].join(" ")}
                >
                  {images.slice(0, 2).map((src, idx) => (
                    <div key={src} className="overflow-hidden rounded-2xl border">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={src}
                          alt={alts[idx] ?? title}
                          fill
                          className="object-cover"
                          sizes={
                            images.length > 1
                              ? "(min-width: 1024px) 210px, (min-width: 640px) 50vw, 100vw"
                              : "(min-width: 1024px) 420px, 100vw"
                          }
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
