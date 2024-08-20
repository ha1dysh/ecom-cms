import {Category, Product, ProductReview} from '@prisma/client';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';
import { ProductReviewMapper } from './productReview.mapper';

export type ProductWithRelations = Product & {
  category: Category | null;
  reviews: ProductReview[];
};

export const productMapper = (product: ProductWithRelations): TProductDto => {
  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
    description: product.description,
    price: String(product.price),
    costPerItem: String(product.costPerItem),
    compareAtPrice: String(product.compareAtPrice),
    quantity: String(product.quantity),
    sku: product.sku,
    barcode: product.barcode,
    status: product.status,
    avgRate: String(product.avgRate),
    totalReviews: String(product.totalReviews),
    categoryId: product.categoryId ? String(product.categoryId) : null,
    category: product.category ? categoryMapper(product.category) : null,
    reviews: product.reviews.map(ProductReviewMapper),
    createdAt: product.createdAt.toJSON(),
    updatedAt: product.updatedAt.toJSON(),
    deletedAt: product.deletedAt ? product.deletedAt.toJSON() : null,
  };
};
