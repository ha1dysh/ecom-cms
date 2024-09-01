import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {splitFirstName} from '~/admin/utils/user.util';
import { useTranslation } from 'react-i18next';

export type UsersPrimaryInfoFormProps = {
  user: Pick<TUserDto, 'fullName' | 'email'>;
};

export const UsersPrimaryInfoForm: FC<UsersPrimaryInfoFormProps> = (props) => {
  const {user: {fullName, email}} = props;
  const { t } = useTranslation('users');
  const [firstName, lastName] = splitFirstName(fullName || '');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('edit.primaryInfo')}
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label={t('edit.firstName')}
              type="text"
              name="firstName"
              autoComplete="given-name"
              defaultValue={firstName}
            />
            <ValidatedTextField
              label={t('edit.lastName')}
              type="text"
              name="lastName"
              autoComplete="family-name"
              defaultValue={lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label={t('edit.email')}
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={email}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
