import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminCustomersLoader} from '~/.server/admin/loaders/customers/index/loader';
import {Index} from '~/admin/components/customers/Index/Index';
import { useTranslation } from 'react-i18next';

export {loader} from '~/.server/admin/loaders/customers/index/loader';


export default function AdminCustomersIndex() {
  const data = useLoaderData<TAdminCustomersLoader>();
  const { t } = useTranslation('customers');

  return (
    <Page
      fullWidth
      title={t('title')}
      primaryAction={{
        content: t('createButton'),
        icon: PlusIcon,
        accessibilityLabel: t('createButton'),
        url: EAdminNavigation.customersCreate,
      }}
    >
      <Index customers={data.customers} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}

