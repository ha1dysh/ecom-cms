import {Avatar, BlockStack, Card, EmptyState, InlineGrid, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
import { usePagination } from '~/admin/hooks/usePagination';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import { redirect } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export type PrimaryInfoCardProps = {
  reviews: TProductReviewDto[];
  pagination: IOffsetPaginationInfoDto;
}

export const ReviewsCard: FC<PrimaryInfoCardProps> = ({ reviews, pagination }) => {
  const { t } = useTranslation('customers');

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('single.reviews')}
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
  reviews: TProductReviewDto[];
  pagination: IOffsetPaginationInfoDto;
}) {
  const paginationProps = usePagination(pagination);
  const { t } = useTranslation('customers');

  const emptyStateMarkup = !reviews.length ? (
    <EmptyState
      heading={t('single.reviewsHeading')}
      action={{
        content: t('single.reviewsCreateButton'),
        url: EAdminNavigation.reviewsCreate,
      }}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>{t('single.reviewsParagraph')}</p>
    </EmptyState>
  ) : undefined;

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
      emptyState={emptyStateMarkup}
    />
  );
}
