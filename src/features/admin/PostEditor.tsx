"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import type { Article } from "@/data/content/articles";
import { imageSizes } from "@/data/site/images";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";

import {
  blocksToText,
  fileToCoverImage,
  LANGUAGE_LABELS,
  LOCALE_LABELS,
  slugify,
  sortLocales,
  textToBlocks,
  type CoverImage,
} from "./postEditing";
import { FIELD_CLASS, LABEL_CLASS } from "./styles";

type PostEditorProps = {
  initial: Article;
  isNew: boolean;
  categories: string[];
  /** Where to show an existing image from: a local preview if one exists. */
  previewFor: (image: string) => string;
  busy: boolean;
  error: string;
  onSave: (post: Article, image: CoverImage | null) => void;
  onCancel: () => void;
};

export function PostEditor({
  initial,
  isNew,
  categories,
  previewFor,
  busy,
  error,
  onSave,
  onCancel,
}: PostEditorProps) {
  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [category, setCategory] = useState(initial.category);
  const [date, setDate] = useState(initial.date);
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [bodyText, setBodyText] = useState(() => blocksToText(initial.body));
  const [chosen, setChosen] = useState<Locale[]>(initial.locales ?? [...locales]);
  const [language, setLanguage] = useState<Locale>(initial.language ?? defaultLocale);
  const [image, setImage] = useState<CoverImage | null>(null);
  const [problem, setProblem] = useState("");

  const preview = image?.previewUrl ?? (initial.image ? previewFor(initial.image) : "");

  const toggle = (code: Locale) =>
    setChosen((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : sortLocales([...current, code]),
    );

  const changeTitle = (value: string) => {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  };

  const pickImage = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProblem("Choose an image (JPG, PNG or WebP).");
      return;
    }
    try {
      setImage(await fileToCoverImage(file));
      setProblem("");
    } catch {
      setProblem("That image could not be opened. Try another one.");
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = textToBlocks(bodyText);

    const missing =
      (!title.trim() && "Enter a title.") ||
      (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) &&
        "The address may contain only lowercase Latin letters, numbers and hyphens.") ||
      (!category.trim() && "Enter a category.") ||
      (!date && "Choose a date.") ||
      (!excerpt.trim() && "Enter a summary.") ||
      (chosen.length === 0 && "Choose at least one country to publish to.") ||
      (!image && !initial.image && "Add an image.") ||
      (body.length === 0 && "Enter the content.") ||
      "";

    setProblem(missing);
    if (missing) return;

    onSave(
      {
        slug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        category: category.trim(),
        date,
        image: image ? `upload:${image.key}` : initial.image,
        body,
        locales: sortLocales(chosen),
        language,
      },
      image,
    );
  };

  const message = problem || error;

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-gray-900">
        {isNew ? "New post" : "Edit post"}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="post-title" className={LABEL_CLASS}>
            Title
          </label>
          <input
            id="post-title"
            value={title}
            maxLength={200}
            onChange={(event) => changeTitle(event.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-slug" className={LABEL_CLASS}>
            Post address
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm text-muted-foreground">/mk/blog/</span>
            <input
              id="post-slug"
              value={slug}
              maxLength={100}
              onChange={(event) => {
                setSlugEdited(true);
                setSlug(event.target.value.toLowerCase());
              }}
              className={FIELD_CLASS}
            />
          </div>
          {!isNew ? (
            <p className="mt-1 text-xs text-muted-foreground">
              If you change the address, existing links to the post will stop working.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="post-category" className={LABEL_CLASS}>
            Category
          </label>
          <input
            id="post-category"
            list="post-categories"
            value={category}
            maxLength={60}
            onChange={(event) => setCategory(event.target.value)}
            className={FIELD_CLASS}
          />
          <datalist id="post-categories">
            {categories.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="post-date" className={LABEL_CLASS}>
            Date
          </label>
          <input
            id="post-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <fieldset className="md:col-span-2">
          <legend className={LABEL_CLASS}>Where it is published</legend>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {locales.map((code) => (
              <label
                key={code}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-neutral-50"
              >
                <input
                  type="checkbox"
                  checked={chosen.includes(code)}
                  onChange={() => toggle(code)}
                  className="h-4 w-4 accent-primary"
                />
                {LOCALE_LABELS[code]}
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Only the selected sites show the post. The text stays the same on
            all of them — it is not translated.
          </p>
        </fieldset>

        <div className="md:col-span-2">
          <label htmlFor="post-language" className={LABEL_CLASS}>
            Language of the text
          </label>
          <select
            id="post-language"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Locale)}
            className={FIELD_CLASS}
          >
            {locales.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_LABELS[code]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            Which language you are writing the post in. It sets how the date is
            written and how search engines read the post.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-excerpt" className={LABEL_CLASS}>
            Summary
          </label>
          <textarea
            id="post-excerpt"
            rows={2}
            maxLength={400}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            className={FIELD_CLASS}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Shown on the card in the post list.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-image" className={LABEL_CLASS}>
            Image
          </label>
          {preview ? (
            <Image
              src={preview}
              alt=""
              width={imageSizes.article.width}
              height={imageSizes.article.height}
              unoptimized
              className="mb-3 aspect-[5/2] w-full rounded-lg object-cover"
            />
          ) : null}
          <input
            id="post-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => void pickImage(event.target.files?.[0])}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-secondary"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            The image is cropped to the wide format automatically, like the other posts.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-body" className={LABEL_CLASS}>
            Content
          </label>
          <textarea
            id="post-body"
            rows={16}
            value={bodyText}
            onChange={(event) => setBodyText(event.target.value)}
            className={`${FIELD_CLASS} font-mono text-sm leading-relaxed`}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            A blank line starts a new paragraph. A line beginning “## ” is a
            subheading. Lines beginning “- ” make a list.
          </p>
        </div>
      </div>

      {message ? (
        <p role="alert" className="mt-5 text-sm text-primary">
          {message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="h-11 rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Publish"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="h-11 rounded-md border border-border bg-white px-6 text-base font-medium text-foreground transition-colors hover:bg-neutral-100 disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
