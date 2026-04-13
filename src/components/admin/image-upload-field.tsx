"use client";

import * as React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ImageUploadField({
  nameFile,
  namePath,
  defaultPath,
  label = "Cover image",
  helperText,
  draftKey,
}: {
  nameFile: string;
  namePath: string;
  defaultPath?: string;
  label?: string;
  helperText?: string;
  draftKey?: string;
}) {
  const [path, setPath] = React.useState(defaultPath ?? "");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  React.useEffect(() => {
    if (!draftKey) return;
    try {
      const raw = localStorage.getItem(`dqs_admin_draft:${draftKey}`);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const saved = parsed?.[namePath];
      if (typeof saved === "string" && saved.trim()) {
        setPath(saved);
      }
    } catch {
      // ignore
    }
  }, [draftKey, namePath]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  const shown = previewUrl ?? (path ? path : null);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid gap-3 md:grid-cols-12 md:items-start">
        <div className="md:col-span-7">
          <div className="rounded-2xl border bg-muted/10 p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium">Upload gambar</div>
              <input
                name={nameFile}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onFileChange}
                className="block w-full text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90 sm:w-auto"
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              JPG/PNG/WebP. Disarankan rasio 16:10 atau 16:9.
            </div>
          </div>

          <div className="mt-3 rounded-2xl border bg-muted/10 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium">Atau pakai path</div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setPreviewUrl(null);
                }}
              >
                Pakai path
              </Button>
            </div>
            <input
              name={namePath}
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/images/campus/masjid.webp"
              data-admin-controlled="1"
              className="mt-3 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {helperText ? (
              <div className="mt-2 text-xs text-muted-foreground">
                {helperText}
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className={cn("relative aspect-[16/10] w-full", !shown && "bg-muted/20")}>
              {shown ? (
                <Image
                  src={shown}
                  alt="Preview cover"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 320px, 100vw"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-sm text-muted-foreground">
                  Belum ada preview
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Preview mengikuti file upload (kalau dipilih) atau path.
          </div>
        </div>
      </div>
    </div>
  );
}
