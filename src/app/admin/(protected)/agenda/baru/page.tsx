import Link from "next/link";

import { createAgendaAction } from "@/app/admin/(protected)/agenda/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Agenda Baru",
  robots: { index: false, follow: false },
};

function Input({ name, placeholder, defaultValue }: { name: string; placeholder?: string; defaultValue?: string }) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    />
  );
}

export default function AdminAgendaNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">Agenda</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah agenda baru
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Gunakan format waktu ISO (contoh: 2026-04-26T09:00:00+07:00).
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAgendaAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input name="title" placeholder="Dauroh Tahsin Intensif" />
              </div>
              <div className="space-y-2">
                <Label>Slug (opsional)</Label>
                <Input name="slug" placeholder="dauroh-tahsin-intensif-april-2026" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Subjudul</Label>
              <Input name="subtitle" placeholder="Makharij · Tajwid · Perbaikan bacaan bertahap" />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <textarea
                name="description"
                rows={4}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Ringkasan kegiatan, target peserta, dan catatan konfirmasi admin."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Mulai (ISO)</Label>
                <Input name="start" placeholder="2026-04-26T09:00:00+07:00" />
              </div>
              <div className="space-y-2">
                <Label>Selesai (ISO, opsional)</Label>
                <Input name="end" placeholder="2026-04-26T12:00:00+07:00" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tempat</Label>
                <Input name="venue" placeholder="Aula DQS Cemani" />
              </div>
              <div className="space-y-2">
                <Label>Kota</Label>
                <Input name="city" placeholder="Sukoharjo (Solo Raya)" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Audiens</Label>
                <select
                  name="audience"
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  defaultValue="Umum"
                >
                  {["Umum", "Santri", "Wali Santri", "Calon Santri"].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <select
                  name="category"
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  defaultValue="Kajian"
                >
                  {["PSB", "Tahfidz", "Kajian", "Kampus", "Kesantrian", "Workshop"].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Label tombol</Label>
                <Input name="ctaLabel" placeholder="Daftar / Info" defaultValue="Tanya admin" />
              </div>
              <div className="space-y-2">
                <Label>Link tombol</Label>
                <Input name="ctaHref" placeholder="/kontak" defaultValue="/kontak" />
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/agenda">Batal</Link>
              </Button>
              <Button type="submit" className="rounded-full">
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
