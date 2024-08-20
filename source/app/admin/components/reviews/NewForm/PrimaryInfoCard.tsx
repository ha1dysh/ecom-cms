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
  review?: TProductReviewDto
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

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {review} = props;

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
            defaultValue={String(review?.rate)}
          />
          <ValidatedTextField
            label="Review"
            type="text"
            name="review"
            autoComplete="off"
            defaultValue={review?.review}
            multiline={5}
          />
           <ValidatedLazyAutocomplete<TAdminApiProductsLoader>
            label="Products"
            name="productId"
            url={EAdminNavigation.apiProducts}
            responseToOptions={productsResponseToOptions}
          />
           <ValidatedLazyAutocomplete<TAdminApiCustomersLoader>
            label="Customers"
            name="customerId"
            url={EAdminNavigation.apiCustomers}
            responseToOptions={customersResponseToOptions}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
