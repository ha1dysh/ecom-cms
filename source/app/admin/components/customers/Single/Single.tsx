import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import {AddressesCard} from '~/admin/components/customers/Single/AddressesCard';
import { ReviewsCard } from '../../reviews/ReviewsCard';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';

export type SingleProps = {
  customer: TCustomerDto;
  reviews: TProductReviewDto[]
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({customer, reviews, pagination}) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard customer={customer} />
          <ReviewsCard reviews={reviews} pagination={pagination} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <AddressesCard customer={customer} />
      </Layout.Section>
    </Layout>
  );
};
