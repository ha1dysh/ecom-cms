import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TCustomerAddressDto} from '~/.server/admin/dto/customer.dto';
import { useTranslation } from 'react-i18next';

type Props = {
  address?: TCustomerAddressDto;
}

export const AddressCard: FC<Props> = (props) => {
  const {address} = props;
  const { t } = useTranslation('customers');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('newAddress.deliveryAddress')}
        </Text>
        <FormLayout>
          <ValidatedTextField
            label={t('newAddress.country')}
            type="text"
            name="address.country"
            autoComplete="country"
            defaultValue={address?.country}
          />
          <FormLayout.Group>
            <ValidatedTextField
              label={t('newAddress.firstName')}
              type="text"
              name="address.firstName"
              autoComplete="given-name"
              defaultValue={address?.firstName}
            />
            <ValidatedTextField
              label={t('newAddress.lastName')}
              type="text"
              name="address.lastName"
              autoComplete="family-name"
              defaultValue={address?.lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label={t('newAddress.company')}
            type="text"
            name="address.company"
            autoComplete="organization"
            defaultValue={address?.company || ''}
          />
          <ValidatedTextField
            label={t('newAddress.address')}
            type="text"
            name="address.address"
            autoComplete="address-line1"
            defaultValue={address?.address}
          />
          <ValidatedTextField
            label={t('newAddress.apartment')}
            type="text"
            name="address.apartment"
            autoComplete="apartment"
            defaultValue={address?.apartment || ''}
          />
          <FormLayout.Group>
            <ValidatedTextField
              label={t('newAddress.city')}
              type="text"
              name="address.city"
              autoComplete="city"
              defaultValue={address?.city}
            />
            <ValidatedTextField
              label={t('newAddress.postalCode')}
              type="text"
              name="address.postalCode"
              autoComplete="postal-code"
              defaultValue={address?.postalCode}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label={t('newAddress.phone')}
            type="text"
            name="address.phone"
            autoComplete="phone"
            defaultValue={address?.phone}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
