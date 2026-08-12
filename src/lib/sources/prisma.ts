import { prisma } from "@/lib/prisma";
import { resolvePublicMedia } from "@/lib/media";
import type { Product as StoredProduct } from "@/generated/prisma/client";
import type { Family, FixtureType, Product } from "@/lib/catalogue";

/**
 * Catalogue source: local SQLite via Prisma.
 *
 * The interim store, used until the Shopify store exists. It implements the
 * same two functions as `./shopify.ts`; `src/lib/products.ts` picks between
 * them. Neither source is imported anywhere else.
 *
 * This is the only application module permitted to touch the database, which
 * ESLint enforces — see the seam rule in eslint.config.mjs.
 *
 * Delete this file once the migration is done, and drop Prisma from
 * package.json with it.
 */

/**
 * Storage row to domain object.
 *
 * JSON columns become arrays, media paths resolve against /public, and
 * Prisma's enums narrow to the app's own unions. Storage detail stops here.
 */
function toProduct(row: StoredProduct): Product {
  const gallery = (JSON.parse(row.gallery) as string[])
    .map(resolvePublicMedia)
    .filter((src): src is string => Boolean(src));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    family: row.family as Family,
    type: row.type as FixtureType,
    tagline: row.tagline,
    description: row.description,

    profileMm: row.profileMm,
    litLengthMm: row.litLengthMm,
    overallMm: row.overallMm,
    baseMm: row.baseMm,

    watts: row.watts,
    lumens: row.lumens,
    beamAngle: row.beamAngle,
    ugr: row.ugr,
    cri: row.cri,
    kelvin: row.kelvin,
    weightKg: row.weightKg,

    control: JSON.parse(row.control) as string[],
    finishes: JSON.parse(row.finishes) as string[],

    heroImage: resolvePublicMedia(row.heroImage),
    gallery,

    updatedAt: row.updatedAt,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : null;
}
