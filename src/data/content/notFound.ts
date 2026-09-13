import type { Locale } from "@/i18n/locales";

/**
 * 404 copy, kept apart and tiny. A static export has one 404.html for every
 * missing path, so the page picks its language in the browser from the URL —
 * which means this module ships as JavaScript. Nothing else belongs here.
 */
export const notFoundCopy: Record<
  Locale,
  { title: string; body: string; home: string; contact: string }
> = {
  mk: {
    title: "Страницата не е пронајдена",
    body: "Линкот што го отворивте не постои или е преместен. Вратете се на почетната страница или контактирајте нè директно.",
    home: "Почетна страница",
    contact: "Контактирајте нè",
  },
  sq: {
    title: "Faqja nuk u gjet",
    body: "Lidhja që hapët nuk ekziston ose është zhvendosur. Kthehuni në faqen kryesore ose na kontaktoni drejtpërdrejt.",
    home: "Faqja kryesore",
    contact: "Na kontaktoni",
  },
};
