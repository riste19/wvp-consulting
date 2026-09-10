import { CircleCheck } from "lucide-react";

import { Reveal } from "@/components/motion";
import { offerGroups } from "@/data/content";

/**
 * "Што нудиме" — one card per offer group.
 *
 * Hovering a card is what drives the whole treatment: the heading turns red and
 * the outlined icon fills into a red tile with a white glyph. Every piece is a
 * `group-hover:` variant on the card, so the states can never drift apart.
 */
export function OfferGroups() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {offerGroups.map((group, index) => {
        const Icon = group.icon;

        return (
          <Reveal key={group.title} delay={index * 0.06} className="h-full">
            <article className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-8">
              <span className="mb-6 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-transparent transition-all duration-300 group-hover:bg-linear-to-br group-hover:from-[#d9414f] group-hover:to-[#b91c2e] group-hover:shadow-lg group-hover:shadow-primary/30">
                <Icon
                  aria-hidden
                  strokeWidth={1.6}
                  className="h-9 w-9 text-primary transition-colors duration-300 group-hover:text-white"
                />
              </span>

              <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                {group.title}
              </h3>

              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CircleCheck
                      aria-hidden
                      strokeWidth={2}
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    />
                    <span className="text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
