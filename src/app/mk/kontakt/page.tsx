import type { Metadata } from "next";

import { icons } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/sections";
import { Container, SectionHeading } from "@/components/ui";
import { contactIntro, contactMethods } from "@/data/content";
import { images } from "@/data/site";
import { ContactForm, MapPanel } from "@/features/contact";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Стапете во контакт со тимот на ВФП Плус Консалтинг — телефон, е-пошта, состанок во канцеларија или онлајн консултација.",
  alternates: { canonical: "/mk/kontakt" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={contactIntro.title}
        subtitle={contactIntro.subtitle}
        image={images.pageHero.kontakt}
        imageAlt="Консултанти на работа во канцеларијата на компанијата"
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <MapPanel />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-xl bg-muted p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
                  {contactIntro.formHeading}
                </h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <Container>
          <SectionHeading
            title={contactIntro.methodsHeading}
            subtitle={contactIntro.methodsSubtitle}
            className="mb-10 sm:mb-16"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => {
              const Icon = icons[method.icon];
              return (
                <Reveal
                  key={method.title}
                  delay={index * 0.06}
                  className="h-full"
                >
                  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Icon
                        aria-hidden
                        strokeWidth={1.5}
                        className="mt-0.5 h-6 w-6 shrink-0 text-[#b91c1c]"
                      />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {method.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-base text-muted-foreground">
                      {method.description}
                    </p>

                    <div className="mt-4 space-y-1">
                      {method.highlights.map((highlight, highlightIndex) => (
                        <p
                          key={highlight}
                          className="text-base font-semibold text-foreground"
                        >
                          {method.href && highlightIndex === 0 ? (
                            <a
                              href={
                                highlightIndex === 0 && method.href
                                  ? method.href
                                  : undefined
                              }
                              className="transition-colors hover:text-primary"
                            >
                              {highlight}
                            </a>
                          ) : (
                            highlight
                          )}
                        </p>
                      ))}
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      {method.note}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
