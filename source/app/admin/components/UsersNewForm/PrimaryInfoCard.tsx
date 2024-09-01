import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';

export const PrimaryInfoCard = () => {
  const { t } = useTranslation('users');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('new.primaryInfo')}
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label={t('new.firstName')}
              type="text"
              name="firstName"
              autoComplete="given-name"
            />
            <ValidatedTextField
              label={t('new.lastName')}
              type="text"
              name="lastName"
              autoComplete="family-name"
            />
          </FormLayout.Group>
          <ValidatedTextField
            label={t('new.email')}
            type="email"
            name="email"
            autoComplete="email"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
