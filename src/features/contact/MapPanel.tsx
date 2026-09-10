import { MapPin } from "lucide-react";
import Image from "next/image";

import { company, images, imageSizes } from "@/data/site";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Skopje%2C%20North%20Macedonia";

/**
 * Location panel. Uses a static placeholder still rather than an embedded map
 * so the page carries no third-party script; swap the image for a live embed
 * (or the licensed office photo) when the exact address is confirmed.
 */
export function MapPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Отвори ја локацијата во ${company.address.city} на Google Карти`}
      >
        <Image
          src={images.contactMap}
          alt={`Мапа со локацијата на канцеларијата во ${company.address.city}`}
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
            {company.legalName}
          </p>
          <address className="mt-1 not-italic text-base text-muted-foreground">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.country}
          </address>
        </div>
      </div>
    </div>
  );
}
