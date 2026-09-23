import type { Article } from "@/data/content/articles";

import type { CoverImage } from "./postEditing";

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

const OFFLINE =
  "No connection to the server. Check your internet connection and try again.";

async function request<T>(path: string, method = "GET", body?: unknown): Promise<Result<T>> {
  try {
    const response = await fetch(`/api/admin/${path}`, {
      method,
      credentials: "same-origin",
      headers: {
        // Required by the API; see the note in functions/api/admin/[[route]].ts.
        "x-wvp-admin": "1",
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => null)) as
      | (T & { error?: string })
      | null;

    if (!response.ok || !payload) {
      return { ok: false, status: response.status, error: payload?.error ?? OFFLINE };
    }
    return { ok: true, data: payload };
  } catch {
    return { ok: false, status: 0, error: OFFLINE };
  }
}

export const adminApi = {
  session: () => request<{ username: string }>("session"),
  login: (username: string, password: string) =>
    request<{ username: string }>("login", "POST", { username, password }),
  logout: () => request<unknown>("logout", "POST"),
  posts: () => request<{ posts: Article[]; sha: string }>("posts"),
  save: (posts: Article[], sha: string, images: CoverImage[]) =>
    request<{ posts: Article[]; sha: string }>("posts", "PUT", {
      posts,
      sha,
      images: images.map(({ key, contentType, data }) => ({ key, contentType, data })),
    }),
};
