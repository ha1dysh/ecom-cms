import { json } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/services/prisma.service";
import { CategoryTranslationUpdateFormValidator } from "~/admin/components/products/Single/CategoryTranslationsForm.validator";

type Args = {
  productId: number;
  formData: any;
}

export async function CategoryUpdateProductTranslation({productId, formData}: Args) {
  const {data, error} = await CategoryTranslationUpdateFormValidator.validate(formData);

  if (error) {
    return validationError(error);
  }

  const {  id, language, title } = data;

  const updatedTranslation = await prisma.categoryTranslation.update({
    where: { id },
    data: { language, title }
  });

  return json({ updatedTranslation });
}
