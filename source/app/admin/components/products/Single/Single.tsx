import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryCard} from '~/admin/components/products/Single/CategoryCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { ReviewsCard } from './ReviewsCard';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';

export type SingleProps = {
  product: TProductDto;
  categories: TCategoryDto[];
  reviews: TProductReviewDto[]
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({product, categories, reviews, pagination}) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product} />
         {reviews.length > 0 && <ReviewsCard reviews={reviews} pagination={pagination} />}
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <CategoryCard product={product} categories={categories} />
      </Layout.Section>
    </Layout>
  );
};
