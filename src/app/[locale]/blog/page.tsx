import type { Metadata } from "next";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import { articleCategories, getContent, sortedArticles } from "@/data/content";
import { ArticleGrid } from "@/features/blog";
import { localeAlternates } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { blog } = getContent(locale).ui;

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: localeAlternates(locale, "/blog"),
  };
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const locale = await resolveLocale(params);
  const { blog } = getContent(locale).ui;

  return (
    <section className="bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Reveal className="mb-10 text-center sm:mb-14">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {blog.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {blog.subtitle}
          </p>
          {blog.languageNote ? (
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
              {blog.languageNote}
            </p>
          ) : null}
        </Reveal>

        <ArticleGrid
          articles={sortedArticles}
          categories={articleCategories}
          locale={locale}
          labels={{
            all: blog.filterAll,
            filter: blog.filterLabel,
            empty: blog.emptyCategory,
            readMore: blog.readMore,
          }}
        />
      </Container>
    </section>
  );
}
