import { prisma } from "@/lib/prisma";
import { resolvePublicMedia } from "@/lib/media";
import type { Product as StoredProduct } from "@/generated/prisma/client";
import type { Family, FixtureType, Product } from "@/lib/catalogue";

/**
 * The catalogue's only data-access seam.
 *
 * This is the single application module that knows Prisma exists. Everything
 * else imports the `Product` type from `@/lib/catalogue` and calls the
 * functions below, so replacing SQLite with the Shopify Storefront API is a
 * rewrite of this file and nothing else.
 *
 * If you are that migration: keep these signatures, swap the bodies for
 * GraphQL queries, and delete `toProduct`'s JSON parsing (Shopify returns real
 * lists). Do not let a Shopify response type escape this module.
 *
 * Keep the export surface minimal. Every exported function is a contract the
 * replacement has to honour.
 */

/**
 * Storage row to domain object.
 *
 * Three things happen here and all of them are the point: JSON columns become
 * arrays, media paths are resolved against /public, and Prisma's enum types
 * are narrowed to the app's own unions. Storage detail stops at this function.
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
