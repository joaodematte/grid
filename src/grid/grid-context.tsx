import { createContext, useState } from 'react';

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
  getNextLayoutId: () => string;
}

export const GridContextContext = createContext<GridContextProps | null>(null);

export const GridContext = ({ children, initialLayout, cols, colWidth, rowHeight }: GridContextProviderProps) => {
  const [layout, setLayout] = useState<Layout>(initialLayout);

  const updateLayoutItem = (id: string, props: { x: number; y: number; w: number; h: number }) => {
    const index = layout.findIndex((i) => i.id === id);

    if (index === -1) return;

    setLayout((prevLayout) => prevLayout.map((it, i) => (i === index ? { ...it, ...props } : it)));
  };

  const deleteLayoutItem = (id: string) => {
    const index = layout.findIndex((i) => i.id === id);

    if (index === -1) return;

    setLayout((prevLayout) => prevLayout.filter((item) => item.id !== id));
  };

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
        updateLayoutItem,
        deleteLayoutItem,
        setLayout,
        getNextLayoutId
      }}
    >
      {children}
    </GridContextContext.Provider>
  );
};
