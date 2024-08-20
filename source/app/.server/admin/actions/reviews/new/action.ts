import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import { newFormValidator } from '~/admin/components/reviews/NewForm/NewForm.validator';

export async function action({request}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {rate, review, productId, customerId} = data.data;

  const newReview = await prisma.productReview.create({
    data: { rate, review, productId, customerId }
  });

  return redirect(`${EAdminNavigation.reviews}/${newReview.id}`);
}
