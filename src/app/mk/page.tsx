import type { Metadata } from "next";

import { company } from "@/data/site";
import { TeamSection } from "@/features/about";
import { BlogSection } from "@/features/blog";
import { HeroSlider, StatsSection } from "@/features/home";
import { ServicesSection } from "@/features/services";
import { organizationJsonLd } from "@/lib";

export const metadata: Metadata = {
  title: "WVP Consulting | Бизнис и финансиски консалтинг",
  description:
    "За клиентите го бираме најдоброто. Финансиски консалтинг, пристап до финансии, грантови и кофинансирање, бизнис развој и пристап до нови пазари — со над 4.650 успешно завршени проекти.",
  alternates: { canonical: "/mk" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for the organisation behind the site.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(company.siteUrl)),
        }}
      />
      <HeroSlider />
      <ServicesSection />
      <StatsSection />
      <TeamSection />
      <BlogSection />
    </>
  );
}
