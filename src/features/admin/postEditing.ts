import type { Article, ArticleBlock } from "@/data/content/articles";
import { imageSizes } from "@/data/site/images";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";

/**
 * The countries the firm works in, which is what the editor actually chooses.
 * North Macedonia is served from three folders — /mk, /sq and /en are one site
 * in three languages — so ticking it publishes to all three. The others are a
 * single country site each. A language is not a place, which is why English is
 * not a box of its own.
 */
export type Country = {
  id: string;
  label: string;
  /** The locale folders this country's site is served from. */
  locales: Locale[];
};

export const COUNTRIES: Country[] = [
  { id: "mk", label: "North Macedonia", locales: ["mk", "sq", "en"] },
  { id: "rs", label: "Serbia", locales: ["rs"] },
  { id: "ba", label: "Bosnia and Herzegovina", locales: ["ba"] },
  { id: "me", label: "Montenegro", locales: ["me"] },
  { id: "hr", label: "Croatia", locales: ["hr"] },
];

/** The languages a post can be written in. */
export const LANGUAGE_LABELS: Record<Locale, string> = {
  mk: "Macedonian",
  sq: "Albanian",
  en: "English",
  rs: "Serbian",
  ba: "Bosnian",
  me: "Montenegrin",
  hr: "Croatian",
};

/** Always in the canonical order, however the boxes were ticked. */
export const sortLocales = (chosen: Locale[]): Locale[] =>
  locales.filter((locale) => chosen.includes(locale));

/**
 * A country is ticked when the post reaches any of its language versions.
 * Nothing in the panel can produce a half-ticked country, but a post saved
 * before this chooser existed can name /mk alone, and that still means the
 * Macedonian site.
 */
export const isCountryChosen = (chosen: Locale[], country: Country) =>
  country.locales.some((locale) => chosen.includes(locale));

/** Ticking a country adds every language version of it, and unticking removes them all. */
export function toggleCountry(chosen: Locale[], country: Country): Locale[] {
  const rest = chosen.filter((locale) => !country.locales.includes(locale));
  return isCountryChosen(chosen, country)
    ? rest
    : sortLocales([...rest, ...country.locales]);
}

/** The countries a post reaches, for the line under its title in the list. */
export const countriesOf = (chosen: Locale[]) =>
  COUNTRIES.filter((country) => isCountryChosen(chosen, country));

/** A picked image, already cropped to the post format and encoded for upload. */
export type CoverImage = {
  /** Stands in for the final path until the server names the file. */
  key: string;
  contentType: string;
  /** Base64, without the data-URL prefix. */
  data: string;
  previewUrl: string;
};

const LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ѓ: "gj", е: "e", ж: "zh", з: "z",
  ѕ: "dz", и: "i", ј: "j", к: "k", л: "l", љ: "lj", м: "m", н: "n", њ: "nj",
  о: "o", п: "p", р: "r", с: "s", т: "t", ќ: "kj", у: "u", ф: "f", х: "h",
  ц: "c", ч: "ch", џ: "dzh", ш: "sh", đ: "dj",
};

/** "Што значи биогас" → "shto-znachi-biogas", matching the existing addresses. */
export function slugify(title: string): string {
  return Array.from(title.toLowerCase(), (char) => LATIN[char] ?? char)
    .join("")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

export const today = () => new Date().toISOString().slice(0, 10);

export const emptyPost = (): Article => ({
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  date: today(),
  image: "",
  body: [],
  // A new post goes everywhere until the editor narrows it down.
  locales: [...locales],
  language: defaultLocale,
});

/**
 * The body is edited as plain text with three conventions: a blank line starts
 * a new paragraph, a line starting with "## " is a subheading, and lines
 * starting with "- " form a list.
 */
export function blocksToText(blocks: ArticleBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "ul") return block.items.map((item) => `- ${item}`).join("\n");
      return block.text;
    })
    .join("\n\n");
}

export function textToBlocks(text: string): ArticleBlock[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    )
    .filter((lines) => lines.length > 0)
    .flatMap((lines): ArticleBlock[] => {
      if (lines.every((line) => /^[-•*]\s+/.test(line))) {
        return [{ type: "ul", items: lines.map((line) => line.replace(/^[-•*]\s+/, "")) }];
      }
      if (lines[0].startsWith("## ")) {
        const rest = lines.slice(1).join(" ");
        return [
          { type: "h2", text: lines[0].slice(3).trim() },
          ...(rest ? [{ type: "p" as const, text: rest }] : []),
        ];
      }
      return [{ type: "p", text: lines.join(" ") }];
    });
}

const encode = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

const toBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

/**
 * Crops a photo to the post image format (centre crop, 1040×416) in the
 * browser, so a 10 MB phone photo uploads as ~60 KB and every card lines up.
 * WebP where the browser can encode it, JPEG otherwise.
 */
export async function fileToCoverImage(file: File): Promise<CoverImage> {
  const { width, height } = imageSizes.article;
  const bitmap = await createImageBitmap(file);

  const scale = Math.max(width / bitmap.width, height / bitmap.height);
  const cropWidth = width / scale;
  const cropHeight = height / scale;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas
    .getContext("2d")!
    .drawImage(
      bitmap,
      (bitmap.width - cropWidth) / 2,
      (bitmap.height - cropHeight) / 2,
      cropWidth,
      cropHeight,
      0,
      0,
      width,
      height,
    );
  bitmap.close();

  let blob = await encode(canvas, "image/webp", 0.82);
  if (!blob || blob.type !== "image/webp") blob = await encode(canvas, "image/jpeg", 0.85);
  if (!blob) throw new Error("The image could not be encoded.");

  const key = Array.from(crypto.getRandomValues(new Uint8Array(8)), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  return {
    key,
    contentType: blob.type,
    data: await toBase64(blob),
    previewUrl: URL.createObjectURL(blob),
  };
}
