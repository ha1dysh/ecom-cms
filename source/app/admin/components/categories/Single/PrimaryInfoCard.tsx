import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { useTranslation } from 'react-i18next';

export type PrimaryInfoCardProps = {
  category: TCategoryDto;
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({category}) => {
  const { t } = useTranslation('categories');

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('single.primaryInfo')}
          </Text>
          <Button
            url={`${EAdminNavigation.categories}/${category.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.slug')}
          </Text>
          <Text as="p" variant="bodyMd">
            {category.slug}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.title')}
          </Text>
          <Text as="p" variant="bodyMd">
            {category.title}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.description')}
          </Text>
          <Text as="p" variant="bodyMd">
            {category.description}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
