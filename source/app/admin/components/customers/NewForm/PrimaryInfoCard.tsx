import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import { useTranslation } from 'react-i18next';

type Props = {
  customer?: Omit<TCustomerDto, 'addresses'>
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {customer} = props;
  const { t } = useTranslation('customers');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('edit.primaryInfo')}
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label={t('edit.firstName')}
              type="text"
              name="firstName"
              autoComplete="given-name"
              defaultValue={customer?.firstName}
            />
            <ValidatedTextField
              label={t('edit.lastName')}
              type="text"
              name="lastName"
              autoComplete="family-name"
              defaultValue={customer?.lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label={t('edit.email')}
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={customer?.email}
          />
          <ValidatedTextField
            label={t('edit.phone')}
            type="text"
            name="phone"
            autoComplete="phone"
            defaultValue={customer?.phone || ''}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
