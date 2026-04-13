import "server-only";

import { pondok } from "@/lib/pondok-data";
import { readSiteConfig } from "@/lib/admin-store";

export type SiteConfig = {
  profile: {
    name: string;
    shortName: string;
    tagline: string;
    location: string;
    established: number;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
    coordinates: { lat: number; lon: number };
    mapsLabel: string;
    mapsQuery: string;
    mapsUrl?: string;
    officialNote: string;
  };
  legal: {
    headline: string;
    overview: string;
    foundation: { name: string; role: string }[];
    documents: { title: string; note: string }[];
    officialChannels: { label: string; value: string }[];
  };
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const fallback: SiteConfig = {
    profile: {
      name: pondok.profile.name,
      shortName: pondok.profile.shortName,
      tagline: pondok.profile.tagline,
      location: pondok.profile.location,
      established: pondok.profile.established,
    },
    contact: {
      address: pondok.contact.address,
      phone: pondok.contact.phone,
      email: pondok.contact.email,
      hours: pondok.contact.hours,
      coordinates: {
        lat: pondok.contact.coordinates.lat,
        lon: pondok.contact.coordinates.lon,
      },
      mapsLabel: pondok.contact.mapsLabel,
      mapsQuery: pondok.contact.mapsQuery,
      mapsUrl: pondok.contact.mapsUrl,
      officialNote: pondok.contact.officialNote,
    },
    legal: {
      headline: pondok.legal.headline,
      overview: pondok.legal.overview,
      foundation: pondok.legal.foundation.map((f) => ({ name: f.name, role: f.role })),
      documents: pondok.legal.documents.map((d) => ({ title: d.title, note: d.note })),
      officialChannels: pondok.legal.officialChannels.map((c) => ({ label: c.label, value: c.value })),
    },
  };
  return readSiteConfig<SiteConfig>(fallback);
}
