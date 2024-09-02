import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {productMapper} from '~/.server/admin/mappers/product.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';
import { requestToSearchParams, queryToPagination, hasNextCalculate } from '~/.server/admin/utils/query.util';
import { ProductReviewMapper } from '~/.server/admin/mappers/productReview.mapper';
import { productTranslationMapper } from '~/.server/admin/mappers/productTranslations.mapper';
import { categoryTranslationMapper } from '~/.server/admin/mappers/categorryTranslations.mapper';

export async function loader({request, params}: LoaderFunctionArgs) {
  await getAuthUser(request);

  const searchParams = requestToSearchParams(request);
  const pagination = await queryToPagination(searchParams);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  // get user
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      category: true,
      reviews: {
        where: { deletedAt: null },
        take: pagination.take,
        skip: pagination.skip,
      },
    },
  });

  // if not exist
  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  pagination.count = product.reviews.length;
  pagination.total = await prisma.productReview.count({
    where: { productId: product.id, deletedAt: null }
  });
  pagination.hasNext = hasNextCalculate(pagination);

  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null,
    }
  });

  const reviews = await prisma.productReview.findMany({
    where: { productId: product.id, deletedAt: null },
    take: pagination.take,
    skip: pagination.skip,
  });

  const productsTranslations = await prisma.productTranslation.findMany({
    where: { productId: product.id },
  });

  if (!product.categoryId) {
    return json({
      product: productMapper(product),
      categories: categories.map(categoryMapper),
      reviews: reviews.map(ProductReviewMapper),
      productTranslations: productsTranslations.map(productTranslationMapper),
      categoryTranslations: null,
      pagination
    });
  }

  const categoriesTranslations = await prisma.categoryTranslation.findMany({
    where: { categoryId: product.categoryId },
  });

  return json({
    product: productMapper(product),
    categories: categories.map(categoryMapper),
    reviews: reviews.map(ProductReviewMapper),
    productTranslations: productsTranslations.map(productTranslationMapper),
    categoryTranslations: categoriesTranslations.map(categoryTranslationMapper),
    pagination
  });
}

export type TAdminProductsSingleLoader = typeof loader;
export type TAdminProductsSingleLoaderData = SerializeFrom<typeof loader>;
