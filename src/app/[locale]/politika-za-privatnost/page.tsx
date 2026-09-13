import type { Metadata } from "next";

import { LegalPage } from "@/components/sections";
import { getContent, privacyPolicy } from "@/data/content";
import { resolveLocale } from "@/i18n/resolveLocale";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  // Macedonian only, so the Macedonian address is canonical in every language.
  alternates: { canonical: "/mk/politika-za-privatnost" },
};

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[locale]/politika-za-privatnost">) {
  const locale = await resolveLocale(params);

  return (
    <LegalPage
      document={privacyPolicy}
      languageNote={getContent(locale).ui.legal.languageNote}
    />
  );
}
