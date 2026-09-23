"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Article } from "@/data/content/articles";
import { formatArticleDate } from "@/data/content/articles";

import { locales } from "@/i18n/locales";

import { adminApi } from "./adminApi";
import { LoginForm } from "./LoginForm";
import { PostEditor } from "./PostEditor";
import { emptyPost, LOCALE_LABELS, type CoverImage } from "./postEditing";

/** Which country sites a post is on, for the row under its title. */
function where(post: Article): string {
  const chosen = post.locales ?? [...locales];
  if (chosen.length === locales.length) return "Сите држави";
  return chosen.map((code) => LOCALE_LABELS[code]).join(", ");
}

type Phase = "checking" | "signedOut" | "signedIn";

type Editing = { original: string | null; post: Article };

const PUBLISH_NOTE = "Зачувано. Сајтот ќе се ажурира за околу 1–2 минути.";

/**
 * Sign-in, the list of posts, and the editor. Every save sends the whole list
 * back with the version it was loaded at, so two open tabs cannot silently
 * overwrite each other: the second save is refused and asks for a refresh.
 */
export function AdminApp() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState<Article[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [editing, setEditing] = useState<Editing | null>(null);
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [notice, setNotice] = useState("");

  /**
   * Freshly uploaded images are not on the live site until the rebuild
   * finishes, so this session shows them from the local copy instead.
   */
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const previewFor = useCallback(
    (image: string) => previews[image] ?? image,
    [previews],
  );

  const signOut = useCallback(() => {
    setPhase("signedOut");
    setEditing(null);
    setPosts([]);
    setSha("");
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    const result = await adminApi.posts();
    setLoading(false);

    if (!result.ok) {
      if (result.status === 401) signOut();
      else setLoadError(result.error);
      return;
    }
    setPosts(result.data.posts);
    setSha(result.data.sha);
  }, [signOut]);

  useEffect(() => {
    let active = true;
    adminApi.session().then((result) => {
      if (!active) return;
      if (result.ok) {
        setUsername(result.data.username);
        setPhase("signedIn");
        void load();
      } else {
        setPhase("signedOut");
      }
    });
    return () => {
      active = false;
    };
  }, [load]);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    [posts],
  );
  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))),
    [posts],
  );

  const save = async (next: Article[], images: CoverImage[]) => {
    setBusy(true);
    setSaveError("");
    setNotice("");
    const result = await adminApi.save(next, sha, images);
    setBusy(false);

    if (!result.ok) {
      if (result.status === 401) signOut();
      setSaveError(result.error);
      return false;
    }

    const uploaded = images.flatMap((image) => {
      const saved = result.data.posts.find((post) => post.image.includes(image.key));
      return saved ? [[saved.image, image.previewUrl] as const] : [];
    });
    if (uploaded.length) {
      setPreviews((current) => ({ ...current, ...Object.fromEntries(uploaded) }));
    }
    setPosts(result.data.posts);
    setSha(result.data.sha);
    setNotice(PUBLISH_NOTE);
    return true;
  };

  const savePost = async (post: Article, image: CoverImage | null) => {
    if (!editing) return;
    const next = editing.original
      ? posts.map((item) => (item.slug === editing.original ? post : item))
      : [post, ...posts];
    if (await save(next, image ? [image] : [])) setEditing(null);
  };

  const deletePost = async (post: Article) => {
    if (!window.confirm(`Да се избрише објавата „${post.title}“?`)) return;
    await save(
      posts.filter((item) => item.slug !== post.slug),
      [],
    );
  };

  if (phase === "checking") {
    return <main className="flex flex-1 items-center justify-center p-6 text-muted-foreground">Се вчитува…</main>;
  }

  if (phase === "signedOut") {
    return (
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-16">
        <LoginForm
          onSignedIn={(name) => {
            setUsername(name);
            setPhase("signedIn");
            void load();
          }}
        />
      </main>
    );
  }

  return (
    <main className="flex-1 bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Објави</h1>
            <p className="text-sm text-muted-foreground">
              Најавени сте како {username} ·{" "}
              <a href="/mk/blog" target="_blank" rel="noopener" className="underline hover:text-primary">
                Отвори го блогот
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            {!editing ? (
              <button
                type="button"
                onClick={() => {
                  setSaveError("");
                  setNotice("");
                  setEditing({ original: null, post: emptyPost() });
                }}
                disabled={loading || !sha}
                className="h-10 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                Нова објава
              </button>
            ) : null}
            <button
              type="button"
              onClick={async () => {
                await adminApi.logout();
                signOut();
              }}
              className="h-10 rounded-md border border-border bg-white px-5 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
            >
              Одјави се
            </button>
          </div>
        </header>

        {notice ? (
          <p role="status" className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {notice}
          </p>
        ) : null}

        <div className="mt-6">
          {editing ? (
            <PostEditor
              key={editing.original ?? "new"}
              initial={editing.post}
              isNew={!editing.original}
              categories={categories}
              previewFor={previewFor}
              busy={busy}
              error={saveError}
              onSave={savePost}
              onCancel={() => {
                setEditing(null);
                setSaveError("");
              }}
            />
          ) : loading ? (
            <p className="py-10 text-center text-muted-foreground">Се вчитуваат објавите…</p>
          ) : loadError ? (
            <div className="rounded-xl border border-border bg-white p-6 text-center">
              <p className="text-primary">{loadError}</p>
              <button
                type="button"
                onClick={() => void load()}
                className="mt-4 h-10 rounded-md border border-border px-5 text-sm font-medium hover:bg-neutral-100"
              >
                Обиди се повторно
              </button>
            </div>
          ) : (
            <>
              {saveError ? (
                <p role="alert" className="mb-4 text-sm text-primary">
                  {saveError}
                </p>
              ) : null}
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white">
                {sorted.map((post) => (
                  <li key={post.slug} className="flex flex-wrap items-center gap-4 p-4">
                    <Image
                      src={previewFor(post.image)}
                      alt=""
                      width={120}
                      height={48}
                      unoptimized
                      className="h-12 w-30 shrink-0 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900">{post.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.category} · {formatArticleDate(post.date)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {where(post)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          setSaveError("");
                          setNotice("");
                          setEditing({ original: post.slug, post });
                        }}
                        className="h-9 rounded-md border border-border px-4 text-sm font-medium hover:bg-neutral-100 disabled:opacity-60"
                      >
                        Уреди
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void deletePost(post)}
                        className="h-9 rounded-md border border-border px-4 text-sm font-medium text-primary hover:bg-primary/5 disabled:opacity-60"
                      >
                        Избриши
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
