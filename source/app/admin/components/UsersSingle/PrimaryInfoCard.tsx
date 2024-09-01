import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import { useTranslation } from 'react-i18next';

export type PrimaryInfoCardProps = {
  user: TUserDto;
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({user}) => {
  const { t } = useTranslation('users');

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('single.primaryInfo')}
          </Text>
          <Button
            url={`${EAdminNavigation.users}/${user.id}/primary`}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.fullName')}
          </Text>
          <Text as="p" variant="bodyMd">
            {user.fullName}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.email')}
          </Text>
          <Text as="p" variant="bodyMd">
            {user.email}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
