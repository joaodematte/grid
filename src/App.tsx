import { DndContext } from '@dnd-kit/core';
import { useReducer, useState } from 'react';

import { closestLeftCorner, Grid, GridContext, GridData, Layout, LayoutItem } from './grid';
import { gridReducer } from './grid/utils/reducer';
import { Sidebar } from './sidebar/sidebar';
import { TabContextProvider } from './tabs';

const initialState: GridData = {
  0: [
    { id: '0', x: 0, y: 0, w: 3, h: 1 },
    { id: '1', x: 3, y: 0, w: 1, h: 1 },
    { id: '2', x: 0, y: 1, w: 2, h: 1 },
    { id: '3', x: 2, y: 1, w: 2, h: 1 }
  ],
  1: [
    { id: '4', x: 0, y: 0, w: 4, h: 1 },
    { id: '5', x: 0, y: 1, w: 4, h: 1 },
    { id: '6', x: 0, y: 2, w: 4, h: 1 },
    { id: '7', x: 0, y: 3, w: 4, h: 1 }
  ]
};

export default function App() {
  const [state, dispatch] = useReducer(gridReducer, initialState);
  const [activeTab, setActiveTab] = useState<number>(0);

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
      <TabContextProvider activeTab={activeTab} setActiveTab={setActiveTab}>
        <GridContext layout={state[activeTab]} cols={4} colWidth={200} rowHeight={50} {...actions}>
          <div className="flex h-full w-full">
            <Sidebar />
            <div className="mt-24 flex w-full flex-col items-center space-y-1">
              <div className="flex h-[50px] w-[800px] border-2 border-dashed border-zinc-300 font-bold">
                {Object.keys(state).map((tabIndex) => (
                  <button
                    key={tabIndex}
                    className="grid h-full w-[200px] place-items-center bg-zinc-100 hover:bg-zinc-200"
                    onClick={() => setActiveTab(Number(tabIndex))}
                  >
                    aba {tabIndex}
                  </button>
                ))}
              </div>
              <Grid />
            </div>
          </div>
        </GridContext>
      </TabContextProvider>
    </DndContext>
  );
}
