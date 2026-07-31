-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileMm" TEXT NOT NULL,
    "litLengthMm" TEXT NOT NULL,
    "overallMm" TEXT NOT NULL,
    "baseMm" TEXT NOT NULL,
    "watts" TEXT NOT NULL,
    "lumens" TEXT NOT NULL,
    "beamAngle" TEXT NOT NULL,
    "ugr" INTEGER,
    "cri" INTEGER NOT NULL DEFAULT 92,
    "kelvin" TEXT NOT NULL,
    "weightKg" TEXT NOT NULL,
    "control" TEXT NOT NULL,
    "finishes" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
