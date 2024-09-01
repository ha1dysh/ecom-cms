import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminCategoriesLoader} from '~/.server/admin/loaders/categories/index/loader';
import {Index} from '~/admin/components/categories/Index/Index';
import { useTranslation } from 'react-i18next';

export {loader} from '~/.server/admin/loaders/categories/index/loader';


export default function AdminCategoriesIndex() {
  const data = useLoaderData<TAdminCategoriesLoader>();
  const { t } = useTranslation('categories');

  return (
    <Page
      fullWidth
      title={t('title')}
      primaryAction={{
        content: t('createButton'),
        icon: PlusIcon,
        accessibilityLabel: t('createButton'),
        url: EAdminNavigation.categoriesCreate,
      }}
    >
      <Index categories={data.categories} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}

