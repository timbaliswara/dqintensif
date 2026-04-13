"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function toDigits(input: string) {
  return input.replace(/\D/g, "");
}

type Props = {
  whatsappNumbers: string[];
};

export function ContactForm({ whatsappNumbers }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const options = useMemo(() => {
    const cleaned = (whatsappNumbers ?? []).map((n) => n.trim()).filter(Boolean);
    return cleaned.length ? cleaned : [];
  }, [whatsappNumbers]);

  const [selected, setSelected] = useState(options[0] ?? "");

  const waHref = useMemo(() => {
    const text = `Assalamu’alaikum. Saya ${name || "(nama)"} (${phone || "(no. HP)"}). ${message || "Saya ingin bertanya tentang PSB."}`;
    const digits = toDigits(selected || options[0] || "");
    return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : "#";
  }, [message, name, options, phone, selected]);

  return (
    <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
      {options.length > 1 ? (
        <div className="grid gap-2">
          <Label htmlFor="wa-admin">Pilih admin WhatsApp</Label>
          <select
            id="wa-admin"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {options.map((n, idx) => (
              <option key={n} value={n}>
                Admin {idx + 1} · {n}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">No. HP/WhatsApp</Label>
          <Input
            id="phone"
            placeholder="08xxxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          placeholder="Tulis pertanyaan Anda..."
          className="min-h-28"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button asChild className="rounded-full" disabled={waHref === "#"}>
          <a href={waHref} target="_blank" rel="noreferrer">
            Kirim via WhatsApp
          </a>
        </Button>
        <p className="text-xs text-muted-foreground">
          Form ini dummy (belum tersambung backend). Tombol akan membuka WhatsApp.
        </p>
      </div>
    </form>
  );
}
