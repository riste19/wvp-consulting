import { MapPin } from "lucide-react";

import { getContent } from "@/data/content";
import { companyText } from "@/data/site";
import type { Locale } from "@/i18n/locales";

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

/** Google's keyless embed. Needs `https://www.google.com` in the CSP frame-src. */
const embedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;

/**
 * Location panel: a live Google map pinned on the office of the country whose
 * site this is, with the address underneath.
 */
export function MapPanel({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale).ui;
  const text = companyText[locale];
  const withCity = (template: string) =>
    template.replace("{city}", text.address.city);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <iframe
        src={embedUrl(text.mapQuery)}
        title={withCity(contact.mapTitle)}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-72 w-full border-0 sm:h-96 lg:h-112"
      />

      <div className="flex items-start gap-3 p-6">
        <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-base font-semibold text-foreground">
            {text.legalName}
          </p>
          <address className="mt-1 not-italic text-base text-muted-foreground">
            {text.address.street}
            <br />
            {text.address.city}, {text.address.country}
          </address>
          <a
            href={mapsUrl(text.mapQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            {withCity(contact.openMapLabel)}
          </a>
        </div>
      </div>
    </div>
  );
}
