import { icons } from "@/components/icons";
import { BorderBeam } from "@/components/motion";
import { ArrowLink } from "@/components/ui";
import { getContent, serviceHref, type Service } from "@/data/content";
import type { Locale } from "@/i18n/locales";

type ServiceCardProps = {
  service: Service;
  locale: Locale;
  /** Staggers the travelling border light between neighbouring cards. */
  beamDelay?: string;
};

export function ServiceCard({
  service,
  locale,
  beamDelay = "0s",
}: ServiceCardProps) {
  const Icon = icons[service.icon];
  const { home } = getContent(locale).ui;

  return (
    <article className="group relative h-full min-h-[300px] w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-red-200/50">
      <BorderBeam delay={beamDelay} />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        <div className="mb-6 flex items-start">
          <Icon
            aria-hidden
            strokeWidth={1.2}
            className="h-12 w-12 text-[#b91c1c] transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="mt-6 mb-2 text-xl font-bold leading-snug tracking-wide text-gray-900 sm:text-2xl">
          {service.cardTitle}
        </h3>

        <ArrowLink
          href={serviceHref(service.id, locale)}
          srSuffix={`${home.learnMoreAbout} ${service.title}`}
          className="mt-auto"
        >
          {home.learnMore}
        </ArrowLink>
      </div>
    </article>
  );
}
