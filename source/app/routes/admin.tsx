import {Outlet, useLoaderData} from '@remix-run/react';
import polarisStylesHref from '@shopify/polaris/build/esm/styles.css?url';
import {LinksFunction} from '@remix-run/node';
import {AppProvider,} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import uaTranslations from '~/locales/polaris-ua.json';
import {adminLoader} from '~/.server/admin/loaders/admin.loader';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: polarisStylesHref},
];

export const loader = adminLoader;

export default function Admin() {
  const { locale } = useLoaderData<typeof loader>();

  return (
    <AppProvider
      i18n={locale === 'ua' ? uaTranslations : enTranslations}
    >
      <Outlet/>
    </AppProvider>
  );
}
