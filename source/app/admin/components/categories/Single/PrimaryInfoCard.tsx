import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { EditIcon } from "@shopify/polaris-icons";
import { TCategoryDto } from "~/.server/admin/dto/category.dto";
import { useTranslation } from "react-i18next";
import { TCategoryTranslationDto } from "~/.server/admin/dto/categoryTranslation.dto";

export type PrimaryInfoCardProps = {
  category: TCategoryDto;
  translations: TCategoryTranslationDto[];
};

export function PrimaryInfoCard({ category, translations }: PrimaryInfoCardProps) {
  const { t, i18n } = useTranslation("categories");

  const title =
    translations.find((t) => t.language.toLowerCase() === i18n.language)
      ?.title || category.title;

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {t("single.primaryInfo")}
          </Text>
          <Button
            url={`${EAdminNavigation.categories}/${category.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t("single.slug")}
          </Text>
          <Text as="p" variant="bodyMd">
            {category.slug}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t("single.title")}
          </Text>
          <Text as="p" variant="bodyMd">
            {title}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            {t("single.description")}
          </Text>
          <Text as="p" variant="bodyMd">
            {category.description}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
