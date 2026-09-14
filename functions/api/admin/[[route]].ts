/**
 * The admin API behind /admin, where one editor writes, edits and deletes blog
 * posts.
 *
 * There is no database. The posts live in `src/data/content/posts.json` in the
 * site's GitHub repository, and every save is a single commit to the
 * production branch — the post and its new image together. Cloudflare Pages
 * rebuilds from that commit, so a change is live in a minute or two, and the
 * full history of every post stays in git.
 *
 *   GET  /api/admin/session  who is signed in
 *   POST /api/admin/login    { username, password } → session cookie
 *   POST /api/admin/logout
 *   GET  /api/admin/posts    { posts, sha }, read from GitHub rather than the live build
 *   PUT  /api/admin/posts    { posts, sha, images } → one commit
 *
 * Configuration (Cloudflare Pages → Settings → Variables and Secrets):
 *   ADMIN_USERNAME, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET
 *     made by `node scripts/admin-credentials.mjs`
 *   GITHUB_TOKEN   fine-grained token, Contents read and write, this repository only
 *   GITHUB_REPO    "owner/name"
 *   GITHUB_BRANCH  the production branch
 * Until all six are set, every route answers 503.
 */

type Env = {
  ADMIN_USERNAME?: string;
  /** `pbkdf2-sha256$<iterations>$<salt, base64>$<hash, base64>` */
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_SESSION_SECRET?: string;
  GITHUB_TOKEN?: string;
  GITHUB_REPO?: string;
  GITHUB_BRANCH?: string;
};

type Config = Required<Env>;

type Block =
  | { type: "p" | "h2"; text: string }
  | { type: "ul"; items: string[] };

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  body: Block[];
};

type Upload = { key: string; ext: string; bytes: Uint8Array };

const POSTS_PATH = "src/data/content/posts.json";
const UPLOAD_URL = "/images/blog/uploads";

const COOKIE = "__Host-wvp-admin";
const SESSION_SECONDS = 8 * 60 * 60;

/** Kept low on purpose: PBKDF2 runs inside the Workers CPU budget. */
const MIN_ITERATIONS = 10_000;
const MAX_FAILED_LOGINS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

const MAX_BODY_BYTES = 4 * 1024 * 1024;
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;
const MAX_IMAGES = 5;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const IMAGE_PATH = /^\/images\/(?:[a-z0-9_-]+\/)*[A-Za-z0-9_-]+\.(?:webp|jpe?g|png)$/;
const UPLOAD_REF = /^upload:([a-z0-9]{8,32})$/;
const IMAGE_TYPES: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/** The editor works in Macedonian. */
const MESSAGES = {
  notConfigured: "Админ панелот сè уште не е поставен.",
  badRequest: "Неисправно барање.",
  notFound: "Непозната адреса.",
  unauthorized: "Сесијата истече. Најавете се повторно.",
  badLogin: "Погрешно корисничко име или лозинка.",
  locked: "Премногу неуспешни обиди. Обидете се повторно за 15 минути.",
  conflict:
    "Објавите се сменети во меѓувреме. Освежете ја страницата и направете ја промената повторно.",
  github: "Промената не беше зачувана. Обидете се повторно за неколку минути.",
  image: "Сликата не е прифатена. Користете JPG, PNG или WebP до 1,5 MB.",
};

const encoder = new TextEncoder();

/**
 * Failed sign-ins per address. Per isolate, so it slows guessing rather than
 * stopping it outright; the WAF rate-limit rule on /api/admin/login is the
 * real limit.
 */
const failures = new Map<string, { count: number; until: number }>();

class GitHubError extends Error {
  constructor(readonly status: number) {
    super(`GitHub answered ${status}`);
  }
}

const json = (body: unknown, status: number, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });

const fail = (error: string, status: number) => json({ ok: false, error }, status);

const str = (value: unknown) => (typeof value === "string" ? value : "");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

const fromBase64 = (value: string) =>
  Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

const toBase64Url = (bytes: Uint8Array) =>
  toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromBase64Url = (value: string) =>
  fromBase64(
    value.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (value.length % 4)) % 4),
  );

function configure(env: Env): Config | null {
  const keys = [
    "ADMIN_USERNAME",
    "ADMIN_PASSWORD_HASH",
    "ADMIN_SESSION_SECRET",
    "GITHUB_TOKEN",
    "GITHUB_REPO",
    "GITHUB_BRANCH",
  ] as const;
  return keys.every((key) => env[key]) ? (env as Config) : null;
}

/* ---------------------------------------------------------------- sessions */

async function sameText(a: string, b: string): Promise<boolean> {
  const [x, y] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  return crypto.subtle.timingSafeEqual(x, y);
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, rounds, salt, hash] = stored.split("$");
  const iterations = Number(rounds);
  if (
    scheme !== "pbkdf2-sha256" ||
    !Number.isInteger(iterations) ||
    iterations < MIN_ITERATIONS ||
    !salt ||
    !hash
  ) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: fromBase64(salt), iterations },
    key,
    256,
  );
  const expected = fromBase64(hash);
  return (
    expected.byteLength === derived.byteLength &&
    crypto.subtle.timingSafeEqual(derived, expected)
  );
}

const sessionKey = (config: Config) =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(config.ADMIN_SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

async function createSession(config: Config): Promise<string> {
  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        u: config.ADMIN_USERNAME,
        exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
      }),
    ),
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    await sessionKey(config),
    encoder.encode(payload),
  );
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

/** The signed-in username, or null. */
async function readSession(request: Request, config: Config): Promise<string | null> {
  const token = (request.headers.get("cookie") ?? "")
    .split(/;\s*/)
    .find((part) => part.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  const [payload, signature] = token?.split(".") ?? [];
  if (!payload || !signature) return null;

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await sessionKey(config),
      fromBase64Url(signature),
      encoder.encode(payload),
    );
    if (!valid) return null;

    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    const fresh = typeof session.exp === "number" && session.exp > Date.now() / 1000;
    return fresh && session.u === config.ADMIN_USERNAME ? config.ADMIN_USERNAME : null;
  } catch {
    return null;
  }
}

const sessionCookie = (token: string, maxAge: number) =>
  `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;

/* ------------------------------------------------------------------ github */

async function github<T>(config: Config, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`https://api.github.com/repos/${config.GITHUB_REPO}${path}`, {
    ...init,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${config.GITHUB_TOKEN}`,
      "user-agent": "wvp-consulting-admin",
      "x-github-api-version": "2022-11-28",
      ...(init.body ? { "content-type": "application/json" } : {}),
    },
  });
  if (!response.ok) throw new GitHubError(response.status);
  return (await response.json()) as T;
}

async function readPosts(config: Config): Promise<{ posts: Post[]; sha: string }> {
  const file = await github<{ sha: string; content: string }>(
    config,
    `/contents/${POSTS_PATH}?ref=${encodeURIComponent(config.GITHUB_BRANCH)}`,
  );
  const text = new TextDecoder().decode(fromBase64(file.content.replace(/\s/g, "")));
  return { posts: JSON.parse(text) as Post[], sha: file.sha };
}

/**
 * Writes several files as one commit on the branch. Returns the blob sha of
 * the first file, which is how the client refers to the posts file next time.
 * Refuses (422) if the branch moved since it was read.
 */
async function commitFiles(
  config: Config,
  files: { path: string; bytes: Uint8Array }[],
  message: string,
): Promise<string> {
  const branch = encodeURIComponent(config.GITHUB_BRANCH);
  const ref = await github<{ object: { sha: string } }>(config, `/git/ref/heads/${branch}`);
  const head = await github<{ tree: { sha: string } }>(
    config,
    `/git/commits/${ref.object.sha}`,
  );

  const blobs: string[] = [];
  for (const file of files) {
    const blob = await github<{ sha: string }>(config, "/git/blobs", {
      method: "POST",
      body: JSON.stringify({ content: toBase64(file.bytes), encoding: "base64" }),
    });
    blobs.push(blob.sha);
  }

  const tree = await github<{ sha: string }>(config, "/git/trees", {
    method: "POST",
    body: JSON.stringify({
      base_tree: head.tree.sha,
      tree: files.map((file, index) => ({
        path: file.path,
        mode: "100644",
        type: "blob",
        sha: blobs[index],
      })),
    }),
  });
  const commit = await github<{ sha: string }>(config, "/git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }),
  });
  await github(config, `/git/refs/heads/${branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return blobs[0];
}

/* -------------------------------------------------------------- validation */

async function readJson(request: Request, limit: number) {
  if (!request.headers.get("content-type")?.includes("application/json")) return null;
  if (Number(request.headers.get("content-length") ?? "0") > limit) return null;

  const text = await request.text();
  if (text.length > limit) return null;
  try {
    const value: unknown = JSON.parse(text);
    return typeof value === "object" && value !== null && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text && text.length <= max ? text : null;
}

function parseBody(value: unknown): Block[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 300) return null;

  const blocks: Block[] = [];
  for (const raw of value) {
    const block = (raw ?? {}) as Record<string, unknown>;
    if (block.type === "p" || block.type === "h2") {
      const text = cleanText(block.text, 10_000);
      if (!text) return null;
      blocks.push({ type: block.type, text });
    } else if (block.type === "ul" && Array.isArray(block.items)) {
      const items = block.items.map((item) => cleanText(item, 1_000));
      if (items.length === 0 || items.length > 100 || items.some((item) => !item)) {
        return null;
      }
      blocks.push({ type: "ul", items: items as string[] });
    } else {
      return null;
    }
  }
  return blocks;
}

function looksLike(bytes: Uint8Array, ext: string): boolean {
  const ascii = (from: number, to: number) =>
    String.fromCharCode(...bytes.subarray(from, to));
  if (ext === "jpg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (ext === "png") return ascii(1, 4) === "PNG";
  return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
}

function parseUploads(value: unknown): Upload[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_IMAGES) return null;

  const uploads: Upload[] = [];
  for (const raw of value) {
    const image = (raw ?? {}) as Record<string, unknown>;
    const key = str(image.key);
    const ext = IMAGE_TYPES[str(image.contentType)];
    if (!/^[a-z0-9]{8,32}$/.test(key) || !ext) return null;

    let bytes: Uint8Array;
    try {
      bytes = fromBase64(str(image.data));
    } catch {
      return null;
    }
    if (bytes.byteLength === 0 || bytes.byteLength > MAX_IMAGE_BYTES) return null;
    if (!looksLike(bytes, ext)) return null;
    uploads.push({ key, ext, bytes });
  }
  return uploads;
}

function parsePosts(
  value: unknown,
  uploadPaths: Map<string, string>,
): { posts: Post[] } | { error: string } {
  if (!Array.isArray(value) || value.length > 2_000) return { error: MESSAGES.badRequest };

  const posts: Post[] = [];
  const slugs = new Set<string>();

  for (const [index, raw] of value.entries()) {
    const post = (raw ?? {}) as Record<string, unknown>;
    const title = cleanText(post.title, 200);
    if (!title) return { error: `Објава ${index + 1}: внесете наслов (до 200 знаци).` };

    const named = (message: string) => ({ error: `„${title}“: ${message}` });

    const slug = str(post.slug);
    if (slug.length > 100 || !SLUG.test(slug)) {
      return named("адресата може да содржи само мали латинични букви, бројки и цртички.");
    }
    if (slugs.has(slug)) return named(`друга објава веќе ја користи адресата „${slug}“.`);
    slugs.add(slug);

    const excerpt = cleanText(post.excerpt, 400);
    if (!excerpt) return named("внесете краток опис (до 400 знаци).");

    const category = cleanText(post.category, 60);
    if (!category) return named("внесете категорија (до 60 знаци).");

    const date = str(post.date);
    if (!DATE.test(date) || Number.isNaN(Date.parse(date))) return named("изберете датум.");

    const reference = UPLOAD_REF.exec(str(post.image));
    const image = reference ? uploadPaths.get(reference[1]) ?? "" : str(post.image);
    if (!IMAGE_PATH.test(image)) return named("додадете слика.");

    const body = parseBody(post.body);
    if (!body) return named("содржината е празна или предолга.");

    posts.push({ slug, title, excerpt, category, date, image, body });
  }

  return { posts };
}

/** A one-line commit message saying what changed, in the editor's language. */
function describeChange(before: Post[], after: Post[]): string {
  const previous = new Map(before.map((post) => [post.slug, JSON.stringify(post)]));
  const remaining = new Set(after.map((post) => post.slug));

  const parts = [
    ...after
      .filter((post) => !previous.has(post.slug))
      .map((post) => `нова објава „${post.title}“`),
    ...after
      .filter((post) => previous.has(post.slug) && previous.get(post.slug) !== JSON.stringify(post))
      .map((post) => `изменета „${post.title}“`),
    ...before
      .filter((post) => !remaining.has(post.slug))
      .map((post) => `избришана „${post.title}“`),
  ];

  if (parts.length === 0) return "";
  const summary = parts.join(", ").replace(/[\r\n]+/g, " ");
  return `Блог: ${summary.length > 180 ? `${summary.slice(0, 177)}…` : summary}\n\nЗачувано преку админ панелот.`;
}

/* ------------------------------------------------------------------ routes */

async function login(request: Request, config: Config): Promise<Response> {
  const address = request.headers.get("cf-connecting-ip") ?? "local";
  const now = Date.now();

  for (const [key, entry] of failures) if (entry.until <= now) failures.delete(key);
  const record = failures.get(address);
  if (record && record.count >= MAX_FAILED_LOGINS) return fail(MESSAGES.locked, 429);

  const body = await readJson(request, 4_096);
  if (!body) return fail(MESSAGES.badRequest, 400);
  const username = str(body.username).trim();
  const password = str(body.password);

  const [userMatches, passwordMatches] = await Promise.all([
    sameText(username, config.ADMIN_USERNAME),
    password.length > 0 && password.length <= 200
      ? verifyPassword(password, config.ADMIN_PASSWORD_HASH)
      : Promise.resolve(false),
  ]);

  if (!userMatches || !passwordMatches) {
    const entry = record ?? { count: 0, until: now + LOCKOUT_MS };
    entry.count += 1;
    failures.set(address, entry);
    await sleep(400);
    return fail(MESSAGES.badLogin, 401);
  }

  failures.delete(address);
  return json({ ok: true, username: config.ADMIN_USERNAME }, 200, {
    "set-cookie": sessionCookie(await createSession(config), SESSION_SECONDS),
  });
}

async function savePosts(request: Request, config: Config): Promise<Response> {
  const body = await readJson(request, MAX_BODY_BYTES);
  if (!body || typeof body.sha !== "string") return fail(MESSAGES.badRequest, 400);

  const uploads = parseUploads(body.images);
  if (!uploads) return fail(MESSAGES.image, 422);

  const today = new Date().toISOString().slice(0, 10);
  const uploadPaths = new Map(
    uploads.map((upload) => [upload.key, `${UPLOAD_URL}/${today}-${upload.key}.${upload.ext}`]),
  );

  const parsed = parsePosts(body.posts, uploadPaths);
  if ("error" in parsed) return fail(parsed.error, 422);

  try {
    const current = await readPosts(config);
    if (current.sha !== body.sha) return fail(MESSAGES.conflict, 409);

    const message = describeChange(current.posts, parsed.posts);
    if (!message) return json({ ok: true, posts: parsed.posts, sha: current.sha }, 200);

    const used = new Set(parsed.posts.map((post) => post.image));
    const images = uploads
      .map((upload) => ({ path: uploadPaths.get(upload.key)!, bytes: upload.bytes }))
      .filter((image) => used.has(image.path))
      .map((image) => ({ path: `public${image.path}`, bytes: image.bytes }));

    const sha = await commitFiles(
      config,
      [
        { path: POSTS_PATH, bytes: encoder.encode(`${JSON.stringify(parsed.posts, null, 2)}\n`) },
        ...images,
      ],
      message,
    );
    return json({ ok: true, posts: parsed.posts, sha }, 200);
  } catch (error) {
    if (error instanceof GitHubError && (error.status === 409 || error.status === 422)) {
      return fail(MESSAGES.conflict, 409);
    }
    console.error("admin: saving posts failed", error);
    return fail(MESSAGES.github, 502);
  }
}

export const onRequest: PagesFunction<Env, "route"> = async ({ request, env, params }) => {
  const config = configure(env);
  if (!config) return fail(MESSAGES.notConfigured, 503);

  // A custom header cannot be sent cross-site without a CORS preflight, which
  // this API never grants; together with SameSite=Strict and the Origin check
  // below, that rules out cross-site requests riding the session cookie.
  if (request.headers.get("x-wvp-admin") !== "1") return fail(MESSAGES.badRequest, 400);

  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== new URL(request.url).host) {
      return fail(MESSAGES.badRequest, 403);
    }
  }

  const route = [params.route ?? []].flat().join("/");

  if (request.method === "POST" && route === "login") return login(request, config);
  if (request.method === "POST" && route === "logout") {
    return json({ ok: true }, 200, { "set-cookie": sessionCookie("", 0) });
  }

  const username = await readSession(request, config);
  if (!username) return fail(MESSAGES.unauthorized, 401);

  if (request.method === "GET" && route === "session") {
    return json({ ok: true, username }, 200);
  }
  if (request.method === "GET" && route === "posts") {
    try {
      return json({ ok: true, ...(await readPosts(config)) }, 200);
    } catch (error) {
      console.error("admin: reading posts failed", error);
      return fail(MESSAGES.github, 502);
    }
  }
  if (request.method === "PUT" && route === "posts") return savePosts(request, config);

  return fail(MESSAGES.notFound, 404);
};
