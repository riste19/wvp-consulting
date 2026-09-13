import { Reveal } from "@/components/motion";
import { Container, SectionHeading } from "@/components/ui";
import { getContent } from "@/data/content";
import type { Locale } from "@/i18n/locales";

import { ServiceCard } from "./ServiceCard";

export function ServicesSection({ locale }: { locale: Locale }) {
  const { homeServices, ui } = getContent(locale);

  return (
    <section id="uslugi" className="bg-neutral-100 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title={ui.home.servicesHeading}
          size="display"
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06} className="h-full">
              <ServiceCard
                service={service}
                locale={locale}
                beamDelay={`${index * -4}s`}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
