import { Reveal } from "@/components/motion";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { getContent, latestArticles } from "@/data/content";
import type { Locale } from "@/i18n/locales";

import { BlogCard } from "./BlogCard";

export function BlogSection({ locale }: { locale: Locale }) {
  const { blog } = getContent(locale).ui;

  return (
    <section id="blog" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          title={blog.sectionHeading}
          subtitle={blog.sectionSubtitle}
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-2">
          {latestArticles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.05} className="h-full">
              <BlogCard
                article={article}
                locale={locale}
                readMoreLabel={blog.readMore}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <ButtonLink href={`/${locale}/blog`}>{blog.allPosts}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
