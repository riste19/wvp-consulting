import type { Metadata } from "next";

import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { getContent } from "@/data/content";
import { images } from "@/data/site";
import {
  OfferGroups,
  RegionMap,
  TeamSection,
  Timeline,
  ValuesGrid,
} from "@/features/about";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/za-nas">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { about } = getContent(locale).ui;

  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: localeAlternates(locale, "/za-nas"),
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/za-nas">) {
  const locale = await resolveLocale(params);
  const {
    aboutIntro,
    careers,
    missionStatement,
    regionalMap,
    regionalOffices,
    ui,
  } = getContent(locale);

  return (
    <>
      <PageHero
        title={ui.about.heroTitle}
        subtitle={ui.about.heroSubtitle}
        image={images.pageHero.zaNas}
        imageAlt={ui.about.heroImageAlt}
      />

      <section className="bg-background py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              {aboutIntro.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {aboutIntro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-lg leading-relaxed text-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 sm:mt-20">
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">
              {regionalMap.heading}
            </h3>
            <RegionMap offices={regionalOffices} copy={regionalMap} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title={ui.about.historyHeading}
            subtitle={ui.about.historySubtitle}
            className="mb-10 sm:mb-16"
          />

          <Timeline locale={locale} />
        </Container>
      </section>

      <section className="bg-neutral-100 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title={ui.about.offerHeading}
            subtitle={ui.about.offerSubtitle}
            className="mb-10 sm:mb-16"
          />

          <OfferGroups locale={locale} />
        </Container>
      </section>

      <section className="bg-primary py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
              {missionStatement}
            </p>
          </Reveal>
        </Container>
      </section>

      <TeamSection locale={locale} />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title={ui.about.valuesHeading}
            subtitle={ui.about.valuesSubtitle}
            className="mb-10 sm:mb-16"
          />

          <ValuesGrid locale={locale} />
        </Container>
      </section>

      <section id="kariera" className="bg-primary py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {careers.heading}
            </h2>
            <p className="mt-4 text-lg text-neutral-100 sm:text-xl">
              {careers.description}
            </p>
            <div className="mt-8">
              <ButtonLink href={careers.ctaHref} variant="onPrimary">
                {careers.ctaLabel}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
