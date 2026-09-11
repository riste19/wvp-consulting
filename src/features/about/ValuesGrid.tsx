import { icons } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { values } from "@/data/content";

/**
 * "Нашите вредности" — one card per guiding principle.
 *
 * Hovering reddens the heading and lifts the shadow. Unlike the offer cards
 * there is no icon state to change: these icons are already brand red at rest.
 */
export function ValuesGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((value, index) => {
        const Icon = icons[value.icon];

        return (
          <Reveal key={value.title} delay={index * 0.06} className="h-full">
            <article className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-8">
              <Icon
                aria-hidden
                strokeWidth={1.2}
                className="h-10 w-10 text-primary"
              />

              <h3 className="mt-5 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                {value.title}
              </h3>

              <p className="mt-2 text-base text-muted-foreground">
                {value.description}
              </p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
