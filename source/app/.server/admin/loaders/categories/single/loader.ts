import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';
import { categoryTranslationMapper } from '~/.server/admin/mappers/categorryTranslations.mapper';

export async function loader({request, params}: LoaderFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.categories);
  }

  const category = await prisma.category.findFirst({
    where: {id: Number(id)}
  });

  if (!category) {
    return redirect(EAdminNavigation.categories);
  }

  const categoryTranslations = await prisma.categoryTranslation.findMany({
    where: { categoryId: category.id },
    orderBy: { language: "asc" },
  });

  return json({
    category: categoryMapper(category),
    categoryTranslations: categoryTranslations.map(categoryTranslationMapper),
  });
}

export type TAdminCategoriesSingleLoader = typeof loader;
export type TAdminCategoriesSingleLoaderData = SerializeFrom<typeof loader>;
