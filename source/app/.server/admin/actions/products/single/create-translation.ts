import { json } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/services/prisma.service";
import { TranslationCreateFormValidator } from "~/admin/components/products/Single/TranslationsForm.validator";

type Args = {
  productId: number;
  formData: any;
}

export async function createProductTranslation({productId, formData}: Args) {
  const {data, error} = await TranslationCreateFormValidator.validate(formData);

  if (error) {
    return validationError(error);
  }

  const { language, title, description } = data;


  const isLangExist = await prisma.productTranslation.findFirst({
    where: { productId, language }
  });

  if (isLangExist) {
    return validationError({
      fieldErrors: {
        language: 'Translation already exists'
      }
    });
  }

  const productTranslation = await prisma.productTranslation.create({
    data: { productId, language, title, description }
  });

  return json({ productTranslation });
}
