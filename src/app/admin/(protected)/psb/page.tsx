import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getPsbConfig } from "@/lib/psb-config";
import { updatePsbConfigAction } from "@/app/admin/(protected)/psb/actions";

export const metadata = {
  title: "Admin · PSB",
  robots: { index: false, follow: false },
};

export default async function AdminPsbPage() {
  const { admission } = await getPsbConfig();

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">PSB</div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Kelola informasi PSB.
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Halaman ini sensitif. Pastikan alur, syarat, dan jadwal selalu konsisten
          dengan pengumuman resmi.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pengaturan PSB</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updatePsbConfigAction} className="grid gap-5">
            <div className="space-y-2">
              <Label>Headline</Label>
              <input
                name="headline"
                defaultValue={admission.headline}
                className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label>Tahapan (1 baris = 1 langkah)</Label>
                <textarea
                  name="steps"
                  rows={8}
                  defaultValue={admission.steps.join("\n")}
                  className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Syarat (1 baris = 1 syarat)</Label>
                <textarea
                  name="requirements"
                  rows={8}
                  defaultValue={admission.requirements.join("\n")}
                  className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="rounded-full">
                Simpan PSB
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

