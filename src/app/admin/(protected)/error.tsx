"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminProtectedErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message =
    (error?.message || "").trim() ||
    "Terjadi kendala saat memproses permintaan.";

  return (
    <div className="space-y-6">
      <Card className="bg-background">
        <CardHeader className="space-y-2">
          <div className="grid size-10 place-items-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>
          <CardTitle className="text-base">Gagal memproses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-7 text-muted-foreground">
            {message}
          </p>
          <div className="rounded-2xl border bg-muted/20 p-4 text-xs leading-6 text-muted-foreground">
            Saran cepat:
            <ul className="mt-2 grid list-disc gap-1 pl-4">
              <li>Pastikan field wajib terisi (judul, slug, tanggal, dsb).</li>
              <li>Jika upload gambar: pastikan JPG/PNG/WebP, ukuran ≤ 5MB.</li>
              <li>Di production: pastikan env Supabase & Cloudinary sudah di-set.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={reset} className="rounded-full">
              <RefreshCw className="mr-2 size-4" />
              Coba lagi
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/admin">Kembali ke dashboard</Link>
            </Button>
          </div>
          {error?.digest ? (
            <div className="text-[11px] text-muted-foreground">
              Kode: <span className="font-mono">{error.digest}</span>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

