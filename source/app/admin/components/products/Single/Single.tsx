import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryCard} from '~/admin/components/products/Single/CategoryCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { ReviewsCard } from './ReviewsCard';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import { $Enums } from '@prisma/client';

export type SingleProps = {
  user: TUserDto;
  product: TProductDto;
  categories: TCategoryDto[];
  reviews: TProductReviewDto[]
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({user, product, categories, reviews, pagination}) => {

  const hideReviewsForStuff = user.role !== $Enums.AdminRole.STUFF;

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product} />
          {hideReviewsForStuff && <ReviewsCard reviews={reviews} pagination={pagination} />}
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <CategoryCard product={product} categories={categories} />
      </Layout.Section>
    </Layout>
  );
};
