import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    src: "/images/campus/gerbang.webp",
    title: "Gerbang Pesantren",
    desc: "Akses tertib dan keamanan berlapis",
  },
  {
    src: "/images/campus/masjid.webp",
    title: "Masjid",
    desc: "Pusat ibadah & majelis ilmu",
  },
  {
    src: "/images/campus/asrama.webp",
    title: "Asrama",
    desc: "Rapi, bersih, dan terpantau",
  },
  {
    src: "/images/activities/halaqah-muslimah.webp",
    title: "Halaqah",
    desc: "Setoran dan muroja’ah harian",
  },
  {
    src: "/images/activities/tahfizh.webp",
    title: "Tahfizh",
    desc: "Target realistis, evaluasi rutin",
  },
  {
    src: "/images/activities/muhadharah.webp",
    title: "Muhadharah",
    desc: "Latihan bicara yang santun",
  },
] as const;

export function Gallery() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <Card key={it.src} className="overflow-hidden bg-background">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={it.src}
              alt={it.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <CardContent className="p-5">
            <div className="text-base font-semibold tracking-tight">
              {it.title}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
