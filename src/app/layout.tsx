import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { getContent } from "@/data/content";
import { company, images } from "@/data/site";

import "./globals.css";

const roboto = Roboto({
  // Macedonian needs U+0400-045F; Albanian's ë and ç are in latin-1, so
  // neither needs the -ext subsets, and every listed subset is preloaded.
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const { site } = getContent("mk").ui;

/**
 * Site-wide defaults. `[locale]/layout.tsx` replaces the language-specific
 * parts for every real page; these only reach the root 404.
 */
export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: site.title,
    template: `%s | ${company.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "mk_MK",
    siteName: company.name,
    title: site.title,
    description: site.shareDescription,
    images: [
      {
        url: images.openGraph,
        width: 1200,
        height: 630,
        alt: site.shareImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
    images: [images.openGraph],
  },
  robots: { index: true, follow: true },
};

/**
 * The one `<html>` for both languages, so its `lang` is the default. Each
 * locale layout sets `lang` on the wrapper around everything it renders,
 * which is what assistive tech and translation tools read for the content.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mk" className={`${roboto.variable} h-full`}>
      <head>
        {/* Scroll reveals start hidden; without JavaScript they never unhide. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
