import { $Enums } from "@prisma/client";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import {
  EAdminProductAction,
  FORM_ACTION_FIELD,
} from "~/admin/constants/action.constant";

export const TranslationCreateFormValidator = withZod(
  z.object({
    language: z.nativeEnum($Enums.Languages, {message: 'Language is required'}),
    title: z.string().trim().min(1, { message: "Title is required" }),
    description: z
      .string()
      .trim()
      .min(1, { message: "Description is required" })
      .max(1024, { message: "Description max length: 1024" }),
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.createTranslation),
  })
);

export const TranslationUpdateFormValidator = withZod(
  z.object({
    id: z.coerce.number(),
    language: z.nativeEnum($Enums.Languages),
    title: z.string().trim().min(1, { message: "Title is required" }),
    description: z
      .string()
      .trim()
      .min(1, { message: "Description is required" })
      .max(1024, { message: "Description max length: 1024" }),
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.updateTranslation),
  })
);

export const TranslationDeleteFormValidator = withZod(
  z.object({
    id: z.coerce.number(),
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.deleteTranslation),
  })
);
