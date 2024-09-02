import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Modal,
  Text,
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { TranslationsCreate } from "./TranslationsCreate";
import { TProductTranslationDto } from "~/.server/admin/dto/productTranslation.dto";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";
import { TranslationsUpdate } from "./TranslationsUpdate";
import { TranslationsDelete } from "./DeleteTranslationForm";
import { useTranslation } from "react-i18next";

type Props = {
  translations?: TProductTranslationDto[];
};

export function TranslationsCard({ translations }: Props) {
  const [active, setActive] = useState(false);
  const toggleCreate = useCallback(() => setActive((active) => !active), []);
  const { t } = useTranslation('products');

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t('translations.cardTitle')}
          </Text>
          <Button
            onClick={toggleCreate}
            accessibilityLabel="TODO: transl"
            icon={PlusIcon}
          />
        </InlineGrid>

        <Box paddingBlockStart="300">
          <BlockStack gap="200">
            {translations?.map((translation) => (
              <TranslationItem key={translation.id} translation={translation} />
            ))}
        </BlockStack>
        </Box>
      </BlockStack>

      <Modal
        size="small"
        open={active}
        onClose={toggleCreate}
        title={t('translations.createTitle')}
      >
        <TranslationsCreate toggleActive={toggleCreate} translations={translations} />
      </Modal>
    </Card>
  );
};

function TranslationItem({ translation }: { translation: TProductTranslationDto }) {
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
      <Divider />

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
