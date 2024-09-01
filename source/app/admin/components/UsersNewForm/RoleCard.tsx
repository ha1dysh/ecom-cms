import {BlockStack, Card, FormLayout, SelectProps, Text} from '@shopify/polaris';
import React, {useMemo} from 'react';
import {ValidatedSelect} from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import {$Enums} from '@prisma/client';
import { useTranslation } from 'react-i18next';

export const RoleCard = () => {
  const { t } = useTranslation('users');

  const roleOptions: SelectProps['options'] = useMemo(() => ([
    {
      label: t('new.selectRole'),
      value: '',
    },
    {
      label: t('new.adminRole'),
      value: $Enums.AdminRole.ADMIN,
    },
    {
      label: t('new.staffRole'),
      value: $Enums.AdminRole.STUFF,
    }
  ]), []);


  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('new.role')}
        </Text>
        <FormLayout>
          <ValidatedSelect
            label={null}
            name="role"
            options={roleOptions}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
