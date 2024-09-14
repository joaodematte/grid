import { useContext } from 'react';

import { GridContextContext } from '../grid-context';

export const useGridContext = () => {
  const gridContext = useContext(GridContextContext);

  if (!gridContext) throw new Error('useGridContext must be used within a <GridContext.Provider />');

  return gridContext;
};
