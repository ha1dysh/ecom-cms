import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.reviews);
  }

  const productReview = await prisma.productReview.findFirst({
    where: {id: Number(id)}
  });

  if (!productReview) {
    return redirect(EAdminNavigation.reviews);
  }

  await prisma.productReview.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  return redirect(`${EAdminNavigation.reviews}/${id}`);
}
