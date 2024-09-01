import React, {useCallback} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedForm} from 'remix-validated-form';
import {UsersPrimaryInfoForm} from '~/admin/components/UsersPrimaryInfoForm/UsersPrimaryInfoForm';
import {usersPrimaryInfoFormValidator} from '~/admin/components/UsersPrimaryInfoForm/UsersPrimaryInfoForm.validator';
import {adminUsersPrimaryAction} from '~/.server/admin/actions/users.primary.action';
import {adminUsersSingleLoader} from '~/.server/admin/loaders/users.single.loader';
import { useTranslation } from 'react-i18next';

export const loader = adminUsersSingleLoader;

export const action = adminUsersPrimaryAction;

export default function AdminUsersIdPrimary() {
  const {user} = useLoaderData<typeof loader>();
  const { t } = useTranslation('users');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text={t('edit.saveButton')} variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={usersPrimaryInfoFormValidator} method="post">
      <Page
        title={`${t('edit.title')}: ${user.fullName}`}
        backAction={{
          url: `${EAdminNavigation.users}/${user.id}`
        }}
        primaryAction={primaryAction()}
      >
        <UsersPrimaryInfoForm user={user}/>
      </Page>
    </ValidatedForm>
  );
}
