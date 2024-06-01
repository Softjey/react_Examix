import React, { useId, useMemo, useState } from 'react';
import { Tabs as MuiTabs, TabsProps as MuiTabsProps, Tab, TabProps } from '@mui/material';
import { ITabsContext, TabsContext } from './TabsContext';

interface Props extends Omit<MuiTabsProps, 'value'> {
  defaultValue: string;
  tabs: Array<TabProps & { value: string }>;
}
const Tabs: React.FC<Props> = ({ defaultValue, onChange, children, tabs, ...rest }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const tabsId = useId();

  const providerValue: ITabsContext = useMemo(
    () => ({ id: tabsId, currentValue }),
    [tabsId, currentValue],
  );

  const onTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setCurrentValue(newValue);
    onChange?.(event, newValue);
  };

  return (
    <TabsContext.Provider value={providerValue}>
      <MuiTabs value={currentValue} onChange={onTabChange} {...rest}>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            id={`tab-${tabsId}-${tab.value}`}
            aria-controls={`tabpanel-${tabsId}-${tab.value}`}
            {...tab}
          />
        ))}
      </MuiTabs>
      {children}
    </TabsContext.Provider>
  );
};
export default Tabs;
