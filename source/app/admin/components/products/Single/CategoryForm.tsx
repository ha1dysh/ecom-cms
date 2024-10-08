import {Box, Button, Divider, FormLayout, InlineStack} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import {ValidatedLazyAutocomplete} from '~/admin/ui/ValidatedLazyAutocomplete/ValidatedLazyAutocomplete';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {
  TAdminApiCategoriesLoader,
  TAdminApiCategoriesLoaderData
} from '~/.server/admin/loaders/api/categories/index/loader';
import { useTranslation } from 'react-i18next';
import { categoryFormValidator } from './CategoryForm.validator';

type Props = {
  category?: Pick<TCategoryDto, 'id' | 'title' | 'slug'> | null;
  categories: TCategoryDto[];
  toggleActive: () => void;
}

const responseToOptions = (data?: TAdminApiCategoriesLoaderData) => {
  return data?.categories?.map((category) => ({
    value: category.id,
    label: `${category.title} (${category.slug})`,
  })) || [];
};

export const CategoryForm: FC<Props> = (props) => {
  const {category, toggleActive} = props;
  const { t } = useTranslation('products');

  const defaultValue = category ? {
    label: `${category.title} (${category.slug})`,
    value: category.id,
  } : undefined;

  return (
    <ValidatedForm validator={categoryFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateCategory}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedLazyAutocomplete<TAdminApiCategoriesLoader>
            label={t('category.selectCategory')}
            name="categoryId"
            url={EAdminNavigation.apiCategories}
            responseToOptions={responseToOptions}
            defaultValue={defaultValue}
          />
        </FormLayout>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={t('category.saveButton')} variant="primary"/>
          <Button onClick={toggleActive}>{t('category.cancelButton')}</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
