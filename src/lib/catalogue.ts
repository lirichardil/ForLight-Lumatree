/**
 * The catalogue domain model.
 *
 * Hand-written on purpose. This type is owned by the application, not derived
 * from whatever happens to be storing the data — it previously read
 * `Omit<Product, ...>` off the generated Prisma client, which meant the ORM's
 * shape reached every component that rendered a fixture.
 *
 * That matters because the store behind this is temporary. The catalogue moves
 * to the Shopify Storefront API, and when it does, only `src/lib/products.ts`
 * should change. Anything importing from here keeps compiling.
 *
 * This file must stay dependency-free. No Prisma, no Shopify, no React. If it
 * ever imports a client, the decoupling has been undone.
 *
 * ---------------------------------------------------------------------------
 * Mapping to Shopify, for whoever does the migration
 *
 *   slug            → `handle`. Existing slugs are already valid handles.
 *   name            → `title`
 *   tagline         → a metafield, or `seo.description`
 *   description     → `descriptionHtml`
 *   family, type    → tags, or a metafield with a defined choice list
 *   ugr/cri/kelvin  → metafields, one per figure
 *   finishes        → a product **option** (Oak / Walnut / Black Ash)
 *   heroImage,      → `featuredImage` and `images`, served from
 *   gallery           cdn.shopify.com (needs images.remotePatterns)
 *
 * The unresolved one is `watts`, `lumens` and `litLengthMm`. Pendant genuinely
 * ships at three lengths with three different outputs, held here as display
 * strings ("28.2 / 43.3 / 51.7"). In Shopify those are three **variants**,
 * each with its own SKU, price and inventory. Splitting them is a data change,
 * not a type change, so it is deliberately not modelled yet — but a variant
 * array is what belongs here eventually, not a slash-separated string.
 * ---------------------------------------------------------------------------
 */

export type Family = "ARCHITECTURAL" | "TASK" | "WASH";

export type FixtureType =
  | "PENDANT"
  | "WALL"
  | "FLOOR_TASK"
  | "FLOOR_WASH"
  | "TABLE_TASK"
  | "TABLE_WASH";

export type Product = {
  id: string;
  slug: string;
  name: string;
  family: Family;
  type: FixtureType;
  tagline: string;
  description: string;

  /** Geometry, millimetres. Strings because several are genuine multi-values. */
  profileMm: string;
  litLengthMm: string;
  overallMm: string;
  /** Empty for Pendant and Wall, which have no base. */
  baseMm: string;

  /** Photometrics, transcribed from the catalogue spec sheets. */
  watts: string;
  lumens: string;
  beamAngle: string;
  /** Only the bi-emissive Pendant and Wall are UGR rated. */
  ugr: number | null;
  cri: number;
  kelvin: string;
  weightKg: string;

  /**
   * Parsed, not raw JSON. Storage keeps these as encoded strings; callers
   * should never have to know that, and under Shopify they arrive as real
   * lists anyway.
   */
  control: string[];
  finishes: string[];

  /** Undefined when the file is not present under /public yet. */
  heroImage: string | undefined;
  gallery: string[];

  updatedAt: Date;
};
