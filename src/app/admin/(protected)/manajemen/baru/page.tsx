import Link from "next/link";

import { createManagementMemberAction } from "@/app/admin/(protected)/manajemen/actions";
import { managementUnits } from "@/lib/management";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Manajemen Baru",
  robots: { index: false, follow: false },
};

function Input({
  name,
  placeholder,
  defaultValue,
  type = "text",
}: {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    />
  );
}

export default function AdminManagementNewPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">
          Manajemen & Pengasuhan
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah profil pengelola
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Disarankan pakai foto ustadz/ustadzah atau foto lingkungan (tanpa pelanggaran adab).
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createManagementMemberAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input name="name" placeholder="Usth. ..." />
              </div>
              <div className="space-y-2">
                <Label>ID (opsional)</Label>
                <Input name="id" placeholder="pengasuh-putri" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Peran</Label>
                <Input name="role" placeholder="Pengasuh Pesantren Putri" />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <select
                  name="unit"
                  defaultValue="Pimpinan"
                  className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {managementUnits.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Masa tugas mulai</Label>
                <Input name="termStart" placeholder="2026" defaultValue="2026" />
              </div>
              <div className="space-y-2">
                <Label>Masa tugas selesai (opsional)</Label>
                <Input name="termEnd" placeholder="2028" />
              </div>
              <div className="space-y-2">
                <Label>Urutan tampil</Label>
                <Input name="order" placeholder="1" defaultValue="10" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ringkasan</Label>
              <textarea
                name="bio"
                rows={4}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="2–4 kalimat, ringkas, high trust."
              />
            </div>

            <ImageUploadField
              nameFile="photoFile"
              namePath="photo"
              label="Foto"
              helperText="Jika upload, file akan disimpan ke /public/uploads."
            />

            <div className="space-y-2">
              <Label>Status</Label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" name="published" defaultChecked className="size-4 accent-primary" />
                Tayang di publik
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/manajemen">Batal</Link>
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

