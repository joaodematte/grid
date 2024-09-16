import { useContext } from 'react';

import { TabsContext } from '../context/tabs-context';

export function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }

  return context;
}
