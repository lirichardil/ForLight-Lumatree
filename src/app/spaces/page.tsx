import type { Metadata } from "next";
import { compactFigure } from "@/lib/figures";
import Link from "next/link";
import FixtureDiagram from "@/components/fixture-diagram";
import Reveal from "@/components/reveal";
import PillButton from "@/components/pill-button";
import { getAllProducts } from "@/lib/products";
import { BAR } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Spaces. Lumatree",
  description:
    "Which Lumatree fixture suits a dining table, a reading chair, a bedside, a desk or a hallway, and why.",
};

/**
 * Fixtures by room rather than by type.
 *
 * Buyers arrive with a room, not a mount. GRAU browses this way (Dining,
 * Living, Bedroom, Home Office, Entrée) and it is the highest-leverage
 * merchandising surface for a six-fixture range, because at this size a
 * browse-by-type axis just reproduces the collection list.
 *
 * Every claim here has to trace to a figure in the catalogue. The `slugs`
 * arrays reference real products and the specs are read from the database at
 * render time, so nothing is retyped and nothing drifts. Where a number is a
 * general convention rather than a Lumatree specification — hanging heights
 * above a table, for instance — the copy says so.
 *
 * The diagrams are the interim visual. When photography lands, the media block
 * in each row is the only thing that changes.
 */

type Space = {
  id: string;
  name: string;
  lead: string;
  /** Product slugs, primary first. */
  slugs: string[];
  body: string;
  /** Practical guidance. Marked as convention where it is not a spec. */
  note?: string;
};

const SPACES: Space[] = [
  {
    id: "dining",
    name: "Dining",
    lead: "A table wants light on it, and a ceiling that does not go black.",
    slugs: ["pendant"],
    body:
      "The Pendant is bi-emissive: 64 degrees down onto the table and 160 degrees up onto the ceiling. Most dining pendants light the table and leave the room above it dark, which is what makes a lit table feel like a pool in a cave. Sending part of the output upward gives the ceiling something to return, so the room reads as lit rather than the table alone.",
    note:
      "Convention is 750 to 900mm above the table top. The suspension adjusts from 500 to 1500mm, so both a low table and a high ceiling are inside the range.",
  },
  {
    id: "living",
    name: "Living",
    lead: "Two jobs that are usually solved with one badly placed lamp.",
    slugs: ["floor-wash", "floor-task"],
    body:
      "Ambient light and reading light are different problems. The Floor Wash stands in a corner and puts 3380 lumens up a wall from floor to shoulder height, lighting the room by reflection rather than by pointing a bright source at anyone sitting in it. The Floor Task does the close work, reaching over the arm of a chair at 960mm.",
    note:
      "Used together they run on the same dim-to-warm curve, so the ambient and the task light stay the same colour as the evening goes on.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    lead: "Light beside the bed without giving up the surface.",
    slugs: ["wall", "table-wash"],
    body:
      "The Wall carries the same recessed optics as the Pendant and the same UGR9 rating, in 360mm and projecting only 87mm from the wall. Twelve watts split 960 lumens down and 780 up, which is reading light on one side and a soft ceiling on the other. It leaves the bedside table empty. Where a surface is available, the Table Wash does the same job standing up at 467mm.",
  },
  {
    id: "study",
    name: "Study",
    lead: "Usable light on a desk without a bright object in your eyeline.",
    slugs: ["table-task", "floor-task"],
    body:
      "Eight watts across 350mm of emitting length, at 410mm high. Spreading the source along a bar rather than concentrating it in a head is what keeps it out of your field of view while you work — the same reasoning as the recess depth, applied to the length of the fixture instead of its section. The Floor Task is the same arm at 960mm, for a desk against a wall with no room on it.",
  },
  {
    id: "hallway",
    name: "Hallway and stair",
    lead: "A corridor is the one place projection depth actually matters.",
    slugs: ["wall"],
    body:
      "At 87mm from the wall the Wall fixture stays outside the swing of a door and out of the way in a tight corridor. The upward component matters more here than anywhere else: a hallway lit only downward reads as a tunnel, and 780 lumens on the ceiling opens it up.",
  },
];

export default async function SpacesPage() {
  const products = await getAllProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  return (
    <>
      <section className="bg-gallery px-6 pb-24 pt-40 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="max-w-[15ch] text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.045em] text-ink">
              You arrive with a room, not a fixture.
            </h1>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#5c5c5c]">
              The same {BAR} bar solves five quite different problems depending
              on how it is held. This is which one to reach for, and the reason
              rather than the recommendation.
            </p>
          </Reveal>
        </div>
      </section>

      {SPACES.map((space, i) => {
        const picks = space.slugs
          .map((slug) => bySlug.get(slug))
          .filter((p) => p !== undefined);

        return (
          <section
            key={space.id}
            className="border-t border-line bg-gallery px-6 py-20 lg:px-10 lg:py-28"
          >
            <div className="mx-auto max-w-[1400px]">
              <Reveal>
                <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
                  <div>
                    {/* Index number, so five long rows still read as a sequence. */}
                    <p className="figure text-[11px] text-[#9a9a9a]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-ink">
                      {space.name}
                    </h2>
                    <p className="mt-5 max-w-sm text-[clamp(1rem,1.7vw,1.2rem)] font-light leading-[1.5] tracking-[-0.015em] text-ink">
                      {space.lead}
                    </p>
                  </div>

                  <div>
                    <p className="max-w-xl text-[14px] leading-relaxed text-[#5c5c5c]">
                      {space.body}
                    </p>
                    {space.note && (
                      <p className="mt-5 max-w-xl border-l border-line pl-5 text-[13px] leading-relaxed text-[#6b6b6b]">
                        {space.note}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Recommended fixtures. Diagram now, photograph later. */}
              <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {picks.map((product, pi) => (
                  <Reveal key={product.id} delay={pi * 0.08}>
                    <Link
                      href={`/collection/${product.slug}`}
                      className="group flex flex-col border-t border-line pt-5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-lg tracking-[-0.03em] text-ink">
                          {product.name}
                        </h3>
                        <span className="figure text-[11px] whitespace-nowrap text-[#6b6b6b]">
                          {pi === 0 ? "Primary" : "Also"}
                        </span>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#5c5c5c]">
                        {product.tagline}
                      </p>
                      <div className="mt-5 aspect-[5/4] bg-gallery-dim p-3 transition-colors duration-500 group-hover:bg-[#e4e4df]">
                        <FixtureDiagram
                          slug={product.slug}
                          className="h-full w-full text-ink"
                        />
                      </div>
                      <p className="figure mt-4 text-[12px] text-[#6b6b6b]">
                        {compactFigure(product.lumens)} lm ·{" "}
                        {compactFigure(product.watts)} W
                        {product.ugr ? ` · UGR${product.ugr}` : ""}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-line bg-gallery px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[20ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.06] tracking-[-0.04em] text-ink">
                Send us the room and we will return the calculation.
              </h2>
              <PillButton href="/specify">Specify</PillButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
