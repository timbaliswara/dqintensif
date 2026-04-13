import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteFaqItemAction, updateFaqItemAction } from "@/app/admin/(protected)/faq/actions";
import { listFaqItems } from "@/lib/faq";
import { AdminNotice } from "@/components/admin/admin-notice";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · Edit FAQ",
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

export default async function AdminFaqEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await listFaqItems({ includeDraft: true });
  const item = list.find((f) => f.id === id);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">FAQ</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Edit FAQ
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Jawaban sebaiknya tidak panjang; gunakan link ke PSB/Pengumuman untuk detail.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form edit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={updateFaqItemAction} className="grid gap-5">
            <input type="hidden" name="currentId" value={item.id} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Pertanyaan</Label>
                <Input name="question" defaultValue={item.question} />
              </div>
              <div className="space-y-2">
                <Label>ID</Label>
                <Input name="id" defaultValue={item.id} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Jawaban</Label>
              <textarea
                name="answer"
                rows={4}
                defaultValue={item.answer}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
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

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/faq">Kembali</Link>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/faq">Preview publik</Link>
                </Button>
                <SubmitButton className="rounded-full" pendingText="Menyimpan…">
                  Simpan perubahan
                </SubmitButton>
              </div>
            </div>
          </form>

          <form action={deleteFaqItemAction}>
            <input type="hidden" name="id" value={item.id} />
            <SubmitButton
              variant="destructive"
              className="rounded-full"
              pendingText="Menghapus…"
            >
              Hapus FAQ
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
