import {ChoiceList, IndexFilters, IndexFiltersProps, useSetIndexFiltersMode,} from '@shopify/polaris';
import React, {FC, useCallback, useState} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {TAdminProductsLoaderData} from '~/.server/admin/loaders/products/index/loader';
import {reqSortToSort, sortArrToReqSort} from '~/admin/utils/filter.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { useTranslation } from 'react-i18next';

export enum EProductsSortVariant {
  totalReviews_asc = 'totalReviews_asc',
  totalReviews_desc = 'totalReviews_desc',
  avgRate_asc = 'avgRate_asc',
  avgRate_desc = 'avgRate_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  title_asc = 'title_asc',
  title_desc = 'title_desc',
  quantity_asc = 'quantity_asc',
  quantity_desc = 'quantity_desc',
  softDeleteStatus_asc = 'softDeleteStatus_asc',
  softDeleteStatus_desc = 'softDeleteStatus_desc',
}

export interface FiltersProps {
  query?: TAdminProductsLoaderData['query'];
}

export const Filters: FC<FiltersProps> = ({query}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('products');


  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {
      label: t('filters.totalReviews'),
      value: reqSortToSort(EProductsSortVariant.totalReviews_asc),
      directionLabel: t('filters.lowToHigh')
    },
    {
      label: t('filters.totalReviews'),
      value: reqSortToSort(EProductsSortVariant.totalReviews_desc),
      directionLabel: t('filters.highToLow')
    },
    {
      label: t('filters.avgRate'),
      value: reqSortToSort(EProductsSortVariant.avgRate_asc),
      directionLabel: t('filters.lowToHigh')
    },
    {
      label: t('filters.avgRate'),
      value: reqSortToSort(EProductsSortVariant.avgRate_desc),
      directionLabel: t('filters.highToLow')
    },
    {
      label: t('filters.title'),
      value: reqSortToSort(EProductsSortVariant.title_asc),
      directionLabel: t('filters.az')
    },
    {
      label: t('filters.title'),
      value: reqSortToSort(EProductsSortVariant.title_desc),
      directionLabel: t('filters.za')
    },
    {
      label: t('filters.quantity'),
      value: reqSortToSort(EProductsSortVariant.quantity_asc),
      directionLabel: t('filters.lowToHigh')
    },
    {
      label: t('filters.quantity'),
      value: reqSortToSort(EProductsSortVariant.quantity_desc),
      directionLabel: t('filters.highToLow')
    },
    {
      label: t('filters.status'),
      value: reqSortToSort(EProductsSortVariant.softDeleteStatus_asc),
      directionLabel: t('filters.az')
    },
    {
      label: t('filters.status'),
      value: reqSortToSort(EProductsSortVariant.softDeleteStatus_desc),
      directionLabel: t('filters.za')
    },
    {
      label: t('filters.createdAt'),
      value: reqSortToSort(EProductsSortVariant.createdAt_asc),
      directionLabel: t('filters.oldestToNewest')
    },
    {
      label: t('filters.createdAt'),
      value: reqSortToSort(EProductsSortVariant.createdAt_desc),
      directionLabel: t('filters.newestToOldest')
    },
    {
      label: t('filters.updatedAt'),
      value: reqSortToSort(EProductsSortVariant.updatedAt_asc),
      directionLabel: t('filters.oldestToNewest')
    },
    {
      label: t('filters.updatedAt'),
      value: reqSortToSort(EProductsSortVariant.updatedAt_desc),
      directionLabel: t('filters.newestToOldest')
    },
  ];

  const sortOrder = query?.sort || EProductsSortVariant.createdAt_desc;
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

  const [softDeleteStatus, setSoftDeleteStatus] = useState<ESoftDeleteStatus | undefined>(
    query?.filters?.softDeleteStatus,
  );

  const {mode, setMode} = useSetIndexFiltersMode();

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
      key: 'softDeleteStatus',
      label: t('filters.productStatus'),
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={[
            {
              label: t('filters.active'),
              value: ESoftDeleteStatus.active,
            },
            {
              label: t('filters.inactive'),
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
      queryPlaceholder={t('filters.searchProducts')}
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
