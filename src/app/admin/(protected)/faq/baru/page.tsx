import Link from "next/link";

import { createFaqItemAction } from "@/app/admin/(protected)/faq/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin · FAQ Baru",
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

export default function AdminFaqNewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-primary">FAQ</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Tambah FAQ
        </h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Tulis jawaban yang hangat, tidak menggurui, dan mudah dipahami umum.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Form FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createFaqItemAction} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Pertanyaan</Label>
                <Input name="question" placeholder="Bagaimana cara mendaftar PSB?" />
              </div>
              <div className="space-y-2">
                <Label>ID (opsional)</Label>
                <Input name="id" placeholder="cara-daftar-psb" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Jawaban</Label>
              <textarea
                name="answer"
                rows={4}
                className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Jawaban ringkas, jelas, dan arahkan ke PSB/Pengumuman jika perlu."
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" name="published" defaultChecked className="size-4 accent-primary" />
                Tayang di publik
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/admin/faq">Batal</Link>
              </Button>
              <SubmitButton className="rounded-full" pendingText="Menyimpan…">
                Simpan
              </SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
