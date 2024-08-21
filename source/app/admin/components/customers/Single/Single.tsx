import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import {AddressesCard} from '~/admin/components/customers/Single/AddressesCard';
import { ReviewsCard } from '../../products/Single/ReviewsCard';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';

export type SingleProps = {
  customer: TCustomerDto;
  pagination: IOffsetPaginationInfoDto;
}

export const Single: FC<SingleProps> = ({customer, pagination}) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard customer={customer} />
          <ReviewsCard reviews={customer.reviews} pagination={pagination} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <AddressesCard customer={customer} />
      </Layout.Section>
    </Layout>
  );
};
