import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { GlobeIcon } from "@shopify/polaris-icons";
import { useSubmit } from "@remix-run/react";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export function LangMenu() {
  const submit = useSubmit();
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button
      icon={GlobeIcon}
      variant="primary"
      onClick={toggleActive}
    />
  );

  const handleLanguageChange = useCallback((language: string) => {
    const formData = new FormData();
    formData.set('language', language);
    submit(formData, {action: EAdminNavigation.apiChangeLanguage, method: 'POST'});
    toggleActive();
  }, [submit]);

  return (
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            { content: 'English', onAction: () => handleLanguageChange('en') },
            { content: 'Ukraine', onAction: () => handleLanguageChange('uk') },
          ]}
        />
      </Popover>
  );
}
