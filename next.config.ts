import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `STATIC_EXPORT=1 npm run build` writes a self-contained site to `out/`.
   *
   * Every route here is prerendered and the database is read at build time
   * only, so the result is plain files that any static host will serve. Used
   * to hand a working preview to someone without giving them the repository.
   *
   * Two things do not survive the export, both acceptable for a preview: the
   * redirects below need a server, and so would any future server action.
   * Do not use this for production once checkout exists.
   */
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,

  /**
   * Product imagery is served from the Shopify CDN once CATALOGUE_SOURCE is
   * shopify. Without this, next/image rejects those URLs outright.
   */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },

  /**
   * The 2026 restructure renamed three routes. 308 rather than 307 so search
   * engines transfer ranking to the new URLs instead of treating the move as
   * temporary, and so the method is preserved.
   *
   * /products/:slug has to be listed before /products, or the bare rule
   * swallows the fixture pages and drops the slug.
   *
   * These stay indefinitely. Any spec sheet, email or drawing already in
   * circulation carries the old links.
   */
  redirects() {
    return Promise.resolve([
      { source: "/products/:slug", destination: "/collection/:slug", permanent: true },
      { source: "/products", destination: "/collection", permanent: true },
      { source: "/features", destination: "/light", permanent: true },
      { source: "/company", destination: "/studio", permanent: true },
    ]);
  },
};

export default nextConfig;
