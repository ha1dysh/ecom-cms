import {Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, PersonIcon, ProductIcon, WorkIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {useLocation} from 'react-router';
import {FC, useMemo} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {hasAdminRole} from '~/admin/utils/access.util';
import { useTranslation } from 'react-i18next';

type Props = {
  user: TUserDto;
}

export const BaseNav: FC<Props> = ({user}) => {
  const location = useLocation();
  const {t, i18n} = useTranslation()


  const items = useMemo(() => {
    if (!hasAdminRole(user)) {
      return [
        {
          url: EAdminNavigation.dashboard,
          label: t('navMenu.home'),
          icon: HomeIcon,
          matchPaths: [EAdminNavigation.dashboard],
        },
        {
          url: EAdminNavigation.products,
          label: t('navMenu.products'),
          icon: ProductIcon,
        },
      ];
    }

    return [
      {
        url: EAdminNavigation.dashboard,
        label: t('navMenu.home'),
        icon: HomeIcon,
        matchPaths: [EAdminNavigation.dashboard]
      },
      {
        url: EAdminNavigation.users,
        label: t('navMenu.users'),
        icon: WorkIcon,
        matchPaths: [EAdminNavigation.users]
      },
      {
        url: EAdminNavigation.customers,
        label: t('navMenu.customers'),
        icon: PersonIcon,
      },
      {
        url: EAdminNavigation.products,
        label: t('navMenu.products'),
        icon: ProductIcon,
        subNavigationItems: [
          {
            url: EAdminNavigation.categories,
            disabled: false,
            label: t('navMenu.categories'),
          },
          {
            url: EAdminNavigation.reviews,
            disabled: false,
            label: t('navMenu.reviews'),
          },
        ],
      },
      {
        url: EAdminNavigation.orders,
        label: t('navMenu.orders'),
        icon: OrderIcon,
        subNavigationItems: [
          {
            url: EAdminNavigation.carts,
            disabled: false,
            label: 'Carts',
          },
        ],
      },
    ];
  }, [user.role, i18n.language]);

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={items}
      />
    </Navigation>
  );
};
