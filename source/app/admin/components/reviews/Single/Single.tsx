import {BlockStack, Layout} from '@shopify/polaris';
import {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';

export type SingleProps = {
  productReview: TProductReviewDto;
}

export const Single: FC<SingleProps> = ({productReview}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard productReview={productReview}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
      </Layout.Section>
    </Layout>
  );
};
