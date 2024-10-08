import { BlockStack, Box, Button, Card, InlineGrid, Modal, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { TranslationsCreate } from "./TranslationsCreate";
import { TProductTranslationDto } from "~/.server/admin/dto/productTranslation.dto";
import { useTranslation } from "react-i18next";
import { TranslationItem } from "./TranslationsItem";

type Props = {
  productTranslations?: TProductTranslationDto[];
};

export function TranslationsCard({ productTranslations }: Props) {
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
            {productTranslations?.map((translation) => (
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
        <TranslationsCreate toggleActive={toggleCreate} productTranslations={productTranslations} />
      </Modal>
    </Card>
  );
};

