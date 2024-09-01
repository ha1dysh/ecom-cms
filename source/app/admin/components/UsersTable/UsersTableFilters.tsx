import {ChoiceList, IndexFilters, IndexFiltersProps, useSetIndexFiltersMode,} from '@shopify/polaris';
import React, {FC, useCallback, useState} from 'react';
import type {TAdminUsersLoaderData} from '~/.server/admin/loaders/users.loader';
import {useSearchParams} from '@remix-run/react';
import {$Enums} from '@prisma/client';
import {reqSortToSort, sortArrToReqSort} from '~/admin/utils/filter.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { useTranslation } from 'react-i18next';


export enum EUsersSortVariant {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  fullName_asc = 'fullName_asc',
  fullName_desc = 'fullName_desc',
  email_asc = 'email_asc',
  email_desc = 'email_desc',
  role_asc = 'role_asc',
  role_desc = 'role_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export interface UsersTableFiltersProps {
  query?: TAdminUsersLoaderData['query'];
}

export const AdminUsersTableFilters: FC<UsersTableFiltersProps> = ({query}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('users');

  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'ID', value: reqSortToSort(EUsersSortVariant.id_asc), directionLabel: t('table.oldestToNewest')},
    {label: 'ID', value: reqSortToSort(EUsersSortVariant.id_desc), directionLabel: t('table.newestToOldest')},
    {label: t('table.email'), value: reqSortToSort(EUsersSortVariant.email_asc), directionLabel: t('table.az')},
    {label: t('table.email'), value: reqSortToSort(EUsersSortVariant.email_desc), directionLabel: t('table.za')},
    {label: t('table.fullName'), value: reqSortToSort(EUsersSortVariant.fullName_asc), directionLabel: t('table.az')},
    {label: t('table.fullName'), value: reqSortToSort(EUsersSortVariant.fullName_desc), directionLabel: t('table.za')},
    {label: t('table.role'), value: reqSortToSort(EUsersSortVariant.role_asc), directionLabel: t('table.az')},
    {label: t('table.role'), value: reqSortToSort(EUsersSortVariant.role_desc), directionLabel: t('table.za')},
    {label: t('table.createdAt'), value: reqSortToSort(EUsersSortVariant.createdAt_asc), directionLabel: t('table.oldestToNewest')},
    {label: t('table.createdAt'), value: reqSortToSort(EUsersSortVariant.createdAt_desc), directionLabel: t('table.newestToOldest')},
    {label: t('table.updatedAt'), value: reqSortToSort(EUsersSortVariant.updatedAt_asc), directionLabel: t('table.oldestToNewest')},
    {label: t('table.updatedAt'), value: reqSortToSort(EUsersSortVariant.updatedAt_desc), directionLabel: t('table.newestToOldest')},
    {label: t('table.deleteAt'), value: reqSortToSort(EUsersSortVariant.deletedAt_asc), directionLabel: t('table.oldestToNewest')},
    {label: t('table.deleteAt'), value: reqSortToSort(EUsersSortVariant.deletedAt_desc), directionLabel: t('table.newestToOldest')},
  ];

  const sortOrder = query?.sort || EUsersSortVariant.id_desc;
  const sortSelected = [reqSortToSort(sortOrder)];

  const setSortSelected = (value: string[]) => {
    setSearchParams((prev) => {
      prev.set('sort', sortArrToReqSort(value));
      return prev;
    });
  };

  /* SORT END */

  /* FILTERS START */
  const serverQueryValue = query?.q || '';
  const [queryValue, setQueryValue] = useState(serverQueryValue);

  const timerRef = React.useRef<number | null>(null);

  const handleFiltersQueryChange = useCallback((value: string) => {
    setQueryValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value === '') {
          prev.delete('q');
          return prev;
        }

        prev.set('q', value);
        return prev;
      });
    }, 300);
  }, [setSearchParams]);

  const [role, setRole] = useState<string[] | undefined>(
    query?.filters?.role,
  );

  const [softDeleteStatus, setSoftDeleteStatus] = useState<ESoftDeleteStatus | undefined>(
    query?.filters?.softDeleteStatus,
  );

  const {mode, setMode} = useSetIndexFiltersMode();


  const handleRoleFilterChange = useCallback(
    (value: string[]) => {
      setRole(value);
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value.length === 0) {
          prev.delete('role');
          return prev;
        }

        prev.set('role', value.join(','));
        return prev;
      });
    },
    [setSearchParams],
  );

  const handleAccountStatusChange = useCallback(
    (value: ESoftDeleteStatus[]) => {
      setSoftDeleteStatus(value?.[0]);
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value.length === 0) {
          prev.delete('softDeleteStatus');
          return prev;
        }

        prev.set('softDeleteStatus', value[0]);
        return prev;
      });
    },
    [setSearchParams],
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue('');
    setRole(undefined);
    setSoftDeleteStatus(undefined);

    setSearchParams((prev) => {
      prev.delete('q');
      prev.delete('role');
      prev.delete('softDeleteStatus');
      prev.delete('skip');
      prev.delete('take');
      return prev;
    });
  }, [setSearchParams, setSoftDeleteStatus]);

  const filters = [
    {
      key: 'role',
      label: t('table.roleFilter'),
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={Object.values($Enums.AdminRole).map((role) => ({
            label: role,
            value: role,
          }))}
          selected={role || []}
          onChange={handleRoleFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'softDeleteStatus',
      label: t('table.softDeleteStatusFilter'),
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={[
            {
              label: t('table.active'),
              value: ESoftDeleteStatus.active,
            },
            {
              label: t('table.inactive'),
              value: ESoftDeleteStatus.deleted,
            }
          ]}
          selected={softDeleteStatus ? [softDeleteStatus] : []}
          onChange={handleAccountStatusChange}
          allowMultiple={false}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (role && !isEmpty(role)) {
    const key = 'role';
    appliedFilters.push({
      key,
      label: `Users with role ${role.join(', ')}`,
      onRemove: handleRoleFilterChange.bind(null, []),
    });
  }
  if (softDeleteStatus && !isEmpty(softDeleteStatus)) {
    const key = 'softDeleteStatus';
    appliedFilters.push({
      key,
      label: `Soft Delete Status ${softDeleteStatus}`,
      onRemove: handleAccountStatusChange.bind(null, []),
    });
  }
  /* FILTERS END */

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      queryValue={queryValue}
      queryPlaceholder={t('table.searchUsers')}
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={() => handleFiltersQueryChange('')}
      onSort={setSortSelected}
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={handleFiltersClearAll}
      mode={mode}
      setMode={setMode}
      tabs={[]}
      selected={0}
    />
  );
};


function isEmpty(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
