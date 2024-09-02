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
