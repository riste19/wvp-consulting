import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/`. Nothing here needs a Node server:
  // there are no route handlers beyond the metadata ones, no server actions
  // and no middleware, so Cloudflare Pages can serve plain files.
  output: "export",

  // Required, and load-bearing. Without a Node server the default loader's
  // `/_next/image?url=…` endpoint does not exist, so every image 404s.
  //
  // Next's own export guard will NOT catch this: it keys off
  // `__NEXT_IMAGE_IMPORTED`, which is only set by static image imports
  // (`import hero from "./hero.png"`). This project passes string paths from
  // `src/data/site/images.ts`, so the build stays green and ships broken
  // images. Never remove this line without also changing that.
  //
  // The cost is `srcset` — every image is served at one size. The photos in
  // public/images are pre-sized WebP to compensate. If a loader is added
  // later, keep the `sizes` props: inert today, correct the moment it exists.
  images: { unoptimized: true },

  // The project sits inside a home directory that contains an unrelated
  // package-lock.json; pin the workspace root so Turbopack ignores it.
  turbopack: { root: __dirname },
};

export default nextConfig;
