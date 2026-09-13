import Image from "next/image";

import { Reveal } from "@/components/motion";
import { ButtonLink, Container } from "@/components/ui";
import { getContent } from "@/data/content";
import { images, imageSizes } from "@/data/site";
import type { Locale } from "@/i18n/locales";

export function TeamSection({ locale }: { locale: Locale }) {
  const { teamSection, ui } = getContent(locale);

  return (
    <section id="tim" className="overflow-hidden bg-transparent py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 flex flex-col justify-center space-y-8 lg:order-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {teamSection.eyebrow}
            </span>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {teamSection.heading}
            </h2>

            <div className="space-y-4">
              {teamSection.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-lg leading-relaxed text-gray-600 sm:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4">
              <ButtonLink href={teamSection.ctaHref} variant="pill">
                {teamSection.ctaLabel}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative h-full w-full transition duration-500 hover:scale-[1.01] lg:max-h-[30em]">
              <Image
                src={images.team}
                alt={ui.about.teamImageAlt}
                width={imageSizes.team.width}
                height={imageSizes.team.height}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
