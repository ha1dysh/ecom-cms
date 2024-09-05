-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'UA');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN';

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'EN',
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTranslation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'EN',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryTranslationCategoryIdIndex" ON "CategoryTranslation"("categoryId");

-- CreateIndex
CREATE INDEX "CategoryTranslationLanguageIndex" ON "CategoryTranslation"("language");

-- CreateIndex
CREATE INDEX "CategoryTranslationTitleIndex" ON "CategoryTranslation"("title");

-- CreateIndex
CREATE INDEX "ProductTranslationProductIdIndex" ON "ProductTranslation"("productId");

-- CreateIndex
CREATE INDEX "ProductTranslationLanguageIndex" ON "ProductTranslation"("language");

-- CreateIndex
CREATE INDEX "ProductTranslationSearchIndex" ON "ProductTranslation"("title", "description");

-- CreateIndex
CREATE INDEX "ReviewRateIndex" ON "ProductReview"("rate");

-- CreateIndex
CREATE INDEX "ReviewIndex" ON "ProductReview"("review");

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
