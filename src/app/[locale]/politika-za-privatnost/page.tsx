import type { Metadata } from "next";

import { LegalPage } from "@/components/sections";
import { getContent } from "@/data/content";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/politika-za-privatnost">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { privacyPolicy } = getContent(locale);

  return {
    title: privacyPolicy.title,
    description: privacyPolicy.description,
    alternates: localeAlternates(locale, "/politika-za-privatnost"),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps<"/[locale]/politika-za-privatnost">) {
  const locale = await resolveLocale(params);
  const { privacyPolicy, ui } = getContent(locale);

  return (
    <LegalPage document={privacyPolicy} updatedLabel={ui.legal.lastUpdated} />
  );
}
