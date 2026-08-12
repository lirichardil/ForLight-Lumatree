import type { Family, FixtureType, Product } from "@/lib/catalogue";

/**
 * Catalogue source: Shopify Storefront API.
 *
 * Implements the same two functions as `./prisma.ts`. Nothing outside this
 * file knows Shopify exists — no Shopify response type is exported, and the
 * mapper below is the only place their field names appear.
 *
 * ---------------------------------------------------------------------------
 * What has to be true in the Shopify admin for this to work
 *
 * 1. A collection with handle `fixtures` (override with SHOPIFY_FIXTURES_
 *    COLLECTION) containing the six fixtures and nothing else. Samples and
 *    spare parts are Shopify products too, and this is what keeps them out of
 *    the catalogue pages.
 *
 * 2. That collection sorted **manually**. The query asks for MANUAL order, so
 *    dragging products in the admin is what sets the order on the site. This
 *    replaces the old sortOrder column.
 *
 * 3. Metafields in the `spec` namespace, listed in METAFIELDS below, and each
 *    one exposed to the Storefront API. A metafield that exists but is not
 *    published to the Storefront API reads as missing — that catches everyone
 *    once.
 *
 * 4. A product option named `Finish` carrying Oak / Walnut / Black Ash.
 *
 * Missing metafields do not throw. They fall back to empty and log a warning
 * naming the product and keys, because a blank spec table with a loud warning
 * is easier to debug than a crash, and far better than silent blanks.
 * ---------------------------------------------------------------------------
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const COLLECTION = process.env.SHOPIFY_FIXTURES_COLLECTION ?? "fixtures";

/**
 * Shopify dates API versions quarterly and supports each for twelve months.
 * Pin it deliberately rather than tracking "latest", and bump it on purpose.
 * Check the current stable version before going live.
 */
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-10";

/** Seconds. Catalogue data changes rarely; revalidateTag handles urgent edits. */
const REVALIDATE = 3600;

/** Cache tag, so a Shopify webhook can purge the catalogue on product update. */
export const CATALOGUE_TAG = "catalogue";

const METAFIELD_NAMESPACE = "spec";

/** Domain field -> metafield key. The admin must define every one of these. */
const METAFIELDS = {
  tagline: "tagline",
  family: "family",
  type: "type",
  profileMm: "profile_mm",
  litLengthMm: "lit_length_mm",
  overallMm: "overall_mm",
  baseMm: "base_mm",
  watts: "watts",
  lumens: "lumens",
  beamAngle: "beam_angle",
  ugr: "ugr",
  cri: "cri",
  kelvin: "kelvin",
  weightKg: "weight_kg",
  control: "control",
} as const;

const IDENTIFIERS = Object.values(METAFIELDS)
  .map((key) => `{namespace: "${METAFIELD_NAMESPACE}", key: "${key}"}`)
  .join(", ");

const FIXTURE_FRAGMENT = /* GraphQL */ `
  fragment FixtureFields on Product {
    id
    handle
    title
    description
    updatedAt
    featuredImage {
      url
    }
    images(first: 12) {
      nodes {
        url
      }
    }
    options {
      name
      values
    }
    metafields(identifiers: [${IDENTIFIERS}]) {
      key
      value
    }
  }
`;

const ALL_FIXTURES_QUERY = /* GraphQL */ `
  ${FIXTURE_FRAGMENT}
  query AllFixtures($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first, sortKey: MANUAL) {
        nodes {
          ...FixtureFields
        }
      }
    }
  }
`;

const ONE_FIXTURE_QUERY = /* GraphQL */ `
  ${FIXTURE_FRAGMENT}
  query Fixture($handle: String!) {
    product(handle: $handle) {
      ...FixtureFields
    }
  }
`;

// --- wire format, confined to this file ------------------------------------

type ShopifyMetafield = { key: string; value: string } | null;

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  updatedAt: string;
  featuredImage: { url: string } | null;
  images: { nodes: { url: string }[] };
  options: { name: string; values: string[] }[];
  metafields: ShopifyMetafield[];
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/**
 * POST a Storefront query.
 *
 * The Storefront API answers 200 with an `errors` array rather than an HTTP
 * error status, so checking `res.ok` alone silently returns undefined data.
 * Both are checked here.
 */
async function storefront<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Shopify catalogue source selected but SHOPIFY_STORE_DOMAIN or " +
        "SHOPIFY_STOREFRONT_ACCESS_TOKEN is unset. See .env.example."
    );
  }

  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE, tags: [CATALOGUE_TAG] },
  });

  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API returned ${res.status} ${res.statusText}`
    );
  }

  const body = (await res.json()) as GraphQLResponse<T>;

  if (body.errors?.length) {
    throw new Error(
      `Shopify Storefront API errors: ${body.errors.map((e) => e.message).join("; ")}`
    );
  }
  if (!body.data) {
    throw new Error("Shopify Storefront API returned no data");
  }
  return body.data;
}

// --- mapping ---------------------------------------------------------------

function toProduct(node: ShopifyProduct): Product {
  const values = new Map<string, string>();
  for (const field of node.metafields) {
    if (field?.value) values.set(field.key, field.value);
  }

  const missing = Object.values(METAFIELDS).filter((key) => !values.has(key));
  if (missing.length && process.env.NODE_ENV !== "production") {
    console.warn(
      `[shopify] ${node.handle}: missing spec metafields — ${missing.join(", ")}. ` +
        "Define them in the admin and expose each to the Storefront API."
    );
  }

  const text = (key: string) => values.get(key) ?? "";
  const int = (key: string) => {
    const raw = values.get(key);
    if (raw === undefined) return null;
    const n = Number.parseInt(raw, 10);
    return Number.isNaN(n) ? null : n;
  };

  // List metafields arrive as a JSON-encoded array of strings.
  const list = (key: string): string[] => {
    const raw = values.get(key);
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(String) : [raw];
    } catch {
      // A single_line_text_field where a list was expected. Take it as one entry.
      return [raw];
    }
  };

  const finishes =
    node.options.find((o) => o.name.toLowerCase() === "finish")?.values ?? [];

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    family: (text(METAFIELDS.family) || "ARCHITECTURAL") as Family,
    type: (text(METAFIELDS.type) || "PENDANT") as FixtureType,
    tagline: text(METAFIELDS.tagline),
    description: node.description,

    profileMm: text(METAFIELDS.profileMm),
    litLengthMm: text(METAFIELDS.litLengthMm),
    overallMm: text(METAFIELDS.overallMm),
    baseMm: text(METAFIELDS.baseMm),

    watts: text(METAFIELDS.watts),
    lumens: text(METAFIELDS.lumens),
    beamAngle: text(METAFIELDS.beamAngle),
    ugr: int(METAFIELDS.ugr),
    cri: int(METAFIELDS.cri) ?? 92,
    kelvin: text(METAFIELDS.kelvin),
    weightKg: text(METAFIELDS.weightKg),

    control: list(METAFIELDS.control),
    finishes,

    heroImage: node.featuredImage?.url,
    gallery: node.images.nodes.map((i) => i.url),

    updatedAt: new Date(node.updatedAt),
  };
}

// --- the contract ----------------------------------------------------------

export async function getAllProducts(): Promise<Product[]> {
  const data = await storefront<{
    collection: { products: { nodes: ShopifyProduct[] } } | null;
  }>(ALL_FIXTURES_QUERY, { handle: COLLECTION, first: 50 });

  if (!data.collection) {
    throw new Error(
      `Shopify collection "${COLLECTION}" not found. Create it, add the ` +
        "fixtures, and set its sort order to manual."
    );
  }
  return data.collection.products.nodes.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await storefront<{ product: ShopifyProduct | null }>(
    ONE_FIXTURE_QUERY,
    { handle: slug }
  );
  return data.product ? toProduct(data.product) : null;
}
