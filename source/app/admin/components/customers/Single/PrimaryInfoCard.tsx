import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import { useTranslation } from 'react-i18next';

export type PrimaryInfoCardProps = {
  customer: TCustomerDto;
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({customer}) => {
  const { t } = useTranslation('customers');

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('single.primaryInfo')}
          </Text>
          <Button
            url={`${EAdminNavigation.customers}/${customer.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.firstName')}
          </Text>
          <Text as="p" variant="bodyMd">
            {customer.firstName}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.lastName')}
          </Text>
          <Text as="p" variant="bodyMd">
            {customer.lastName}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.email')}
          </Text>
          <Text as="p" variant="bodyMd">
            {customer.email}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.phone')}
          </Text>
          <Text as="p" variant="bodyMd">
            {customer.phone}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
