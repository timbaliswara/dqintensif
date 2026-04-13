import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminFormDraft } from "@/components/admin/form-draft";
import { SubmitButton } from "@/components/admin/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getSiteConfig } from "@/lib/site-config";
import { updateSiteConfigAction } from "@/app/admin/(protected)/profil/actions";

export const metadata = {
  title: "Admin · Profil & Kanal Resmi",
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

export default async function AdminProfilePage() {
  const { profile, contact, legal } = await getSiteConfig();
  const draftKey = "admin-profil";

  const foundationText = legal.foundation
    .map((f) => `${f.name} — ${f.role}`)
    .join("\n");
  const documentsText = legal.documents
    .map((d) => `${d.title} — ${d.note}`)
    .join("\n");
  const channelsText = legal.officialChannels
    .map((c) => `${c.label} — ${c.value}`)
    .join("\n");

  return (
    <div className="space-y-6">
      <AdminNotice />
      <AdminFormDraft draftKey={draftKey} />
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary">
          Profil & Kanal Resmi
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Satu pintu informasi yang akurat.
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Data di halaman ini dipakai di footer, halaman Kontak, dan halaman Legal.
          Pastikan selalu benar agar wali santri lebih percaya.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pengaturan</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={updateSiteConfigAction}
            className="grid gap-8"
            data-draft-key={draftKey}
          >
            <div className="space-y-4">
              <div className="text-sm font-semibold">Profil</div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama lembaga</Label>
                  <Input name="profileName" defaultValue={profile.name} />
                </div>
                <div className="space-y-2">
                  <Label>Nama singkat</Label>
                  <Input name="profileShortName" defaultValue={profile.shortName} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <textarea
                  name="profileTagline"
                  rows={3}
                  defaultValue={profile.tagline}
                  className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Lokasi (ringkas)</Label>
                <Input
                  name="profileLocation"
                  defaultValue={profile.location}
                  placeholder="Cemani, Grogol, Sukoharjo — Jawa Tengah"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="text-sm font-semibold">Kontak</div>
              <div className="space-y-2">
                <Label>Alamat</Label>
                <textarea
                  name="contactAddress"
                  rows={3}
                  defaultValue={contact.address}
                  className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Telepon/WhatsApp</Label>
                  <Input name="contactPhone" defaultValue={contact.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="contactEmail" defaultValue={contact.email} type="email" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Jam layanan</Label>
                  <Input name="contactHours" defaultValue={contact.hours} />
                </div>
                <div className="space-y-2">
                  <Label>Label lokasi (untuk preview)</Label>
                  <Input name="contactMapsLabel" defaultValue={contact.mapsLabel} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Koordinat latitude</Label>
                  <Input name="contactLat" defaultValue={String(contact.coordinates.lat)} />
                </div>
                <div className="space-y-2">
                  <Label>Koordinat longitude</Label>
                  <Input name="contactLon" defaultValue={String(contact.coordinates.lon)} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Maps query (fallback)</Label>
                  <Input name="contactMapsQuery" defaultValue={contact.mapsQuery} />
                </div>
                <div className="space-y-2">
                  <Label>Google Maps URL</Label>
                  <Input name="contactMapsUrl" defaultValue={contact.mapsUrl} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Catatan kanal resmi</Label>
                <textarea
                  name="contactOfficialNote"
                  rows={3}
                  defaultValue={contact.officialNote}
                  className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="text-sm font-semibold">Legal & Kanal Resmi</div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Judul halaman</Label>
                  <Input name="legalHeadline" defaultValue={legal.headline} />
                </div>
                <div className="space-y-2">
                  <Label>Ringkasan (overview)</Label>
                  <textarea
                    name="legalOverview"
                    rows={3}
                    defaultValue={legal.overview}
                    className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label>Yayasan (1 baris = Nama — Peran)</Label>
                  <textarea
                    name="legalFoundation"
                    rows={6}
                    defaultValue={foundationText}
                    className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dokumen (1 baris = Judul — Catatan)</Label>
                  <textarea
                    name="legalDocuments"
                    rows={6}
                    defaultValue={documentsText}
                    className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kanal resmi (1 baris = Label — Value)</Label>
                  <textarea
                    name="legalChannels"
                    rows={6}
                    defaultValue={channelsText}
                    className="w-full rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Tip: gunakan pemisah “—” (em dash). Alternatif: “|”.
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton className="rounded-full" pendingText="Menyimpan…">
                Simpan pengaturan
              </SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
