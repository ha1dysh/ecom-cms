import { InlineStack, TopBar, TopBarProps } from "@shopify/polaris";
import { FC, useCallback, useState } from "react";
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { UserMenu } from "~/admin/components/AppBar/UserMenu";
import { LangMenu } from "./LangMenu";

export interface AppBarProps {
  onNavigationToggle: TopBarProps["onNavigationToggle"];
  user: TUserDto;
}

export const AppBar: FC<AppBarProps> = ({ onNavigationToggle, user }) => {
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={
        <InlineStack blockAlign="center" gap="400">
          <LangMenu />
          <UserMenu
            user={user}
            userMenuActive={userMenuActive}
            toggleUserMenuActive={toggleUserMenuActive}
          />
        </InlineStack>
      }
      onNavigationToggle={onNavigationToggle}
    />
  );
};
