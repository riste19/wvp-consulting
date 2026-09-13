/**
 * Post-build assertions for the static export.
 *
 * These guard two failure modes that `next build` reports as success:
 *
 *   1. A root page that calls `redirect()`. Under `output: "export"` that
 *      emits a blank error shell served as HTTP 200 at `/`, recovered only by
 *      client-side JS after hydration. Crawlers see an empty page.
 *
 *   2. `next/image` without `images.unoptimized`. Next's own export guard keys
 *      off static image imports, and this project passes string paths, so the
 *      guard never fires and every image 404s in production.
 *
 * Run automatically after `npm run build`.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const failures = [];
const checks = [];

const check = (name, ok, detail = "") => {
  checks.push({ name, ok, detail });
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

const walk = (dir, match) => {
  const hits = [];
  const rec = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (match(e.name)) hits.push(p);
    }
  };
  if (fs.existsSync(dir)) rec(dir);
  return hits;
};

if (!fs.existsSync(OUT)) {
  console.error(`verify-export: ${OUT}/ does not exist — run the build first.`);
  process.exit(1);
}

// 1. The root must be an edge redirect, never a prerendered page.
check(
  "no out/index.html",
  !fs.existsSync(path.join(OUT, "index.html")),
  "a root page was re-added; it would serve a blank 200 at /",
);

// 2. No image may point at the optimizer endpoint that does not exist here.
const html = walk(OUT, (n) => n.endsWith(".html"));
const withOptimizer = html.filter((f) =>
  fs.readFileSync(f, "utf8").includes("/_next/image"),
);
check(
  "no /_next/image in rendered HTML",
  withOptimizer.length === 0,
  withOptimizer.slice(0, 3).join(", "),
);

// 3. Every <img src> that points into the site must resolve to a real file.
const missing = new Set();
for (const file of html) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) {
    const asset = path.join(OUT, decodeURIComponent(m[1].split("?")[0]));
    if (!fs.existsSync(asset)) missing.add(m[1]);
  }
}
check("every <img> resolves", missing.size === 0, [...missing].slice(0, 5).join(", "));

// 4. Things Cloudflare and crawlers need.
for (const f of ["sitemap.xml", "robots.txt", "404.html", "_redirects", "_headers"]) {
  check(`out/${f} exists`, fs.existsSync(path.join(OUT, f)));
}

// 5. The Cloudflare control files are line-parsed; a stray CR breaks them.
for (const f of ["_redirects", "_headers"]) {
  const p = path.join(OUT, f);
  if (fs.existsSync(p)) {
    check(`out/${f} has LF endings`, !fs.readFileSync(p, "utf8").includes("\r"));
  }
}

// 6. Every language's home page, so a broken export or a dropped locale is
//    obvious. Each must declare its own language on the content wrapper —
//    the root <html> says "mk" for both.
for (const locale of ["mk", "sq", "en"]) {
  const home = path.join(OUT, `${locale}.html`);
  check(`out/${locale}.html exists`, fs.existsSync(home));
  if (fs.existsSync(home)) {
    check(
      `out/${locale}.html is marked lang="${locale}"`,
      fs.readFileSync(home, "utf8").includes(`<div lang="${locale}"`),
    );
  }
}

const pad = Math.max(...checks.map((c) => c.name.length));
for (const c of checks) {
  const detail = !c.ok && c.detail ? `  ${c.detail}` : "";
  console.log(`  ${c.ok ? "ok  " : "FAIL"}  ${c.name.padEnd(pad)}${detail}`);
}

if (failures.length) {
  console.error(`\nverify-export: ${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log(`\nverify-export: ${checks.length} checks passed.`);
