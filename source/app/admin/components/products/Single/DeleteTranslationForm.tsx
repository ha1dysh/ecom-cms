import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import { useTranslation } from 'react-i18next';
import { TProductTranslationDto } from '~/.server/admin/dto/productTranslation.dto';
import { TranslationDeleteFormValidator } from './TranslationsForm.validator';

type Props = {
  translation: TProductTranslationDto;
  toggleActive: () => void;
}

export const TranslationsDelete: FC<Props> = ({translation, toggleActive}) => {
  const { t } = useTranslation('products');

  return (
    <ValidatedForm validator={TranslationDeleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.deleteTranslation}/>
        <input hidden name="id" defaultValue={translation.id} />
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
         {t('translations.deleteParagraph')}: <Text as="strong">{translation.language}</Text>?
        </Text>
      </Box>

      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={t('translations.deleteButton')} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>{t('translations.cancelButton')}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
