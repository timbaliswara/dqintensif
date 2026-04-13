"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { pondok } from "@/lib/pondok-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader({
  profile = pondok.profile,
  navItems = pondok.nav,
}: {
  profile?: { shortName: string; location: string };
  navItems?: readonly { label: string; href: string }[];
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div aria-hidden className="relative size-9 md:hidden">
            <Image
              src="/brand/logo-dq-mark.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          <div aria-hidden className="relative hidden h-9 w-44 md:block">
            <Image
              src="/brand/logo-dq.png"
              alt=""
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="leading-tight md:hidden">
            <div className="text-sm font-semibold tracking-tight">
              {profile.shortName}
            </div>
            <div className="text-xs text-muted-foreground">
              {profile.location}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-accent/40 hover:text-foreground",
                    )}
                  >
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-accent/40 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild className="rounded-full">
            <Link href="/artikel">Artikel</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/psb">PSB</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Buka menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px]">
              <SheetHeader>
                <SheetTitle>{profile.shortName}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-1">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/40"
                  >
                    Beranda
                  </Link>
                </SheetClose>
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/40"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-2">
                  <Button asChild className="w-full rounded-full">
                    <SheetClose asChild>
                      <Link href="/artikel">Artikel</Link>
                    </SheetClose>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
