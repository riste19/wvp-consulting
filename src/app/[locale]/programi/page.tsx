import { CalendarDays, Coins, Layers } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { getContent } from "@/data/content";
import { images } from "@/data/site";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";
import { cn } from "@/lib";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programi">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { programmes } = getContent(locale).ui;

  return {
    title: programmes.metaTitle,
    description: programmes.metaDescription,
    alternates: localeAlternates(locale, "/programi"),
  };
}

export default async function ProgrammesPage({
  params,
}: PageProps<"/[locale]/programi">) {
  const locale = await resolveLocale(params);
  const {
    programmeProcess,
    programmes,
    programmesIntro,
    programmeStatusLabel,
    ui,
  } = getContent(locale);

  return (
    <>
      <PageHero
        title={programmesIntro.title}
        subtitle={programmesIntro.subtitle}
        image={images.pageHero.programi}
        imageAlt={ui.programmes.heroImageAlt}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {programmesIntro.lead}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme, index) => (
              <Reveal
                key={programme.id}
                delay={index * 0.05}
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-8">
                  <span
                    className={cn(
                      "mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                      programme.status === "otvoren"
                        ? "bg-chart-2/10 text-chart-2"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {programmeStatusLabel[programme.status]}
                  </span>

                  <h2 className="text-xl font-bold leading-snug text-gray-900">
                    {programme.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {programme.funder}
                  </p>

                  <p className="mt-4 text-base leading-relaxed text-foreground">
                    {programme.description}
                  </p>

                  <dl className="mt-6 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Coins
                        aria-hidden
                        strokeWidth={1.6}
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      />
                      <dt className="sr-only">
                        {ui.programmes.coFinancingLabel}
                      </dt>
                      <dd>
                        {ui.programmes.coFinancing}{" "}
                        <strong className="font-semibold">
                          {programme.coRate}
                        </strong>{" "}
                        · {programme.maxAmount}
                      </dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <CalendarDays
                        aria-hidden
                        strokeWidth={1.6}
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      />
                      <dt className="sr-only">{ui.programmes.deadlineLabel}</dt>
                      <dd>{programme.deadline}</dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers
                        aria-hidden
                        strokeWidth={1.6}
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      />
                      <dt className="sr-only">{ui.programmes.sectorsLabel}</dt>
                      <dd>{programme.sectors.join(" · ")}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-neutral-100 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title={ui.programmes.processHeading}
            subtitle={ui.programmes.processSubtitle}
            className="mb-10 sm:mb-16"
          />

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {programmeProcess.map((item, index) => (
              <Reveal
                as="li"
                key={item.step}
                delay={index * 0.06}
                className="h-full"
              >
                <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                  <span className="text-4xl font-extrabold tracking-tight text-primary/25">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <ButtonLink href={`/${locale}/kontakt`} variant="pill">
              {ui.programmes.eligibilityCta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
