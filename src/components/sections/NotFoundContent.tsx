"use client";

import { useSyncExternalStore } from "react";

import { ButtonLink, Container } from "@/components/ui";
import { notFoundCopy } from "@/data/content/notFound";
import {
  defaultLocale,
  languageTag,
  localeFromPath,
  type Locale,
} from "@/i18n/locales";

const noSubscription = () => () => {};

/**
 * The language of the address the visitor actually typed.
 *
 * A static export has a single 404.html for every missing path, prerendered
 * once, so the server cannot know. The server snapshot renders Macedonian and
 * the client switches after hydration — without the hydration mismatch that
 * reading `window` during render would cause.
 */
function useLocaleFromAddress(): Locale {
  return useSyncExternalStore(
    noSubscription,
    () => localeFromPath(window.location.pathname),
    () => defaultLocale,
  );
}

export function NotFoundContent() {
  const locale = useLocaleFromAddress();
  const copy = notFoundCopy[locale];

  return (
    <section
      lang={languageTag[locale]}
      className="flex min-h-[60vh] items-center bg-background pb-16 pt-32 sm:pt-40"
    >
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-6xl font-extrabold tracking-tight text-primary sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{copy.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href={`/${locale}`}>{copy.home}</ButtonLink>
            <ButtonLink href={`/${locale}/kontakt`} variant="pill">
              {copy.contact}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
