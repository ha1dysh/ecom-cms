import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import { useTranslation } from 'react-i18next';

type Props = {
  product?: Omit<TProductDto, 'category'>
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {product} = props;
  const { t } = useTranslation('products');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('new.primaryInfo')}
        </Text>
        <FormLayout>
          <ValidatedTextField
            label={t('new.slug')}
            type="text"
            name="slug"
            autoComplete="off"
            defaultValue={product?.slug}
          />
          <ValidatedTextField
            label={t('new.productTitle')}
            type="text"
            name="title"
            autoComplete="off"
            defaultValue={product?.title}
          />
          <ValidatedTextField
            label={t('new.description')}
            type="text"
            name="description"
            autoComplete="off"
            defaultValue={product?.description || ''}
            multiline={6}
          />
          <ValidatedTextField
            label={t('new.sku')}
            type="text"
            name="sku"
            autoComplete="off"
            defaultValue={product?.sku || ''}
          />
          <ValidatedTextField
            label={t('new.barcode')}
            type="text"
            name="barcode"
            autoComplete="off"
            defaultValue={product?.barcode || ''}
          />
          <ValidatedTextField
            label={t('new.quantity')}
            type="number"
            name="quantity"
            autoComplete="off"
            defaultValue={product?.quantity}
          />
          <ValidatedTextField
            label={t('new.price')}
            type="number"
            name="price"
            autoComplete="off"
            defaultValue={product?.price}
          />
          <ValidatedTextField
            label={t('new.compareAtPrice')}
            type="number"
            name="compareAtPrice"
            autoComplete="off"
            defaultValue={product?.compareAtPrice}
          />
          <ValidatedTextField
            label={t('new.costPerItem')}
            type="number"
            name="costPerItem"
            autoComplete="off"
            defaultValue={product?.costPerItem}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
