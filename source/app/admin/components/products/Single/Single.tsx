import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryCard} from '~/admin/components/products/Single/CategoryCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { ReviewsCard } from './ReviewsCard';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';

export type SingleProps = {
  product: TProductDto;
  categories: TCategoryDto[];
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({product, categories, pagination}) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product} />
          <ReviewsCard reviews={product.reviews} pagination={pagination} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <CategoryCard product={product} categories={categories} />
      </Layout.Section>
    </Layout>
  );
};
