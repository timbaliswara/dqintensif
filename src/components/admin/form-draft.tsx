"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

const PREFIX = "dqs_admin_draft:";

function safeJsonParse(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getStorageKey(draftKey: string) {
  return `${PREFIX}${draftKey}`;
}

function shouldSkipElement(el: Element) {
  return el instanceof HTMLElement && el.dataset.adminControlled === "1";
}

function serializeForm(form: HTMLFormElement) {
  const out: Record<string, unknown> = { __ts: Date.now() };
  const elements = Array.from(form.elements);

  for (const el of elements) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) {
      continue;
    }
    if (!el.name) continue;
    if (shouldSkipElement(el)) continue;

    if (el instanceof HTMLInputElement) {
      const type = (el.type || "").toLowerCase();
      if (type === "file") continue;
      if (type === "checkbox") {
        out[el.name] = el.checked ? "on" : "";
        continue;
      }
      if (type === "radio") {
        if (el.checked) out[el.name] = el.value;
        continue;
      }
    }

    out[el.name] = el.value;
  }

  return out;
}

function restoreForm(form: HTMLFormElement, values: Record<string, unknown>) {
  const elements = Array.from(form.elements);

  for (const el of elements) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) {
      continue;
    }
    if (!el.name) continue;
    if (shouldSkipElement(el)) continue;
    if (!(el.name in values)) continue;

    const v = values[el.name];
    if (v === undefined || v === null) continue;

    if (el instanceof HTMLInputElement) {
      const type = (el.type || "").toLowerCase();
      if (type === "file") continue;
      if (type === "checkbox") {
        el.checked = v === "on" || v === true;
        continue;
      }
      if (type === "radio") {
        el.checked = String(v) === el.value;
        continue;
      }
    }

    el.value = String(v);
  }
}

export function AdminFormDraft({
  draftKey,
  clearOn = ["created", "updated", "deleted"],
}: {
  draftKey: string;
  clearOn?: string[];
}) {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const storageKey = getStorageKey(draftKey);

    for (const key of clearOn) {
      if (searchParams.get(key) === "1") {
        try {
          localStorage.removeItem(storageKey);
        } catch {
          // ignore
        }
        break;
      }
    }
  }, [clearOn, draftKey, searchParams]);

  React.useEffect(() => {
    const storageKey = getStorageKey(draftKey);
    const form = document.querySelector<HTMLFormElement>(
      `form[data-draft-key="${CSS.escape(draftKey)}"]`,
    );
    if (!form) return;

    const raw = safeJsonParse(localStorage.getItem(storageKey));
    if (isRecord(raw)) {
      restoreForm(form, raw);
    }

    let t: number | null = null;
    const onAnyChange = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => {
        try {
          const data = serializeForm(form);
          localStorage.setItem(storageKey, JSON.stringify(data));
        } catch {
          // ignore
        }
      }, 250);
    };

    form.addEventListener("input", onAnyChange);
    form.addEventListener("change", onAnyChange);

    return () => {
      if (t) window.clearTimeout(t);
      form.removeEventListener("input", onAnyChange);
      form.removeEventListener("change", onAnyChange);
    };
  }, [draftKey]);

  return null;
}

