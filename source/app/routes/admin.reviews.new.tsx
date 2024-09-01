import {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {newFormValidator} from '~/admin/components/reviews/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/reviews/NewForm/NewForm';
import { useTranslation } from 'react-i18next';

export {action} from '~/.server/admin/actions/reviews/new/action';

export default function AdminProductReviewsNew() {
  const { t } = useTranslation('reviews');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('new.saveButton')} variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title={t('new.title')}
        backAction={{
          url: EAdminNavigation.reviews
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
