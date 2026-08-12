import type { Product } from "@/lib/catalogue";

/**
 * The catalogue's data-access seam.
 *
 * Two interchangeable sources implement the same pair of functions:
 *
 *   src/lib/sources/prisma.ts    local SQLite, the interim store
 *   src/lib/sources/shopify.ts   Storefront API, the destination
 *
 * `CATALOGUE_SOURCE` picks between them at runtime. Seven files call these
 * functions and none of them can tell which source answered — that is the
 * whole point, and it is why the domain type in `@/lib/catalogue` is written
 * by hand rather than derived from either backend.
 *
 * The switch is explicit rather than inferred from whether Shopify credentials
 * happen to be present. Silently falling back to SQLite because a token was
 * misspelled is exactly the kind of failure that reaches production looking
 * like stale data.
 *
 * Imports are dynamic so the unused source is never loaded — in Shopify mode
 * the Prisma client is not constructed at all. These functions are already
 * async, so it costs nothing.
 *
 * To cut over: set CATALOGUE_SOURCE=shopify. To roll back: unset it. When the
 * migration has held for a while, delete sources/prisma.ts, drop Prisma from
 * package.json, and collapse this file into a re-export.
 */

export type CatalogueSource = "prisma" | "shopify";

export function catalogueSource(): CatalogueSource {
  return process.env.CATALOGUE_SOURCE === "shopify" ? "shopify" : "prisma";
}

async function source() {
  return catalogueSource() === "shopify"
    ? import("@/lib/sources/shopify")
    : import("@/lib/sources/prisma");
}

export async function getAllProducts(): Promise<Product[]> {
  return (await source()).getAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return (await source()).getProductBySlug(slug);
}
