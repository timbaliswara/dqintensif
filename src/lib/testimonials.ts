import "server-only";

import { pondok } from "@/lib/pondok-data";
import { readTestimonials } from "@/lib/admin-store";

export type Testimonial = {
  id: string;
  name: string;
  relation: string;
  quote: string;
  initials: string;
  verifiedBy: string;
  year: string;
  context: string;
  consentNote: string;
  published: boolean;
};

const fallbackTestimonials: readonly Testimonial[] = pondok.testimonials.map((t) => ({
  id: t.id,
  name: t.name,
  relation: t.relation,
  quote: t.quote,
  initials: t.initials,
  verifiedBy: t.verifiedBy,
  year: t.year,
  context: t.context,
  consentNote: t.consentNote,
  published: Boolean(t.published),
}));

export async function listTestimonials(opts?: { includeDraft?: boolean }) {
  const list = await readTestimonials<Testimonial>(fallbackTestimonials);
  if (opts?.includeDraft) return list;
  return list.filter((t) => t.published);
}
