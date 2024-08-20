import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';

export type PrimaryInfoCardProps = {
  productReview: TProductReviewDto;
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({productReview}) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.reviews}/${productReview.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Rate
          </Text>
          <Text as="p" variant="bodyMd">
            {productReview.rate}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Review
          </Text>
          <Text as="p" variant="bodyMd">
            {productReview.review}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};