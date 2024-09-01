import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {adminUsersLoader} from '~/.server/admin/loaders/users.loader';
import {AdminUsersTable} from '~/admin/components/UsersTable/UsersTable';
import { useTranslation } from 'react-i18next';

export const loader = adminUsersLoader;

export default function AdminUsersIndex() {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation('users');

  return (
    <Page
      fullWidth
      title={t("title")}
      primaryAction={{
        content: t("createButton"),
        icon: PlusIcon,
        accessibilityLabel: t("createButton"),
        url: EAdminNavigation.usersCreate,
      }}
    >
      <AdminUsersTable
        users={data.users}
        query={data.query}
        pagination={data.pagination}
      />
    </Page>
  );
}

