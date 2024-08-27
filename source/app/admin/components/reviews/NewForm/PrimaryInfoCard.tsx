import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import { TAdminApiProductsLoader, TAdminApiProductsLoaderData } from '~/.server/admin/loaders/api/products/index/loader';
import { ValidatedLazyAutocomplete } from '~/admin/ui/ValidatedLazyAutocomplete/ValidatedLazyAutocomplete';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { TAdminApiCustomersLoader, TAdminApiCustomersLoaderData } from '~/.server/admin/loaders/api/customers/index/loader';

type Props = {
  productReview?: TProductReviewDto
}

const productsResponseToOptions = (data?: TAdminApiProductsLoaderData) => {
  return data?.products?.map((product) => ({
    value: product.id,
    label: `${product.title} (${product.slug})`,
  })) || [];
};

const customersResponseToOptions = (data?: TAdminApiCustomersLoaderData) => {
  return data?.customers?.map((customer) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
  })) || [];
};

export const PrimaryInfoCard: FC<Props> = ({ productReview }) => {
  const productDefaultValue = productReview?.product ? {
    label: `${productReview?.product.title} (${productReview?.product.slug})`,
    value: productReview?.product.id,
  } : undefined;

  const customerDefaultValue = productReview?.customer ? {
    label: `${productReview?.customer.firstName} ${productReview?.customer.lastName}`,
    value: productReview?.customer.id,
  } : undefined;

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <ValidatedSelect
            label="Rate"
            name="rate"
            options={["0", "1", "2", "3", "4", "5"]}
            defaultValue={String(productReview?.rate)}
          />
          <ValidatedTextField
            label="Review"
            type="text"
            name="review"
            autoComplete="off"
            defaultValue={productReview?.review}
            multiline={5}
          />
           <ValidatedLazyAutocomplete<TAdminApiProductsLoader>
            key='product'
            label="Products"
            name="productId"
            url={EAdminNavigation.apiProducts}
            responseToOptions={productsResponseToOptions}
            defaultValue={productDefaultValue}
          />
           <ValidatedLazyAutocomplete<TAdminApiCustomersLoader>
            key='customer'
            label="Customers"
            name="customerId"
            url={EAdminNavigation.apiCustomers}
            responseToOptions={customersResponseToOptions}
            defaultValue={customerDefaultValue}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
