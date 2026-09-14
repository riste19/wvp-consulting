import { MapPin } from "lucide-react";
import Image from "next/image";

import { getContent } from "@/data/content";
import { companyText, images, imageSizes } from "@/data/site";
import type { Locale } from "@/i18n/locales";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Skopje%2C%20North%20Macedonia";

/**
 * Location panel: a photo of the office building that opens Google Maps. A
 * link rather than an embedded map, so the page carries no third-party script.
 */
export function MapPanel({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale).ui;
  const text = companyText[locale];
  const withCity = (template: string) =>
    template.replace("{city}", text.address.city);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={withCity(contact.openMapLabel)}
      >
        <Image
          src={images.contactMap}
          alt={withCity(contact.mapImageAlt)}
          width={imageSizes.contactMap.width}
          height={imageSizes.contactMap.height}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-72 w-full object-cover sm:h-96 lg:h-[28rem]"
        />
      </a>

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
        </div>
      </div>
    </div>
  );
}
