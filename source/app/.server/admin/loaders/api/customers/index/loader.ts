import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {queryToSearch, requestToSearchParams} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import { apiCustomerMapper } from '~/.server/admin/mappers/api/customer.mapper';


export async function loader({request}: LoaderFunctionArgs) {
  await getAuthUser(request);

  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);

  let searchQuery;
  if (search) {
    searchQuery = {
      OR: [
        {firstName: containsInsensitive(search)},
        {lastName: containsInsensitive(search)},
        {email: containsInsensitive(search)},
      ]
    };
  }

  const customers = await prisma.customer.findMany({
    take: 10,
    skip: 0,
    where: {
      deletedAt: null,
      ...searchQuery,
    },
    orderBy: {
      createdAt: 'asc',
    }
  });

  return json({customers: customers.map(apiCustomerMapper)});
}

export type TAdminApiCustomersLoader = typeof loader;
export type TAdminApiCustomersLoaderData = SerializeFrom<typeof loader>;
