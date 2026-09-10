import type { Metadata } from "next";

import { LegalPage } from "@/components/sections";
import { termsOfUse } from "@/data/content";

export const metadata: Metadata = {
  title: termsOfUse.title,
  description: termsOfUse.description,
  alternates: { canonical: "/mk/uslovi-za-koristenje" },
};

export default function TermsOfUsePage() {
  return <LegalPage document={termsOfUse} />;
}
