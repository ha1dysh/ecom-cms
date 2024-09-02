import {Box, Button, Divider, FormLayout, InlineStack} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedForm, validationError} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import { useTranslation } from 'react-i18next';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { TranslationCreateFormValidator } from './TranslationsForm.validator';
import { $Enums } from '@prisma/client';
import { TProductTranslationDto } from '~/.server/admin/dto/productTranslation.dto';
import { TCategoryTranslationDto } from '~/.server/admin/dto/categoryTranslation.dto';
import { CategoryTranslationsCreateFormValidator } from './CategoryTranslationsForm.validator';

type Props = {
  toggleActive: () => void;
  categoryTranslations?: TCategoryTranslationDto[];
  categoryId: string;
}

type SubmittedData = {
  language: $Enums.Languages;
  title: string;
}

export const CategoryTranslationsCreate: FC<Props> = ({ categoryId, toggleActive, categoryTranslations }) => {
  const { t } = useTranslation("products");

  function onSubmit(data: SubmittedData) {
    const isLangExist = categoryTranslations?.some((t) => t.language === data.language);

    if (isLangExist) {
      validationError({
        fieldErrors: { language: "Translation already exists" },
      });
      return;
    }

    toggleActive();
  }

  return (
    <ValidatedForm
      validator={CategoryTranslationsCreateFormValidator}
      method="post"
      onSubmit={onSubmit}
    >
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.categoryCreateTranslation} />
        <input type="hidden" name="categoryId" value={categoryId} />
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedSelect
            name="language"
            label={t('translations.language')}
            options={[
              { label: t('translations.selectLanguage'), value: "" },
              { label: t('translations.Ukrainian'), value: $Enums.Languages.UA },
            ]}
          />
          <ValidatedTextField
            name="title"
            label={t('translations.title')}
            autoComplete="off"
          />
        </FormLayout>
      </Box>

      <Divider />

      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton
            text={t("category.saveButton")}
            variant="primary"
          />
          <Button onClick={toggleActive}>{t("category.cancelButton")}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
