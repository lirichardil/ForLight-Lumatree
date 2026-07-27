import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const gallery = (slug: string, count: number) =>
  JSON.stringify(
    Array.from({ length: count }, (_, i) => `/media/products/${slug}/gallery-${i + 1}.jpg`)
  );

const products = [
  {
    slug: "sapling",
    name: "Sapling",
    series: "Canopy Pendants",
    type: "PENDANT" as const,
    tagline: "A single bud of light.",
    description:
      "The smallest form in the Lumatree series: one diffuser, one gentle bloom of light. Sapling reads as a single new growth — quiet enough for a bedside, considered enough for a reading nook.",
    materials: "Blown opal glass, brushed bronze stem",
    diameterCm: 24,
    heightCm: 32,
    colorTempK: 2700,
    lumens: 620,
    dimmable: true,
    priceUsd: 420,
    heroImage: "/media/products/sapling/hero.jpg",
    gallery: gallery("sapling", 3),
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "bough",
    name: "Bough",
    series: "Canopy Pendants",
    type: "PENDANT" as const,
    tagline: "Light held at an angle.",
    description:
      "Bough carries its diffuser off a single curved arm, the way a branch holds its leaf toward the sun. Made for a kitchen island or a dining table it wants to lean over.",
    materials: "Blown opal glass, brushed bronze arm",
    diameterCm: 38,
    heightCm: 46,
    colorTempK: 2700,
    lumens: 1100,
    dimmable: true,
    priceUsd: 680,
    heroImage: "/media/products/bough/hero.jpg",
    gallery: gallery("bough", 4),
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "grove",
    name: "Grove",
    series: "Canopy Chandeliers",
    type: "CHANDELIER" as const,
    tagline: "A cluster of saplings, grown up.",
    description:
      "Nine diffusers at staggered heights, clustered the way a grove of young trees fills a clearing unevenly. Grove is built for a stairwell or a double-height dining room — a room that can hold its scale.",
    materials: "Blown opal glass, blackened steel canopy",
    diameterCm: 64,
    heightCm: 90,
    colorTempK: 2700,
    lumens: 4200,
    dimmable: true,
    priceUsd: 3200,
    heroImage: "/media/products/grove/hero.jpg",
    gallery: gallery("grove", 5),
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "root",
    name: "Root",
    series: "Floor Series",
    type: "FLOOR" as const,
    tagline: "Light that starts at the ground.",
    description:
      "A tall, single stem that widens gently into an uplight canopy, sending light up and out the way a root system spreads underground before anything shows above it. Reads as sculpture when off, as atmosphere when on.",
    materials: "Spun brushed bronze, opal glass canopy",
    diameterCm: 40,
    heightCm: 158,
    colorTempK: 2400,
    lumens: 1800,
    dimmable: true,
    priceUsd: 940,
    heroImage: "/media/products/root/hero.jpg",
    gallery: gallery("root", 4),
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "branch",
    name: "Branch",
    series: "Wall Series",
    type: "SCONCE" as const,
    tagline: "One arm, reaching from the wall.",
    description:
      "A single curved arm extends from a low profile back plate, ending in one soft bud of light — the wall-mounted counterpart to Bough, for a hallway or a headboard wall.",
    materials: "Brushed bronze, opal glass",
    diameterCm: 18,
    heightCm: 28,
    colorTempK: 2700,
    lumens: 480,
    dimmable: true,
    priceUsd: 340,
    heroImage: "/media/products/branch/hero.jpg",
    gallery: gallery("branch", 3),
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "canopy",
    name: "Canopy",
    series: "Canopy Chandeliers",
    type: "CHANDELIER" as const,
    tagline: "The full spread, overhead.",
    description:
      "The largest fixture in the series: twenty-one diffusers spread wide and low, like a mature canopy closing over a clearing. Built as the single statement piece for an entry or a great room.",
    materials: "Blown opal glass, blackened steel canopy",
    diameterCm: 120,
    heightCm: 70,
    colorTempK: 2700,
    lumens: 8400,
    dimmable: true,
    priceUsd: 7600,
    heroImage: "/media/products/canopy/hero.jpg",
    gallery: gallery("canopy", 5),
    featured: false,
    sortOrder: 6,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
