import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import { $Enums } from '@prisma/client';

export async function action({request, params}: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });
  if (user.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard);
  }

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.categories);
  }

  // get category
  const category = await prisma.category.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!category) {
    return redirect(EAdminNavigation.categories);
  }

  // update category
  await prisma.category.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.categories}/${id}`);
}
