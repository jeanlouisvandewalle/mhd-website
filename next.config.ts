import type { NextConfig } from "next";

/**
 * Statische export: `npm run build` levert een volledig statische site op in `out/`,
 * te hosten op GitHub Pages, Netlify, Cloudflare Pages of elke andere webserver.
 * Afbeeldingen worden vooraf geoptimaliseerd door `scripts/images.mjs`.
 */
const nextConfig: NextConfig = {
  output: "export",
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
