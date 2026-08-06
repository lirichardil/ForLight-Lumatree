import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/site";
import { hasProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/collection`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/spaces`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/light`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/specify`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/studio`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
    // Omitted while the route 404s. See src/lib/projects.ts.
    ...(hasProjects
      ? [
          {
            url: `${SITE_URL}/projects`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
        ]
      : []),
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/collection/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
