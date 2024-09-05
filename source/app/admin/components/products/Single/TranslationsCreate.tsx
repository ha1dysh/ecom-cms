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

type Props = {
  toggleActive: () => void;
  productTranslations?: TProductTranslationDto[];
}

type SubmittedData = {
  language: $Enums.Language;
  title: string;
  description: string;
}

export const TranslationsCreate: FC<Props> = ({ toggleActive, productTranslations }) => {
  const { t } = useTranslation("products");

  function onSubmit(data: SubmittedData) {
    const isLangExist = productTranslations?.some((t) => t.language === data.language);

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
      validator={TranslationCreateFormValidator}
      method="post"
      onSubmit={onSubmit}
    >
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.createTranslation} />
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedSelect
            name="language"
            label={t('translations.language')}
            options={[
              { label: t('translations.selectLanguage'), value: "" },
              { label: t('translations.English'), value: $Enums.Language.EN },
              { label: t('translations.Ukrainian'), value: $Enums.Language.UA },
            ]}
          />
          <ValidatedTextField
            name="title"
            label={t('translations.title')}
            autoComplete="off"
          />
          <ValidatedTextField
            name="description"
            label={t('translations.description')}
            autoComplete="off"
            multiline={3}
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
