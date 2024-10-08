import {Card, IndexTable, Link,} from '@shopify/polaris';
import {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import {Filters} from './Filters';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import { TAdminProductReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import { useTranslation } from 'react-i18next';

export interface ListProps {
  productReviews: TProductReviewDto[];
  query?: TAdminProductReviewsLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}

export const Index: FC<ListProps> = ({productReviews, query, pagination}) => {
  const paginationProps = usePagination(pagination);
  const { t } = useTranslation('reviews');

  const resourceName = useMemo(() => ({
    singular: 'review',
    plural: 'reviews',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'ID'},
    {title: t('table.customer')},
    {title: t('table.product')},
    {title: t('table.rate')},
    {title: t('table.review')},
    {title: t('table.createdAt')},
    {title: t('table.updatedAt')},
    {title: t('table.deleteAt')},
  ]), []);

  const rowMarkup = productReviews.map(
    (
      {
        id,
        rate,
        review,
        product,
        customer,
        customerId,
        productId,
        createdAt,
        updatedAt,
        deletedAt,
      },
      index
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.reviews}/${id}`}>{id}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Link
            url={`${EAdminNavigation.customers}/${customerId}`}
          >{`${customer?.firstName} ${customer?.lastName}`}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.products}/${productId}`}>
            {product?.title}
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{rate}</IndexTable.Cell>
        <IndexTable.Cell>
          {review?.length > 15 ? `${review.substring(0, 15)}...` : review}
        </IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card padding="0">
      <Filters query={query}/>
      <IndexTable
        resourceName={resourceName}
        itemCount={productReviews.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
