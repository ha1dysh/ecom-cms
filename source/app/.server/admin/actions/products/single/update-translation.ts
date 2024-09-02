import { json } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/services/prisma.service";
import { TranslationUpdateFormValidator } from "~/admin/components/products/Single/TranslationsForm.validator";

type Args = {
  productId: number;
  formData: any;
}

export async function updateProductTranslation({productId, formData}: Args) {
  const {data, error} = await TranslationUpdateFormValidator.validate(formData);

  if (error) {
    return validationError(error);
  }

  const {  id, language, title, description } = data;

  const updatedTranslation = await prisma.productTranslation.update({
    where: { id },
    data: { language, title, description }
  });

  return json({ updatedTranslation });
}
