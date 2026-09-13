import Image from "next/image";
import Link from "next/link";

import { Container, LinkedInIcon } from "@/components/ui";
import { getContent } from "@/data/content";
import {
  company,
  companyText,
  currentYear,
  getFooterColumns,
  getLegalLinks,
  images,
  imageSizes,
} from "@/data/site";
import type { Locale } from "@/i18n/locales";

import { LogoPlaceholder } from "./LogoPlaceholder";

export function Footer({ locale }: { locale: Locale }) {
  const { chrome } = getContent(locale).ui;
  const footerColumns = getFooterColumns(locale);
  const legalLinks = getLegalLinks(locale);

  return (
    <footer className="relative overflow-hidden py-16 text-white">
      <Image
        src={images.footerBackground}
        alt=""
        aria-hidden
        width={imageSizes.footerBackground.width}
        height={imageSizes.footerBackground.height}
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black opacity-70" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center">
              <LogoPlaceholder variant="footer" lines={chrome.logoLines} />
            </div>
            <p className="mb-6 max-w-md text-gray-300">
              {companyText[locale].tagline}
            </p>
            <div className="flex space-x-4">
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-primary"
                aria-label={chrome.linkedinLabel}
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-lg font-semibold">{column.title}</h2>
              <ul className="space-y-2 text-gray-300">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/20 pt-8 text-sm text-gray-400 md:flex-row md:justify-between">
          <p>
            © {currentYear} {company.name}. {chrome.rightsReserved}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
