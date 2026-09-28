import type { Metadata } from "next";

import { LegalPage } from "@/components/sections";
import { getContent } from "@/data/content";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/uslovi-za-koristenje">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { termsOfUse } = getContent(locale);

  return {
    title: termsOfUse.title,
    description: termsOfUse.description,
    alternates: localeAlternates(locale, "/uslovi-za-koristenje"),
  };
}

export default async function TermsOfUsePage({
  params,
}: PageProps<"/[locale]/uslovi-za-koristenje">) {
  const locale = await resolveLocale(params);
  const { termsOfUse, ui } = getContent(locale);

  return (
    <LegalPage document={termsOfUse} updatedLabel={ui.legal.lastUpdated} />
  );
}
