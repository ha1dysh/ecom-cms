import {BlockStack, Box, Layout} from '@shopify/polaris';
import {FC} from 'react';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import {PrimaryInfoCard} from '~/admin/components/reviews/NewForm/PrimaryInfoCard';

type Props = {
  productReview: TProductReviewDto
}

export const EditPrimaryForm: FC<Props> = ({
  productReview,
}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard
              productReview={productReview}
            />
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
