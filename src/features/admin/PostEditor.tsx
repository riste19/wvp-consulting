"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import type { Article } from "@/data/content/articles";
import { imageSizes } from "@/data/site/images";

import {
  blocksToText,
  fileToCoverImage,
  slugify,
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
  const [image, setImage] = useState<CoverImage | null>(null);
  const [problem, setProblem] = useState("");

  const preview = image?.previewUrl ?? (initial.image ? previewFor(initial.image) : "");

  const changeTitle = (value: string) => {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  };

  const pickImage = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProblem("Изберете слика (JPG, PNG или WebP).");
      return;
    }
    try {
      setImage(await fileToCoverImage(file));
      setProblem("");
    } catch {
      setProblem("Сликата не може да се отвори. Пробајте со друга.");
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = textToBlocks(bodyText);

    const missing =
      (!title.trim() && "Внесете наслов.") ||
      (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) &&
        "Адресата може да содржи само мали латинични букви, бројки и цртички.") ||
      (!category.trim() && "Внесете категорија.") ||
      (!date && "Изберете датум.") ||
      (!excerpt.trim() && "Внесете краток опис.") ||
      (!image && !initial.image && "Додадете слика.") ||
      (body.length === 0 && "Внесете содржина.") ||
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
      },
      image,
    );
  };

  const message = problem || error;

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-gray-900">
        {isNew ? "Нова објава" : "Уреди објава"}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="post-title" className={LABEL_CLASS}>
            Наслов
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
            Адреса на објавата
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
              Ако ја смените адресата, старите линкови кон објавата нема да работат.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="post-category" className={LABEL_CLASS}>
            Категорија
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
            Датум
          </label>
          <input
            id="post-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-excerpt" className={LABEL_CLASS}>
            Краток опис
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
            Се прикажува на картичката во листата на објави.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-image" className={LABEL_CLASS}>
            Слика
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
            Сликата автоматски се сече на широк формат, како на другите објави.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="post-body" className={LABEL_CLASS}>
            Содржина
          </label>
          <textarea
            id="post-body"
            rows={16}
            value={bodyText}
            onChange={(event) => setBodyText(event.target.value)}
            className={`${FIELD_CLASS} font-mono text-sm leading-relaxed`}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Празен ред започнува нов пасус. Ред што почнува со „## “ е поднаслов.
            Редови што почнуваат со „- “ се листа.
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
          {busy ? "Зачувувам…" : "Објави"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="h-11 rounded-md border border-border bg-white px-6 text-base font-medium text-foreground transition-colors hover:bg-neutral-100 disabled:opacity-60"
        >
          Откажи
        </button>
      </div>
    </form>
  );
}
