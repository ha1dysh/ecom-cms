import { json } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/services/prisma.service";
import { CategoryTranslationDeleteFormValidator } from "~/admin/components/products/Single/CategoryTranslationsForm.validator";

type Args = {
  formData: any;
};

export async function CategoryDeleteTranslation({ formData }: Args) {
  const { data, error } = await CategoryTranslationDeleteFormValidator.validate(formData);

  if (error) {
    return validationError(error);
  }

  const deletedTranslation = await prisma.categoryTranslation.delete({
    where: { id: data.id },
  });

  return json({ deletedTranslation });
}
