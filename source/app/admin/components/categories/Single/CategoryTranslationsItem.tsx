import { BlockStack, InlineStack, Button, Divider, Modal, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";
import { TCategoryTranslationDto } from "~/.server/admin/dto/categoryTranslation.dto";
import { CategoryTranslationsUpdate } from "./CategoryTranslationsUpdate";
import { CategoryTranslationsDelete } from "./CategoryTranslationDelete";

export function CategoryTranslationItem({ translation }: { translation: TCategoryTranslationDto }) {
  const { t } = useTranslation('categories');

  const [updateActive, setUpdateActive] = useState(false);
  const toggleUpdate = useCallback(() => setUpdateActive((active) => !active), []);

  const [deleteActive, setDeleteActive] = useState(false);
  const toggleDelete = useCallback(() => setDeleteActive((active) => !active), []);

  return (
    <BlockStack gap="200">
      <InlineStack align="space-between">
        <Text as="strong" variant="bodyLg" fontWeight="bold">
          {translation.language}
        </Text>
        <InlineStack gap="200">
          <Button icon={DeleteIcon} tone="critical" variant="plain" onClick={toggleDelete} />
          <Button icon={EditIcon} variant="monochromePlain" onClick={toggleUpdate} />
        </InlineStack>
      </InlineStack>
      <Text as="h3" variant="headingXs" fontWeight="medium">
        {t('translations.title')}
      </Text>
      <Text as="p" variant="bodyMd">
        {translation.title}
      </Text>

      <Modal
        size="small"
        open={updateActive}
        onClose={toggleUpdate}
        title={t('translations.updateTitle')}
      >
        <CategoryTranslationsUpdate toggleActive={toggleUpdate} translation={translation} />
      </Modal>

      <Modal
        size="small"
        open={deleteActive}
        onClose={toggleDelete}
        title={t('translations.deleteTitle')}
      >
        <CategoryTranslationsDelete toggleActive={toggleDelete} translation={translation} />
      </Modal>
    </BlockStack>
  );
}
