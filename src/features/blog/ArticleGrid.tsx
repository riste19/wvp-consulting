"use client";

import { useMemo, useState } from "react";

import type { Article } from "@/data/content";
import { cn } from "@/lib";

import { BlogCard } from "./BlogCard";

const ALL = "Сите";

type ArticleGridProps = {
  articles: Article[];
  categories: string[];
};

/** Article listing with client-side category filtering. */
export function ArticleGrid({ articles, categories }: ArticleGridProps) {
  const [selected, setSelected] = useState(ALL);

  const visible = useMemo(
    () =>
      selected === ALL
        ? articles
        : articles.filter((article) => article.category === selected),
    [articles, selected],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Филтрирај по категорија"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        {[ALL, ...categories].map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selected === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article, index) => (
          <BlogCard
            key={article.slug}
            article={article}
            priority={index < 3}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-lg text-muted-foreground">
          Нема објави во оваа категорија.
        </p>
      ) : null}
    </>
  );
}
