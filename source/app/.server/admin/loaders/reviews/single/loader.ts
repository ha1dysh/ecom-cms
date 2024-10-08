import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {SerializeFrom} from '@remix-run/server-runtime';
import { ProductReviewMapper } from '~/.server/admin/mappers/productReview.mapper';
import { $Enums } from '@prisma/client';

export async function loader({request, params}: LoaderFunctionArgs) {
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
    where: {id: Number(id)},
    include: {
      product: true,
      customer: true,
    },
  });

  if (!productReview) {
    return redirect(EAdminNavigation.reviews);
  }

  return json({ productReview: ProductReviewMapper(productReview) });
}

export type TAdminReviewsSingleLoader = typeof loader;
export type TAdminReviewsSingleLoaderData = SerializeFrom<typeof loader>;
