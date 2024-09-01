import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {deleteFormValidator} from '~/admin/components/reviews/Single/DeleteForm.validator';
import { TProductReviewDto } from '~/.server/admin/dto/productReview.dto';
import { useTranslation } from 'react-i18next';

type Props = {
  productReview: Pick<TProductReviewDto, 'review'>;
  toggleActive: () => void;
}

export const DeleteForm: FC<Props> = (props) => {
  const {productReview, toggleActive} = props;
  const {review} = productReview;
  const { t } = useTranslation('reviews');

  return (
    <ValidatedForm
      validator={deleteFormValidator}
      method="post"
      onSubmit={toggleActive}
    >
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          {t('delete.paragraph')}
          <br />
          <Text as="strong">{review}</Text>
        </Text>
      </Box>
      <Divider />
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton
            text={t('delete.deleteButton')}
            variant="primary"
            tone="critical"
          />
          <Button onClick={toggleActive}>{t('delete.cancelButton')}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
