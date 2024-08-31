import { Button, Popover, ActionList } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { GlobeIcon } from "@shopify/polaris-icons";

export function LangMenu() {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button
      icon={GlobeIcon}
      variant="primary"
      onClick={toggleActive}
    />
  );

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
            { content: 'English', url: `?lng=en` },
            { content: 'Ukraine', url: `?lng=ua` },
          ]}
        />
      </Popover>
  );
}
