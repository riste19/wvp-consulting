import type { Metadata } from "next";

import { getContent } from "@/data/content";
import { company } from "@/data/site";
import { TeamSection } from "@/features/about";
import { BlogSection } from "@/features/blog";
import { HeroSlider, StatsSection } from "@/features/home";
import { ServicesSection } from "@/features/services";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";
import { organizationJsonLd } from "@/lib";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { home } = getContent(locale).ui;

  return {
    title: home.metaTitle,
    description: home.metaDescription,
    alternates: localeAlternates(locale, ""),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const { heroActions, heroSlides, ui } = getContent(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for the organisation behind the site.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(company.siteUrl)),
        }}
      />
      <HeroSlider
        slides={heroSlides}
        actions={heroActions}
        labels={{
          region: ui.home.heroLabel,
          roleDescription: ui.home.heroRoleDescription,
          previous: ui.home.previousSlide,
          next: ui.home.nextSlide,
          slide: ui.home.slide,
        }}
      />
      <ServicesSection locale={locale} />
      <StatsSection locale={locale} />
      <TeamSection locale={locale} />
      <BlogSection locale={locale} />
    </>
  );
}
