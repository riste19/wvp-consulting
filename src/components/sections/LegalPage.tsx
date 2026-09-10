import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import type { LegalDocument } from "@/data/content";

type LegalPageProps = {
  document: LegalDocument;
};

/** Shared shell for the privacy policy and terms of use pages. */
export function LegalPage({ document }: LegalPageProps) {
  return (
    <section className="bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Reveal className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            {document.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Последно ажурирање: {document.updated}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground">
            {document.intro}
          </p>

          <div className="article-body mt-10">
            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
