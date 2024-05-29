import { createContext, useContext } from 'react';

export interface ITabsContext {
  id: string;
  currentValue: string;
}

export const TabsContext = createContext<ITabsContext>({
  id: '',
  currentValue: '',
});

// eslint-disable-next-line react-refresh/only-export-components
export const useTabs = () => {
  const tabs = useContext(TabsContext);

  if (!tabs) {
    throw new Error('useTabs must be used within a TabsProvider');
  }

  return tabs;
};
