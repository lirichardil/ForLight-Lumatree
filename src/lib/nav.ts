import { hasProjects } from "@/lib/projects";

type NavLink = { href: string; label: string };

/**
 * Header navigation, in the order a buyer moves: what it is, where it goes,
 * how it works, proof, how to specify it, who made it.
 *
 * Six is the ceiling and Projects is the sixth, which is why it only appears
 * once it has entries. GRAU runs six against a far larger catalogue; Midgard's
 * 68-link mega-menu is what a dual taxonomy costs, and with six fixtures both
 * axes collapse to the same list anyway.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { href: "/collection", label: "Collection" },
  { href: "/spaces", label: "Spaces" },
  { href: "/light", label: "Light" },
  // Absent until src/lib/projects.ts has entries — see the note there.
  ...(hasProjects ? [{ href: "/projects", label: "Projects" }] : []),
  { href: "/specify", label: "Specify" },
  { href: "/studio", label: "Studio" },
];

/**
 * The footer carries Contact as well. The header does not, because the Enquire
 * button already points there and two routes to the same page in one bar reads
 * as indecision.
 */
export const FOOTER_LINKS: readonly NavLink[] = [
  ...NAV_LINKS,
  { href: "/contact", label: "Contact" },
];
