import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project sits inside a home directory that contains an unrelated
  // package-lock.json; pin the workspace root so Turbopack ignores it.
  turbopack: { root: __dirname },
};

export default nextConfig;
