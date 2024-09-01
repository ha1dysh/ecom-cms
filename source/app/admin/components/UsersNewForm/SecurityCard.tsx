import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';

export const SecurityCard = () => {
  const { t } = useTranslation('users');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('new.security')}
        </Text>
        <FormLayout>
          <ValidatedTextField
            label={t('new.password')}
            type="password"
            name="password"
            autoComplete="off"
          />
          <ValidatedTextField
            label={t('new.confirmPassword')}
            type="password"
            name="passwordConfirm"
            autoComplete="off"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
