import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getAuthUser } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { userMapper } from "~/.server/admin/mappers/user.mapper";
import i18nServer from "~/locales/i18n.server";

export async function adminLoader({ request }: LoaderFunctionArgs) {
  if (request.url.includes(EAdminNavigation.authLogin)) {
    return json({ user: null, locale: "en" });
  }
  let locale = (await i18nServer.getLocale(request)) || "en";

  const user = await getAuthUser(request);

  return json({ user: userMapper(user), locale });
}
