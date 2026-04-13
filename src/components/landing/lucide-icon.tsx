import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  MoonStar,
  ShieldCheck,
  Utensils,
  Bed,
  Wifi,
} from "lucide-react";

import type { Facility } from "@/lib/pondok-data";

export function FacilityIcon({ name }: { name: Facility["icon"] }) {
  const Icon =
    name === "book-open"
      ? BookOpen
      : name === "moon-star"
        ? MoonStar
        : name === "shield-check"
          ? ShieldCheck
          : name === "graduation-cap"
            ? GraduationCap
            : name === "utensils"
              ? Utensils
              : name === "bed"
                ? Bed
                : name === "heart-handshake"
                  ? HeartHandshake
                  : Wifi;

  return <Icon className="size-5" />;
}

