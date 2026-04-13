import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import type { AgendaEvent } from "@/lib/agenda";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatShort(iso: string) {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(d);
  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(d);
  return { date, time };
}

export function AgendaPreview({ events }: { events: readonly AgendaEvent[] }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {events.map((e) => {
        const start = formatShort(e.start);
        return (
          <Card key={e.slug} className="bg-background">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {e.category}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {e.audience}
                </Badge>
              </div>
              <CardTitle className="text-base leading-snug">{e.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{e.subtitle}</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm text-foreground/80">
                <div className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" />
                  <span>{start.date}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-primary" />
                  <span>{start.time} WIB</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <span className="line-clamp-1">{e.venue}</span>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link href={e.ctaHref}>Tanya admin</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

