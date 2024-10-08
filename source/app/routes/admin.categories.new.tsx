import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {newFormValidator} from '~/admin/components/categories/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/categories/NewForm/NewForm';

export {action} from '~/.server/admin/actions/categories/new/action';

export default function AdminCategoriesNew() {
  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title="Create new category"
        backAction={{
          url: EAdminNavigation.categories
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
