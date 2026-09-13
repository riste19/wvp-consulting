"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

// Types only. The copy arrives as props: importing the content barrel here
// would ship every page's text, the article corpus included, to the browser.
import type { RegionalOffice, regionalMap } from "@/data/content/about";

import { MAP_VIEWBOX, mapLabels, mapShapes } from "./regionMapShapes";

const COUNTDOWN_SECONDS = 3;

type RegionMapProps = {
  offices: RegionalOffice[];
  copy: typeof regionalMap;
};

/**
 * The group's countries on a map. Clicking one opens a short countdown and
 * then sends the visitor to that country's site, with a chance to cancel —
 * the same behaviour as the firm's previous site.
 *
 * Every office country is a focusable button, so the map works from the
 * keyboard too: Tab to a country, Enter or Space to choose, Escape to cancel.
 */
export function RegionMap({ offices, copy }: RegionMapProps) {
  const router = useRouter();
  const [pending, setPending] = useState<RegionalOffice | null>(null);
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const officesById = useMemo(
    () => new Map<string, RegionalOffice>(offices.map((office) => [office.id, office])),
    [offices],
  );

  const choose = (office: RegionalOffice) => {
    setSeconds(COUNTDOWN_SECONDS);
    setPending(office);
  };
  const cancel = () => setPending(null);

  // Countdown, Escape to cancel, and focus on Cancel while the dialog is open.
  useEffect(() => {
    if (!pending) return;

    cancelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPending(null);
    };
    const timer = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000,
    );

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pending]);

  useEffect(() => {
    if (!pending || seconds > 0) return;

    if (pending.href.startsWith("/")) router.push(pending.href);
    else window.location.assign(pending.href);
  }, [pending, seconds, router]);

  return (
    <>
      <figure className="mx-auto max-w-3xl">
        <svg
          viewBox={MAP_VIEWBOX}
          role="group"
          aria-label={copy.mapLabel}
          className="h-auto w-full"
        >
          {mapShapes.map(({ id, d }) => {
            const office = officesById.get(id);

            if (!office) {
              return (
                <path key={id} d={d} className="fill-[#d1dbdd] stroke-neutral-800" />
              );
            }

            return (
              <path
                key={id}
                d={d}
                role="button"
                tabIndex={0}
                aria-label={office.name}
                onClick={() => choose(office)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    choose(office);
                  }
                }}
                className="cursor-pointer fill-[#dc2626] stroke-neutral-800 outline-none transition-[fill] duration-200 hover:fill-[#b91c1c] focus-visible:fill-[#991b1b] focus-visible:stroke-[3]"
              />
            );
          })}

          {/* Painted last so the codes sit on top; clicks pass through to the country. */}
          <g aria-hidden className="pointer-events-none fill-white">
            {mapLabels.flatMap(({ id, d }) =>
              d.map((path, index) => <path key={`${id}-${index}`} d={path} />),
            )}
          </g>
        </svg>

        <figcaption className="mt-4 text-center text-sm text-muted-foreground">
          {copy.hint}
        </figcaption>
      </figure>

      {pending ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={cancel}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="region-redirect-title"
            aria-describedby="region-redirect-body"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-xl border border-border bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ArrowRight aria-hidden className="h-5 w-5 text-primary" />
              </span>
              <h3
                id="region-redirect-title"
                className="text-lg font-semibold text-gray-900"
              >
                {copy.dialogTitle}
              </h3>
            </div>

            <p id="region-redirect-body" className="mb-4 text-muted-foreground">
              {copy.dialogBody}{" "}
              <strong className="text-gray-900">{pending.name}</strong>.
            </p>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                {copy.countdown}{" "}
                <strong className="text-primary">
                  {seconds}
                  {copy.secondsSuffix}
                </strong>
              </span>
              <button
                ref={cancelRef}
                type="button"
                onClick={cancel}
                className="h-9 rounded-md border border-border bg-white px-4 text-sm font-medium text-gray-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {copy.cancel}
              </button>
            </div>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full bg-primary transition-[width] duration-1000 ease-linear motion-reduce:transition-none"
                style={{ width: `${(seconds / COUNTDOWN_SECONDS) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
