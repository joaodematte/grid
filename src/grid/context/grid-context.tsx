import { createContext } from 'react';

import { GridData, Layout, LayoutItem } from '../types';

interface GridContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
  cols: number;
  colWidth: number;
  rowHeight: number;
  layout: Layout;
  data: GridData;
  addItem: (tabId: number, item: LayoutItem) => void;
  removeItem: (tabId: number, itemId: string) => void;
  updateItem: (tabId: number, item: LayoutItem) => void;
  addTab: (tabId: number) => void;
  removeTab: (tabId: number) => void;
  updateLayout: (tabId: number, layout: Layout) => void;
}

interface GridContextProps {
  cols: number;
  colWidth: number;
  rowHeight: number;
  layout: Layout;
  data: GridData;
  getNextLayoutId: () => string;
  addItem: (tabId: number, item: LayoutItem) => void;
  removeItem: (tabId: number, itemId: string) => void;
  updateItem: (tabId: number, item: LayoutItem) => void;
  addTab: (tabId: number) => void;
  removeTab: (tabId: number) => void;
  updateLayout: (tabId: number, layout: Layout) => void;
}

export const GridContextContext = createContext<GridContextProps | null>(null);

export const GridContext = ({
  children,
  data,
  layout,
  cols,
  colWidth,
  rowHeight,
  ...actions
}: GridContextProviderProps) => {
  const getNextLayoutId = () => {
    return (layout.reduce((max, item) => Math.max(max, parseInt(item.id, 10)), -1) + 1).toString();
  };

  return (
    <GridContextContext.Provider
      value={{
        layout,
        rowHeight,
        colWidth,
        cols,
        getNextLayoutId,
        data,
        ...actions
      }}
    >
      {children}
    </GridContextContext.Provider>
  );
};
