import Link from "next/link";

import { createTestimonialAction } from "@/app/admin/(protected)/testimoni/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Testimoni Baru",
  robots: { index: false, follow: false },
};

function Input({
  name,
  placeholder,
  defaultValue,
}: {
  name: string;
  placeholder?: string;
  defaultValue?: string;
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

export default function AdminTestimonialsNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">Testimoni</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah testimoni
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Pastikan ada izin publikasi. Nama boleh ditulis inisial sesuai permintaan.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form testimoni</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createTestimonialAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama (boleh inisial)</Label>
                <Input name="name" placeholder="Ibu S. R." />
              </div>
              <div className="space-y-2">
                <Label>ID (opsional)</Label>
                <Input name="id" placeholder="wali-adab-2026" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Relasi</Label>
                <Input name="relation" placeholder="Wali santri program SMP" />
              </div>
              <div className="space-y-2">
                <Label>Inisial</Label>
                <Input name="initials" placeholder="SR" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tahun</Label>
                <Input name="year" placeholder="2026" defaultValue="2026" />
              </div>
              <div className="space-y-2">
                <Label>Konteks</Label>
                <Input name="context" placeholder="Wali santri program SMP" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kutipan</Label>
              <textarea
                name="quote"
                rows={4}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Satu paragraf, ringkas, jujur, dan relate."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Diverifikasi oleh</Label>
                <Input name="verifiedBy" placeholder="Admin Humas DQS Cemani" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" name="published" defaultChecked className="size-4 accent-primary" />
                  Tayang di publik
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Catatan izin publikasi</Label>
              <textarea
                name="consentNote"
                rows={3}
                defaultValue="Testimoni ditayangkan atas izin narasumber; nama dapat ditulis inisial sesuai permintaan."
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/testimoni">Batal</Link>
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

