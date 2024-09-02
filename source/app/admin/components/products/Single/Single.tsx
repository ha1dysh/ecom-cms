import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryCard} from '~/admin/components/products/Single/CategoryCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { ReviewsCard } from '../../reviews/ReviewsCard';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import { hasAdminRole } from '~/admin/utils/access.util';
import { TranslationsCard } from './TranslationsCard';
import { TProductTranslationDto } from '~/.server/admin/dto/productTranslation.dto';
import { TCategoryTranslationDto } from '~/.server/admin/dto/categoryTranslation.dto';
import { CategoryTranslationsCard } from './CategoryTranslationsCard';

export type SingleProps = {
  user: TUserDto;
  product: TProductDto;
  categories: TCategoryDto[];
  reviews: TProductReviewDto[]
  productTranslations: TProductTranslationDto[];
  categoryTranslations: TCategoryTranslationDto[];
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({
  user,
  product,
  categories,
  reviews,
  productTranslations,
  categoryTranslations,
  pagination,
}) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard
            product={product}
            productTranslations={productTranslations}
          />
          {hasAdminRole(user) && (
            <ReviewsCard reviews={reviews} pagination={pagination} />
          )}
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <BlockStack gap="500">
          <TranslationsCard productTranslations={productTranslations} />
          <CategoryCard product={product} categories={categories} categoryTranslations={categoryTranslations} />
          <CategoryTranslationsCard
            categoryTranslations={categoryTranslations}
            categoryId={product.categoryId}
          />
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
};
