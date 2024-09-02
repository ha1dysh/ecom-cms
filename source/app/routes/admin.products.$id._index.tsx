import React, {useCallback, useMemo, useState} from 'react';
import {useRouteLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {TAdminProductsSingleLoader} from '~/.server/admin/loaders/products/single/loader';
import {Single} from '~/admin/components/products/Single/Single';
import {DeleteForm} from '~/admin/components/products/Single/DeleteForm';
import { adminLoader } from '~/.server/admin/loaders/admin.loader';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/products/single/action';

export default function AdminProductsIdIndex() {
  const data = useRouteLoaderData<TAdminProductsSingleLoader>('routes/admin.products.$id');
  const userData = useRouteLoaderData<typeof adminLoader>('routes/admin');
  const { t } = useTranslation('products');

  if (!userData?.user) {
    return null;
  }

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: t('single.deleteButton'),
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => {
    return data?.product.deletedAt ? [] : [deleteAction];
  }, [deleteAction, data?.product.deletedAt]);

  if (!data?.product) {
    return null;
  }

  return (
    <Page
      title={`${data?.product.title}`}
      backAction={{
        url: EAdminNavigation.products,
      }}
      secondaryActions={secondaryActions}
    >
      <Single
        user={userData?.user}
        product={data?.product}
        categories={data?.categories || []}
        reviews={data?.reviews}
        translations={data?.translations}
        pagination={data?.pagination}
      />
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title={t('delete.title')}
      >
        <DeleteForm toggleActive={toggleActive} product={data?.product} />
      </Modal>
    </Page>
  );
}
