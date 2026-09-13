import type { Metadata } from "next";

import { LegalPage } from "@/components/sections";
import { getContent, termsOfUse } from "@/data/content";
import { resolveLocale } from "@/i18n/resolveLocale";

export const metadata: Metadata = {
  title: termsOfUse.title,
  description: termsOfUse.description,
  // Macedonian only, so the Macedonian address is canonical in every language.
  alternates: { canonical: "/mk/uslovi-za-koristenje" },
};

export default async function TermsOfUsePage({
  params,
}: PageProps<"/[locale]/uslovi-za-koristenje">) {
  const locale = await resolveLocale(params);

  return (
    <LegalPage
      document={termsOfUse}
      languageNote={getContent(locale).ui.legal.languageNote}
    />
  );
}
