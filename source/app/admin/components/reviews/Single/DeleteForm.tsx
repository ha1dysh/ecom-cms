import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {deleteFormValidator} from '~/admin/components/reviews/Single/DeleteForm.validator';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';

type Props = {
  productReview: Pick<TProductReviewDto, 'review'>;
  toggleActive: () => void;
}

export const DeleteForm: FC<Props> = (props) => {
  const {productReview, toggleActive} = props;
  const {review} = productReview;

  return (
    <ValidatedForm
      validator={deleteFormValidator}
      method="post"
      onSubmit={toggleActive}
    >
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          Are you sure you want to delete review:
          <br />
          <Text as="strong">{review}</Text>
        </Text>
      </Box>
      <Divider />
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton
            text={"Delete"}
            variant="primary"
            tone="critical"
          />
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
