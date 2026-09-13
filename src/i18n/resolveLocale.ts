import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./locales";

/** Narrows the `[locale]` route param. An unknown locale is a 404, never a crash. */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
