import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase-admin";
import { getSiteUrl } from "@/lib/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin · Status",
  robots: { index: false, follow: false },
};

function StatusRow({
  label,
  ok,
  note,
}: {
  label: string;
  ok: boolean;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border bg-muted/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-semibold">{label}</div>
        {note ? (
          <div className="mt-1 text-xs leading-6 text-muted-foreground">
            {note}
          </div>
        ) : null}
      </div>
      {ok ? (
        <Badge className="w-fit rounded-full">
          <CheckCircle2 className="mr-1 size-3.5" />
          OK
        </Badge>
      ) : (
        <Badge variant="destructive" className="w-fit rounded-full">
          <AlertCircle className="mr-1 size-3.5" />
          Belum
        </Badge>
      )}
    </div>
  );
}

async function getSupabaseHealth() {
  if (!isSupabaseConfigured()) {
    return { ok: false, detail: "Env SUPABASE belum di-set di Vercel." };
  }
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("kv_content")
      .select("key")
      .limit(1);
    if (error) {
      return { ok: false, detail: `Query gagal: ${error.message}` };
    }
    return { ok: true, detail: "Tabel kv_content bisa diakses." };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return { ok: false, detail: msg };
  }
}

export default async function AdminStatusPage() {
  const siteUrl = getSiteUrl();
  const cloudinaryOk = isCloudinaryConfigured();
  const supabaseHealth = await getSupabaseHealth();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-muted/20 p-6">
        <div className="text-sm font-semibold text-primary">Status</div>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
          Cek konfigurasi production.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          Halaman ini membantu memastikan Vercel Env, Supabase, dan Cloudinary
          sudah siap sebelum admin mengubah data atau upload gambar.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Checklist</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <StatusRow
            label="NEXT_PUBLIC_SITE_URL"
            ok={!siteUrl.includes("localhost")}
            note={`Saat ini: ${siteUrl}`}
          />
          <StatusRow
            label="Supabase"
            ok={supabaseHealth.ok}
            note={supabaseHealth.detail}
          />
          <StatusRow
            label="Cloudinary"
            ok={cloudinaryOk}
            note={
              cloudinaryOk
                ? "Upload gambar dari admin akan langsung masuk Cloudinary (tanpa buka dashboard)."
                : "Jika deploy di Vercel, upload gambar butuh CLOUDINARY_URL atau CLOUDINARY_*."
            }
          />
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Langkah jika belum OK</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
          <ol className="grid list-decimal gap-1 pl-4">
            <li>Vercel → Project Settings → Environment Variables.</li>
            <li>Set semua env untuk Production (dan sebaiknya Preview juga).</li>
            <li>Supabase: jalankan SQL `supabase/schema.sql` (tabel `kv_content`).</li>
            <li>Redeploy di Vercel setelah update env.</li>
          </ol>
          <Button asChild variant="outline" className="rounded-full">
            <a href={siteUrl} target="_blank" rel="noreferrer">
              Buka website
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

