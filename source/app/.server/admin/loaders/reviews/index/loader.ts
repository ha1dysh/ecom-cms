import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {$Enums, Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {
  hasNextCalculate,
  makeQuery,
  queryToPagination,
  queryToSearch,
  queryToSort,
  requestToSearchParams,
  sortValueToField
} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { EReviewsSortVariant } from '~/admin/components/reviews/Index/Filters';
import { ProductReviewMapper } from '~/.server/admin/mappers/productReview.mapper';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';

type ProductReviewOrderByWithRelationInput = Prisma.ProductReviewOrderByWithRelationInput;

export const ProductReviewQueryValidator = withZod(
  z.object({
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

export async function loader({request}: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });
  if (user.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard);
  }
  const searchParams = requestToSearchParams(request);
  const { data } = await ProductReviewQueryValidator.validate(searchParams);
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, EReviewsSortVariant, EReviewsSortVariant.createdAt_desc);
  const orderBy = sortValueToField<ProductReviewOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [{ review: containsInsensitive(search) }],
    };
  }

  if (data?.softDeleteStatus === ESoftDeleteStatus.deleted) {
    filterAccountStatusQuery = {
      deletedAt: {
        not: null
      }
    };
  }

  if (data?.softDeleteStatus === ESoftDeleteStatus.active) {
    filterAccountStatusQuery = {
      deletedAt: null
    };
  }

  const productReviews = await prisma.productReview.findMany({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    include: {
      product: true,
      customer: true,
    },
    take: pagination.take,
    skip: pagination.skip,
    orderBy
  });

  pagination.count = productReviews.length;
  pagination.total = await prisma.productReview.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({ productReviews: productReviews.map(ProductReviewMapper), query: makeQuery(search, sort, data), pagination });
}

export type TAdminProductReviewsLoader = typeof loader;
export type TAdminProductReviewsLoaderData = SerializeFrom<typeof loader>;
