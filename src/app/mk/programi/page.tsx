import { CalendarDays, Coins, Layers } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import {
  programmeProcess,
  programmes,
  programmesIntro,
  programmeStatusLabel,
} from "@/data/content";
import { images } from "@/data/site";
import { cn } from "@/lib";

export const metadata: Metadata = {
  title: "Програми",
  description:
    "Актуелни програми за неповратни средства и кофинансирање: ИПАРД 3, Фондот за иновации, ЕБРД, Креативна Европа и националните мерки за конкурентност.",
  alternates: { canonical: "/mk/programi" },
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        title={programmesIntro.title}
        subtitle={programmesIntro.subtitle}
        image={images.pageHero.programi}
        imageAlt="Документи и планови за апликација кон програми за финансиска поддршка"
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
                      <dt className="sr-only">Стапка на кофинансирање</dt>
                      <dd>
                        Кофинансирање{" "}
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
                      <dt className="sr-only">Рок</dt>
                      <dd>{programme.deadline}</dd>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers
                        aria-hidden
                        strokeWidth={1.6}
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      />
                      <dt className="sr-only">Сектори</dt>
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
            title="Како се движи еден проект"
            subtitle="Четири чекори од проверка на подобноста до исплата на средствата"
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
            <ButtonLink href="/mk/kontakt" variant="pill">
              Проверете дали сте подобни
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
