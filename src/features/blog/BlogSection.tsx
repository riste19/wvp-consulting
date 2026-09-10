import { Reveal } from "@/components/motion";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { latestArticles } from "@/data/content";

import { BlogCard } from "./BlogCard";

export function BlogSection() {
  return (
    <section id="blog" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Финансиите низ секојдневната пракса"
          subtitle="Дознајте повеќе за финансиските новости, нашите искуства и успешни приказни"
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-2">
          {latestArticles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.05} className="h-full">
              <BlogCard article={article} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <ButtonLink href="/mk/blog">Сите објави</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
