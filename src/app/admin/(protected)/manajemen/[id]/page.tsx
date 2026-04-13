import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteManagementMemberAction, updateManagementMemberAction } from "@/app/admin/(protected)/manajemen/actions";
import { listManagementMembers, managementUnits } from "@/lib/management";
import { AdminNotice } from "@/components/admin/admin-notice";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit Manajemen",
  robots: { index: false, follow: false },
};

function Input({
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
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

export default async function AdminManagementEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await listManagementMembers({ includeDraft: true });
  const item = list.find((m) => m.id === id);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">
          Manajemen & Pengasuhan
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit profil
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Pastikan peran, masa tugas, dan foto sesuai adab.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={updateManagementMemberAction} className="grid gap-5">
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
                <Label>Peran</Label>
                <Input name="role" defaultValue={item.role} />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <select
                  name="unit"
                  defaultValue={item.unit}
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
                <Input name="termStart" defaultValue={item.termStart} />
              </div>
              <div className="space-y-2">
                <Label>Masa tugas selesai (opsional)</Label>
                <Input name="termEnd" defaultValue={item.termEnd} />
              </div>
              <div className="space-y-2">
                <Label>Urutan tampil</Label>
                <Input name="order" defaultValue={String(item.order)} type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ringkasan</Label>
              <textarea
                name="bio"
                rows={4}
                defaultValue={item.bio}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <ImageUploadField
              nameFile="photoFile"
              namePath="photo"
              defaultPath={item.photo}
              label="Foto"
              helperText="Upload untuk mengganti foto, atau pakai path dari /public/images."
            />

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

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/manajemen">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/manajemen">Preview publik</Link>
                </Button>
                <SubmitButton className="rounded-full" pendingText="Sedang mengupload…">
                  Simpan perubahan
                </SubmitButton>
              </div>
            </div>
          </form>

          <form action={deleteManagementMemberAction}>
            <input type="hidden" name="id" value={item.id} />
            <SubmitButton
              variant="destructive"
              className="rounded-full"
              pendingText="Menghapus…"
            >
              Hapus profil
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
