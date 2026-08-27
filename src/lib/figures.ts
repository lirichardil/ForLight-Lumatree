/**
 * Formatting for spec figures.
 *
 * Several catalogue fields are genuinely multi-valued or carry their own
 * qualifier, because the fixtures are: Pendant ships at three lengths with
 * three different outputs ("3936 / 5910 / 6390"), Wall is bi-emissive and
 * states its split ("1740 (960 down, 780 up)"), and a few dimensions name the
 * thing they measure ("250 diameter"). See the note in `@/lib/catalogue` about
 * modelling those as variants eventually.
 *
 * Until then, every surface that renders a figure has to cope with all three
 * shapes. Two places previously did not:
 *
 *   - the summary rows truncated on whitespace, so Pendant's hero read
 *     "3936 lm" while its own spec table two screens down read
 *     "3936 / 5910 / 6390 lm" — the hero understated the fixture by 62%
 *   - the spec table appended units unconditionally, producing
 *     "64 down, 160 up degrees" and "35 deep arm mm"
 *
 * This file is the single place that knows those shapes. It stays
 * dependency-free, like `@/lib/catalogue`, and it works the same whether the
 * value came from SQLite or a Shopify metafield.
 */

/** A bare figure, or a slash/×-separated run of them: "8", "42 x 36", "2.4 / 2.6". */
const FIGURES = String.raw`[\d.]+(?:\s*[/x×]\s*[\d.]+)*`;

/** Bare figures, optionally followed by a parenthetical breakdown. */
const FIGURES_THEN_NOTE = new RegExp(`^(${FIGURES})(\\s*\\(.*\\))?$`, "i");

/**
 * Compact form for the three-across summary rows — the hero dl, the fixture
 * card, and the inline figures on /spaces and /specify.
 *
 * A range rather than the first value, so a multi-length fixture is comparable
 * against a single-length one instead of silently reporting its smallest.
 * The parenthetical breakdown is dropped: the headline number already is the
 * total, and the split belongs on the spec table where there is room for it.
 *
 *   "3936 / 5910 / 6390"        -> "3936–6390"
 *   "1740 (960 down, 780 up)"   -> "1740"
 *   "1040"                      -> "1040"
 */
export function compactFigure(raw: string): string {
  const value = raw.replace(/\s*\([^)]*\)\s*$/, "").trim();
  if (!value) return value;

  const parts = value.split(/\s*[/]\s*/).filter(Boolean);
  const allBare = parts.every((part) => /^[\d.]+$/.test(part));
  if (parts.length > 1 && allBare) {
    return `${parts[0]}–${parts[parts.length - 1]}`;
  }
  return value;
}

/**
 * Beam angle for the same summary rows.
 *
 * Bi-emissive fixtures state two angles ("64 down, 160 up"). Taking the text
 * before the comma dropped the upward component, which on the Pendant is the
 * whole reason the fixture exists. Keep both figures, drop the words.
 *
 *   "64 down, 160 up" -> "64 / 160"
 *   "160"             -> "160"
 */
export function compactBeam(raw: string): string {
  const numbers = raw.match(/[\d.]+/g);
  return numbers ? numbers.join(" / ") : raw.trim();
}

/**
 * Append a unit, but only where one belongs.
 *
 * A value that is bare figures takes the unit directly. A value that carries a
 * parenthetical breakdown takes it on the headline figure, before the bracket,
 * so "12 (6 down, 6 up)" reads "12 W (6 down, 6 up)" rather than
 * "12 (6 down, 6 up) W".
 *
 * A value that is free text already names its own dimension — "35 deep arm",
 * "250 diameter", "Ceiling plate 560 x 52", "64 down, 160 up" — and is
 * returned untouched. Appending to those is what produced "35 deep arm mm".
 */
export function withUnit(raw: string, unit: string): string {
  const value = raw.trim();
  if (!value) return value;

  const match = FIGURES_THEN_NOTE.exec(value);
  return match ? `${match[1]} ${unit}${match[2] ?? ""}` : value;
}
