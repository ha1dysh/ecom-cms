import {Box, Button, Divider, FormLayout, InlineStack} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import { useTranslation } from 'react-i18next';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { TranslationUpdateFormValidator } from './TranslationsForm.validator';
import { $Enums } from '@prisma/client';
import { TProductTranslationDto } from '~/.server/admin/dto/productTranslation.dto';

type Props = {
  toggleActive: () => void;
  translation: TProductTranslationDto;
}

export const TranslationsUpdate: FC<Props> = ({ toggleActive, translation }) => {
  const { t } = useTranslation("products");

  return (
    <ValidatedForm
      validator={TranslationUpdateFormValidator}
      method="post"
      onSubmit={toggleActive}
    >
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateTranslation} />
        <input hidden name="id" defaultValue={translation.id} />
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedSelect
            name="language"
            label={t('translations.language')}
            options={[
              { label: t('translations.selectLanguage'), value: "" },
              { label: t('translations.English'), value: $Enums.Language.EN },
              { label: t('translations.Ukrainian'), value: $Enums.Language.UK },
            ]}
            defaultValue={translation.language}
          />
          <ValidatedTextField
            name="title"
            label={t('translations.title')}
            autoComplete="off"
            defaultValue={translation.title}
          />
          <ValidatedTextField
            name="description"
            label={t('translations.description')}
            autoComplete="off"
            multiline={3}
            defaultValue={translation.description}
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
