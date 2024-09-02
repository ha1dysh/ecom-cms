import {BlockStack, Button, Card, InlineGrid, Modal, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC, useCallback, useState} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryForm} from '~/admin/components/products/Single/CategoryForm';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { useTranslation } from 'react-i18next';
import { TCategoryTranslationDto } from '~/.server/admin/dto/categoryTranslation.dto';

type Props = {
  product: Pick<TProductDto, 'id' | 'categoryId' | 'category'>;
  categories: TCategoryDto[];
  categoryTranslations: TCategoryTranslationDto[];
}

export const CategoryCard: FC<Props> = (props) => {
  const {product, categories, categoryTranslations} = props;
  const {category, categoryId} = product;
  const [active, setActive] = useState(false);
  const { t, i18n } = useTranslation('products');

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const title = categoryTranslations.find((t) => t.language.toLowerCase() === i18n.language)?.title || category?.title;

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('category.title')}
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel={t('category.changeCategory')}
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="p" variant="bodyMd">
            {title || 'No category'}
          </Text>
        </BlockStack>
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title={t('category.changeCategory')}
      >
        <CategoryForm category={category} toggleActive={toggleActive} categories={categories}/>
      </Modal>
    </Card>
  );
};
