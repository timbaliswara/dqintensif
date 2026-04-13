import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteTestimonialAction, updateTestimonialAction } from "@/app/admin/(protected)/testimoni/actions";
import { listTestimonials } from "@/lib/testimonials";
import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminFormDraft } from "@/components/admin/form-draft";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit Testimoni",
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

export default async function AdminTestimonialsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await listTestimonials({ includeDraft: true });
  const item = list.find((t) => t.id === id);
  if (!item) notFound();
  const draftKey = `admin-testimoni:${item.id}`;

  return (
    <div className="space-y-6">
      <AdminNotice />
      <AdminFormDraft draftKey={draftKey} />
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">Testimoni</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit testimoni
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Pastikan testimoni punya konteks, verifikasi, dan izin publikasi.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            action={updateTestimonialAction}
            className="grid gap-5"
            data-draft-key={draftKey}
          >
            <input type="hidden" name="currentId" value={item.id} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input name="name" defaultValue={item.name} />
              </div>
              <div className="space-y-2">
                <Label>ID</Label>
                <Input name="id" defaultValue={item.id} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Relasi</Label>
                <Input name="relation" defaultValue={item.relation} />
              </div>
              <div className="space-y-2">
                <Label>Inisial</Label>
                <Input name="initials" defaultValue={item.initials} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tahun</Label>
                <Input name="year" defaultValue={item.year} />
              </div>
              <div className="space-y-2">
                <Label>Konteks</Label>
                <Input name="context" defaultValue={item.context} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kutipan</Label>
              <textarea
                name="quote"
                rows={4}
                defaultValue={item.quote}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Diverifikasi oleh</Label>
                <Input name="verifiedBy" defaultValue={item.verifiedBy} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={item.published}
                    className="size-4 accent-primary"
                  />
                  Tayang di publik
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Catatan izin publikasi</Label>
              <textarea
                name="consentNote"
                rows={3}
                defaultValue={item.consentNote}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/testimoni">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/testimoni">Preview publik</Link>
                </Button>
                <SubmitButton className="rounded-full" pendingText="Menyimpan…">
                  Simpan perubahan
                </SubmitButton>
              </div>
            </div>
          </form>

          <form action={deleteTestimonialAction}>
            <input type="hidden" name="id" value={item.id} />
            <SubmitButton
              variant="destructive"
              className="rounded-full"
              pendingText="Menghapus…"
            >
              Hapus testimoni
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
