"use client";

import { Check, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Direct path, not the barrel: the barrel re-exports `navigation`, which
// reaches the services catalogue. See the note in `Header`.
import { languages } from "@/data/site/languages";
import { cn } from "@/lib";

type LanguageSelectorProps = {
  className?: string;
};

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const current = languages[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Јазик: ${current.label}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-black/10",
          className,
        )}
      >
        <Globe aria-hidden className="h-4 w-4" />
        <span>{current.code}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-border bg-white shadow-xl"
        >
          {languages.map((language) => (
            <span
              key={language.code}
              role="menuitemradio"
              aria-checked
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-foreground"
            >
              {language.label}
              <Check aria-hidden className="h-4 w-4 text-primary" />
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
