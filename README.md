# Lumatree

A modular lighting fixture series site, built around one idea: soft,
diffused light shown through light/shadow contrast rather than brightness.

## Stack

- Next.js (App Router, TypeScript)
- Prisma + SQLite (data-driven product catalog)
- Tailwind CSS (design tokens in `src/app/globals.css`)
- Framer Motion (scroll reveals, micro-interactions)
- GSAP / ScrollTrigger (the scroll-driven "ignition" hero on Home and each
  product page)

## Getting started

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Media

Product and section imagery/video are placeholder slots until real assets
exist. Drop files at the conventional path and they're picked up
automatically — nothing else to wire up:

- `public/media/products/<slug>/hero.jpg` (or swap `MediaSlot`'s `srcImage`
  for `srcVideo` and point it at an `.mp4`)
- `public/media/products/<slug>/gallery-N.jpg`
- `public/media/home/craft.jpg`, `public/media/features/room-contrast.jpg`,
  `public/media/company/studio.jpg`, `public/media/company/glassblowing.jpg`

Until a file exists at a given path, `MediaSlot` renders soft placeholder
art in the site's own visual language instead of a broken image.

## Product catalog

Products live in SQLite via Prisma (`prisma/schema.prisma`). Edit
`prisma/seed.ts` and re-run `npm run db:seed` to change the catalog.
