import { BlockStack, Box, Button, Card, InlineGrid, Modal, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { TCategoryTranslationDto } from "~/.server/admin/dto/categoryTranslation.dto";
import { CategoryTranslationsCreate } from "./CategoryTranslationsCreate";
import { CategoryTranslationItem } from "./CategoryTranslationsItem";

type Props = {
  categoryTranslations?: TCategoryTranslationDto[];
  categoryId: string | null;
};

export function CategoryTranslationsCard({ categoryId, categoryTranslations }: Props) {
  const [active, setActive] = useState(false);
  const toggleCreate = useCallback(() => setActive((active) => !active), []);
  const { t } = useTranslation('products');

  if (!categoryId) {
    return null;
  }

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t("categoryTranslations.cardTitle")}
          </Text>
          <Button
            onClick={toggleCreate}
            accessibilityLabel={t("categoryTranslations.createTitle")}
            icon={PlusIcon}
          />
        </InlineGrid>

        <Box paddingBlockStart="300">
          <BlockStack gap="200">
            {categoryTranslations?.map((translation) => (
              <CategoryTranslationItem key={translation.id} translation={translation} />
            ))}
        </BlockStack>
        </Box>
      </BlockStack>

      <Modal
        size="small"
        open={active}
        onClose={toggleCreate}
        title={t("categoryTranslations.createTitle")}
      >
        <CategoryTranslationsCreate
          toggleActive={toggleCreate}
          categoryTranslations={categoryTranslations}
          categoryId={categoryId}
        />
      </Modal>
    </Card>
  );
};

