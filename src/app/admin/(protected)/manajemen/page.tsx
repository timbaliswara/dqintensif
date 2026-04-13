import Image from "next/image";
import Link from "next/link";
import { Plus, UserCog } from "lucide-react";

import { listManagementMembers } from "@/lib/management";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin · Manajemen",
  robots: { index: false, follow: false },
};

export default async function AdminManagementListPage() {
  const items = await listManagementMembers({ includeDraft: true });

  return (
    <div className="space-y-6">
      <AdminNotice />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary">
            Manajemen & Pengasuhan
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Kelola profil pengasuh & pengelola.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Tambahkan peran, masa tugas, foto (ustadz/ustadzah), dan ringkasan pembinaan.
          </p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/admin/manajemen/baru">
            <Plus className="mr-2 size-4" />
            Tambah profil
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((m) => (
          <Card key={m.id} className="bg-background">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl">
              <Image
                src={m.photo}
                alt={m.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 512px, 100vw"
              />
            </div>
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {m.unit}
                  </Badge>
                  {m.published ? (
                    <Badge variant="secondary" className="rounded-full">
                      Tayang
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full">
                      Draft
                    </Badge>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <UserCog className="size-3.5" />
                  <span className="font-mono text-[11px]">{m.id}</span>
                </div>
              </div>
              <CardTitle className="text-base">{m.name}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {m.role} · {m.termStart}
                {m.termEnd ? `–${m.termEnd}` : ""}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm leading-7 text-muted-foreground">
                {m.bio}
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/admin/manajemen/${m.id}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/manajemen">Lihat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

