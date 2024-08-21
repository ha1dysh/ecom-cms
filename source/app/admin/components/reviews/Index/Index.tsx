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

export interface ListProps {
  productReviews: TProductReviewDto[];
  query?: TAdminProductReviewsLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}


export const Index: FC<ListProps> = ({productReviews, query, pagination}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(() => ({
    singular: 'review',
    plural: 'reviews',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'Rate'},
    {title: 'Review'},
    {title: 'Customer id'},
    {title: 'Product id'},
    {title: 'Created at'},
    {title: 'Updated at'},
    {title: 'Deleted at'},
  ]), []);

  const rowMarkup = productReviews.map(
    (
      {id, rate, review, customerId, productId, createdAt, updatedAt, deletedAt},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.reviews}/${id}`}>{rate}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{review}</IndexTable.Cell>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.customers}/${customerId}`}>{customerId}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.products}/${productId}`}>{productId}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    ),
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
