/**
 * Brand vocabulary.
 *
 * Two named things, and only two. A third named technology starts to read as
 * marketing rather than engineering, so dim-to-warm stays a generic term until
 * there is a reason to promote it.
 *
 * Everything user-facing imports from here, so renaming either is one edit.
 */

/**
 * The bar itself — the component all six mounts share, and the reason the
 * range coheres at all.
 *
 * Greek κανών: a straight rod used as a measure, and by extension the
 * standard. Both senses are literally true of the product. The root is κάννα,
 * a reed, so the word travels reed → rod → standard, which is the same journey
 * as a timber extrusion that becomes the basis for six fixtures.
 *
 * Spelled with a K to stay clear of the camera company.
 */
export const BAR = "Kanon";

/**
 * The optical system: each LED seated at the bottom of a machined well, below
 * the surface of the timber, so the source is out of view from any normal
 * seated position.
 *
 * This is the named technology rather than the dim-to-warm curve, because
 * dim-to-warm is a commodity (GRAU's Sunset Dimming, Philips WarmGlow, Lutron
 * Warm Dim) while UGR9 in a domestic timber fixture is not.
 */
export const OPTIC = "Deepwell";

/**
 * UGR9 is measured on Pendant and Wall only. Task and Wash carry no UGR figure
 * in the catalogue, so any glare claim has to name the family it applies to.
 * Do not let this widen into a range-wide claim.
 */
export const UGR_FAMILIES = "Pendant and Wall";
