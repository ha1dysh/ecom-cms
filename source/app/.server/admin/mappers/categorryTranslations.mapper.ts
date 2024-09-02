import { TCategoryTranslationDto } from "~/.server/admin/dto/categoryTranslation.dto";
import { CategoryTranslation } from "@prisma/client";

export function categoryTranslationMapper(
  categoryTranslation: CategoryTranslation
): TCategoryTranslationDto {

  return {
    id: String(categoryTranslation.id),
    categoryId: String(categoryTranslation.categoryId),
    language: categoryTranslation.language,
    title: categoryTranslation.title,
    createdAt: categoryTranslation.createdAt.toJSON(),
    updatedAt: categoryTranslation.updatedAt.toJSON(),
  };
}
