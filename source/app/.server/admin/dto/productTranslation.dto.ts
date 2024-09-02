import type { ProductTranslation } from "@prisma/client";

type ExcludedField = "id" | "createdAt" | "updatedAt";

export type TProductTranslationDto = Omit<ProductTranslation, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
