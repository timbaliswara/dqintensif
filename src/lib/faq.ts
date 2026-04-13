import "server-only";

import { pondok } from "@/lib/pondok-data";
import { readFaqItems } from "@/lib/admin-store";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  published: boolean;
};

const fallbackFaq: readonly FaqItem[] = pondok.faq.map((i) => ({
  id: i.id,
  question: i.question,
  answer: i.answer,
  published: Boolean(i.published),
}));

export async function listFaqItems(opts?: { includeDraft?: boolean }) {
  const items = await readFaqItems<FaqItem>(fallbackFaq);
  if (opts?.includeDraft) return items;
  return items.filter((i) => i.published);
}
