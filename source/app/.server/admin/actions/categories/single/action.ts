import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';
import {  EAdminCategoryAction, FORM_ACTION_FIELD } from '~/admin/constants/action.constant';
import { deleteCategory } from './delete-category';
import { createCategoryTranslation } from './category-create-translation';
import { updateCategoryTranslation } from './category-update-translation';
import { deleteCategoryTranslation } from './category-delete-translation';

export async function action({request, params}: ActionFunctionArgs) {
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

  const formData = await request.formData();

  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminCategoryAction.deleteCategory:
      return deleteCategory(id);
    case EAdminCategoryAction.categoryCreateTranslation:
      return createCategoryTranslation({formData});
    case EAdminCategoryAction.categoryUpdateTranslation:
      return updateCategoryTranslation({productId: category.id, formData});
    case EAdminCategoryAction.categoryDeleteTranslation:
      return deleteCategoryTranslation({formData});
  }


  await prisma.category.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  return redirect(`${EAdminNavigation.categories}/${id}`);
}
