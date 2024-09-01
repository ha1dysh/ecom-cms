import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';
import {EditPrimaryForm} from '~/admin/components/customers/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/customers/EditPrimaryForm/EditPrimaryForm.validator';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/customers/edit-primary/action';

export default function AdminCustomersIdEditPrimary() {
  const data = useRouteLoaderData<TAdminCustomersSingleLoader>('routes/admin.customers.$id');
  const { t } = useTranslation('customers');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('edit.saveButton')} variant="primary"/>
  ), []);

  if (!data?.customer) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title={t('edit.title')}
        backAction={{
          url: `${EAdminNavigation.customers}/${data.customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditPrimaryForm customer={data.customer}/>
      </Page>
    </ValidatedForm>
  );
}
