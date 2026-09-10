# ВФП Плус Консалтинг — веб-страница (MK)

Македонска презентациска страница за бизнис и финансиски консалтинг на
**ВФП Плус Консалтинг ДОО Скопје**, дел од австриската **WVP GROUP** (основана
1985, присутна во 10 земји од Југоисточна Европа).

Изградена е со Next.js App Router, TypeScript и Tailwind CSS v4, целосно
статички генерирана (SSG) и на кирилица.

---

## Содржина

1. [Технологии](#технологии)
2. [Стартување локално](#стартување-локално)
3. [Рути](#рути)
4. [Структура на кодот](#структура-на-кодот)
5. [Конвенции за увоз](#конвенции-за-увоз)
6. [Слој на содржина](#слој-на-содржина)
7. [Дизајн систем](#дизајн-систем)
8. [Компоненти](#компоненти)
9. [Функционални модули](#функционални-модули)
10. [Анимации и движење](#анимации-и-движење)
11. [Слики](#слики)
12. [Контакт форма](#контакт-форма)
13. [SEO и метаподатоци](#seo-и-метаподатоци)
14. [Пристапност](#пристапност)
15. [Билд и објавување](#билд-и-објавување)
16. [Познати ограничувања](#познати-ограничувања)
17. [Сопственост](#сопственост)

---

## Технологии

| Пакет | Верзија | Улога |
| --- | --- | --- |
| `next` | 16.3.4 | App Router, статичка генерација, Turbopack |
| `react` / `react-dom` | 19.2.8 | UI слој |
| `typescript` | ^5 | Строги типови низ целиот код |
| `tailwindcss` | ^4 | Стилови преку `@tailwindcss/postcss` |
| `framer-motion` | ^13.2.0 | Откривања при скролање, слајдер |
| `lucide-react` | ^1.44.0 | Икони |
| `eslint` + `eslint-config-next` | ^9 / 16.3.4 | Линтирање |

> **Tailwind v4 без конфигурациски фајл.** Нема `tailwind.config.js` — токените
> се дефинираат директно во `src/app/globals.css` преку `@theme inline`.
> Внимавајте: v4 ги преименува градиентите, `bg-gradient-to-*` → `bg-linear-to-*`.

> **Next.js 16 има кршечки промени** во однос на постарите верзии. Фајлот
> `AGENTS.md` (и `CLAUDE.md` што покажува кон него) се автоматски запишани од
> `next dev` и упатуваат кон документацијата во `node_modules/next/dist/docs/`.

---

## Стартување локално

Потребно: **Node.js 20+** и npm.

```bash
npm install
npm run dev          # http://localhost:3000  →  пренасочува на /mk
```

Сите скрипти:

```bash
npm run dev          # развојен сервер (Turbopack)
npm run build        # продукциска верзија, 25 статички рути
npm run start        # сервира ја веќе изградената верзија
npm run lint         # ESLint
npm run placeholders # регенерира ги привремените слики во public/images
npx tsc --noEmit     # проверка на типови без билд
```

Нема потребни променливи на околина. `.gitignore` веќе ги исклучува `.env*`,
`node_modules/`, `.next/` и `.vercel`.

---

## Рути

Сите страници се статички генерирани при билд (25 рути вкупно).

| Патека | Опис |
| --- | --- |
| `/` | Пренасочува на `/mk` |
| `/mk` | Почетна — банер слајдер, услуги, статистики, тим, објави |
| `/mk/uslugi` | Седум услуги со детален опис и испораки |
| `/mk/programi` | Шест актуелни програми и повици, со статус и процес |
| `/mk/za-nas` | Историјат, што нудиме, мисија, тим, вредности, кариера |
| `/mk/kontakt` | Контакт форма, начини на контакт, мапа |
| `/mk/blog` | Преглед на 11 објави со филтер по категорија |
| `/mk/blog/[slug]` | Поединечна објава (11 статички генерирани) |
| `/mk/politika-za-privatnost` | Политика за приватност |
| `/mk/uslovi-za-koristenje` | Услови за користење |
| `/robots.txt`, `/sitemap.xml` | Генерирани од `app/robots.ts` и `app/sitemap.ts` |
| `/icon.svg` | Favicon |

Двете `not-found.tsx` (корен и `/mk`) покриваат непостоечки патеки; онаа под
`/mk` е во рамките на заглавието и подножјето.

Патеките се на македонски по дизајн — `/mk/uslugi` наместо `/mk/services` —
за да одговараат на живата страница и заради SEO на локалниот пазар.

---

## Структура на кодот

Кодот е поделен во **четири слоја**: рути, споделени компоненти, функционални
модули и содржина. Правилото е едноставно — компонента што ја користат две или
повеќе страници живее во `components/`, а компонента врзана за една страница или
тема живее во `features/`.

```
src/
  app/                             # САМО рутирање, ништо друго
    layout.tsx                     # <html lang="mk">, Roboto, основна метадата
    globals.css                    # дизајн токени, reveal и border-beam анимации
    page.tsx                       # / → redirect на /mk
    icon.svg  robots.ts  sitemap.ts  not-found.tsx
    mk/
      layout.tsx                   # Header + <main> + Footer + skip link
      page.tsx                     # почетна
      not-found.tsx
      uslugi/page.tsx
      programi/page.tsx
      za-nas/page.tsx
      kontakt/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx         # generateStaticParams за сите објави
      politika-za-privatnost/page.tsx
      uslovi-za-koristenje/page.tsx

  components/                      # без врска со конкретна страница
    ui/          Button, ButtonLink, Container, SectionHeading,
                 ArrowLink, LinkedInIcon
    motion/      Reveal, BorderBeam, AnimatedCounter
    layout/      Header, MobileMenu, LanguageSelector, Footer,
                 BookMeetingTab, LogoPlaceholder
    sections/    PageHero, LegalPage, NotFoundContent

  features/                        # секој модул ја држи својата логика
    home/        HeroSlider, StatsSection
    services/    ServiceCard, ServicesSection
    blog/        BlogCard, CategoryChip, ArticleGrid, BlogSection
    about/       Timeline, OfferGroups, ValuesGrid, TeamSection
    contact/     ContactForm, MapPanel, submitContactForm

  data/                            # ЦЕЛАТА видлива содржина
    site/        company, navigation, footer, images
    content/     hero, services, articles, programmes, about,
                 stats, contact, legal

  lib/           cn, jsonLd

scripts/         generate-placeholders.mjs
public/images/   30 привремени слики (hero, team, page, services, blog, footer, og)
```

Секоја папка има `index.ts` (barrel) што го дефинира нејзиниот јавен интерфејс.

---

## Конвенции за увоз

```ts
// Меѓу папки → преку barrel
import { Reveal } from "@/components/motion";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { services } from "@/data/content";
import { images } from "@/data/site";
import { ServiceCard } from "@/features/services";
import { cn } from "@/lib";

// Во иста папка → релативно
import { BlogCard } from "./BlogCard";
```

**Единствен исклучок:** модулите **внатре во `src/data`** се повикуваат по полна
патека, не преку barrel:

```ts
// во src/data/site/navigation.ts
import { serviceHref, services } from "@/data/content/services";   // ✅
import { services } from "@/data/content";                          // ❌ кружно
```

Причината е реална кружна зависност: `data/site/navigation` увезува од
`data/content/services`, а `data/content/services` увезува од `data/site/images`.
Преку barrel ова паѓа во temporal dead zone при иницијализација на модулите.

Алијасот `@/*` покажува на `src/*` (види `tsconfig.json`).

---

## Слој на содржина

**Ниту еден видлив текст не е тврдо запишан во компонента.** За измена на копија,
не се допира ниту еден `.tsx` фајл.

### `data/site` — работи што се повторуваат низ целата страница

| Фајл | Што содржи |
| --- | --- |
| `company.ts` | Име, правно име, слоган, телефони, е-пошта, адреса, работно време, LinkedIn, `siteUrl`, година на основање |
| `navigation.ts` | `primaryNav` (десктоп, со паѓачки менија), `mobileNav`, `footerNav` |
| `footer.ts` | Колони и текст во подножјето |
| `images.ts` | Единствен извор на вистина за секоја патека до слика + `imageSizes` |

### `data/content` — текстот на поединечните страници

| Фајл | Извози |
| --- | --- |
| `hero.ts` | `heroSlides`, `heroActions`, `HERO_INTERVAL` (6000 ms) |
| `services.ts` | 7 услуги, `homeServices` (подмножество за почетна), `serviceHref()` |
| `programmes.ts` | 6 програми со статус, `programmeStatusLabel`, `programmeProcess` |
| `articles.ts` | 11 објави како структурирани блокови, `sortedArticles`, `latestArticles`, `articleCategories`, `getArticle()`, `formatArticleDate()` |
| `about.ts` | `aboutIntro`, `timeline`, `offerGroups`, `missionStatement`, `values`, `teamSection`, `careers` |
| `stats.ts` | 3 статистики (4650 проекти, €40M грантови, €93M кредити) + наслов и фуснота |
| `contact.ts` | `contactMethods`, `contactIntro` |
| `legal.ts` | `privacyPolicy`, `termsOfUse` како структурирани секции |

Објавите во `articles.ts` не се HTML стрингови туку типизирани блокови
(`ArticleBlock`) — параграф, наслов, листа, цитат — што ги рендерира
`app/mk/blog/[slug]/page.tsx`. Тоа значи дека не постои `dangerouslySetInnerHTML`
никаде на страницата.

### Додавање нова објава

```ts
// src/data/content/articles.ts
{
  slug: "nova-objava",           // станува /mk/blog/nova-objava
  title: "Наслов",
  category: "Финансии",
  date: "2026-03-14",            // ISO, се сортира опаѓачки
  excerpt: "Краток вовед…",
  blocks: [
    { type: "paragraph", text: "…" },
    { type: "heading", text: "…" },
    { type: "list", items: ["…", "…"] },
  ],
}
```

`generateStaticParams` автоматски ја подига новата рута при следниот билд.

---

## Дизајн систем

Токените се дефинирани во `src/app/globals.css` и мапирани во Tailwind преку
`@theme inline`:

| Токен | Вредност | Употреба |
| --- | --- | --- |
| `--background` | `#f0f0f0` | Позадина на страницата |
| `--foreground` | `#1a1a1a` | Основен текст |
| `--primary` | `#b91c2e` | Црвената боја на брендот |
| `--primary-foreground` | бело | Текст врз црвено |
| `--muted` / `--muted-foreground` | `#e3e3e3` / `#212121` | Придружен текст |
| `--card` | `#fcfcfc` | Позадина на картички |
| `--border` | `#e8e8e8` | Рабови и линии |
| `--radius` | `0.8rem` | Основен радиус |
| `--container` | `80rem` | Ширина на `<Container>` (`max-w-7xl`) |
| `--header-height` | `4rem` | Отстапка за фиксното заглавие |

Типографија: **Roboto** преку `next/font/google`, со **кириличен подсет** —
без него дијакритиката се рендерира со системски фалбек.

Црвената секогаш се повикува преку `bg-primary` / `text-primary`, не преку
тврдо запишан хекс, за да остане една точка на измена.

---

## Компоненти

### `components/ui`

| Компонента | Опис |
| --- | --- |
| `Button` / `ButtonLink` | Четири варијанти: `primary`, `onImage`, `pill`, `onPrimary` |
| `Container` | Централна ширина + хоризонтални отстапки |
| `SectionHeading` | Наслов + поднаслов, со опционален eyebrow |
| `ArrowLink` | Текстуален линк со стрелка што се придвижува при hover |
| `LinkedInIcon` | Inline SVG |

> **Важно за `Button`:** `src/lib/cn.ts` е обичен спојувач на класи, **не**
> `tailwind-merge`. Варијанта не може да прегази класа од `BASE` — двете
> завршуваат во атрибутот и победува редоследот во CSS, не редоследот во кодот.
> Затоа `focus-visible:ring-*` е преместен од `BASE` во секоја варијанта поединечно;
> варијантата `onPrimary` (светло копче врз црвена лента) користи бел прстен.

### `components/layout`

`Header` со фиксна позиција и паѓачки менија, `MobileMenu` (панел со целосна
навигација од тастатура), `LanguageSelector`, `Footer` со позадинска слика,
`BookMeetingTab` (лебдечко јазиче за состанок), и `LogoPlaceholder` —
типографска замена за логото, **не** оригиналниот заштитен знак. Зафаќа точно
128 × 27 во заглавието и 450 × 96 во подножјето.

### `components/sections`

`PageHero` (банер на внатрешните страници), `LegalPage` (рендерира
`LegalDocument` од `data/content/legal`), `NotFoundContent`.

---

## Функционални модули

| Модул | Компоненти | Забелешки |
| --- | --- | --- |
| `home` | `HeroSlider`, `StatsSection` | Слајдерот ротира на 6 s, со рачна навигација |
| `services` | `ServiceCard`, `ServicesSection` | Картички со `BorderBeam` при hover |
| `blog` | `BlogCard`, `CategoryChip`, `ArticleGrid`, `BlogSection` | Филтер по категорија на клиентска страна |
| `about` | `Timeline`, `OfferGroups`, `ValuesGrid`, `TeamSection` | `TeamSection` се дели со почетната |
| `contact` | `ContactForm`, `MapPanel`, `submitContactForm` | Формата е валидирана, но бекендот е привремен |

**`Timeline`** — историјатот на групацијата како зиг-заг: централна шина со
маркер по запис, картички наизменично лево и десно. Под `lg` нема доволно
ширина за две колони, па шината се преместува на левиот раб и сите картички
одат во една колона десно од неа. Растојанието меѓу редовите е `margin`, не
`padding`, за да може маркерот точно да се центрира спрема картичката.

**`OfferGroups`** и **`ValuesGrid`** — при hover насловот се обојува црвено со
преод; кај `OfferGroups` иконата дополнително добива црвена плочка со градиент
и станува бела.

---

## Анимации и движење

| Механизам | Каде | Однесување при `reduce` |
| --- | --- | --- |
| `Reveal` | Речиси секоја секција | Исклучено |
| `BorderBeam` | Картички за услуги | Исклучено |
| Ротација на банерот | Почетна | Исклучено |
| `AnimatedCounter` | Статистики | **Работи и понатаму** |

`AnimatedCounter` е свесен исклучок од правилото за `prefers-reduced-motion`,
исто како и на живата страница. Тоа е текст што се менува на место — без
движење, без параллакс — па не носи вестибуларен ризик што правилото го спречува.

Дополнително, компонентата решава реален SSR проблем: **серверот ја испишува
крајната бројка**, а клиентот ја премотува на нула во `useLayoutEffect`, пред
исцртување. Така без JavaScript и за пребарувачите се гледа вистинскиот број, а
не нула — и ако анимацијата падне, бројката не останува заглавена на нула.
Броењето се активира преку `IntersectionObserver` (праг 0.2) и трае 2 s со
`easeOutExpo`.

> **Тестирање:** headless Chrome по дифолт пријавува
> `prefers-reduced-motion: reduce`. Ако анимациите изгледаат мртви во автоматски
> тест, тоа е емулацијата, не баг — поставете `no-preference` преку
> `Emulation.setEmulatedMedia`.

---

## Слики

**Сите 30 слики се привремени (placeholder).** Генерирани се со
`npm run placeholders` и носат видлива ознака со точните димензии.

Патеките се централизирани во `src/data/site/images.ts`, а димензиите во
`imageSizes` — така `next/image` резервира простор и нема поместување на
распоредот. За замена со вистински фотографии, зачувајте ги во `public/images/`
под истите имиња (или сменете ја патеката во `images.ts`) и **задржете ги истите
димензии**:

| Намена | Димензии | Број |
| --- | --- | --- |
| Слајдови на почетната | 1920 × 1080 | 3 |
| Колаж од тимот | 1136 × 1270 (`object-contain`) | 1 |
| Банер на внатрешни страници | 1920 × 720 | 5 |
| Илустрации за услуги | 800 × 600 | 7 |
| Слики за објави | 1040 × 416 | 11 |
| Позадина на подножје | 1920 × 970 | 1 |
| Мапа на контакт страница | 1040 × 800 | 1 |
| Open Graph | 1200 × 630 | 1 |

---

## Контакт форма

`src/features/contact/submitContactForm.ts` е **единствената** точка за
поврзување со бекенд. Моментално враќа успех по кратко доцнење.

За вистинска имплементација, заменете го телото на функцијата со повик кон API
рута или провајдер за е-пошта (Resend, SendGrid, SMTP). Компонентата
`ContactForm` останува непроменета — валидацијата, состојбите на грешка и
пораката за успех веќе се на место.

Клучевите одат во `.env.local`, што `.gitignore` веќе го исклучува.

---

## SEO и метаподатоци

- **Метадата по страница** преку `export const metadata` — наслов, опис,
  каноничен URL.
- **Структурирани податоци** (`src/lib/jsonLd.ts`) — `Organization` на почетната,
  `Article` на секоја објава, според schema.org.
- **`app/sitemap.ts`** ги набројува сите рути, вклучувајќи ги објавите.
- **`app/robots.ts`** дозволува индексирање и покажува кон мапата.
- **Open Graph** слика 1200 × 630 и `lang="mk"` на `<html>`.
- Основниот URL се чита од `company.siteUrl` — сменете го таму пред објавување.

---

## Пристапност

- Skip link, семантички landmark-и, **еден `h1` по страница**, `alt` на сите слики.
- Целосна навигација со тастатура, вклучувајќи ги паѓачките менија и мобилниот панел.
- Видлив focus прстен на секое интерактивно место, со боја прилагодена на позадината.
- `prefers-reduced-motion: reduce` ги исклучува откривањата при скролање, светлото
  по рабовите и автоматската ротација на банерот (за исклучокот со броевите,
  види [Анимации](#анимации-и-движење)).
- Контрастот на белиот текст врз `--primary` (`#b91c2e`) поминува WCAG AA.

---

## Билд и објавување

```bash
npm run build
```

Излезот е 25 статички рути. Бидејќи нема серверски рути со состојба, страницата
се качува на кој било статички хостинг или на Vercel без дополнителна
конфигурација.

Пред првото објавување:

1. Сменете го `company.siteUrl` во `src/data/site/company.ts`.
2. Заменете ги привремените слики.
3. Поврзете ја контакт формата со вистински бекенд.
4. Заменете го `LogoPlaceholder` со оригиналното лого.

---

## Познати ограничувања

- **Контакт формата нема бекенд** — успехот е симулиран.
- **Сите слики се привремени**, вклучувајќи го и логото.
- **Само македонска верзија** — `LanguageSelector` постои, но нема втор јазик зад
  него. Структурата под `app/mk/` е подготвена за додавање на `app/en/`.
- Годината во подножјето (`currentYear` во `company.ts`) е рачно поставена, за да
  не се менува излезот од статичкиот билд без нов деплој.

---

## Сопственост

Приватно репо. Содржината, името и брендот се сопственост на
**ВФП Плус Консалтинг ДОО Скопје**.
