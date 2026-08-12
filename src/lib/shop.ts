/**
 * Sellable items that are not fixtures.
 *
 * Samples and spare parts sit outside the catalogue model — they have no
 * lumens, no beam angle, no UGR — so they get their own small type rather than
 * being forced into `Product`. In Shopify they are ordinary products; the
 * separation is only for this codebase, where `Product` is fixture-shaped.
 *
 * Why samples matter more than they look: the finish sample set is the
 * intended **first purchasable product**, ahead of any fixture. It exercises
 * the entire pipeline — Storefront API, cart, hosted checkout, payment, order,
 * fulfilment — at the lowest possible risk. No installation questions, minimal
 * returns, cheap to ship.
 *
 * It is also better lead capture than the form it replaces. `/specify`
 * currently offers samples through the contact form, which yields an email
 * address. A paid order yields a name, a delivery address, a payment method
 * and a demonstrated intent to specify.
 *
 * Prices are null here on purpose. Shopify owns price and currency once the
 * store exists, and inventing numbers now would only create two sources of
 * truth. The frontend renders "Price on request" while price is null.
 */

export type ShopItemKind = "sample" | "spare";

export type ShopItem = {
  /** Becomes the Shopify product handle. */
  handle: string;
  name: string;
  kind: ShopItemKind;
  summary: string;
  /** What is in the box, listed on the product page. */
  contents?: string[];
  /** Null until set in Shopify. Never hard-code a price here. */
  price: null;
};

/**
 * The sample set.
 *
 * Proposal, not a confirmed SKU: send short offcuts of the real extrusion
 * rather than flat timber swatches. An offcut carries a machined lens well,
 * which means the sample demonstrates the recess depth — the actual
 * technology — and not just the grain. A flat swatch shows a specifier the
 * wood; an offcut shows them why the glare figure is what it is.
 *
 * Confirm with the factory that short offcuts are producible before this goes
 * live, and confirm the length. 100mm is a guess sized to fit a letter box.
 */
export const SAMPLES: ShopItem[] = [
  {
    handle: "finish-sample-set",
    name: "Finish sample set",
    kind: "sample",
    summary:
      "All three timbers as short offcuts of the real profile, each carrying a machined lens well so the recess depth is visible rather than described.",
    contents: [
      "Oak offcut",
      "Walnut offcut",
      "Black Ash offcut",
      "Specification card with the full range",
    ],
    price: null,
  },
];

/**
 * Spare parts.
 *
 * Deliberately empty. Midgard, GRAU and Santa & Cole all run a spare parts
 * section, and for a five-year warranty on a hardwired product it is close to
 * expected. But the list has to come from the factory — drivers, suspension
 * kits, wall brackets, weighted bases, touch dimmer modules — and guessing at
 * it would put parts on sale that may not exist as orderable items.
 *
 * Ask the factory for the serviceable parts list, then add entries here.
 */
export const SPARES: ShopItem[] = [];

export const hasSpares = SPARES.length > 0;
