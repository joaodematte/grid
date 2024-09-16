import { useContext } from 'react';

import { TabContext } from '../tabs-context';

export function useTabContext() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }

  return context;
}
