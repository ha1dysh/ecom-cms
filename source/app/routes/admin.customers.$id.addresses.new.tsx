import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {newFormValidator} from '~/admin/components/customers/addresses/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/customers/addresses/NewForm/NewForm';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/customers/addresses/new/action';

export default function AdminCustomerAddressNew() {
  const data = useRouteLoaderData<TAdminCustomersSingleLoader>('routes/admin.customers.$id');
  const { t } = useTranslation('customers');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('newAddress.saveButton')} variant="primary"/>
  ), []);

  if (!data?.customer) {
    return null;
  }

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title={`${t('newAddress.title')}: ${data.customer.firstName} ${data.customer.lastName}`}
        backAction={{
          url: `${EAdminNavigation.customers}/${data.customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
