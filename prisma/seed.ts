import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const FINISHES = JSON.stringify(["Oak", "Walnut", "Black Ash"]);

/**
 * Every figure below is transcribed from the catalogue spec sheets in
 * References/Product Images/. Do not invent values here.
 */
const PRODUCTS = [
  {
    slug: "pendant",
    name: "Pendant",
    family: "ARCHITECTURAL" as const,
    type: "PENDANT" as const,
    tagline: "Down onto the table, up onto the ceiling.",
    description:
      "The longest bar in the range, suspended on two cables. A tight 64 degree beam goes down onto the surface and a wide 160 degree wash goes up into the ceiling, so the room reads as lit rather than the table alone. Rated UGR9, which means glare is effectively imperceptible from a seated position.",
    profileMm: "42 x 36",
    litLengthMm: "860 / 1200 / 1500",
    overallMm: "Suspension 500 to 1500",
    baseMm: "Ceiling plate 560 x 52",
    watts: "28.2 / 43.3 / 51.7",
    lumens: "3936 / 5910 / 6390",
    beamAngle: "64 down, 160 up",
    ugr: 9,
    kelvin: "2700K, 3000K, 1800 to 4000K, 2700 to 6500K",
    weightKg: "2.4 / 2.6 / 2.8",
    control: JSON.stringify([
      "Gesture control",
      "Dim-to-warm",
      "TRIAC leading edge",
      "DALI",
      "Casambi",
      "Matter",
    ]),
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "wall",
    name: "Wall",
    family: "ARCHITECTURAL" as const,
    type: "WALL" as const,
    tagline: "The bar, held off the wall on a black bracket.",
    description:
      "A 360mm bar on a matte black housing, splitting twelve watts evenly between up and down. The same deep-recessed optics as the Pendant, so it carries the same UGR9 rating in a fixture small enough for a hallway or a bedside.",
    profileMm: "38 x 38",
    litLengthMm: "360",
    overallMm: "Projection 87",
    baseMm: "",
    watts: "12 (6 down, 6 up)",
    lumens: "1740 (960 down, 780 up)",
    beamAngle: "64 down, 160 up",
    ugr: 9,
    kelvin: "2700K, 3000K, 1800 to 4000K, 2700 to 6500K",
    weightKg: "0.85",
    control: JSON.stringify([
      "Dim-to-warm",
      "TRIAC leading edge",
      "DALI",
      "Casambi",
      "Matter",
    ]),
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "floor-task",
    name: "Floor Task",
    family: "TASK" as const,
    type: "FLOOR_TASK" as const,
    tagline: "Reading light that reaches over the arm of a chair.",
    description:
      "A 425mm arm carried on a 12mm stem, standing 960mm from the floor. The arm is identical to the one on the Table Task. Only the stem and the base plate change, which is the clearest illustration of how this range is put together.",
    profileMm: "35 deep arm",
    litLengthMm: "350",
    overallMm: "960 high",
    baseMm: "250 x 120",
    watts: "8",
    lumens: "1040",
    beamAngle: "160",
    ugr: null,
    kelvin: "2700K, 3000K, 4000K, 1800 to 4000K",
    weightKg: "2.9",
    control: JSON.stringify(["Touch dimmer", "Dim-to-warm", "DALI"]),
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "table-task",
    name: "Table Task",
    family: "TASK" as const,
    type: "TABLE_TASK" as const,
    tagline: "The same arm, at desk height.",
    description:
      "410mm tall on a smaller plate, carrying the identical 425mm arm the Floor Task uses. Eight watts across 350mm of emitting length puts usable light on a desk without putting a bright object in your eyeline.",
    profileMm: "35 deep arm",
    litLengthMm: "350",
    overallMm: "410 high",
    baseMm: "180 x 100",
    watts: "8",
    lumens: "1040",
    beamAngle: "160",
    ugr: null,
    kelvin: "2700K, 3000K, 4000K, 1800 to 4000K",
    weightKg: "1.8",
    control: JSON.stringify(["Touch dimmer", "Dim-to-warm", "DALI"]),
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "floor-wash",
    name: "Floor Wash",
    family: "WASH" as const,
    type: "FLOOR_WASH" as const,
    tagline: "A metre of light standing in the corner of a room.",
    description:
      "The bar turned vertical: 1025mm of emitting length on a 1542mm column, weighted by a 250mm disc. Twenty-six watts washing a wall from floor to shoulder height, lighting a room by reflection instead of by pointing a bright source at anyone.",
    profileMm: "20 x 35",
    litLengthMm: "1025",
    overallMm: "1542 high",
    baseMm: "250 diameter",
    watts: "26",
    lumens: "3380",
    beamAngle: "160",
    ugr: null,
    kelvin: "2700K, 3000K, 4000K, 1800 to 4000K",
    weightKg: "5.6",
    control: JSON.stringify(["Touch dimmer", "Dim-to-warm", "DALI"]),
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "table-wash",
    name: "Table Wash",
    family: "WASH" as const,
    type: "TABLE_WASH" as const,
    tagline: "The column, shortened for a sideboard.",
    description:
      "467mm on a 150mm disc, with 360mm of emitting length. The same vertical column as the Floor Wash and the same 20 x 35 profile, sized to sit on furniture rather than on the floor.",
    profileMm: "20 x 35",
    litLengthMm: "360",
    overallMm: "467 high",
    baseMm: "150 diameter",
    watts: "8",
    lumens: "1040",
    beamAngle: "160",
    ugr: null,
    kelvin: "2700K, 3000K, 4000K, 1800 to 4000K",
    weightKg: "1.7",
    control: JSON.stringify(["Touch dimmer", "Dim-to-warm", "DALI"]),
    featured: false,
    sortOrder: 6,
  },
];

async function main() {
  await prisma.product.deleteMany();

  for (const p of PRODUCTS) {
    await prisma.product.create({
      data: {
        ...p,
        cri: 92,
        finishes: FINISHES,
        heroImage: `media/products/${p.slug}/hero.jpg`,
        gallery: JSON.stringify([
          `media/products/${p.slug}/gallery-1.jpg`,
          `media/products/${p.slug}/gallery-2.jpg`,
        ]),
      },
    });
  }

  console.log(`Seeded ${PRODUCTS.length} fixtures.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
