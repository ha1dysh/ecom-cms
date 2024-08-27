import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {validationError} from 'remix-validated-form';
import {editPrimaryFormValidator} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm.validator';
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
    return redirect(EAdminNavigation.reviews);
  }

  const productReview = await prisma.productReview.findFirst({
    where: {id: Number(id)}
  });

  if (!productReview) {
    return redirect(EAdminNavigation.reviews);
  }

  const data = await editPrimaryFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {customerId, productId, rate, review} = data.data;

  await prisma.productReview.update({
    where: { id: Number(id) },
    data: { customerId, productId, rate, review },
  });

  const { _avg } = await prisma.productReview.aggregate({
    where: { productId: productReview.productId, deletedAt: null },
    _avg: { rate: true },
  });
  const avgRate = (_avg.rate && _avg.rate * 10) || 0;

  await prisma.product.update({
    where: { id: productReview.productId },
    data: { avgRate },
  });

  return redirect(`${EAdminNavigation.reviews}/${id}`);
}
