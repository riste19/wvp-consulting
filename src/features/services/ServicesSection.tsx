import { Reveal } from "@/components/motion";
import { Container, SectionHeading } from "@/components/ui";
import { homeServices } from "@/data/content";

import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section id="uslugi" className="bg-neutral-100 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Погледнете како можеме да ви помогнеме"
          size="display"
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06} className="h-full">
              <ServiceCard service={service} beamDelay={`${index * -4}s`} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
