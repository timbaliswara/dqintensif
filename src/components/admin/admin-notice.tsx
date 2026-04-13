"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const messages: Record<string, string> = {
  created: "Berhasil dibuat.",
  updated: "Perubahan berhasil disimpan.",
  deleted: "Berhasil dihapus.",
};

export function AdminNotice({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = React.useState(false);

  const msg = React.useMemo(() => {
    for (const key of Object.keys(messages)) {
      if (searchParams.get(key) === "1") return messages[key];
    }
    return null;
  }, [searchParams]);

  React.useEffect(() => {
    setDismissed(false);
  }, [msg]);

  if (!msg || dismissed) return null;

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded-2xl border bg-primary/5 p-4 text-sm",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        <CheckCircle2 className="mt-0.5 size-4 text-primary" />
        <div className="leading-7 text-foreground/85">{msg}</div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-xl"
        onClick={() => setDismissed(true)}
        aria-label="Tutup notifikasi"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}

