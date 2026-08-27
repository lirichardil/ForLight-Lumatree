// Swap this once the site has a real domain — everything else (sitemap,
// metadata) reads from here.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumatree.example";

/**
 * Where enquiries go. Shown on /contact and used as the form's fallback, so
 * the address appears once.
 */
export const ENQUIRY_EMAIL = "hello@lumatree.com";

/**
 * Optional form backend — anything that accepts a JSON POST (Formspree, Basin,
 * a Worker, a route handler once one exists).
 *
 * Deliberately client-visible and deliberately optional, because the contact
 * form has to keep working under STATIC_EXPORT, where there is no server to
 * run a server action. When this is unset the form composes a mailto: instead
 * of claiming a delivery it cannot make — see src/components/contact-form.tsx.
 */
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "";
