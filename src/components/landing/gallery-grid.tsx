"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { GalleryCategory, GalleryItem } from "@/lib/gallery";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GalleryGrid({
  items,
  categories,
}: {
  items: readonly GalleryItem[];
  categories: readonly GalleryCategory[];
}) {
  const [active, setActive] = useState<GalleryCategory | "Semua">("Semua");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (active === "Semua") return items;
    return items.filter((i) => i.category === active);
  }, [active, items]);

  const current = useMemo(
    () => items.find((i) => i.id === openId) ?? null,
    [items, openId],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={active === "Semua" ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setActive("Semua")}
        >
          Semua
        </Button>
        {categories.map((c) => (
          <Button
            key={c}
            type="button"
            variant={active === c ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActive(c)}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => (
          <button
            key={it.id}
            type="button"
            className={cn(
              "group overflow-hidden rounded-3xl border bg-background text-left transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring",
            )}
            onClick={() => setOpenId(it.id)}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={it.src}
                alt={it.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/0 to-background/0 opacity-90" />
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="rounded-full">
                  {it.category}
                </Badge>
              </div>
            </div>
            <div className="p-5">
              <div className="text-base font-semibold tracking-tight">
                {it.title}
              </div>
              <div className="mt-1 text-sm leading-7 text-muted-foreground">
                {it.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={openId !== null} onOpenChange={(o) => setOpenId(o ? openId : null)}>
        <DialogContent className="max-w-4xl">
          {current ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-base">{current.title}</DialogTitle>
              </DialogHeader>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border">
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  priority
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {current.category}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {current.description}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
