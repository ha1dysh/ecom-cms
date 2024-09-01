import {BlockStack, Button, Card, InlineGrid, Modal, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC, useCallback, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {UsersRoleForm} from '~/admin/components/UsersSingle/UsersRoleForm';

export type RoleCardProps = {
  user: TUserDto;
}

export const RoleCard: FC<RoleCardProps> = (props) => {
  const {user: {role}} = props;
  const { t } = useTranslation('users');
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('single.role')}
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {role}
        </Text>
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title={t('single.changeRole')}
      >
        <UsersRoleForm role={role} toggleActive={toggleActive}/>
      </Modal>
    </Card>
  );
};
