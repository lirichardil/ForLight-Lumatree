/**
 * Reference installations.
 *
 * Deliberately empty. This is the single biggest trust asset in specification
 * lighting — Santa & Cole and GRAU both run one — and it is the one page that
 * cannot be written, only earned. A "Projects" page carrying nothing but a
 * coming-soon line is worse than no page at all: a specifier reads it as a
 * brand with no installations, which is exactly what it would be saying.
 *
 * So the route exists and is finished, but it hides itself. `hasProjects`
 * drives three things at once — the page 404s, the nav link is absent, and the
 * sitemap omits the URL — so there is no way to half-ship it.
 *
 * To go live: add entries below. Nothing else needs touching.
 *
 * What to capture per project, in rough order of how much it convinces:
 *   - a photograph of the room, lit, at night
 *   - which fixtures, in what finish, how many
 *   - the practice that specified it
 *   - what the room had to do that made this the right answer
 *
 * Three entries is about the floor for the page to read as evidence rather
 * than as an exception.
 */

export type Project = {
  slug: string;
  name: string;
  /** City and country, e.g. "Copenhagen, DK". */
  location: string;
  year: number;
  /** Product slugs used, matching the catalogue. */
  fixtures: string[];
  /** One line for the index. */
  summary: string;
  /** Specifying practice or studio, where they permit the credit. */
  practice?: string;
  photographer?: string;
};

export const PROJECTS: Project[] = [];

/** Gates the route, the nav entry and the sitemap together. */
export const hasProjects = PROJECTS.length > 0;
