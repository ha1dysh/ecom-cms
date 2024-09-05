import { $Enums } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { prisma } from "~/.server/shared/services/prisma.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { EN_LANG, LANGUAGES } from "~/locales/i18n.config";
import { LOCALE_SESSION_KEY } from "~/locales/i18n.server";
import { getAuthUser } from "../../services/auth.service";
import { sessionStorage } from "../../utils/session.util";

export async function action({request}: ActionFunctionArgs) {
  const { id } = await getAuthUser(request);

  const formData = await request.formData();

  const lng = String(formData.get('language') || EN_LANG);

  const language = (LANGUAGES.includes(lng) ? lng : EN_LANG).toUpperCase() as $Enums.Language;

  await prisma.user.update({
    where: { id },
    data: { language },
  });

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  session.set(LOCALE_SESSION_KEY, language.toLowerCase());

  const refererUrl = request.headers.get("Referer") || EAdminNavigation.dashboard;

  return redirect(refererUrl, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}
