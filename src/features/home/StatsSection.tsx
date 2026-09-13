import { AnimatedCounter, Reveal } from "@/components/motion";
import { Container, SectionHeading } from "@/components/ui";
import { getContent } from "@/data/content";
import type { Locale } from "@/i18n/locales";

export function StatsSection({ locale }: { locale: Locale }) {
  const { stats, statsHeading } = getContent(locale);

  return (
    <section className="bg-primary py-16 sm:py-20">
      <Container className="px-4">
        <SectionHeading
          title={statsHeading.title}
          subtitle={statsHeading.subtitle}
          tone="light"
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className="flex flex-col items-center px-4 text-center"
            >
              <div className="mb-4 flex items-start text-white">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  separator={locale === "en" ? "," : "."}
                  prefixClassName="text-3xl font-semibold mt-2 mr-1 sm:text-4xl"
                  className="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
                />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-neutral-100 sm:text-xl">
                {stat.label}
              </h3>
              <p className="max-w-xs text-base text-neutral-300">
                {stat.description}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <p className="text-lg italic text-gray-300 sm:text-xl">
            {statsHeading.footnote}
          </p>
        </div>
      </Container>
    </section>
  );
}
