import React, {useCallback, useMemo, useState} from 'react';
import {useRouteLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {TAdminCategoriesSingleLoader} from '~/.server/admin/loaders/categories/single/loader';
import {Single} from '~/admin/components/categories/Single/Single';
import {DeleteForm} from '~/admin/components/categories/Single/DeleteForm';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/categories/single/action';

export default function AdminCategoriesIdIndex() {
  const data = useRouteLoaderData<TAdminCategoriesSingleLoader>('routes/admin.categories.$id');
  const [active, setActive] = useState(false);
  const { t } = useTranslation('categories');

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: t('single.deleteButton'),
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => {
    return data?.category.deletedAt ? [] : [deleteAction];
  }, [deleteAction, data?.category.deletedAt]);

  if (!data?.category) {
    return null;
  }

  return (
    <Page
      title={`${data?.category.title}`}
      backAction={{
        url: EAdminNavigation.categories
      }}
      secondaryActions={secondaryActions}
    >
      <Single category={data?.category} translations={data?.categoryTranslations}/>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title={t('delete.title')}
      >
        <DeleteForm toggleActive={toggleActive} category={data?.category}/>
      </Modal>
    </Page>
  );
}
