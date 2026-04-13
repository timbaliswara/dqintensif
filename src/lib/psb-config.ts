import "server-only";

import { pondok } from "@/lib/pondok-data";
import { readPsbConfig } from "@/lib/admin-store";

export type PsbConfig = {
  admission: {
    headline: string;
    steps: string[];
    requirements: string[];
  };
};

export async function getPsbConfig(): Promise<PsbConfig> {
  const fallback: PsbConfig = {
    admission: {
      headline: pondok.admission.headline,
      steps: [...pondok.admission.steps],
      requirements: [...pondok.admission.requirements],
    },
  };
  return readPsbConfig<PsbConfig>(fallback);
}
