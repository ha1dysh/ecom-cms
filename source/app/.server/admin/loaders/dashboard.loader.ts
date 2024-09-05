import {json, LoaderFunctionArgs} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import i18nServer from '~/locales/i18n.server';

export async function adminDashboardLoader({request}: LoaderFunctionArgs) {
  const user = await getAuthUser(request);

  const t = await i18nServer.getFixedT(request);
  const title = t('dashboard.meta.title');

  return json({ user: userMapper(user), meta: { title } });
}
