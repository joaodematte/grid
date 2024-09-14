import { createContext, memo, useCallback, useMemo, useState } from 'react';

import { Layout } from './types';

interface GridContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
  initialLayout: Layout;
  cols: number;
  colWidth: number;
  rowHeight: number;
}

interface GridContextProps {
  cols: number;
  colWidth: number;
  rowHeight: number;
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
  updateLayoutItem: (
    id: string,
    props: {
      x: number;
      y: number;
      w: number;
      h: number;
    }
  ) => void;
  deleteLayoutItem: (id: string) => void;
}

export const GridContextContext = createContext<GridContextProps | null>(null);

export const GridContext = memo(({ children, initialLayout, cols, colWidth, rowHeight }: GridContextProviderProps) => {
  const [layout, setLayout] = useState<Layout>(initialLayout);

  const updateLayoutItem = useCallback(
    (id: string, props: { x: number; y: number; w: number; h: number }) => {
      const index = layout.findIndex((i) => i.id === id);

      if (index === -1) return;

      setLayout((prevLayout) => prevLayout.map((it, i) => (i === index ? { ...it, ...props } : it)));
    },
    [layout]
  );

  const deleteLayoutItem = useCallback(
    (id: string) => {
      const index = layout.findIndex((i) => i.id === id);

      if (index === -1) return;

      setLayout((prevLayout) => prevLayout.filter((item) => item.id !== id));
    },
    [layout]
  );

  const gridContextValues = useMemo(
    () => ({
      layout,
      rowHeight,
      colWidth,
      cols,
      updateLayoutItem,
      deleteLayoutItem,
      setLayout
    }),
    [layout, rowHeight, colWidth, cols, updateLayoutItem, deleteLayoutItem]
  );

  return <GridContextContext.Provider value={gridContextValues}>{children}</GridContextContext.Provider>;
});
