import { Box, Button, Divider, FormLayout, InlineStack } from '@shopify/polaris';
import { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { ValidatedAction } from "~/admin/ui/ValidatedAction/ValidatedAction";
import { EAdminCategoryAction } from "~/admin/constants/action.constant";
import { useTranslation } from 'react-i18next';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { $Enums } from '@prisma/client';
import { TCategoryTranslationDto } from '~/.server/admin/dto/categoryTranslation.dto';
import { CategoryTranslationUpdateFormValidator } from './CategoryTranslationsForm.validator';

type Props = {
  toggleActive: () => void;
  translation: TCategoryTranslationDto;
}

export const CategoryTranslationsUpdate: FC<Props> = ({ toggleActive, translation }) => {
  const { t } = useTranslation("categories");

  return (
    <ValidatedForm
      validator={CategoryTranslationUpdateFormValidator}
      method="post"
      onSubmit={toggleActive}
    >
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminCategoryAction.categoryUpdateTranslation} />
        <input hidden name="id" defaultValue={translation.id} />
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedSelect
            name="language"
            label={t('translations.language')}
            options={[
              { label: t('translations.selectLanguage'), value: "" },
              { label: t('translations.english'), value: $Enums.Language.EN },
              { label: t('translations.ukrainian'), value: $Enums.Language.UK },
            ]}
            defaultValue={translation.language}
          />
          <ValidatedTextField
            name="title"
            label={t('translations.title')}
            autoComplete="off"
            defaultValue={translation.title}
          />
        </FormLayout>
      </Box>

      <Divider />

      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton
            text={t("translations.saveButton")}
            variant="primary"
          />
          <Button onClick={toggleActive}>{t("translations.cancelButton")}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
