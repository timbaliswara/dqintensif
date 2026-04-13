import Link from "next/link";

import { loginAction } from "@/app/admin/login/actions";
import { isAdminEnvConfigured } from "@/lib/admin-auth";
import { SiteShell } from "@/components/landing/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const nextPath = sp.next || "/admin";
  const showError = sp.error === "1";
  const configured = isAdminEnvConfigured();

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-6 space-y-2 text-center">
            <div className="text-sm font-semibold text-primary">
              Admin Panel
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Masuk untuk mengelola konten.
            </h1>
            <p className="text-sm leading-7 text-muted-foreground">
              Khusus admin DQS Cemani. Halaman ini tidak diindeks mesin pencari.
            </p>
          </div>

          {!configured ? (
            <div className="mb-4 rounded-2xl border bg-primary/5 p-4 text-sm leading-7">
              <div className="font-semibold">Mode dev</div>
              <div className="text-muted-foreground">
                Env <span className="font-medium text-foreground">ADMIN_PASSWORD</span>{" "}
                dan <span className="font-medium text-foreground">ADMIN_SECRET</span>{" "}
                belum di-set. Untuk sementara, password default:{" "}
                <span className="font-medium text-foreground">admin</span>.
              </div>
            </div>
          ) : null}

          <Card className="bg-background">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base">Login</CardTitle>
              {showError ? (
                <Badge variant="secondary" className="w-fit rounded-full">
                  Password salah. Coba lagi.
                </Badge>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={loginAction} className="space-y-4">
                <input type="hidden" name="next" value={nextPath} />
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Masuk
                </Button>
              </form>

              <div className="text-center text-xs text-muted-foreground">
                Kembali ke{" "}
                <Link href="/" className="font-medium text-foreground hover:underline">
                  Beranda
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}

