import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui";
import { imageSizes } from "@/data/site";
import { cn } from "@/lib";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  /** How heavily the photograph is dimmed behind the type. */
  overlay?: "dark" | "light";
  children?: ReactNode;
};

/** Full-bleed photographic banner used at the top of every inner page. */
export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  overlay = "dark",
  children,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[420px] items-center overflow-hidden sm:min-h-[500px] lg:min-h-[560px]">
      <Image
        src={image}
        alt={imageAlt}
        width={imageSizes.pageHero.width}
        height={imageSizes.pageHero.height}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          overlay === "dark" ? "bg-black/55" : "bg-black/40",
        )}
      />

      <Container className="relative z-10 pt-16 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-200 sm:text-xl">
            {subtitle}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
