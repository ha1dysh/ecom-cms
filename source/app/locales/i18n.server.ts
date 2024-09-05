import { RemixI18Next } from "remix-i18next/server";
import { sessionStorage } from "~/.server/admin/utils/session.util";

import i18n from "~/locales/i18n.config";

export const LOCALE_SESSION_KEY = 'lng';

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    sessionKey: LOCALE_SESSION_KEY,
    sessionStorage: sessionStorage,
  },
  i18next: {
    ...i18n,
  },
});
