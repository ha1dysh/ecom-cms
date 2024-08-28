import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {queryToSearch, requestToSearchParams} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import { apiProductMapper } from '~/.server/admin/mappers/api/product.mapper';

export async function loader({request}: LoaderFunctionArgs) {
  await getAuthUser(request);

  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);

  let searchQuery;
  if (search) {
    searchQuery = {
      OR: [
        {title: containsInsensitive(search)},
        {slug: containsInsensitive(search)},
      ]
    };
  }

  const products = await prisma.product.findMany({
    take: 10,
    skip: 0,
    where: {
      deletedAt: null,
      ...searchQuery,
    },
  });

  return json({products: products.map(apiProductMapper)});
}

export type TAdminApiProductsLoader = typeof loader;
export type TAdminApiProductsLoaderData = SerializeFrom<typeof loader>;
