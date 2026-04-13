"use client";

import { Check } from "lucide-react";

import type { Program } from "@/lib/pondok-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProgramsTabs({
  programs,
}: {
  programs: readonly Program[];
}) {
  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        {programs.slice(0, 3).map((p, idx) => (
          <TabsTrigger key={p.title} value={String(idx)}>
            {p.title.split(" ")[0]}
          </TabsTrigger>
        ))}
      </TabsList>

      {programs.slice(0, 3).map((p, idx) => (
        <TabsContent
          key={p.title}
          value={String(idx)}
          className="mt-6 space-y-3"
        >
          <div>
            <div className="text-lg font-semibold tracking-tight">{p.title}</div>
            <div className="text-sm text-muted-foreground">{p.subtitle}</div>
          </div>
          <p className="text-sm leading-7 text-foreground/85">{p.description}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" />
                </span>
                <span className="text-foreground/85">{h}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}

