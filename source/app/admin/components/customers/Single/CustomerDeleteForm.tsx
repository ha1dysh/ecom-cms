import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import type {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import {customerDeleteFormValidator} from '~/admin/components/customers/Single/CustomerDeleteForm.validator';
import { useTranslation } from 'react-i18next';

type Props = {
  customer: Pick<TCustomerDto, 'firstName' | 'lastName'>;
  toggleActive: () => void;
}

export const CustomerDeleteForm: FC<Props> = (props) => {
  const {customer, toggleActive} = props;
  const {firstName, lastName} = customer;
  const { t } = useTranslation('customers');

  return (
    <ValidatedForm validator={customerDeleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          {t('delete.paragraph')} {firstName} {lastName}?
        </Text>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={t('delete.deleteButton')} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>{t('delete.cancelButton')}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
