import { prisma } from "@/lib/prisma";
import { resolvePublicMedia } from "@/lib/media";
import type { Product } from "@/generated/prisma/client";

export type ProductWithGallery = Omit<Product, "heroImage" | "gallery"> & {
  heroImage: string | undefined;
  gallery: string[];
};

function parseGallery(product: Product): ProductWithGallery {
  const gallery = (JSON.parse(product.gallery) as string[])
    .map(resolvePublicMedia)
    .filter((src): src is string => Boolean(src));

  return { ...product, heroImage: resolvePublicMedia(product.heroImage), gallery };
}

export async function getFeaturedProducts(): Promise<ProductWithGallery[]> {
  const products = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { sortOrder: "asc" },
  });
  return products.map(parseGallery);
}

export async function getAllProducts(): Promise<ProductWithGallery[]> {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return products.map(parseGallery);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithGallery | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? parseGallery(product) : null;
}
