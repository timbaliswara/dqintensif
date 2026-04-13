"use client";

import * as React from "react";
import { Copy, Link as LinkIcon, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function safeEncode(value: string) {
  return encodeURIComponent(value);
}

function buildStatusText(title: string, url: string) {
  return [
    "Bismillah.",
    "",
    title,
    url,
    "",
    "#DQSCemani #PesantrenTahfidz #SoloRaya",
  ].join("\n");
}

export function ShareBar({
  title,
  url,
  className,
}: {
  title: string;
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState<null | "status" | "link">(null);

  async function copy(text: string, kind: "status" | "link") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  }

  async function onNativeShare(text: string) {
    const canShare =
      typeof navigator !== "undefined" && typeof navigator.share === "function";
    if (!canShare) return;
    try {
      await navigator.share({ title, text, url });
    } catch {
      // user canceled
    }
  }

  const statusText = buildStatusText(title, url);

  const waStatusHref = `https://wa.me/?text=${safeEncode(statusText)}`;

  async function shareToWhatsappStatus() {
    const hasNativeShare =
      typeof navigator !== "undefined" && typeof navigator.share === "function";

    if (hasNativeShare) {
      // Best UX on mobile: user can pick WhatsApp and then choose "Status saya".
      await onNativeShare(statusText);
      return;
    }

    // There is no official web deep-link that opens WhatsApp directly in "Status" composer.
    // Best-effort: try the app scheme first (opens WhatsApp), then fall back to wa.me.
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) return;

    const appScheme = `whatsapp://send?text=${safeEncode(statusText)}`;
    const fallback = () => window.open(waStatusHref, "_blank", "noreferrer");

    try {
      window.location.href = appScheme;
      window.setTimeout(fallback, 650);
    } catch {
      fallback();
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1">
        <div className="text-sm font-semibold">Bagikan artikel</div>
        <div className="text-xs text-muted-foreground">
          Tip: setelah WhatsApp terbuka, pilih <span className="font-medium text-foreground">Status saya</span> untuk memposting.
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={shareToWhatsappStatus}
        >
          <Share2 className="size-4" />
          Status WhatsApp
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => copy(url, "link")}
        >
          <LinkIcon className="size-4" />
          {copied === "link" ? "Link tersalin" : "Salin link"}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => copy(statusText, "status")}
        >
          <Copy className="size-4" />
          {copied === "status" ? "Teks tersalin" : "Salin teks status"}
        </Button>
      </div>
    </div>
  );
}
