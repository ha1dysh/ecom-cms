import { $Enums } from "@prisma/client";
import type { InitOptions } from "i18next";

import enCommon from "./en/common.json";
import enUsers from "./en/users.json";
import enCustomers from "./en/customers.json";
import enProducts from "./en/products.json";
import enCategories from "./en/categories.json";
import enReviews from "./en/reviews.json";

import uaCommon from "./uk/common.json";
import uaUsers from "./uk/users.json";
import uaCustomers from "./uk/customers.json";
import uaProducts from "./uk/products.json";
import uaCategories from "./uk/categories.json";
import uaReviews from "./uk/reviews.json";

export const EN_LANG = $Enums.Language.EN.toLowerCase();
export const UK_LANG = $Enums.Language.UK.toLowerCase();

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
