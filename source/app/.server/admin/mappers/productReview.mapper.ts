import { ProductReview } from "@prisma/client";
import { TProductReviewDto } from "../dto/productReview.dto";

export const ProductReviewMapper = (productReview: ProductReview): TProductReviewDto => {

  return {
    id: String(productReview.id),
    rate: productReview.rate,
    review: productReview.review,
    productId: productReview.productId,
    customerId: productReview.customerId,
    createdAt: productReview.createdAt.toJSON(),
    updatedAt: productReview.updatedAt.toJSON(),
    deletedAt: productReview.deletedAt ? productReview.deletedAt.toJSON() : null,
  };
};
