import type { Article } from "@/data/content";
// Direct path, not the barrel. `@/lib` is re-exported to client components for
// `cn`, and a barrel import here made the whole site data layer — navigation,
// and through it the services catalogue — part of every page's JavaScript.
import { company } from "@/data/site/company";
import { languageTag, type Locale } from "@/i18n/locales";

/** Organisation structured data for the homepage. */
export function organizationJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: company.nameMk,
    url: siteUrl,
    email: company.email,
    telephone: company.phones,
    description: company.description,
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressCountry: "MK",
    },
    sameAs: [company.social.linkedin],
  };
}

/** Article structured data for a single blog post. */
/** `canonical` is the country site the post is indexed under; see `canonicalLocaleOf`. */
export function articleJsonLd(article: Article, siteUrl: string, canonical: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    inLanguage: languageTag[article.language ?? "mk"],
    image: `${siteUrl}${article.image}`,
    articleSection: article.category,
    mainEntityOfPage: `${siteUrl}/${canonical}/blog/${article.slug}`,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name },
  };
}
