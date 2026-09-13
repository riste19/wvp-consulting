import type { Metadata } from "next";

import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import {
  aboutIntro,
  careers,
  missionStatement,
  regionalMap,
} from "@/data/content";
import { images } from "@/data/site";
import {
  OfferGroups,
  RegionMap,
  TeamSection,
  Timeline,
  ValuesGrid,
} from "@/features/about";

export const metadata: Metadata = {
  title: "За нас",
  description:
    "ВФП Плус Консалтинг е дел од австриската WVP GROUP со традиција од 1985 година. Запознајте ја нашата приказна, вредности и тимот што стои зад над 4.650 реализирани проекти.",
  alternates: { canonical: "/mk/za-nas" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Нашата компанија"
        subtitle="Посветени на обезбедување сеопфатен финансиски и пазарен консалтинг."
        image={images.pageHero.zaNas}
        imageAlt="Рецепција и работен простор во канцелариите на компанијата"
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
            <RegionMap />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Историјат на развој"
            subtitle="Од Скопје до пазарот на Европската Унија — раст на групацијата во регионот"
            className="mb-10 sm:mb-16"
          />

          <Timeline />
        </Container>
      </section>

      <section className="bg-neutral-100 py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Што нудиме"
            subtitle="Целосен опфат на услуги за финансирање, пазарен настап и известување"
            className="mb-10 sm:mb-16"
          />

          <OfferGroups />
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

      <TeamSection />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Нашите вредности"
            subtitle="Принципите што ја водат нашата работа и го обликуваат нашиот ангажман"
            className="mb-10 sm:mb-16"
          />

          <ValuesGrid />
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
