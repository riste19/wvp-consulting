import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import type { LegalDocument } from "@/data/content";

type LegalPageProps = {
  document: LegalDocument;
  /**
   * Shown above the document when the page's language is not Macedonian. The
   * legal texts exist only in Macedonian.
   */
  languageNote?: string;
};

/** Shared shell for the privacy policy and terms of use pages. */
export function LegalPage({ document, languageNote }: LegalPageProps) {
  return (
    <section className="bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Reveal className="mx-auto max-w-3xl">
          {languageNote ? (
            <p className="mb-8 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
              {languageNote}
            </p>
          ) : null}

          <div lang="mk">
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
