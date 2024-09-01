import {ChoiceList, IndexFilters, IndexFiltersProps, useSetIndexFiltersMode,} from '@shopify/polaris';
import React, {FC, useCallback, useState} from 'react';
import {useSearchParams} from '@remix-run/react';
import {reqSortToSort, sortArrToReqSort} from '~/admin/utils/filter.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { TAdminProductReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import { useTranslation } from 'react-i18next';

export enum EReviewsSortVariant {
  rate_asc = 'rate_asc',
  rate_desc = 'rate_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export interface FiltersProps {
  query?: TAdminProductReviewsLoaderData['query'];
}

export const Filters: FC<FiltersProps> = ({query}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('reviews');

  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: t('filters.rate'), value: reqSortToSort(EReviewsSortVariant.rate_asc), directionLabel: t('filters.highToLow')},
    {label: t('filters.rate'), value: reqSortToSort(EReviewsSortVariant.rate_desc), directionLabel: t('filters.lowToHigh')},
    {label: t('filters.createdAt'), value: reqSortToSort(EReviewsSortVariant.createdAt_asc), directionLabel: t('filters.oldToNew')},
    {label: t('filters.createdAt'), value: reqSortToSort(EReviewsSortVariant.createdAt_desc), directionLabel: t('filters.newToOld')},
    {label: t('filters.updatedAt'), value: reqSortToSort(EReviewsSortVariant.updatedAt_asc), directionLabel: t('filters.oldToNew')},
    {label: t('filters.updatedAt'), value: reqSortToSort(EReviewsSortVariant.updatedAt_desc), directionLabel: t('filters.newToOld')},
    {label: t('filters.deleteAt'), value: reqSortToSort(EReviewsSortVariant.deletedAt_asc), directionLabel: t('filters.oldToNew')},
    {label: t('filters.deleteAt'), value: reqSortToSort(EReviewsSortVariant.deletedAt_desc), directionLabel: t('filters.newToOld')},
  ];

  const sortOrder = query?.sort || EReviewsSortVariant.createdAt_desc;
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
      prev.delete('role'); // TODO: remove role
      prev.delete('softDeleteStatus');
      prev.delete('skip');
      prev.delete('take');
      return prev;
    });
  }, [setSearchParams, setSoftDeleteStatus]);

  const filters = [
    {
      key: 'softDeleteStatus',
      label: t('filters.softDeleteStatus'),
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
      queryPlaceholder={t('filters.searchReviews')}
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
