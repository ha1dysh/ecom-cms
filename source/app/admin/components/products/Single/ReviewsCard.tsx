import {Avatar, BlockStack, Card, InlineGrid, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { usePagination } from '~/admin/hooks/usePagination';

export type PrimaryInfoCardProps = {
  reviews: TProductDto['reviews'];
  pagination: IOffsetPaginationInfoDto;
}

export const ReviewsCard: FC<PrimaryInfoCardProps> = ({ reviews, pagination }) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Reviews
          </Text>
        </InlineGrid>
        <BlockStack gap="200">
          <ReviewsList reviews={reviews} pagination={pagination} />
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

function ReviewsList({
  reviews,
  pagination,
}: {
  reviews: TProductDto["reviews"];
  pagination: IOffsetPaginationInfoDto;
}) {
  const paginationProps = usePagination(pagination);

  return (
    <ResourceList
      resourceName={{ singular: "review", plural: "reviews" }}
      items={reviews}
      renderItem={(item) => {
        const { id, review, rate } = item;
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
      pagination={paginationProps}
    />
  );
}
