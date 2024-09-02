import type { CategoryTranslation } from "@prisma/client";

type ExcludedField = "id" | "createdAt" | "updatedAt" | "categoryId";

export type TCategoryTranslationDto = Omit<
  CategoryTranslation,
  ExcludedField
> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
};
