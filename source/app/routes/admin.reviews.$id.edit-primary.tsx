import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {EditPrimaryForm} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm.validator';
import { TAdminReviewsSingleLoader } from '~/.server/admin/loaders/reviews/single/loader';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/reviews/edit-primary/action';

export default function AdminProductReviewsIdEditPrimary() {
  const data = useRouteLoaderData<TAdminReviewsSingleLoader>('routes/admin.reviews.$id');
  const { t } = useTranslation('reviews');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('edit.saveButton')} variant="primary"/>
  ), []);

  if (!data?.productReview) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title={t('edit.title')}
        backAction={{
          url: `${EAdminNavigation.reviews}/${data.productReview.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditPrimaryForm productReview={data.productReview} />
      </Page>
    </ValidatedForm>
  );
}
