import { json } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/services/prisma.service";
import { TranslationDeleteFormValidator, TranslationUpdateFormValidator } from "~/admin/components/products/Single/TranslationsForm.validator";

type Args = {
  productId: number;
  formData: any;
}

export async function deleteProductTranslation({formData}: Args) {
  const {data, error} = await TranslationDeleteFormValidator.validate(formData);

  if (error) {
    return validationError(error);
  }

  const deletedTranslation = await prisma.productTranslation.delete({
    where: { id: data.id },
  });

  return json({ deletedTranslation });
}
