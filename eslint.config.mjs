import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Tailwind v3 read `bg-[--x]` as shorthand for `bg-[var(--x)]`. Tailwind v4
 * dropped it in favour of `bg-(--x)` and now passes the value through raw, so
 * the class still compiles but emits `background-color: --x`, which every
 * browser discards.
 *
 * This earns a lint rule because it fails silently: it type-checks, lints,
 * builds and ships, and the only symptom is a colour quietly falling back to
 * inherit or currentColor. It cost a full debugging pass to find once.
 *
 * Use the @theme-generated utilities (bg-gallery, text-ink, border-line) —
 * see src/app/globals.css. Reach for `bg-(--x)` only for a variable with no
 * @theme token behind it.
 */
const NO_VAR_SHORTHAND =
  "Tailwind v4 removed the `-[--var]` shorthand; it compiles to an invalid " +
  "declaration that browsers drop. Use the @theme utility (bg-gallery, " +
  "text-ink, border-line) or the `-(--var)` form.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Not limited to className: pill-button.tsx keeps its variants in a plain
    // object, and those broke too.
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: "Literal[value=/-\\[--/]", message: NO_VAR_SHORTHAND },
        {
          selector: "TemplateElement[value.raw=/-\\[--/]",
          message: NO_VAR_SHORTHAND,
        },
      ],
    },
  },
  {
    /**
     * The catalogue data-access seam.
     *
     * `src/lib/products.ts` is the only application module allowed to know a
     * database exists. Everything else imports the `Product` type from
     * `src/lib/catalogue.ts`, which keeps the eventual move to the Shopify
     * Storefront API contained to one file.
     *
     * A comment saying so is not enough — the previous version leaked Prisma's
     * generated type into every component that rendered a fixture, and nothing
     * caught it. This does.
     */
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/prisma.ts", "src/lib/products.ts", "src/generated/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/generated/prisma", "@/generated/prisma/*", "@/lib/prisma"],
              message:
                "Only src/lib/products.ts may touch the database. Import the Product type from @/lib/catalogue and call the functions in @/lib/products.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
