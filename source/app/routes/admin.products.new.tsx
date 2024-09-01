import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {newFormValidator} from '~/admin/components/products/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/products/NewForm/NewForm';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/products/new/action';

export default function AdminProductsNew() {
  const { t } = useTranslation('products');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('new.saveButton')} variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title={t('new.title')}
        backAction={{
          url: EAdminNavigation.products
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
