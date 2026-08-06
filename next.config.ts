import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
