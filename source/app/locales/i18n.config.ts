import enCommon from "~/locales/en/common";
import enUsers from "./en/users";

import uaCommon from "~/locales/ua/common";
import uaUsers from "./ua/users";

// This is the list of languages your application supports
export const supportedLngs = ["ua", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "en";

// The default namespace of i18next is "translation", but you can customize it
// here
export const defaultNS = "translation";

export const resources = {
  en: { translation: enCommon, users: enUsers },
  ua: { translation: uaCommon, users: uaUsers },
};
