import type { InitOptions } from "i18next";

import enCommon from "~/locales/en/common.json";
import enUsers from "./en/users.json";
import enCustomers from "./en/customers.json";
import enProducts from "./en/products.json";
import enCategories from "./en/categories.json";
import enReviews from "./en/reviews.json";

import uaCommon from "~/locales/ua/common.json";
import uaUsers from "./ua/users.json";
import uaCustomers from "./ua/customers.json";
import uaProducts from "./ua/products.json";
import uaCategories from "./ua/categories.json";
import uaReviews from "./ua/reviews.json";
import { $Enums } from "@prisma/client";

export const EN_LANG = $Enums.Language.EN.toLowerCase();
export const UK_LANG = $Enums.Language.UA.toLowerCase();

export const LANGUAGES = [EN_LANG, UK_LANG];

export default {
  supportedLngs: LANGUAGES,
  fallbackLng: "en",
  defaultNS: "translation",
  resources: {
    [EN_LANG]: {
      translation: enCommon,
      users: enUsers,
      customers: enCustomers,
      products: enProducts,
      categories: enCategories,
      reviews: enReviews,
    },
    [UK_LANG]: {
      translation: uaCommon,
      users: uaUsers,
      customers: uaCustomers,
      products: uaProducts,
      categories: uaCategories,
      reviews: uaReviews,
    },
  },
} satisfies InitOptions;
