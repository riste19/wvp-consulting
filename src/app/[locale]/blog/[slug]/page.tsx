import { ArrowLeft, CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import {
  articlesFor,
  canonicalLocaleOf,
  categoryTone,
  formatArticleDate,
  getArticleIn,
  getContent,
} from "@/data/content";
import { company, imageSizes } from "@/data/site";
import { BlogCard } from "@/features/blog";
import { isLocale, defaultLocale } from "@/i18n/locales";
import { resolveLocale } from "@/i18n/resolveLocale";
import { articleJsonLd, cn } from "@/lib";

/**
 * Run once per language, with the locale the parent segment generated, so a
 * post is only built into the country sites it was published to. A country
 * with no posts simply gets no pages here.
 */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return articlesFor(locale).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const article = getArticleIn(locale, slug);

  if (!article) return { title: getContent(locale).ui.blog.notFound };

  return {
    title: article.title,
    description: article.excerpt,
    // Articles are Macedonian on every country site, so one address is
    // canonical and the others are not indexed as duplicates of it.
    alternates: { canonical: `/${canonicalLocaleOf(article)}/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const article = getArticleIn(locale, slug);

  if (!article) notFound();

  const { blog } = getContent(locale).ui;
  const related = articlesFor(locale)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article, company.siteUrl)),
        }}
      />

      <article className="bg-background pb-16 pt-28 sm:pb-20 sm:pt-36">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-2 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft
                aria-hidden
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
              />
              {blog.backToPosts}
            </Link>

            {blog.languageNote ? (
              <p className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                {blog.languageNote}
              </p>
            ) : null}

            <div lang="mk">
              <p
                className={cn(
                  "mt-8 text-base font-medium",
                  categoryTone[article.category] === "accent"
                    ? "text-chart-2"
                    : "text-muted-foreground",
                )}
              >
                {article.category}
              </p>

              <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-base text-muted-foreground">
                <CalendarDays aria-hidden className="h-4 w-4" />
                <time dateTime={article.date}>
                  {formatArticleDate(article.date)}
                </time>
              </p>

              <Image
                src={article.image}
                alt={article.title}
                width={imageSizes.article.width}
                height={imageSizes.article.height}
                priority
                sizes="(min-width: 1024px) 832px, 100vw"
                className="mt-8 aspect-[2/1] w-full rounded-lg object-cover"
              />

              <div className="article-body mt-10">
                {article.body.map((block, index) => {
                  if (block.type === "h2") {
                    return <h2 key={index}>{block.text}</h2>;
                  }
                  if (block.type === "ul") {
                    return (
                      <ul key={index}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{block.text}</p>;
                })}
              </div>
            </div>
          </div>
        </Container>
      </article>

      <section className="bg-neutral-100 py-16 sm:py-20">
        <Container>
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {blog.related}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard
                key={item.slug}
                article={item}
                locale={locale}
                readMoreLabel={blog.readMore}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
