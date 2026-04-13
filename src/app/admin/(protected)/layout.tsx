import Link from "next/link";
import {
  CalendarDays,
  FileText,
  HelpCircle,
  Images,
  LayoutDashboard,
  LogOut,
  NotebookText,
  Settings,
  Stamp,
  Tickets,
  Activity,
  UserCog,
} from "lucide-react";

import { logoutAction } from "@/app/admin/login/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSiteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/admin/pengumuman", label: "Pengumuman", icon: FileText },
  { href: "/admin/artikel", label: "Artikel", icon: NotebookText },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/testimoni", label: "Testimoni", icon: Stamp },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/psb", label: "PSB", icon: Tickets },
  { href: "/admin/profil", label: "Profil & Legal", icon: Settings },
  { href: "/admin/manajemen", label: "Manajemen", icon: UserCog },
  { href: "/admin/status", label: "Status", icon: Activity },
] as const;

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin("/admin");
  const { profile } = await getSiteConfig();

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-3xl border bg-muted/20 p-5">
              <div className="text-xs font-semibold text-muted-foreground">
                Admin Panel
              </div>
              <div className="mt-1 text-lg font-semibold tracking-tight">
                {profile.shortName}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Khusus muslimah · Solo Raya
              </div>
              <Separator className="my-4" />
              <nav className="grid gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent/40 hover:text-foreground"
                  >
                    <item.icon className="size-4 text-primary" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-4" />
              <form action={logoutAction}>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full rounded-full"
                >
                  <LogOut className="mr-2 size-4" />
                  Keluar
                </Button>
              </form>
            </div>

            <div className="rounded-3xl border bg-primary/5 p-5 text-xs leading-6 text-muted-foreground">
              Tips: Simpan informasi resmi di halaman Pengumuman, dan jadwal event
              di halaman Agenda agar tidak duplikat.
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
