"use client";

import { useMemo, useState } from "react";

import type { Article } from "@/data/content";
import type { Locale } from "@/i18n/locales";
import { cn } from "@/lib";

import { BlogCard } from "./BlogCard";

type ArticleGridProps = {
  articles: Article[];
  categories: string[];
  locale: Locale;
  labels: {
    all: string;
    filter: string;
    empty: string;
    readMore: string;
  };
};

/** Article listing with client-side category filtering. */
export function ArticleGrid({
  articles,
  categories,
  locale,
  labels,
}: ArticleGridProps) {
  /** `null` is "all categories". */
  const [selected, setSelected] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      selected === null
        ? articles
        : articles.filter((article) => article.category === selected),
    [articles, selected],
  );

  const filters = [
    { value: null, label: labels.all },
    ...categories.map((category) => ({ value: category, label: category })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label={labels.filter}
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter.value ?? "all"}
            type="button"
            aria-pressed={selected === filter.value}
            onClick={() => setSelected(filter.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selected === filter.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article, index) => (
          <BlogCard
            key={article.slug}
            article={article}
            locale={locale}
            readMoreLabel={labels.readMore}
            priority={index < 3}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-lg text-muted-foreground">
          {labels.empty}
        </p>
      ) : null}
    </>
  );
}
