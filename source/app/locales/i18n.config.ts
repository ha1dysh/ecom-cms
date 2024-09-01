import enCommon from "~/locales/en/common";
import enUsers from "./en/users";
import enCustomers from "./en/customers";
import enProducts from "./en/products";
import enCategories from "./en/categories";
import enReviews from "./en/reviews";

import uaCommon from "~/locales/ua/common";
import uaUsers from "./ua/users";
import uaCustomers from "./ua/customers";
import uaProducts from "./ua/products";
import uaCategories from "./ua/categories";
import uaReviews from "./ua/reviews";

// This is the list of languages your application supports
export const supportedLngs = ["ua", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "en";

// The default namespace of i18next is "translation", but you can customize it
// here
export const defaultNS = "translation";

export const resources = {
  en: {
    translation: enCommon,
    users: enUsers,
    customers: enCustomers,
    products: enProducts,
    categories: enCategories,
    reviews: enReviews,
  },
  ua: {
    translation: uaCommon,
    users: uaUsers,
    customers: uaCustomers,
    products: uaProducts,
    categories: uaCategories,
    reviews: uaReviews,
  },
};
