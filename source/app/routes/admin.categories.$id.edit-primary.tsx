import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminCategoriesSingleLoader} from '~/.server/admin/loaders/categories/single/loader';
import {EditPrimaryForm} from '~/admin/components/categories/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/categories/EditPrimaryForm/EditPrimaryForm.validator';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/categories/edit-primary/action';

export default function AdminCategoriesIdEditPrimary() {
  const data = useRouteLoaderData<TAdminCategoriesSingleLoader>('routes/admin.categories.$id');
  const { t } = useTranslation('categories');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('edit.saveButton')} variant="primary"/>
  ), []);

  if (!data?.category) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title={t('edit.title')}
        backAction={{
          url: `${EAdminNavigation.categories}/${data.category.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditPrimaryForm category={data.category}/>
      </Page>
    </ValidatedForm>
  );
}
