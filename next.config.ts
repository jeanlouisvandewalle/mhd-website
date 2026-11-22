import type { NextConfig } from "next";

/**
 * Statische export: `npm run build` levert een volledig statische site op in `out/`,
 * te hosten op GitHub Pages, Netlify, Cloudflare Pages of elke andere webserver.
 * Afbeeldingen worden vooraf geoptimaliseerd door `scripts/images.mjs`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  // Enkel voor de voorbeeldlink op GitHub Pages (submap); leeg op het eigen domein.
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
