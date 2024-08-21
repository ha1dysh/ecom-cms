import {BlockStack, Box, Layout} from '@shopify/polaris';
import {FC} from 'react';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import {PrimaryInfoCard} from '~/admin/components/reviews/NewForm/PrimaryInfoCard';

type Props = {
  productReview: TProductReviewDto
  product: TProductDto
  customer: TCustomerDto
}

export const EditPrimaryForm: FC<Props> = ({
  productReview,
  product,
  customer,
}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard
              productReview={productReview}
              product={product}
              customer={customer}
            />
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
