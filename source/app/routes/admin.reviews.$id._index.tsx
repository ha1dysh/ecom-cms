import {useCallback, useMemo, useState} from 'react';
import {useRouteLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {Single} from '~/admin/components/reviews/Single/Single';
import {DeleteForm} from '~/admin/components/reviews/Single/DeleteForm';
import { TAdminReviewsSingleLoader } from '~/.server/admin/loaders/reviews/single/loader';

export {action} from '~/.server/admin/actions/reviews/single/action';

export default function AdminReviewsIdIndex() {
  const data = useRouteLoaderData<TAdminReviewsSingleLoader>('routes/admin.reviews.$id');
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: 'Delete Review',
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => {
    return data?.productReview.deletedAt ? [] : [deleteAction];
  }, [deleteAction, data?.productReview.deletedAt]);

  if (!data?.productReview) {
    return null;
  }

  return (
    <Page
      title={`Review id #${data?.productReview.id}`}
      backAction={{
        url: EAdminNavigation.reviews
      }}
      secondaryActions={secondaryActions}
    >
      <Single productReview={data?.productReview}/>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Delete review"
      >
        <DeleteForm toggleActive={toggleActive} productReview={data?.productReview}/>
      </Modal>
    </Page>
  );
}
