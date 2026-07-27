-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "materials" TEXT NOT NULL,
    "diameterCm" REAL NOT NULL,
    "heightCm" REAL NOT NULL,
    "colorTempK" INTEGER NOT NULL,
    "lumens" INTEGER NOT NULL,
    "dimmable" BOOLEAN NOT NULL DEFAULT true,
    "priceUsd" INTEGER NOT NULL,
    "heroImage" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
