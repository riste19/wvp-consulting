import type { Metadata } from "next";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import { articleCategories, sortedArticles } from "@/data/content";
import { ArticleGrid } from "@/features/blog";

export const metadata: Metadata = {
  title: "Финансиски совети",
  description:
    "Финансиски новости, отворени повици за грантови, искуства од терен и успешни приказни на компании со кои работиме.",
  alternates: { canonical: "/mk/blog" },
};

export default function BlogPage() {
  return (
    <section className="bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Reveal className="mb-10 text-center sm:mb-14">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Финансиски совети
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Финансиските новости, нашите искуства и успешните приказни на едно
            место
          </p>
        </Reveal>

        <ArticleGrid articles={sortedArticles} categories={articleCategories} />
      </Container>
    </section>
  );
}
