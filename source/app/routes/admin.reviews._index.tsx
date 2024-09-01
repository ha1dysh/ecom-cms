import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type { TAdminProductReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import {Index} from '~/admin/components/reviews/Index/Index';
import { useTranslation } from 'react-i18next';

export {loader} from '~/.server/admin/loaders/reviews/index/loader';


export default function AdminProductReviewsIndex() {
  const data = useLoaderData<TAdminProductReviewsLoaderData>();
  const { t } = useTranslation('reviews');

  return (
    <Page
      fullWidth
      title={t('title')}
      primaryAction={{
        content: t('createButton'),
        icon: PlusIcon,
        accessibilityLabel: t('createButton'),
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

