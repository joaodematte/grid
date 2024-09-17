import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useReducer, useState } from 'react';

import { closestLeftCorner, Grid, GridContext, GridData, gridReducer, Layout, LayoutItem, Overlay } from './grid';
import { Sidebar } from './sidebar';
import { Tabs, TabsContextProvider } from './tabs';

const initialData: GridData = {
  1: [
    { id: 'a7xP3q', x: 0, y: 0, w: 3, h: 1 },
    { id: 'Bm9Lk2', x: 3, y: 0, w: 1, h: 1 },
    { id: 'Zt5Ry8', x: 0, y: 1, w: 2, h: 1 },
    { id: 'Hs6Uf4', x: 2, y: 1, w: 2, h: 1 }
  ],
  2: [
    { id: 'Jn2Vw9', x: 0, y: 0, w: 4, h: 1 },
    { id: 'Kp7Xm1', x: 0, y: 1, w: 4, h: 1 },
    { id: 'Qd3Fg6', x: 0, y: 2, w: 4, h: 1 },
    { id: 'Ey8Tc5', x: 0, y: 3, w: 4, h: 1 }
  ]
};

export default function App() {
  const [data, dispatch] = useReducer(gridReducer, initialData);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [tabs, setTabs] = useState<number[]>([1, 2]);

  const addItem = (tabId: number, item: LayoutItem) => {
    dispatch({ type: 'ADD_ITEM', payload: { tabId, item } });
  };

  const removeItem = (tabId: number, itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { tabId, itemId } });
  };

  const updateItem = (tabId: number, item: LayoutItem) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { tabId, item } });
  };

  const addTab = (tabId: number) => {
    dispatch({ type: 'ADD_TAB', payload: { tabId } });
  };

  const removeTab = (tabId: number) => {
    dispatch({ type: 'REMOVE_TAB', payload: { tabId } });
  };

  const updateLayout = (tabId: number, layout: Layout) => {
    dispatch({ type: 'UPDATE_LAYOUT', payload: { tabId, layout } });
  };

  const actions = {
    addItem,
    removeItem,
    updateItem,
    addTab,
    removeTab,
    updateLayout
  };

  return (
    <DndContext collisionDetection={closestLeftCorner}>
      <TabsContextProvider tabs={tabs} activeTab={activeTab} setTabs={setTabs} setActiveTab={setActiveTab}>
        <GridContext data={data} layout={data[activeTab]} cols={4} colWidth={200} rowHeight={50} {...actions}>
          <div className="flex h-full w-full">
            <Sidebar />
            <div className="mt-24 flex w-full flex-col items-center space-y-1">
              <Tabs />
              <Grid />
            </div>
          </div>

          <DragOverlay dropAnimation={{ duration: 0 }}>
            <Overlay />
          </DragOverlay>
        </GridContext>
      </TabsContextProvider>
    </DndContext>
  );
}
