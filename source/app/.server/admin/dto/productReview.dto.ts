import type { ProductReview } from "@prisma/client";

type ExcludedField = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type TProductReviewDto = Omit<ProductReview, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
