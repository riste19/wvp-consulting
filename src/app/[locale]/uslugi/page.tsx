import type { Metadata } from "next";
import Image from "next/image";

import { icons } from "@/components/icons";
import { BookMeetingTab } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { Container } from "@/components/ui";
import { getContent } from "@/data/content";
import { images, imageSizes } from "@/data/site";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";
import { cn } from "@/lib";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/uslugi">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { services } = getContent(locale).ui;

  return {
    title: services.metaTitle,
    description: services.metaDescription,
    alternates: localeAlternates(locale, "/uslugi"),
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/uslugi">) {
  const locale = await resolveLocale(params);
  const { services, ui } = getContent(locale);

  return (
    <>
      <PageHero
        title={ui.services.heroTitle}
        subtitle={ui.services.heroSubtitle}
        image={images.pageHero.uslugi}
        imageAlt={ui.services.heroImageAlt}
        overlay="light"
      />

      <BookMeetingTab
        href={`/${locale}/kontakt`}
        lines={ui.chrome.bookMeetingLines}
      />

      <div className="bg-white">
        <Container>
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            const imageFirst = index % 2 === 0;

            return (
              <section
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-naslov`}
                className={cn(
                  "py-14 sm:py-16",
                  index > 0 && "border-t border-border",
                )}
              >
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14">
                  <Reveal
                    className={cn(
                      "order-1",
                      imageFirst ? "lg:order-1" : "lg:order-2",
                    )}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={service.image}
                        alt={`${ui.services.serviceImageAlt} ${service.title}`}
                        width={imageSizes.service.width}
                        height={imageSizes.service.height}
                        sizes="(min-width: 1024px) 400px, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.08}
                    className={cn(
                      "order-2",
                      imageFirst ? "lg:order-2" : "lg:order-1",
                    )}
                  >
                    <h2
                      id={`${service.id}-naslov`}
                      className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl"
                    >
                      {service.title}
                    </h2>

                    <p className="mt-3 flex items-start gap-2 text-base font-semibold text-primary">
                      <Icon
                        aria-hidden
                        strokeWidth={1.6}
                        className="mt-0.5 h-5 w-5 shrink-0"
                      />
                      <span>{service.tagline}</span>
                    </p>

                    <p className="mt-5 text-lg leading-relaxed text-foreground">
                      {service.description}
                    </p>

                    <ul className="mt-6 list-disc space-y-2 pl-5 text-base font-semibold text-foreground">
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </section>
            );
          })}
        </Container>
      </div>
    </>
  );
}
