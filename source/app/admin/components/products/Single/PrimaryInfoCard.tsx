import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import { useTranslation } from 'react-i18next';
import { TProductTranslationDto } from '~/.server/admin/dto/productTranslation.dto';

export type PrimaryInfoCardProps = {
  product: TProductDto;
  productTranslations: TProductTranslationDto[];
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({product, productTranslations}) => {
  const { t, i18n } = useTranslation('products');

  const title = productTranslations
    .find((t) => t.language.toLowerCase() === i18n.language)?.title || product.title;

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('single.primaryInfo')}
          </Text>
          <Button
            url={`${EAdminNavigation.products}/${product.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.slug')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.slug}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.productTitle')}
          </Text>
          <Text as="p" variant="bodyMd">
            {title}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.description')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.description}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.totalReviews')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.totalReviews}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.avgRate')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.avgRate}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.sku')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.sku}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.barcode')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.barcode}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.quantity')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.quantity}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.price')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.price}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.compareAtPrice')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.compareAtPrice}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t('single.costPerItem')}
          </Text>
          <Text as="p" variant="bodyMd">
            {product.costPerItem}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
