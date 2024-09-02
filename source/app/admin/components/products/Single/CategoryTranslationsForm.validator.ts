import { $Enums } from "@prisma/client";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { EAdminProductAction, FORM_ACTION_FIELD } from "~/admin/constants/action.constant";

const idRule = z.coerce.number().positive({message: 'Id is required'});
const langRule = z.nativeEnum($Enums.Languages, {message: 'Language is required'});
const titleRule = z.string().trim().min(1, {message: 'Title is required'});

export const CategoryTranslationsCreateFormValidator = withZod(
  z.object({
    categoryId: idRule,
    language: langRule,
    title: titleRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.categoryCreateTranslation),
  })
);

export const CategoryTranslationUpdateFormValidator = withZod(
  z.object({
    id: idRule,
    language: langRule,
    title: titleRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.categoryUpdateTranslation),
  })
);

export const CategoryTranslationDeleteFormValidator = withZod(
  z.object({
    id: idRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.categoryDeleteTranslation),
  })
);
