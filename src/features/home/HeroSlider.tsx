"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { ButtonLink, Container } from "@/components/ui";
// Direct path, not the barrel: the barrel reaches every page's copy and the
// article corpus, and this is a client component. The slides themselves
// arrive as props, in the page's language.
import {
  HERO_INTERVAL,
  type HeroSlide,
  type heroActions,
} from "@/data/content/hero";
import { cn } from "@/lib";

type HeroSliderProps = {
  slides: HeroSlide[];
  actions: typeof heroActions;
  labels: {
    region: string;
    roleDescription: string;
    previous: string;
    next: string;
    slide: string;
  };
};

/**
 * The headline, subtitle and buttons animate in via the `.hero-rise` classes in
 * `globals.css`. The text block carries `key={index}`, so changing slides
 * remounts it and the entrance replays — which is all the animation library
 * that used to live here was doing, at 41 KB gzipped. Reduced motion is handled
 * by the stylesheet, alongside every other animation on the site.
 */
export function HeroSlider({ slides, actions, labels }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayAllowed, setAutoplayAllowed] = useState(true);

  // Auto-advancing content is disabled for visitors who prefer reduced motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAutoplayAllowed(!query.matches);
    const frame = requestAnimationFrame(sync);
    query.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (paused || !autoplayAllowed) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % slides.length),
      HERO_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [paused, autoplayAllowed, slides.length]);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const active = slides[index];

  return (
    <section
      role="region"
      aria-roledescription={labels.roleDescription}
      aria-label={labels.region}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative h-svh min-h-[560px] overflow-hidden"
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.image}
          aria-hidden={slideIndex !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <Container>
          {/* The key is the animation trigger: a new slide means a new element,
              and the entrance plays again from the top. */}
          <div key={index} className="max-w-3xl">
            <h1 className="hero-rise hero-rise--title mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {active.title}
            </h1>

            <p className="hero-rise hero-rise--subtitle mb-8 text-lg text-gray-200 sm:text-xl">
              {active.subtitle}
            </p>

            <div className="hero-rise hero-rise--actions flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={actions.primary.href} className="w-fit">
                {actions.primary.label}
              </ButtonLink>
              <ButtonLink
                href={actions.secondary.href}
                variant="onImage"
                className="w-fit"
              >
                {actions.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label={labels.previous}
        className="absolute left-4 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-white transition-colors duration-300 hover:bg-white/20"
      >
        <ChevronLeft aria-hidden className="h-8 w-8" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label={labels.next}
        className="absolute right-4 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-white transition-colors duration-300 hover:bg-white/20"
      >
        <ChevronRight aria-hidden className="h-8 w-8" />
      </button>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`${labels.slide} ${slideIndex + 1}: ${slide.title}`}
            aria-current={slideIndex === index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              slideIndex === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
