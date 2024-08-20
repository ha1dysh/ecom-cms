import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type { TAdminProductReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import {Index} from '~/admin/components/reviews/Index/Index';

export {loader} from '~/.server/admin/loaders/reviews/index/loader';


export default function AdminProductReviewsIndex() {
  const data = useLoaderData<TAdminProductReviewsLoaderData>();

  return (
    <Page
      fullWidth
      title="Reviews"
      primaryAction={{
        content: "Create reviews",
        icon: PlusIcon,
        accessibilityLabel: "Create reviews",
        url: EAdminNavigation.reviewsCreate,
      }}
    >
      <Index
        productReviews={data.productReviews}
        query={data.query}
        pagination={data.pagination}
      />
    </Page>
  );
}

