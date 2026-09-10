import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { company, images } from "@/data/site";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "WVP Consulting | Бизнис и финансиски консалтинг",
    template: `%s | ${company.name}`,
  },
  description:
    "ВФП Плус Консалтинг обезбедува финансиски и бизнис консалтинг, пристап до финансии, грантови и кофинансирање, маркетинг и пристап до нови пазари за компании во Северна Македонија и регионот.",
  keywords: [
    "финансиски консалтинг",
    "бизнис консалтинг",
    "грантови",
    "кофинансирање",
    "ИПАРД",
    "пристап до финансии",
    "инвестиции",
    "бизнис план",
    "Скопје",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "mk_MK",
    siteName: company.name,
    title: "WVP Consulting | Бизнис и финансиски консалтинг",
    description:
      "Партнер во процесот на раст: пристап до финансии, грантови, бизнис планирање и развој на нови пазари.",
    images: [
      {
        url: images.openGraph,
        width: 1200,
        height: 630,
        alt: "ВФП Плус Консалтинг",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WVP Consulting | Бизнис и финансиски консалтинг",
    description:
      "Партнер во процесот на раст: пристап до финансии, грантови, бизнис планирање и развој на нови пазари.",
    images: [images.openGraph],
  },
  robots: { index: true, follow: true },
};

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
