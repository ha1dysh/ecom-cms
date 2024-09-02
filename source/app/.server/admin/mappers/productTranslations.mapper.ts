import { ProductTranslation } from "@prisma/client";
import { TProductTranslationDto } from "../dto/productTranslation.dto";

export const productTranslationMapper = (
  productTranslation: ProductTranslation
): TProductTranslationDto => {

  return {
    id: String(productTranslation.id),
    productId: productTranslation.productId,
    language: productTranslation.language,
    title: productTranslation.title,
    description: productTranslation.description,
    createdAt: productTranslation.createdAt.toJSON(),
    updatedAt: productTranslation.updatedAt.toJSON(),
  };
};
