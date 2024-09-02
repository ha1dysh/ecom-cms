import { BlockStack, InlineStack, Button, Divider, Modal, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TProductTranslationDto } from "~/.server/admin/dto/productTranslation.dto";
import { TranslationsDelete } from "./TranslationDelete";
import { TranslationsUpdate } from "./TranslationsUpdate";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";

export function TranslationItem({ translation }: { translation: TProductTranslationDto }) {
  const { t } = useTranslation('products');

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
      <Text as="h3" variant="headingXs" fontWeight="medium">
        {t('translations.description')}
      </Text>
      <Text as="p" variant="bodyMd">
        {translation.description}
      </Text>

      <Modal
        size="small"
        open={updateActive}
        onClose={toggleUpdate}
        title={t('translations.updateTitle')}
      >
        <TranslationsUpdate toggleActive={toggleUpdate} translation={translation} />
      </Modal>

      <Modal
        size="small"
        open={deleteActive}
        onClose={toggleDelete}
        title={t('translations.deleteTitle')}
      >
        <TranslationsDelete toggleActive={toggleDelete} translation={translation} />
      </Modal>
    </BlockStack>
  );
}
