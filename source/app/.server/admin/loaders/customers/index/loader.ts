import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {customerMapper} from '~/.server/admin/mappers/customer.mapper';
import {
  makeQuery,
  queryToPagination,
  queryToSearch,
  queryToSort,
  sortValueToField
} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';

type CustomerOrderByWithRelationInput = Prisma.CustomerOrderByWithRelationInput;

export enum EAccountStatus {
  active = 'active',
  disabled = 'disabled'
}

export enum ECustomersSortVariant {
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export const customerQueryValidator = withZod(
  z.object({
    accountStatus: z.nativeEnum(EAccountStatus).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const {searchParams} = new URL(request.url);
  const {data} = await customerQueryValidator.validate(
    searchParams
  );
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, ECustomersSortVariant, ECustomersSortVariant.createdAt_desc);
  const orderBy = sortValueToField<CustomerOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [
        {email: containsInsensitive(search)},
        {firstName: containsInsensitive(search)},
        {lastName: containsInsensitive(search)},
        {phone: containsInsensitive(search)},
        {
          addresses: {
            some: {
              OR: [
                {firstName: containsInsensitive(search)},
                {lastName: containsInsensitive(search)},
                {address: containsInsensitive(search)},
                {phone: containsInsensitive(search)},
                {company: containsInsensitive(search)}
              ]
            }
          }
        }
      ]
    };
  }

  if (data?.accountStatus === EAccountStatus.disabled) {
    filterAccountStatusQuery = {
      deletedAt: {
        not: null
      }
    };
  }

  if (data?.accountStatus === EAccountStatus.active) {
    filterAccountStatusQuery = {
      deletedAt: null
    };
  }


  const customers = await prisma.customer.findMany({
    include: {
      addresses: true
    },
    take: pagination.take,
    skip: pagination.skip,
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy
  });

  pagination.count = customers.length;
  pagination.total = await prisma.customer.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = pagination.skip + pagination.take < pagination.total;

  return json({customers: customers.map(customerMapper), query: makeQuery(search, sort, data), pagination});
}

export type TAdminCustomersLoader = typeof loader;
export type TAdminCustomersLoaderData = SerializeFrom<typeof loader>;
