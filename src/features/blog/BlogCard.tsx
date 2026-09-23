import Image from "next/image";
import Link from "next/link";

import { ArrowLink } from "@/components/ui";
import type { Article } from "@/data/content";
// Direct path for the same reason as `CategoryChip` — this card is rendered by
// the client-side `ArticleGrid`.
import { imageSizes } from "@/data/site/images";
import { languageTag, type Locale } from "@/i18n/locales";

import { CategoryChip } from "./CategoryChip";

type BlogCardProps = {
  article: Article;
  locale: Locale;
  readMoreLabel: string;
  /** Above-the-fold cards skip lazy loading. */
  priority?: boolean;
  /** Responsive `sizes` hint; depends on the grid the card sits in. */
  sizes?: string;
};

export function BlogCard({
  article,
  locale,
  readMoreLabel,
  priority = false,
  sizes = "(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw",
}: BlogCardProps) {
  const href = `/${locale}/blog/${article.slug}`;
  // The post is written in its author’s language, not the page’s.
  const lang = languageTag[article.language ?? "mk"];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={href} tabIndex={-1} aria-hidden className="block">
        <Image
          src={article.image}
          alt={article.title}
          width={imageSizes.article.width}
          height={imageSizes.article.height}
          sizes={sizes}
          priority={priority}
          className="h-52 w-full object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div lang={lang} className="mb-3 flex items-center">
          <CategoryChip category={article.category} />
        </div>

        <h3
          lang={lang}
          className="mb-3 line-clamp-2 text-xl font-semibold text-foreground"
        >
          <Link href={href} className="transition-colors hover:text-primary">
            {article.title}
          </Link>
        </h3>

        <p lang={lang} className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {article.excerpt}
        </p>

        <ArrowLink href={href} tone="primary" decorative className="mt-auto">
          {readMoreLabel}
        </ArrowLink>
      </div>
    </article>
  );
}
