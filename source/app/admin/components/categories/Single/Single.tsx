import { BlockStack, Layout } from "@shopify/polaris";
import { FC } from "react";
import { PrimaryInfoCard } from "./PrimaryInfoCard";
import { TCategoryDto } from "~/.server/admin/dto/category.dto";
import { CategoryTranslationsCard } from "./CategoryTranslationsCard";
import { TCategoryTranslationDto } from "~/.server/admin/dto/categoryTranslation.dto";

export type SingleProps = {
  category: TCategoryDto;
  translations: TCategoryTranslationDto[];
};

export const Single: FC<SingleProps> = ({ category, translations }) => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard category={category} translations={translations} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <CategoryTranslationsCard
          categoryTranslations={translations}
          categoryId={category.id}
        />
      </Layout.Section>
    </Layout>
  );
};
