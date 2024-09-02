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

export type SingleProps = {
  user: TUserDto;
  product: TProductDto;
  categories: TCategoryDto[];
  reviews: TProductReviewDto[]
  translations: TProductTranslationDto[];
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({user, product, categories, reviews, translations, pagination}) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product} translations={translations} />
          {hasAdminRole(user) && <ReviewsCard reviews={reviews} pagination={pagination} />}
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <BlockStack gap="500">
          <CategoryCard product={product} categories={categories} />
          <TranslationsCard translations={translations} />
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
};
