import { Outlet, useLoaderData } from "@remix-run/react";
import { TAdminReviewsSingleLoader } from "~/.server/admin/loaders/reviews/single/loader";

export { loader } from "~/.server/admin/loaders/reviews/single/loader";

export default function AdminReviewsId() {
  const data = useLoaderData<TAdminReviewsSingleLoader>();

  return <Outlet />;
}
