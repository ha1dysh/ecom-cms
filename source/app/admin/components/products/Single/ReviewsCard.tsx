import {Avatar, BlockStack, Card, InlineGrid, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';

export type PrimaryInfoCardProps = {
  reviews: TProductDto['reviews'];
}

export const ReviewsCard: FC<PrimaryInfoCardProps> = ({ reviews }) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Reviews
          </Text>
        </InlineGrid>
        <BlockStack gap="200">
          <ReviewsList reviews={reviews} />
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

function ReviewsList({ reviews }: { reviews: TProductDto["reviews"] }) {
  return (
    <ResourceList
      resourceName={{ singular: "review", plural: "reviews" }}
      items={reviews}
      renderItem={(item) => {
        const { id, review, rate  } = item;
        const media = <Avatar customer size="md" name={`Review id: ${id}`} />;

        return (
          <ResourceItem
            id={id}
            url={`${EAdminNavigation.reviews}/${id}`}
            media={media}
            accessibilityLabel={`View details for ${id}`}
          >
            <Text variant="bodyMd" fontWeight="bold" as="h3">
              Rate: {rate}
            </Text>
            <div>Review: {review}</div>
          </ResourceItem>
        );
      }}
    />
  );
}
