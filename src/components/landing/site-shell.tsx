import type { ReactNode } from "react";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { getSiteConfig } from "@/lib/site-config";

export async function SiteShell({ children }: { children: ReactNode }) {
  const { profile } = await getSiteConfig();
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader profile={profile} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
