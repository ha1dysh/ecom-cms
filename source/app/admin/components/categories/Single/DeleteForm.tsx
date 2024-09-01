import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import type {TCategoryDto} from '~/.server/admin/dto/category.dto';
import {deleteFormValidator} from '~/admin/components/categories/Single/DeleteForm.validator';
import { useTranslation } from 'react-i18next';

type Props = {
  category: Pick<TCategoryDto, 'title'>;
  toggleActive: () => void;
}

export const DeleteForm: FC<Props> = (props) => {
  const {category, toggleActive} = props;
  const {title} = category;
  const { t } = useTranslation('categories');

  return (
    <ValidatedForm validator={deleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          {t('delete.paragraph')} {title}?
        </Text>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={t('delete.deleteButton')} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>{t('delete.cancelButton')}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
