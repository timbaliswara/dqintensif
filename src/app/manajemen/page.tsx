import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Users } from "lucide-react";

import { listManagementMembers, managementUnits } from "@/lib/management";
import { PageHero } from "@/components/landing/page-hero";
import { SiteShell } from "@/components/landing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Manajemen & Pengasuhan",
  description:
    "Profil pengasuh dan struktur pengelola DQS Cemani: pengasuhan, tahfidz, diniyah, akademik, dan kanal resmi.",
};

function termLabel(start: string, end?: string) {
  if (!start && !end) return null;
  if (start && end) return `${start}–${end}`;
  return start || end || null;
}

export default async function ManajemenPage() {
  const members = await listManagementMembers();

  const byUnit = new Map<string, typeof members>();
  for (const unit of managementUnits) byUnit.set(unit, []);
  for (const m of members) {
    const list = byUnit.get(m.unit) ?? [];
    list.push(m);
    byUnit.set(m.unit, list);
  }

  return (
    <SiteShell>
      <PageHero
        eyebrow="Manajemen & Pengasuhan"
        title="Pengelolaan yang rapi, pengasuhan yang hangat, kanal resmi yang jelas."
        description="Kami merangkum struktur pengelola untuk menambah rasa aman dan trust calon wali santri. Data di halaman ini masih contoh dan bisa Anda ganti dengan profil resmi."
        imageSrc={[
          "/images/activities/ustadzah-menyampaikan-materi.webp",
          "/images/activities/halaqah-muslimah.webp",
        ]}
        imageAlt={["Ustadzah menyampaikan materi", "Halaqah santriwati"]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Struktur jelas",
              desc: "Wali santri mudah memahami siapa yang mengelola tahfidz, pengasuhan, dan layanan.",
            },
            {
              icon: ShieldCheck,
              title: "High trust",
              desc: "Profil disertai masa tugas, peran, dan deskripsi singkat—tanpa klaim berlebihan.",
            },
            {
              icon: BadgeCheck,
              title: "Satu pintu update",
              desc: "Info sensitif (jadwal/kuota/biaya) tetap dirilis lewat pengumuman resmi dan admin.",
            },
          ].map((f) => (
            <Card key={f.title} className="bg-background">
              <CardHeader className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-muted-foreground">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="space-y-10">
          {managementUnits.map((unit) => {
            const list = byUnit.get(unit) ?? [];
            if (!list.length) return null;
            return (
              <div key={unit} className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-primary">{unit}</div>
                    <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                      Tim {unit.toLowerCase()}.
                    </h2>
                  </div>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/kontak">Konfirmasi via admin</Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((m) => (
                    <Card key={m.id} className="bg-background">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={m.photo}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <CardHeader className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="rounded-full">
                            <BadgeCheck className="mr-1 size-3.5" />
                            {m.role}
                          </Badge>
                          {termLabel(m.termStart, m.termEnd) ? (
                            <span className="text-xs text-muted-foreground">
                              Masa tugas: {termLabel(m.termStart, m.termEnd)}
                            </span>
                          ) : null}
                        </div>
                        <CardTitle className="text-base">{m.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-7 text-muted-foreground">
                        {m.bio}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full">
            <Link href="/legal">Legal & kanal resmi</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/pengumuman">Pengumuman resmi</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

