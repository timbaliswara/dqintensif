import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteAgendaAction, updateAgendaAction } from "@/app/admin/(protected)/agenda/actions";
import { listAgendaEvents } from "@/lib/agenda";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit Agenda",
  robots: { index: false, follow: false },
};

function Input({
  name,
  defaultValue,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    />
  );
}

export default async function AdminAgendaEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = await listAgendaEvents();
  const item = events.find((e) => e.slug === slug);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">Agenda</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit agenda
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Slug dipakai untuk URL dan identitas data. Pastikan unik.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={updateAgendaAction} className="grid gap-5">
            <input type="hidden" name="currentSlug" value={item.slug} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input name="title" defaultValue={item.title} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input name="slug" defaultValue={item.slug} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Subjudul</Label>
              <Input name="subtitle" defaultValue={item.subtitle} />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <textarea
                name="description"
                rows={5}
                defaultValue={item.description}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Mulai (ISO)</Label>
                <Input name="start" defaultValue={item.start} />
              </div>
              <div className="space-y-2">
                <Label>Selesai (ISO, opsional)</Label>
                <Input name="end" defaultValue={item.end} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tempat</Label>
                <Input name="venue" defaultValue={item.venue} />
              </div>
              <div className="space-y-2">
                <Label>Kota</Label>
                <Input name="city" defaultValue={item.city} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Audiens</Label>
                <select
                  name="audience"
                  defaultValue={item.audience}
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
                  defaultValue={item.category}
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {["PSB", "Tahfidz", "Kajian", "Kampus", "Kesantrian", "Workshop"].map(
                    (v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Label tombol</Label>
                <Input name="ctaLabel" defaultValue={item.ctaLabel} />
              </div>
              <div className="space-y-2">
                <Label>Link tombol</Label>
                <Input name="ctaHref" defaultValue={item.ctaHref} />
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/agenda">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/agenda">Preview publik</Link>
                </Button>
                <Button type="submit" className="rounded-full">
                  Simpan perubahan
                </Button>
              </div>
            </div>
          </form>

          <form action={deleteAgendaAction}>
            <input type="hidden" name="slug" value={item.slug} />
            <Button type="submit" variant="destructive" className="rounded-full">
              Hapus agenda
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
