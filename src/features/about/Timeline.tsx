import { CalendarDays, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion";
import { getContent } from "@/data/content";
import type { Locale } from "@/i18n/locales";
import { cn } from "@/lib";

/**
 * The group's expansion history as a zig-zag timeline: a centre rail with a
 * marker per entry, cards alternating left and right.
 *
 * Below `lg` there is not enough width for two columns, so the rail moves to
 * the left edge and every card sits to the right of it in one column.
 */
export function Timeline({ locale }: { locale: Locale }) {
  const { timeline } = getContent(locale);

  return (
    <ol className="relative mx-auto max-w-5xl">
      <span
        aria-hidden
        className="absolute inset-y-0 left-1.75 w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
      />

      {timeline.map((entry, index) => {
        const onLeft = index % 2 === 0;

        return (
          <Reveal
            as="li"
            key={`${entry.year}-${entry.location}`}
            delay={index * 0.05}
            className="relative mb-8 pl-8 last:mb-0 lg:mb-12 lg:pl-0"
          >
            {/* Spacing is margin, not padding, so the row box is exactly the
                card — which lets the marker centre itself against it. */}
            <span
              aria-hidden
              className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-primary ring-4 ring-white lg:left-1/2 lg:-translate-x-1/2"
            />

            <div
              className={cn(
                "lg:w-1/2",
                onLeft ? "lg:pr-8" : "lg:ml-auto lg:pl-8",
              )}
            >
              <article
                className={cn(
                  "group rounded-lg border-l-4 border-primary bg-card p-5 shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-6",
                  onLeft && "lg:text-right",
                )}
              >
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-x-3 gap-y-2",
                    onLeft && "lg:justify-end",
                  )}
                >
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    <CalendarDays aria-hidden className="h-4 w-4" />
                    {entry.year}
                  </span>

                  {entry.note ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {entry.note}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-base font-bold uppercase tracking-wide text-gray-900 transition-colors duration-300 group-hover:text-primary sm:text-lg">
                  {entry.company}
                </h3>

                <p
                  className={cn(
                    "mt-2 flex items-start gap-1.5 text-sm text-muted-foreground sm:text-base",
                    onLeft && "lg:justify-end",
                  )}
                >
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{entry.location}</span>
                </p>
              </article>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
