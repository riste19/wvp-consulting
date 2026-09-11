import type { IconName } from "@/components/icons";
import { company } from "@/data/site/company";

export type ContactMethod = {
  title: string;
  description: string;
  /** Highlighted lines: phone numbers, an address, a platform name. */
  highlights: string[];
  note: string;
  icon: IconName;
  /** Optional link target for the first highlight. */
  href?: string;
};

export const contactMethods: ContactMethod[] = [
  {
    title: "Телефонска поддршка",
    description: "Разговарајте директно со нашите консултанти",
    highlights: [...company.phones],
    note: company.workingHours,
    icon: "phone",
    href: `tel:${company.phones[0].replace(/\s/g, "")}`,
  },
  {
    title: "Е-пошта поддршка",
    description: "Добијте детални одговори на вашите прашања",
    highlights: [company.email],
    note: "Одговараме во рок од 24 часа",
    icon: "mail",
    href: `mailto:${company.email}`,
  },
  {
    title: "Консултации во живо",
    description: "Закажете состанок во нашите канцеларии",
    highlights: ["Достапно во нашите канцеларии"],
    note: "Само со претходно закажување",
    icon: "users",
  },
  {
    title: "Онлајн консултации",
    description: "Видео повици за клиенти од далечина",
    highlights: ["Zoom, Teams или преферирана платформа"],
    note: "Флексибилно закажување",
    icon: "calendarDays",
  },
];

export const contactIntro = {
  title: "Дали сте подготвени да го подигнете вашиот бизнис на следното ниво?",
  subtitle: "Стапете во контакт со нашиот тим од професионалци уште денес",
  formHeading: "Поставете прашање — решете ја дилемата",
  methodsHeading: "Како можеме да ви помогнеме?",
  methodsSubtitle: "Изберете го најпогодниот начин за контакт со нашиот тим",
};
