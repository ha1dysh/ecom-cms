import { $Enums } from "@prisma/client";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { EAdminProductAction, FORM_ACTION_FIELD } from "~/admin/constants/action.constant";

const idRule = z.coerce.number().positive({message: 'Id is required'});
const langRule = z.nativeEnum($Enums.Language, {message: 'Language is required'});
const titleRule = z.string().trim().min(1, {message: 'Title is required'});
const descriptionRule = z.string().trim().min(1, {message: 'Description is required'}).max(1024, {message: 'Description max length: 1024'});

export const TranslationCreateFormValidator = withZod(
  z.object({
    language: langRule,
    title: titleRule,
    description: descriptionRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.createTranslation),
  })
);

export const TranslationUpdateFormValidator = withZod(
  z.object({
    id: idRule,
    language: langRule,
    title: titleRule,
    description: descriptionRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.updateTranslation),
  })
);

export const TranslationDeleteFormValidator = withZod(
  z.object({
    id: idRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.deleteTranslation),
  })
);
