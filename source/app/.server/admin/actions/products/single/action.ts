import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getAuthUser } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/services/prisma.service";
import { EAdminProductAction, FORM_ACTION_FIELD } from "~/admin/constants/action.constant";
import { validationError } from "remix-validated-form";
import { deleteProduct } from "~/.server/admin/actions/products/single/delete-product";
import { editCategory } from "~/.server/admin/actions/products/single/edit-category";
import { createProductTranslation } from "./create-translation";
import { updateProductTranslation } from "./update-translation";
import { deleteProductTranslation } from "./delete-translation";

export async function action({ request, params }: ActionFunctionArgs) {
  await getAuthUser(request);

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  const formData = await request.formData();

  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminProductAction.updateCategory:
      return editCategory({ id: product.id, formData });
    case EAdminProductAction.deleteProduct:
      return deleteProduct({ id: product.id });
    case EAdminProductAction.createTranslation:
      return createProductTranslation({ productId: product.id, formData });
    case EAdminProductAction.updateTranslation:
      return updateProductTranslation({ productId: product.id, formData });
    case EAdminProductAction.deleteTranslation:
      return deleteProductTranslation({ formData });
  }

  return validationError({
    fieldErrors: {
      [FORM_ACTION_FIELD]: "Invalid action",
    },
  });
}
