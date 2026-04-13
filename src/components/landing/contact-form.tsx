"use client";

import { useMemo, useState } from "react";

import { pondok } from "@/lib/pondok-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const waNumber = useMemo(
    () => pondok.contact.phone.replace(/\D/g, ""),
    [],
  );

  const waHref = useMemo(() => {
    const text = `Assalamu’alaikum. Saya ${name || "(nama)"} (${phone || "(no. HP)"}). ${message || "Saya ingin bertanya tentang PSB."}`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  }, [name, phone, message, waNumber]);

  return (
    <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
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
        <Button asChild className="rounded-full">
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
