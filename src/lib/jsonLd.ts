import type { Article } from "@/data/content";
import { company } from "@/data/site";

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
export function articleJsonLd(article: Article, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    inLanguage: "mk-MK",
    image: `${siteUrl}${article.image}`,
    articleSection: article.category,
    mainEntityOfPage: `${siteUrl}/mk/blog/${article.slug}`,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name },
  };
}
