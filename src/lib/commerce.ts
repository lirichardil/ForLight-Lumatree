/**
 * How each fixture is sold.
 *
 * Lumatree runs a hybrid model: some of the range is bought online, the rest
 * is quoted from drawings. This module is the single place that decides which,
 * so changing your mind is one edit rather than a hunt through page files.
 *
 * ---------------------------------------------------------------------------
 * The dividing line
 *
 * Not table versus floor, which is a naming coincidence. The line is whether
 * the fixture can be unboxed and used, and whether it fits in a parcel:
 *
 *   plug-in, parcel-shippable   -> direct
 *   hardwired, or freight       -> quote
 *
 * Floor Task sits on the direct side despite the name: it is the same 425mm
 * arm as Table Task on a taller stem, plug-in with a touch dimmer, and 960mm
 * is a parcel. Wall is direct despite being hardwired, because it is 360mm and
 * 0.85kg and it is one of only two UGR9 fixtures in the range — the cheapest
 * way for someone to own the actual product. The cost of that choice is
 * fielding some wiring questions.
 *
 * Pendant stays quoted because it ships in three lengths and the suspension
 * has to be set against a real ceiling. Floor Wash stays quoted because a
 * 1542mm column is a freight and breakage problem, not a parcel.
 * ---------------------------------------------------------------------------
 *
 * Mapping to Shopify
 *
 * Every fixture becomes a Shopify product either way — the quoted ones too,
 * because the site needs their specs, images and metafields to render. The
 * only difference is availability:
 *
 *   direct -> published, priced, has inventory, purchasable
 *   quote  -> not available for sale; the frontend renders Enquire instead
 *
 * Keep this map as the source of truth even after the migration. Deriving the
 * mode from `availableForSale` would mean a fixture silently flips to Enquire
 * the moment it goes out of stock, which is not the same thing at all.
 */

export type PurchaseMode = "direct" | "quote";

const MODES: Record<string, PurchaseMode> = {
  wall: "direct",
  "floor-task": "direct",
  "table-task": "direct",
  "table-wash": "direct",
  pendant: "quote",
  "floor-wash": "quote",
};

/** Unknown slugs quote rather than sell. Failing closed is the safe direction. */
export function purchaseMode(slug: string): PurchaseMode {
  return MODES[slug] ?? "quote";
}

/**
 * Why a fixture is quoted, shown on its page.
 *
 * A bare "Enquire" where the rest of the range has a price reads as evasion.
 * Saying which measurement we need turns it into a reason, and it is true
 * today and will still be true after checkout goes live.
 */
const QUOTE_REASONS: Record<string, string> = {
  pendant:
    "The Pendant ships at three lengths with three different outputs, and the suspension is cut to the ceiling. We need the drop and the table before we can price it.",
  "floor-wash":
    "At 1542mm the Floor Wash ships on a pallet rather than as a parcel, so freight is quoted against the delivery address.",
};

export function quoteReason(slug: string): string | undefined {
  return QUOTE_REASONS[slug];
}
