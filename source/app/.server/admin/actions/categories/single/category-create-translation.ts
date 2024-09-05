import { json } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/services/prisma.service";
import { CategoryTranslationsCreateFormValidator } from "~/admin/components/categories/Single/CategoryTranslationsForm.validator";

type Args = {
  formData: any;
}

export async function createCategoryTranslation({ formData }: Args) {
  const { data, error } =
    await CategoryTranslationsCreateFormValidator.validate(formData);

  if (error) {
    return validationError(error);
  }

  const { categoryId, language, title } = data;

  const isLangExist = await prisma.categoryTranslation.findFirst({
    where: { categoryId, language },
  });

  if (isLangExist) {
    return validationError({
      fieldErrors: {
        language: "Translation already exists",
      },
    });
  }

  const productTranslation = await prisma.categoryTranslation.create({
    data: { categoryId, language, title },
  });

  return json({ productTranslation });
}
